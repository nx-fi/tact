"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
exports.throwNonFatalErrorConstEval = throwNonFatalErrorConstEval;
exports.ensureInt = ensureInt;
exports.ensureBoolean = ensureBoolean;
exports.ensureString = ensureString;
exports.ensureSimplifiedString = ensureSimplifiedString;
exports.evalUnaryOp = evalUnaryOp;
exports.evalBinaryOp = evalBinaryOp;
exports.interpretEscapeSequences = interpretEscapeSequences;
exports.parseAndEvalExpression = parseAndEvalExpression;
const core_1 = require("@ton/core");
const paddedBits_1 = require("@ton/core/dist/boc/utils/paddedBits");
const crc32_1 = require("../utils/crc32");
const constEval_1 = require("./constEval");
const context_1 = require("../context/context");
const errors_1 = require("../error/errors");
const util_1 = require("../ast/util");
const resolveDescriptors_1 = require("../types/resolveDescriptors");
const resolveExpression_1 = require("../types/resolveExpression");
const types_1 = require("../types/types");
const grammar_1 = require("../grammar/grammar");
const grammar_2 = require("../grammar");
const ast_helpers_1 = require("../ast/ast-helpers");
const util_2 = require("./util");
const sha256_1 = require("../utils/sha256");
// TVM integers are signed 257-bit integers
const minTvmInt = -(2n ** 256n);
const maxTvmInt = 2n ** 256n - 1n;
// Range allowed in repeat statements
const minRepeatStatement = -(2n ** 256n); // Note it is the same as minimum for TVM
const maxRepeatStatement = 2n ** 31n - 1n;
// Util factory methods
// FIXME: pass util as argument
//const util = getAstUtil(getAstFactory());
// Throws a non-fatal const-eval error, in the sense that const-eval as a compiler
// optimization cannot be applied, e.g. to `let`-statements.
// Note that for const initializers this is a show-stopper.
function throwNonFatalErrorConstEval(msg, source) {
    (0, errors_1.throwConstEvalError)(`Cannot evaluate expression to a constant: ${msg}`, false, source);
}
// Throws a fatal const-eval, meaning this is a meaningless program,
// so compilation should be aborted in all cases
function throwErrorConstEval(msg, source) {
    (0, errors_1.throwConstEvalError)(`Cannot evaluate expression to a constant: ${msg}`, true, source);
}
function ensureInt(val) {
    if (val.kind !== "number") {
        throwErrorConstEval(`integer expected, but got expression of kind '${val.kind}'`, val.loc);
    }
    if (minTvmInt <= val.value && val.value <= maxTvmInt) {
        return val;
    }
    else {
        throwErrorConstEval(`integer '${(0, types_1.showValue)(val)}' does not fit into TVM Int type`, val.loc);
    }
}
function ensureArgumentForEquality(val) {
    switch (val.kind) {
        case "address":
        case "boolean":
        case "cell":
        case "null":
        case "number":
        case "simplified_string":
        case "slice":
            return val;
        case "struct_value":
            throwErrorConstEval(`struct ${(0, types_1.showValue)(val)} cannot be an argument to == operator`, val.loc);
            break;
        default:
            (0, errors_1.throwInternalCompilerError)("Unrecognized ast literal kind");
    }
}
function ensureRepeatInt(val) {
    if (val.kind !== "number") {
        throwErrorConstEval(`integer expected, but got expression of kind '${val.kind}'`, val.loc);
    }
    if (minRepeatStatement <= val.value && val.value <= maxRepeatStatement) {
        return val;
    }
    else {
        throwErrorConstEval(`repeat argument '${(0, types_1.showValue)(val)}' must be a number between -2^256 (inclusive) and 2^31 - 1 (inclusive)`, val.loc);
    }
}
function ensureBoolean(val) {
    if (val.kind !== "boolean") {
        throwErrorConstEval(`boolean expected, but got expression of kind '${val.kind}'`, val.loc);
    }
    return val;
}
function ensureString(val) {
    if (val.kind !== "string") {
        throwErrorConstEval(`string expected, but got expression of kind '${val.kind}'`, val.loc);
    }
    return val;
}
function ensureSimplifiedString(val) {
    if (val.kind !== "simplified_string") {
        throwErrorConstEval(`simplified string expected, but got expression of kind '${val.kind}'`, val.loc);
    }
    return val;
}
function ensureFunArity(arity, args, source) {
    if (args.length !== arity) {
        throwErrorConstEval(`function expects ${arity} argument(s), but got ${args.length}`, source);
    }
}
function ensureMethodArity(arity, args, source) {
    if (args.length !== arity) {
        throwErrorConstEval(`method expects ${arity} argument(s), but got ${args.length}`, source);
    }
}
function evalUnaryOp(op, valOperand, source, util) {
    switch (op) {
        case "+":
            return ensureInt(valOperand);
        case "-": {
            const astNumber = ensureInt(valOperand);
            const result = -astNumber.value;
            return ensureInt(util.makeNumberLiteral(result, source));
        }
        case "~": {
            const astNumber = ensureInt(valOperand);
            const result = ~astNumber.value;
            return util.makeNumberLiteral(result, source);
        }
        case "!": {
            const astBoolean = ensureBoolean(valOperand);
            const result = !astBoolean.value;
            return util.makeBooleanLiteral(result, source);
        }
        case "!!":
            if (valOperand.kind === "null") {
                throwErrorConstEval("non-null value expected but got null", valOperand.loc);
            }
            return valOperand;
        default:
            (0, errors_1.throwInternalCompilerError)("Unrecognized operand");
    }
}
function evalBinaryOp(op, valLeft, valRightContinuation, // It needs to be a continuation, because some binary operators short-circuit
source, util) {
    switch (op) {
        case "+": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value + astRight.value;
            return ensureInt(util.makeNumberLiteral(result, source));
        }
        case "-": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value - astRight.value;
            return ensureInt(util.makeNumberLiteral(result, source));
        }
        case "*": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value * astRight.value;
            return ensureInt(util.makeNumberLiteral(result, source));
        }
        case "/": {
            // The semantics of integer division for TVM (and by extension in Tact)
            // is a non-conventional one: by default it rounds towards negative infinity,
            // meaning, for instance, -1 / 5 = -1 and not zero, as in many mainstream languages.
            // Still, the following holds: a / b * b + a % b == a, for all b != 0.
            const astRight = ensureInt(valRightContinuation());
            if (astRight.value === 0n)
                throwErrorConstEval("divisor expression must be non-zero", astRight.loc);
            const astLeft = ensureInt(valLeft);
            const result = (0, util_2.divFloor)(astLeft.value, astRight.value);
            return ensureInt(util.makeNumberLiteral(result, source));
        }
        case "%": {
            // Same as for division, see the comment above
            // Example: -1 % 5 = 4
            const astRight = ensureInt(valRightContinuation());
            if (astRight.value === 0n)
                throwErrorConstEval("divisor expression must be non-zero", astRight.loc);
            const astLeft = ensureInt(valLeft);
            const result = (0, util_2.modFloor)(astLeft.value, astRight.value);
            return ensureInt(util.makeNumberLiteral(result, source));
        }
        case "&": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value & astRight.value;
            return util.makeNumberLiteral(result, source);
        }
        case "|": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value | astRight.value;
            return util.makeNumberLiteral(result, source);
        }
        case "^": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value ^ astRight.value;
            return util.makeNumberLiteral(result, source);
        }
        case "<<": {
            const astNum = ensureInt(valLeft);
            const astBits = ensureInt(valRightContinuation());
            if (0n > astBits.value || astBits.value > 256n) {
                throwErrorConstEval(`the number of bits shifted ('${astBits.value}') must be within [0..256] range`, astBits.loc);
            }
            const result = astNum.value << astBits.value;
            try {
                return ensureInt(util.makeNumberLiteral(result, source));
            }
            catch (e) {
                if (e instanceof RangeError)
                    // this actually should not happen
                    throwErrorConstEval(`integer does not fit into TVM Int type`, source);
                throw e;
            }
        }
        case ">>": {
            const astNum = ensureInt(valLeft);
            const astBits = ensureInt(valRightContinuation());
            if (0n > astBits.value || astBits.value > 256n) {
                throwErrorConstEval(`the number of bits shifted ('${astBits.value}') must be within [0..256] range`, astBits.loc);
            }
            const result = astNum.value >> astBits.value;
            try {
                return ensureInt(util.makeNumberLiteral(result, source));
            }
            catch (e) {
                if (e instanceof RangeError)
                    // this actually should not happen
                    throwErrorConstEval(`integer does not fit into TVM Int type`, source);
                throw e;
            }
        }
        case ">": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value > astRight.value;
            return util.makeBooleanLiteral(result, source);
        }
        case "<": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value < astRight.value;
            return util.makeBooleanLiteral(result, source);
        }
        case ">=": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value >= astRight.value;
            return util.makeBooleanLiteral(result, source);
        }
        case "<=": {
            const astLeft = ensureInt(valLeft);
            const astRight = ensureInt(valRightContinuation());
            const result = astLeft.value <= astRight.value;
            return util.makeBooleanLiteral(result, source);
        }
        case "==": {
            const valR = valRightContinuation();
            // the null comparisons account for optional types, e.g.
            // a const x: Int? = 42 can be compared to null
            if (valLeft.kind !== valR.kind &&
                valLeft.kind !== "null" &&
                valR.kind !== "null") {
                throwErrorConstEval("operands of `==` must have same type", source);
            }
            const valLeft_ = ensureArgumentForEquality(valLeft);
            const valR_ = ensureArgumentForEquality(valR);
            // Changed to equality testing (instead of ===) because cells, slices, address are equal by hashing
            const result = (0, ast_helpers_1.eqExpressions)(valLeft_, valR_);
            return util.makeBooleanLiteral(result, source);
        }
        case "!=": {
            const valR = valRightContinuation();
            // Comparison to null should be checked as well
            // otherwise it would give an error
            if (valLeft.kind !== valR.kind &&
                valLeft.kind !== "null" &&
                valR.kind !== "null") {
                throwErrorConstEval("operands of `!=` must have same type", source);
            }
            const valLeft_ = ensureArgumentForEquality(valLeft);
            const valR_ = ensureArgumentForEquality(valR);
            // Changed to equality testing (instead of ===) because cells, slices are equal by hashing
            const result = !(0, ast_helpers_1.eqExpressions)(valLeft_, valR_);
            return util.makeBooleanLiteral(result, source);
        }
        case "&&": {
            const astLeft = ensureBoolean(valLeft);
            const result = astLeft.value && ensureBoolean(valRightContinuation()).value;
            return util.makeBooleanLiteral(result, source);
        }
        case "||": {
            const astLeft = ensureBoolean(valLeft);
            const result = astLeft.value || ensureBoolean(valRightContinuation()).value;
            return util.makeBooleanLiteral(result, source);
        }
    }
}
/**
 * @deprecated Strings in Tact fully follow JS grammar. Use JSON.parse(`"${value}"`) instead.
 */
function interpretEscapeSequences(stringLiteral, source) {
    return stringLiteral.replace(/\\\\|\\"|\\n|\\r|\\t|\\v|\\b|\\f|\\u{([0-9A-Fa-f]{1,6})}|\\u([0-9A-Fa-f]{4})|\\x([0-9A-Fa-f]{2})/g, (match, unicodeCodePoint, unicodeEscape, hexEscape) => {
        switch (match) {
            case "\\\\":
                return "\\";
            case '\\"':
                return '"';
            case "\\n":
                return "\n";
            case "\\r":
                return "\r";
            case "\\t":
                return "\t";
            case "\\v":
                return "\v";
            case "\\b":
                return "\b";
            case "\\f":
                return "\f";
            default:
                // Handle Unicode code point escape
                if (unicodeCodePoint) {
                    const codePoint = parseInt(unicodeCodePoint, 16);
                    if (codePoint > 0x10ffff) {
                        throwErrorConstEval(`unicode code point is outside of valid range 000000-10FFFF: ${stringLiteral}`, source);
                    }
                    return String.fromCodePoint(codePoint);
                }
                // Handle Unicode escape
                if (unicodeEscape) {
                    const codeUnit = parseInt(unicodeEscape, 16);
                    return String.fromCharCode(codeUnit);
                }
                // Handle hex escape
                if (hexEscape) {
                    const hexValue = parseInt(hexEscape, 16);
                    return String.fromCharCode(hexValue);
                }
                return match;
        }
    });
}
class ReturnSignal extends Error {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
const WILDCARD_NAME = "_";
class EnvironmentStack {
    currentEnv;
    constructor() {
        this.currentEnv = { values: new Map() };
    }
    findBindingMap(name) {
        let env = this.currentEnv;
        while (env !== undefined) {
            if (env.values.has(name)) {
                return env.values;
            }
            else {
                env = env.parent;
            }
        }
        return undefined;
    }
    /*
    Sets a binding for "name" in the **current** environment of the stack.
    If a binding for "name" already exists in the current environment, it
    overwrites the binding with the provided value.
    As a special case, name "_" is ignored.

    Note that this method does not check if binding "name" already exists in
    a parent environment.
    This means that if binding "name" already exists in a parent environment,
    it will be shadowed by the provided value in the current environment.
    This shadowing behavior is useful for modelling recursive function calls.
    For example, consider the recursive implementation of factorial
    (for simplification purposes, it returns 1 for the factorial of
    negative numbers):

    1  fun factorial(a: Int): Int {
    2  if (a <= 1) {
    3     return 1;
    4  } else {
    5     return a * factorial(a - 1);
    6  }

    Just before factorial(4) finishes its execution, the environment stack will
    look as follows (the arrows point to their parent environment):

    a = 4 <------- a = 3 <-------- a = 2 <------- a = 1

    Note how each child environment shadows variable a, because each
    recursive call to factorial at line 5 creates a child
    environment with a new binding for a.

    When factorial(1) = 1 finishes execution, the environment at the top
    of the stack is popped:
    
    a = 4 <------- a = 3 <-------- a = 2

    and execution resumes at line 5 in the environment where a = 2,
    so that the return at line 5 is 2 * 1 = 2.

    This in turn causes the stack to pop the environment at the top:

    a = 4 <------- a = 3

    so that the return at line 5 (now in the environment a = 3) will
    produce 3 * 2 = 6, and so on.
    */
    setNewBinding(name, val) {
        if (name !== WILDCARD_NAME) {
            this.currentEnv.values.set(name, val);
        }
    }
    /*
    Searches the binding "name" in the stack, starting at the current
    environment and moving towards the parent environments.
    If it finds the binding, it updates its value
    to "val". If it does not find "name", the stack is unchanged.
    As a special case, name "_" is always ignored.
    */
    updateBinding(name, val) {
        if (name !== WILDCARD_NAME) {
            const bindings = this.findBindingMap(name);
            if (bindings !== undefined) {
                bindings.set(name, val);
            }
        }
    }
    /*
    Searches the binding "name" in the stack, starting at the current
    environment and moving towards the parent environments.
    If it finds "name", it returns its value.
    If it does not find "name", it returns undefined.
    As a special case, name "_" always returns undefined.
    */
    getBinding(name) {
        if (name === WILDCARD_NAME) {
            return undefined;
        }
        const bindings = this.findBindingMap(name);
        if (bindings !== undefined) {
            return bindings.get(name);
        }
        else {
            return undefined;
        }
    }
    selfInEnvironment() {
        return this.findBindingMap("self") !== undefined;
    }
    /**
     * Executes code parameter in a fresh environment that is placed at the top
     * of the environment stack. The fresh environment is initialized
     * with the bindings in "initialBindings". Once code finishes
     * execution, the new environment is automatically popped from
     * the stack.
     *
     * This method is useful for starting a new local variables scope,
     * like in a function call.
     * @param code The code to execute in the fresh environment.
     * @param initialBindings The initial bindings to add to the fresh environment.
     */
    executeInNewEnvironment(code, initialBindings = {
        names: [],
        values: [],
    }) {
        const names = initialBindings.names;
        const values = initialBindings.values;
        const oldEnv = this.currentEnv;
        this.currentEnv = {
            values: new Map(),
            parent: oldEnv,
        };
        names.forEach((name, index) => {
            this.setNewBinding(name, values[index]);
        }, this);
        try {
            return code();
        }
        finally {
            this.currentEnv = oldEnv;
        }
    }
}
function parseAndEvalExpression(sourceCode, ast = (0, ast_helpers_1.getAstFactory)(), parser = (0, grammar_1.getParser)(ast, grammar_1.defaultParser), util = (0, util_1.getAstUtil)(ast)) {
    try {
        const ast = parser.parseExpression(sourceCode);
        const constEvalResult = (0, constEval_1.evalConstantExpression)(ast, new context_1.CompilerContext(), util);
        return { kind: "ok", value: constEvalResult };
    }
    catch (error) {
        if (error instanceof errors_1.TactCompilationError ||
            error instanceof errors_1.TactConstEvalError)
            return { kind: "error", message: error.message };
        throw error;
    }
}
const defaultInterpreterConfig = {
    // We set the default max number of loop iterations
    // to the maximum number allowed for repeat loops
    maxLoopIterations: maxRepeatStatement,
};
/*
Interprets Tact AST trees.
The constructor receives an optional CompilerContext which includes
all external declarations that the interpreter will use during interpretation.
If no CompilerContext is provided, the interpreter will use an empty
CompilerContext.

**IMPORTANT**: if a custom CompilerContext is provided, it should be the
CompilerContext provided by the typechecker.

The reason for requiring a CompilerContext is that the interpreter should work
in the use case where the interpreter only knows part of the code.
For example, consider the following code (I marked with brackets [ ] the places
where the interpreter gets called during expression simplification in the
compilation phase):

const C: Int = [1];

contract TestContract {

   get fun test(): Int {
      return [C + 1];
   }
}

When the interpreter gets called inside the brackets, it does not know what
other code is surrounding those brackets, because the interpreter did not execute the
code outside the brackets. Hence, it relies on the typechecker to receive the
CompilerContext that includes the declarations in the code
(the constant C for example).

Since the interpreter relies on the typechecker, it assumes that the given AST tree
is already a valid Tact program.

Internally, the interpreter uses a stack of environments to keep track of
variables at different scopes. Each environment in the stack contains a map
that binds a variable name to its corresponding value.
*/
class Interpreter {
    envStack;
    context;
    /**
     * Stores all visited constants during the current computation.
     */
    visitedConstants = new Set();
    /**
     * Stores all constants that were calculated during the computation of some constant,
     * and the functions that were called for this process.
     * Used only in case of circular dependencies to return a clear error.
     */
    constantComputationPath = [];
    config;
    util;
    constructor(util, context = new context_1.CompilerContext(), config = defaultInterpreterConfig) {
        this.envStack = new EnvironmentStack();
        this.context = context;
        this.config = config;
        this.util = util;
    }
    /**
     * This is the public access for expression interpretation.
     * @param ast Expression to interpret.
     */
    interpretExpression(expr) {
        return this.handleStackOverflow(expr.loc, () => this.interpretExpressionInternal(expr));
    }
    /**
     * This is the public access for statement interpretation.
     * @param stmt Statement to interpret.
     */
    interpretStatement(stmt) {
        this.handleStackOverflow(stmt.loc, () => {
            this.interpretStatementInternal(stmt);
        });
    }
    /**
     * This is the public access for module item interpretation.
     * @param modItem Module item to interpret.
     */
    interpretModuleItem(modItem) {
        this.handleStackOverflow(modItem.loc, () => {
            this.interpretModuleItemInternal(modItem);
        });
    }
    interpretModuleItemInternal(ast) {
        switch (ast.kind) {
            case "constant_def":
                this.interpretConstantDef(ast);
                break;
            case "function_def":
                this.interpretFunctionDef(ast);
                break;
            case "asm_function_def":
                throwNonFatalErrorConstEval("Asm functions are currently not supported.", ast.loc);
                break;
            case "struct_decl":
                this.interpretStructDecl(ast);
                break;
            case "message_decl":
                this.interpretMessageDecl(ast);
                break;
            case "native_function_decl":
                this.interpretFunctionDecl(ast);
                break;
            case "primitive_type_decl":
                this.interpretPrimitiveTypeDecl(ast);
                break;
            case "contract":
                this.interpretContract(ast);
                break;
            case "trait":
                this.interpretTrait(ast);
                break;
        }
    }
    interpretConstantDef(ast) {
        throwNonFatalErrorConstEval("Constant definitions are currently not supported.", ast.loc);
    }
    interpretFunctionDef(ast) {
        throwNonFatalErrorConstEval("Function definitions are currently not supported.", ast.loc);
    }
    interpretStructDecl(ast) {
        throwNonFatalErrorConstEval("Struct declarations are currently not supported.", ast.loc);
    }
    interpretMessageDecl(ast) {
        throwNonFatalErrorConstEval("Message declarations are currently not supported.", ast.loc);
    }
    interpretPrimitiveTypeDecl(ast) {
        throwNonFatalErrorConstEval("Primitive type declarations are currently not supported.", ast.loc);
    }
    interpretFunctionDecl(ast) {
        throwNonFatalErrorConstEval("Native function declarations are currently not supported.", ast.loc);
    }
    interpretContract(ast) {
        throwNonFatalErrorConstEval("Contract declarations are currently not supported.", ast.loc);
    }
    interpretTrait(ast) {
        throwNonFatalErrorConstEval("Trait declarations are currently not supported.", ast.loc);
    }
    interpretExpressionInternal(ast) {
        switch (ast.kind) {
            case "id":
                return this.interpretName(ast);
            case "method_call":
                return this.interpretMethodCall(ast);
            case "init_of":
                return this.interpretInitOf(ast);
            case "code_of":
                return this.interpretCodeOf(ast);
            case "null":
                return this.interpretNull(ast);
            case "boolean":
                return this.interpretBoolean(ast);
            case "number":
                return this.interpretNumber(ast);
            case "string":
                return this.interpretString(ast);
            case "simplified_string":
                return this.interpretSimplifiedString(ast);
            case "address":
                return this.interpretAddress(ast);
            case "cell":
                return this.interpretCell(ast);
            case "slice":
                return this.interpretSlice(ast);
            case "op_unary":
                return this.interpretUnaryOp(ast);
            case "op_binary":
                return this.interpretBinaryOp(ast);
            case "conditional":
                return this.interpretConditional(ast);
            case "struct_instance":
                return this.interpretStructInstance(ast);
            case "struct_value":
                return this.interpretStructValue(ast);
            case "field_access":
                return this.interpretFieldAccess(ast);
            case "static_call":
                return this.interpretStaticCall(ast);
            default:
                (0, errors_1.throwInternalCompilerError)("Unrecognized expression kind");
        }
    }
    interpretName(ast) {
        const name = (0, ast_helpers_1.idText)(ast);
        if ((0, resolveDescriptors_1.hasStaticConstant)(this.context, name)) {
            const constant = (0, resolveDescriptors_1.getStaticConstant)(this.context, name);
            if (constant.value !== undefined) {
                return constant.value;
            }
            // Since we call `interpretExpression` on a constant value below, we don't want
            // infinite recursion due to circular dependencies. To prevent this, let's collect
            // all the constants we process in this iteration. That way, any circular dependencies
            // will result in a second occurrence here and thus an early (before stack overflow)
            // exception being thrown here.
            if (this.visitedConstants.has(name)) {
                throwErrorConstEval(`cannot evaluate ${name} as it has circular dependencies: [${this.formatComputationPath(name)}]`, ast.loc);
            }
            this.visitedConstants.add(name);
            const astNode = constant.ast;
            if (astNode.kind === "constant_def") {
                constant.value = this.inComputationPath(name, () => this.interpretExpressionInternal(astNode.initializer));
                return constant.value;
            }
            throwErrorConstEval(`cannot evaluate declared constant ${(0, errors_1.idTextErr)(ast)} as it does not have a body`, ast.loc);
        }
        const variableBinding = this.envStack.getBinding(name);
        if (variableBinding !== undefined) {
            return variableBinding;
        }
        throwNonFatalErrorConstEval("cannot evaluate a variable", ast.loc);
    }
    interpretMethodCall(ast) {
        switch ((0, ast_helpers_1.idText)(ast.method)) {
            case "asComment": {
                ensureMethodArity(0, ast.args, ast.loc);
                const comment = ensureSimplifiedString(this.interpretExpressionInternal(ast.self)).value;
                return this.util.makeCellLiteral((0, core_1.beginCell)()
                    .storeUint(0, 32)
                    .storeStringTail(comment)
                    .endCell(), ast.loc);
            }
            default:
                throwNonFatalErrorConstEval(`calls of ${(0, errors_1.idTextErr)(ast.method)} are not supported at this moment`, ast.loc);
        }
    }
    interpretInitOf(ast) {
        throwNonFatalErrorConstEval("initOf is not supported at this moment", ast.loc);
    }
    interpretCodeOf(ast) {
        throwNonFatalErrorConstEval("codeOf is not supported at this moment", ast.loc);
    }
    interpretNull(ast) {
        return ast;
    }
    interpretBoolean(ast) {
        return ast;
    }
    interpretNumber(ast) {
        return ensureInt(ast);
    }
    interpretString(ast) {
        return this.util.makeSimplifiedStringLiteral(interpretEscapeSequences(ast.value, ast.loc), ast.loc);
    }
    interpretSimplifiedString(ast) {
        return ast;
    }
    interpretAddress(ast) {
        return ast;
    }
    interpretCell(ast) {
        return ast;
    }
    interpretSlice(ast) {
        return ast;
    }
    interpretUnaryOp(ast) {
        // Tact grammar does not have negative integer literals,
        // so in order to avoid errors for `-115792089237316195423570985008687907853269984665640564039457584007913129639936`
        // which is `-(2**256)` we need to have a special case for it
        if (ast.operand.kind === "number" && ast.op === "-") {
            // emulating negative integer literals
            return ensureInt(this.util.makeNumberLiteral(-ast.operand.value, ast.loc));
        }
        const valOperand = this.interpretExpressionInternal(ast.operand);
        return evalUnaryOp(ast.op, valOperand, ast.loc, this.util);
    }
    interpretBinaryOp(ast) {
        const valLeft = this.interpretExpressionInternal(ast.left);
        const valRightContinuation = () => this.interpretExpressionInternal(ast.right);
        return evalBinaryOp(ast.op, valLeft, valRightContinuation, ast.loc, this.util);
    }
    interpretConditional(ast) {
        // here we rely on the typechecker that both branches have the same type
        const valCond = ensureBoolean(this.interpretExpressionInternal(ast.condition));
        if (valCond.value) {
            return this.interpretExpressionInternal(ast.thenBranch);
        }
        else {
            return this.interpretExpressionInternal(ast.elseBranch);
        }
    }
    interpretStructInstance(ast) {
        const structTy = (0, resolveDescriptors_1.getType)(this.context, ast.type);
        // initialize the resulting struct value with
        // the default values for fields with initializers
        // or null for uninitialized optional fields
        const resultMap = new Map();
        for (const field of structTy.fields) {
            if (typeof field.default !== "undefined") {
                resultMap.set(field.name, field.default);
            }
            else {
                if (field.type.kind === "ref" && field.type.optional) {
                    resultMap.set(field.name, this.util.makeNullLiteral(ast.loc));
                }
            }
        }
        // this will override default fields set above
        for (const fieldWithInit of ast.args) {
            const v = this.interpretExpressionInternal(fieldWithInit.initializer);
            resultMap.set((0, ast_helpers_1.idText)(fieldWithInit.field), v);
        }
        // Create the field entries for the StructValue
        // The previous loop ensures that the map resultMap cannot return
        // undefined for each of the fields in ast.args
        const structValueFields = [];
        for (const [fieldName, fieldValue] of resultMap) {
            // Find the source code declaration, if existent
            const sourceField = ast.args.find((f) => (0, ast_helpers_1.idText)(f.field) === fieldName);
            if (typeof sourceField !== "undefined") {
                structValueFields.push(this.util.makeStructFieldValue(fieldName, fieldValue, sourceField.loc));
            }
            else {
                // Use as source code location the entire struct
                structValueFields.push(this.util.makeStructFieldValue(fieldName, fieldValue, ast.loc));
            }
        }
        return this.util.makeStructValue(structValueFields, ast.type, ast.loc);
    }
    interpretStructValue(ast) {
        // Struct values are already simplified to their simplest form
        return ast;
    }
    interpretFieldAccess(ast) {
        // special case for contract/trait constant accesses via `self.constant`
        // interpret "self" as a contract/trait access only if "self"
        // is not already assigned in the environment (this would mean
        // we are executing inside an extends function)
        if (ast.aggregate.kind === "id" &&
            (0, ast_helpers_1.isSelfId)(ast.aggregate) &&
            !this.envStack.selfInEnvironment()) {
            const selfTypeRef = (0, resolveExpression_1.getExpType)(this.context, ast.aggregate);
            if (selfTypeRef.kind === "ref") {
                const contractTypeDescription = (0, resolveDescriptors_1.getType)(this.context, selfTypeRef.name);
                const foundContractConst = contractTypeDescription.constants.find((constId) => (0, ast_helpers_1.eqNames)(ast.field, constId.name));
                if (foundContractConst === undefined) {
                    // not a constant, e.g. `self.storageVariable`
                    throwNonFatalErrorConstEval("cannot evaluate non-constant self field access", ast.aggregate.loc);
                }
                if (foundContractConst.value !== undefined) {
                    return foundContractConst.value;
                }
                const name = `self.${(0, ast_helpers_1.idText)(ast.field)}`;
                // see comment in `interpretName`
                if (this.visitedConstants.has(name)) {
                    throwErrorConstEval(`cannot evaluate ${name} as it has circular dependencies: [${this.formatComputationPath(name)}]`, ast.loc);
                }
                this.visitedConstants.add(name);
                const astNode = foundContractConst.ast;
                if (astNode.kind === "constant_def") {
                    foundContractConst.value = this.inComputationPath(name, () => this.interpretExpression(astNode.initializer));
                    return foundContractConst.value;
                }
                throwErrorConstEval(`cannot evaluate declared contract/trait constant ${(0, errors_1.idTextErr)(ast.field)} as it does not have a body`, ast.field.loc);
            }
        }
        const valStruct = this.interpretExpressionInternal(ast.aggregate);
        if (valStruct.kind !== "struct_value") {
            throwErrorConstEval(`constant struct expected, but got ${(0, types_1.showValue)(valStruct)}`, ast.aggregate.loc);
        }
        const field = valStruct.args.find((f) => (0, ast_helpers_1.idText)(ast.field) === (0, ast_helpers_1.idText)(f.field));
        if (typeof field !== "undefined") {
            return field.initializer;
        }
        else {
            // this cannot happen in a well-typed program
            (0, errors_1.throwInternalCompilerError)(`struct field ${(0, errors_1.idTextErr)(ast.field)} is missing`, ast.aggregate.loc);
        }
    }
    interpretStaticCall(ast) {
        switch ((0, ast_helpers_1.idText)(ast.function)) {
            case "ton": {
                ensureFunArity(1, ast.args, ast.loc);
                const tons = ensureSimplifiedString(this.interpretExpressionInternal(ast.args[0]));
                try {
                    return ensureInt(this.util.makeNumberLiteral(BigInt((0, core_1.toNano)(tons.value).toString(10)), ast.loc));
                }
                catch (e) {
                    if (e instanceof Error && e.message === "Invalid number") {
                        throwErrorConstEval(`invalid ${(0, errors_1.idTextErr)(ast.function)} argument`, ast.loc);
                    }
                    throw e;
                }
            }
            case "pow": {
                ensureFunArity(2, ast.args, ast.loc);
                const valBase = ensureInt(this.interpretExpressionInternal(ast.args[0]));
                const valExp = ensureInt(this.interpretExpressionInternal(ast.args[1]));
                if (valExp.value < 0n) {
                    throwErrorConstEval(`${(0, errors_1.idTextErr)(ast.function)} builtin called with negative exponent ${(0, types_1.showValue)(valExp)}`, ast.loc);
                }
                try {
                    const result = valBase.value ** valExp.value;
                    return ensureInt(this.util.makeNumberLiteral(result, ast.loc));
                }
                catch (e) {
                    if (e instanceof RangeError) {
                        // even TS bigint type cannot hold it
                        throwErrorConstEval("integer does not fit into TVM Int type", ast.loc);
                    }
                    throw e;
                }
            }
            case "pow2": {
                ensureFunArity(1, ast.args, ast.loc);
                const valExponent = ensureInt(this.interpretExpressionInternal(ast.args[0]));
                if (valExponent.value < 0n) {
                    throwErrorConstEval(`${(0, errors_1.idTextErr)(ast.function)} builtin called with negative exponent ${(0, types_1.showValue)(valExponent)}`, ast.loc);
                }
                try {
                    const result = 2n ** valExponent.value;
                    return ensureInt(this.util.makeNumberLiteral(result, ast.loc));
                }
                catch (e) {
                    if (e instanceof RangeError) {
                        // even TS bigint type cannot hold it
                        throwErrorConstEval("integer does not fit into TVM Int type", ast.loc);
                    }
                    throw e;
                }
            }
            case "sha256": {
                ensureFunArity(1, ast.args, ast.loc);
                const expr = this.interpretExpressionInternal(ast.args[0]);
                if (expr.kind === "slice") {
                    throwNonFatalErrorConstEval("slice argument is currently not supported", ast.loc);
                }
                const str = ensureSimplifiedString(expr);
                return this.util.makeNumberLiteral((0, sha256_1.sha256)(str.value).value, ast.loc);
            }
            case "emptyMap": {
                ensureFunArity(0, ast.args, ast.loc);
                return this.util.makeNullLiteral(ast.loc);
            }
            case "cell":
                {
                    ensureFunArity(1, ast.args, ast.loc);
                    const str = ensureSimplifiedString(this.interpretExpressionInternal(ast.args[0]));
                    try {
                        return this.util.makeCellLiteral(core_1.Cell.fromBase64(str.value), ast.loc);
                    }
                    catch (_) {
                        throwErrorConstEval(`invalid base64 encoding for a cell: ${(0, types_1.showValue)(str)}`, ast.loc);
                    }
                }
                break;
            case "slice":
                {
                    ensureFunArity(1, ast.args, ast.loc);
                    const str = ensureSimplifiedString(this.interpretExpressionInternal(ast.args[0]));
                    try {
                        return this.util.makeSliceLiteral(core_1.Cell.fromBase64(str.value).asSlice(), ast.loc);
                    }
                    catch (_) {
                        throwErrorConstEval(`invalid base64 encoding for a cell: ${(0, types_1.showValue)(str)}`, ast.loc);
                    }
                }
                break;
            case "rawSlice":
                {
                    ensureFunArity(1, ast.args, ast.loc);
                    const str = ensureSimplifiedString(this.interpretExpressionInternal(ast.args[0]));
                    if (!/^[0-9a-fA-F]*_?$/.test(str.value)) {
                        throwErrorConstEval(`invalid hex string: ${(0, types_1.showValue)(str)}`, ast.loc);
                    }
                    // Remove underscores from the hex string
                    const hex = str.value.replace("_", "");
                    const paddedHex = hex.length % 2 === 0 ? hex : "0" + hex;
                    const buffer = Buffer.from(paddedHex, "hex");
                    // Initialize the BitString
                    let bits = new core_1.BitString(buffer, hex.length % 2 === 0 ? 0 : 4, hex.length * 4);
                    // Handle the case where the string ends with an underscore
                    if (str.value.endsWith("_")) {
                        const paddedBits = (0, paddedBits_1.paddedBufferToBits)(buffer);
                        // Ensure there's enough length to apply the offset
                        const offset = hex.length % 2 === 0 ? 0 : 4;
                        if (paddedBits.length >= offset) {
                            bits = paddedBits.substring(offset, paddedBits.length - offset);
                        }
                        else {
                            bits = new core_1.BitString(Buffer.from(""), 0, 0);
                        }
                    }
                    // Ensure the bit length is within acceptable limits
                    if (bits.length > 1023) {
                        throwErrorConstEval(`slice constant is too long, expected up to 1023 bits, got ${bits.length}`, ast.loc);
                    }
                    // Return the constructed slice
                    return this.util.makeSliceLiteral((0, core_1.beginCell)().storeBits(bits).endCell().asSlice(), ast.loc);
                }
                break;
            case "ascii":
                {
                    ensureFunArity(1, ast.args, ast.loc);
                    const str = ensureSimplifiedString(this.interpretExpressionInternal(ast.args[0]));
                    const hex = Buffer.from(str.value).toString("hex");
                    if (hex.length > 64) {
                        throwErrorConstEval(`ascii string is too long, expected up to 32 bytes, got ${Math.floor(hex.length / 2)}`, ast.loc);
                    }
                    if (hex.length == 0) {
                        throwErrorConstEval(`ascii string cannot be empty`, ast.loc);
                    }
                    return this.util.makeNumberLiteral(BigInt("0x" + hex), ast.loc);
                }
                break;
            case "crc32":
                {
                    ensureFunArity(1, ast.args, ast.loc);
                    const str = ensureSimplifiedString(this.interpretExpressionInternal(ast.args[0]));
                    return this.util.makeNumberLiteral(BigInt((0, crc32_1.crc32)(str.value) >>> 0), ast.loc); // >>> 0 converts to unsigned
                }
                break;
            case "address":
                {
                    ensureFunArity(1, ast.args, ast.loc);
                    const str = ensureSimplifiedString(this.interpretExpressionInternal(ast.args[0]));
                    try {
                        const address = core_1.Address.parse(str.value);
                        if (address.workChain !== 0 &&
                            address.workChain !== -1) {
                            throwErrorConstEval(`${(0, types_1.showValue)(str)} is invalid address`, ast.loc);
                        }
                        return this.util.makeAddressLiteral(address, ast.loc);
                    }
                    catch (_) {
                        throwErrorConstEval(`invalid address encoding: ${(0, types_1.showValue)(str)}`, ast.loc);
                    }
                }
                break;
            case "newAddress": {
                ensureFunArity(2, ast.args, ast.loc);
                const wc = ensureInt(this.interpretExpressionInternal(ast.args[0])).value;
                const addr = Buffer.from(ensureInt(this.interpretExpressionInternal(ast.args[1]))
                    .value.toString(16)
                    .padStart(64, "0"), "hex");
                if (wc !== 0n && wc !== -1n) {
                    throwErrorConstEval(`expected workchain of an address to be equal 0 or -1, received: ${wc}`, ast.loc);
                }
                return this.util.makeAddressLiteral(new core_1.Address(Number(wc), addr), ast.loc);
            }
            default:
                if ((0, resolveDescriptors_1.hasStaticFunction)(this.context, (0, ast_helpers_1.idText)(ast.function))) {
                    const functionDescription = (0, resolveDescriptors_1.getStaticFunction)(this.context, (0, ast_helpers_1.idText)(ast.function));
                    const functionNode = functionDescription.ast;
                    switch (functionNode.kind) {
                        case "function_def": {
                            // Currently, no attribute is supported
                            if (functionNode.attributes.length > 0) {
                                throwNonFatalErrorConstEval("calls to functions with attributes are currently not supported", ast.loc);
                            }
                            return this.inComputationPath(`${functionDescription.name}()`, () => this.evalStaticFunction(functionNode, ast.args, functionDescription.returns));
                        }
                        case "asm_function_def":
                            throwNonFatalErrorConstEval(`${(0, errors_1.idTextErr)(ast.function)} cannot be interpreted because it's an asm-function`, ast.loc);
                            break;
                        case "function_decl":
                            throwNonFatalErrorConstEval(`${(0, errors_1.idTextErr)(ast.function)} cannot be interpreted because it does not have a body`, ast.loc);
                            break;
                        case "native_function_decl":
                            throwNonFatalErrorConstEval("native function calls are currently not supported", ast.loc);
                            break;
                    }
                }
                else {
                    throwNonFatalErrorConstEval(`function ${(0, errors_1.idTextErr)(ast.function)} is not declared`, ast.loc);
                }
        }
    }
    evalStaticFunction(functionCode, args, returns) {
        // Evaluate the arguments in the current environment
        const argValues = args.map(this.interpretExpressionInternal, this);
        // Extract the parameter names
        const paramNames = functionCode.params.map((param) => (0, ast_helpers_1.idText)(param.name));
        // Check parameter names do not shadow constants
        if (paramNames.some((paramName) => (0, resolveDescriptors_1.hasStaticConstant)(this.context, paramName))) {
            (0, errors_1.throwInternalCompilerError)(`some parameter of function ${(0, ast_helpers_1.idText)(functionCode.name)} shadows a constant with the same name`, functionCode.loc);
        }
        // Call function inside a new environment
        return this.envStack.executeInNewEnvironment(() => {
            // Interpret all the statements
            try {
                functionCode.statements.forEach(this.interpretStatementInternal, this);
                // At this point, the function did not execute a return.
                // Execution continues after the catch.
            }
            catch (e) {
                if (e instanceof ReturnSignal) {
                    const val = e.getValue();
                    if (val !== undefined) {
                        return val;
                    }
                    // The function executed a return without a value.
                    // Execution continues after the catch.
                }
                else {
                    throw e;
                }
            }
            // If execution reaches this point, it means that
            // the function had no return statement or executed a return
            // without a value. This is an error only if the return type of the
            // function is not void
            if (returns.kind !== "void") {
                (0, errors_1.throwInternalCompilerError)(`function ${(0, ast_helpers_1.idText)(functionCode.name)} must return a value`, functionCode.loc);
            }
            else {
                // The function does not return a value.
                // We rely on the typechecker so that the function is called as a statement.
                // Hence, we can return a dummy null, since the null will be discarded anyway.
                return this.util.makeNullLiteral(grammar_2.dummySrcInfo);
            }
        }, { names: paramNames, values: argValues });
    }
    interpretStatementInternal(ast) {
        switch (ast.kind) {
            case "statement_let":
                this.interpretLetStatement(ast);
                break;
            case "statement_destruct":
                this.interpretDestructStatement(ast);
                break;
            case "statement_assign":
                this.interpretAssignStatement(ast);
                break;
            case "statement_augmentedassign":
                this.interpretAugmentedAssignStatement(ast);
                break;
            case "statement_condition":
                this.interpretConditionStatement(ast);
                break;
            case "statement_expression":
                this.interpretExpressionStatement(ast);
                break;
            case "statement_foreach":
                this.interpretForEachStatement(ast);
                break;
            case "statement_repeat":
                this.interpretRepeatStatement(ast);
                break;
            case "statement_return":
                this.interpretReturnStatement(ast);
                break;
            case "statement_try":
                this.interpretTryStatement(ast);
                break;
            case "statement_until":
                this.interpretUntilStatement(ast);
                break;
            case "statement_while":
                this.interpretWhileStatement(ast);
                break;
            case "statement_block":
                this.interpretBlockStatement(ast);
                break;
        }
    }
    interpretLetStatement(ast) {
        if ((0, resolveDescriptors_1.hasStaticConstant)(this.context, (0, ast_helpers_1.idText)(ast.name))) {
            // Attempt of shadowing a constant in a let declaration
            (0, errors_1.throwInternalCompilerError)(`declaration of ${(0, ast_helpers_1.idText)(ast.name)} shadows a constant with the same name`, ast.loc);
        }
        const val = this.interpretExpressionInternal(ast.expression);
        this.envStack.setNewBinding((0, ast_helpers_1.idText)(ast.name), val);
    }
    interpretDestructStatement(ast) {
        for (const [_, name] of ast.identifiers.values()) {
            if ((0, resolveDescriptors_1.hasStaticConstant)(this.context, (0, ast_helpers_1.idText)(name))) {
                // Attempt of shadowing a constant in a destructuring declaration
                (0, errors_1.throwInternalCompilerError)(`declaration of ${(0, ast_helpers_1.idText)(name)} shadows a constant with the same name`, ast.loc);
            }
        }
        const val = this.interpretExpressionInternal(ast.expression);
        if (val.kind !== "struct_value") {
            throwErrorConstEval(`destructuring assignment expected a struct, but got ${(0, types_1.showValue)(val)}`, ast.expression.loc);
        }
        // Keep a map of the fields in val for lookup
        const valAsMap = new Map();
        val.args.forEach((f) => valAsMap.set((0, ast_helpers_1.idText)(f.field), f.initializer));
        for (const [field, name] of ast.identifiers.values()) {
            if (name.text === "_") {
                continue;
            }
            const v = valAsMap.get((0, ast_helpers_1.idText)(field));
            if (typeof v === "undefined") {
                throwErrorConstEval(`destructuring assignment expected field ${(0, errors_1.idTextErr)(field)}`, ast.loc);
            }
            this.envStack.setNewBinding((0, ast_helpers_1.idText)(name), v);
        }
    }
    interpretAssignStatement(ast) {
        if (ast.path.kind === "id") {
            const val = this.interpretExpressionInternal(ast.expression);
            this.envStack.updateBinding((0, ast_helpers_1.idText)(ast.path), val);
        }
        else {
            throwNonFatalErrorConstEval("only identifiers are currently supported as path expressions", ast.path.loc);
        }
    }
    interpretAugmentedAssignStatement(ast) {
        if (ast.path.kind === "id") {
            const updateVal = () => this.interpretExpressionInternal(ast.expression);
            const currentPathValue = this.envStack.getBinding((0, ast_helpers_1.idText)(ast.path));
            if (currentPathValue === undefined) {
                throwNonFatalErrorConstEval("undeclared identifier", ast.path.loc);
            }
            const newVal = evalBinaryOp(ast.op, currentPathValue, updateVal, ast.loc, this.util);
            this.envStack.updateBinding((0, ast_helpers_1.idText)(ast.path), newVal);
        }
        else {
            throwNonFatalErrorConstEval("only identifiers are currently supported as path expressions", ast.path.loc);
        }
    }
    interpretConditionStatement(ast) {
        const condition = ensureBoolean(this.interpretExpressionInternal(ast.condition));
        if (condition.value) {
            this.envStack.executeInNewEnvironment(() => {
                ast.trueStatements.forEach(this.interpretStatementInternal, this);
            });
        }
        else if (ast.falseStatements !== null) {
            this.envStack.executeInNewEnvironment(() => {
                ast.falseStatements.forEach(this.interpretStatementInternal, this);
            });
        }
    }
    interpretExpressionStatement(ast) {
        this.interpretExpressionInternal(ast.expression);
    }
    interpretForEachStatement(ast) {
        throwNonFatalErrorConstEval("foreach currently not supported", ast.loc);
    }
    interpretRepeatStatement(ast) {
        const iterations = ensureRepeatInt(this.interpretExpressionInternal(ast.iterations));
        if (iterations.value > 0) {
            // We can create a single environment for all the iterations in the loop
            // (instead of a fresh environment for each iteration)
            // because the typechecker ensures that variables do not leak outside
            // the loop. Also, the language requires that all declared variables inside the
            // loop be initialized, which means that we can overwrite its value in the environment
            // in each iteration.
            this.envStack.executeInNewEnvironment(() => {
                for (let i = 1; i <= iterations.value; i++) {
                    ast.statements.forEach(this.interpretStatementInternal, this);
                }
            });
        }
    }
    interpretReturnStatement(ast) {
        if (ast.expression !== null) {
            const val = this.interpretExpressionInternal(ast.expression);
            throw new ReturnSignal(val);
        }
        else {
            throw new ReturnSignal();
        }
    }
    interpretTryStatement(ast) {
        throwNonFatalErrorConstEval("try statements currently not supported", ast.loc);
    }
    interpretUntilStatement(ast) {
        let condition;
        let iterCount = 0;
        // We can create a single environment for all the iterations in the loop
        // (instead of a fresh environment for each iteration)
        // because the typechecker ensures that variables do not leak outside
        // the loop. Also, the language requires that all declared variables inside the
        // loop be initialized, which means that we can overwrite its value in the environment
        // in each iteration.
        this.envStack.executeInNewEnvironment(() => {
            do {
                ast.statements.forEach(this.interpretStatementInternal, this);
                iterCount++;
                if (iterCount >= this.config.maxLoopIterations) {
                    throwNonFatalErrorConstEval("loop timeout reached", ast.loc);
                }
                // The typechecker ensures that the condition does not refer to
                // variables declared inside the loop.
                condition = ensureBoolean(this.interpretExpressionInternal(ast.condition));
            } while (!condition.value);
        });
    }
    interpretWhileStatement(ast) {
        let condition;
        let iterCount = 0;
        // We can create a single environment for all the iterations in the loop
        // (instead of a fresh environment for each iteration)
        // because the typechecker ensures that variables do not leak outside
        // the loop. Also, the language requires that all declared variables inside the
        // loop be initialized, which means that we can overwrite its value in the environment
        // in each iteration.
        this.envStack.executeInNewEnvironment(() => {
            do {
                // The typechecker ensures that the condition does not refer to
                // variables declared inside the loop.
                condition = ensureBoolean(this.interpretExpressionInternal(ast.condition));
                if (condition.value) {
                    ast.statements.forEach(this.interpretStatementInternal, this);
                    iterCount++;
                    if (iterCount >= this.config.maxLoopIterations) {
                        throwNonFatalErrorConstEval("loop timeout reached", ast.loc);
                    }
                }
            } while (condition.value);
        });
    }
    interpretBlockStatement(ast) {
        this.envStack.executeInNewEnvironment(() => {
            ast.statements.forEach(this.interpretStatementInternal, this);
        });
    }
    inComputationPath(path, cb) {
        this.constantComputationPath.push(path);
        const res = cb();
        this.constantComputationPath.pop();
        return res;
    }
    formatComputationPath(name) {
        const start = this.constantComputationPath.indexOf(name);
        const path = start !== -1
            ? this.constantComputationPath.slice(start)
            : this.constantComputationPath;
        const shortPath = path.length > 10
            ? [...path.slice(0, 5), "...", ...path.slice(path.length - 4)]
            : path;
        return `${shortPath.join(" -> ")} -> ${name}`;
    }
    handleStackOverflow(loc, code) {
        try {
            return code();
        }
        catch (e) {
            const finalErrorMessage = "execution stack reached maximum allowed depth";
            if (e instanceof RangeError) {
                if (e.message.includes("stack size exceeded")) {
                    // Chrome, Safari, Edge, node.js
                    throwNonFatalErrorConstEval(finalErrorMessage, loc);
                }
            }
            if (e instanceof Error) {
                if (e.message.includes("too much recursion")) {
                    // Firefox
                    throwNonFatalErrorConstEval(finalErrorMessage, loc);
                }
            }
            throw e;
        }
    }
}
exports.Interpreter = Interpreter;

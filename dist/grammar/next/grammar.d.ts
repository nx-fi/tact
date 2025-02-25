import * as $ from "@tonstudio/parser-runtime";
export declare namespace $ast {
    type Module = $.Located<{
        readonly $: "Module";
        readonly imports: readonly Import[];
        readonly items: readonly moduleItem[];
    }>;
    type Import = $.Located<{
        readonly $: "Import";
        readonly path: StringLiteral;
    }>;
    type PrimitiveTypeDecl = $.Located<{
        readonly $: "PrimitiveTypeDecl";
        readonly name: TypeId;
    }>;
    type $Function = $.Located<{
        readonly $: "Function";
        readonly attributes: readonly FunctionAttribute[];
        readonly name: Id;
        readonly parameters: parameterList<Parameter>;
        readonly returnType: ascription | undefined;
        readonly body: FunctionDefinition | FunctionDeclaration;
    }>;
    type AsmFunction = $.Located<{
        readonly $: "AsmFunction";
        readonly shuffle: shuffle | undefined;
        readonly attributes: readonly FunctionAttribute[];
        readonly name: Id;
        readonly parameters: parameterList<Parameter>;
        readonly returnType: ascription | undefined;
        readonly instructions: assembly;
    }>;
    type NativeFunctionDecl = $.Located<{
        readonly $: "NativeFunctionDecl";
        readonly nativeName: FuncId;
        readonly attributes: readonly FunctionAttribute[];
        readonly name: Id;
        readonly parameters: parameterList<Parameter>;
        readonly returnType: ascription | undefined;
    }>;
    type Constant = $.Located<{
        readonly $: "Constant";
        readonly attributes: readonly ConstantAttribute[];
        readonly name: Id;
        readonly type: ascription;
        readonly body: ConstantDefinition | ConstantDeclaration;
    }>;
    type StructDecl = $.Located<{
        readonly $: "StructDecl";
        readonly name: TypeId;
        readonly fields: structFields;
    }>;
    type MessageDecl = $.Located<{
        readonly $: "MessageDecl";
        readonly opcode: expression | undefined;
        readonly name: TypeId;
        readonly fields: structFields;
    }>;
    type Contract = $.Located<{
        readonly $: "Contract";
        readonly attributes: readonly ContractAttribute[];
        readonly name: Id;
        readonly traits: inheritedTraits | undefined;
        readonly declarations: readonly contractItemDecl[];
    }>;
    type Trait = $.Located<{
        readonly $: "Trait";
        readonly attributes: readonly ContractAttribute[];
        readonly name: Id;
        readonly traits: inheritedTraits | undefined;
        readonly declarations: readonly traitItemDecl[];
    }>;
    type moduleItem = PrimitiveTypeDecl | $Function | AsmFunction | NativeFunctionDecl | Constant | StructDecl | MessageDecl | Contract | Trait;
    type ContractInit = $.Located<{
        readonly $: "ContractInit";
        readonly parameters: parameterList<Parameter>;
        readonly body: statements;
    }>;
    type Receiver = $.Located<{
        readonly $: "Receiver";
        readonly type: ReceiverType;
        readonly param: receiverParam;
        readonly body: statements;
    }>;
    type FieldDecl = $.Located<{
        readonly $: "FieldDecl";
        readonly name: Id;
        readonly type: ascription;
        readonly expression: expression | undefined;
    }>;
    type semicolon = ";" | "}";
    type storageVar = FieldDecl;
    type contractItemDecl = ContractInit | Receiver | $Function | Constant | storageVar;
    type traitItemDecl = Receiver | $Function | Constant | storageVar;
    type FunctionDefinition = $.Located<{
        readonly $: "FunctionDefinition";
        readonly body: statements;
    }>;
    type FunctionDeclaration = $.Located<{
        readonly $: "FunctionDeclaration";
    }>;
    type Id = $.Located<{
        readonly $: "Id";
        readonly name: string;
    }>;
    type IntegerLiteralDec = $.Located<{
        readonly $: "IntegerLiteralDec";
        readonly digits: underscored<digit>;
    }>;
    type shuffle = {
        readonly ids: readonly Id[];
        readonly to: readonly IntegerLiteralDec[] | undefined;
    };
    type ConstantAttribute = $.Located<{
        readonly $: "ConstantAttribute";
        readonly name: keyword<"virtual"> | keyword<"override"> | keyword<"abstract">;
    }>;
    type ConstantDefinition = $.Located<{
        readonly $: "ConstantDefinition";
        readonly expression: expression;
    }>;
    type ConstantDeclaration = $.Located<{
        readonly $: "ConstantDeclaration";
    }>;
    type inter<A, B> = {
        readonly head: A;
        readonly tail: readonly {
            readonly op: B;
            readonly right: A;
        }[];
    };
    type structFields = inter<FieldDecl, ";"> | undefined;
    type keyword<T> = T;
    type commaList<T> = inter<T, ",">;
    type inheritedTraits = commaList<Id>;
    type ContractAttribute = $.Located<{
        readonly $: "ContractAttribute";
        readonly name: StringLiteral;
    }>;
    type FunctionAttribute = $.Located<{
        readonly $: "FunctionAttribute";
        readonly name: GetAttribute | keyword<"mutates"> | keyword<"extends"> | keyword<"virtual"> | keyword<"override"> | keyword<"inline"> | keyword<"abstract">;
    }>;
    type GetAttribute = $.Located<{
        readonly $: "GetAttribute";
        readonly methodId: expression | undefined;
    }>;
    type ReceiverType = $.Located<{
        readonly $: "ReceiverType";
        readonly name: "bounced" | keyword<"receive"> | keyword<"external">;
    }>;
    type Parameter = $.Located<{
        readonly $: "Parameter";
        readonly name: Id;
        readonly type: ascription;
    }>;
    type StringLiteral = $.Located<{
        readonly $: "StringLiteral";
        readonly value: string;
    }>;
    type receiverParam = Parameter | StringLiteral | undefined;
    type assembly = string;
    type multiLineComment = string;
    type singleLineComment = string;
    type comment = multiLineComment | singleLineComment;
    type assemblyItem = {} | comment | {} | readonly {}[];
    type assemblySequence = readonly assemblyItem[];
    type TypeAs = $.Located<{
        readonly $: "TypeAs";
        readonly type: TypeOptional;
        readonly as: readonly Id[];
    }>;
    type $type = TypeAs;
    type ascription = $type;
    type TypeOptional = $.Located<{
        readonly $: "TypeOptional";
        readonly type: typePrimary;
        readonly optionals: readonly "?"[];
    }>;
    type TypeGeneric = $.Located<{
        readonly $: "TypeGeneric";
        readonly name: MapKeyword | Bounced | TypeId;
        readonly args: commaList<$type>;
    }>;
    type TypeRegular = $.Located<{
        readonly $: "TypeRegular";
        readonly child: TypeId;
    }>;
    type typePrimary = TypeGeneric | TypeRegular;
    type MapKeyword = $.Located<{
        readonly $: "MapKeyword";
    }>;
    type Bounced = $.Located<{
        readonly $: "Bounced";
    }>;
    type TypeId = $.Located<{
        readonly $: "TypeId";
        readonly name: string;
    }>;
    type StatementLet = $.Located<{
        readonly $: "StatementLet";
        readonly name: Id;
        readonly type: ascription | undefined;
        readonly init: expression;
    }>;
    type StatementDestruct = $.Located<{
        readonly $: "StatementDestruct";
        readonly type: TypeId;
        readonly fields: inter<destructItem, ",">;
        readonly rest: optionalRest;
        readonly init: expression;
    }>;
    type StatementBlock = $.Located<{
        readonly $: "StatementBlock";
        readonly body: statements;
    }>;
    type StatementReturn = $.Located<{
        readonly $: "StatementReturn";
        readonly expression: expression | undefined;
    }>;
    type StatementCondition = $.Located<{
        readonly $: "StatementCondition";
        readonly condition: expression;
        readonly trueBranch: statements;
        readonly falseBranch: FalseBranch | StatementCondition | undefined;
    }>;
    type StatementWhile = $.Located<{
        readonly $: "StatementWhile";
        readonly condition: parens;
        readonly body: statements;
    }>;
    type StatementRepeat = $.Located<{
        readonly $: "StatementRepeat";
        readonly condition: parens;
        readonly body: statements;
    }>;
    type StatementUntil = $.Located<{
        readonly $: "StatementUntil";
        readonly body: statements;
        readonly condition: parens;
    }>;
    type StatementTry = $.Located<{
        readonly $: "StatementTry";
        readonly body: statements;
        readonly handler: {
            readonly name: Id;
            readonly body: statements;
        } | undefined;
    }>;
    type StatementForEach = $.Located<{
        readonly $: "StatementForEach";
        readonly key: Id;
        readonly value: Id;
        readonly expression: expression;
        readonly body: statements;
    }>;
    type StatementExpression = $.Located<{
        readonly $: "StatementExpression";
        readonly expression: expression;
    }>;
    type StatementAssign = $.Located<{
        readonly $: "StatementAssign";
        readonly left: expression;
        readonly operator: augmentedOp | undefined;
        readonly right: expression;
    }>;
    type statement = StatementLet | StatementDestruct | StatementBlock | StatementReturn | StatementCondition | StatementWhile | StatementRepeat | StatementUntil | StatementTry | StatementForEach | StatementExpression | StatementAssign;
    type statements = readonly statement[];
    type augmentedOp = "||" | "&&" | ">>" | "<<" | "-" | "+" | "*" | "/" | "%" | "|" | "&" | "^";
    type FalseBranch = $.Located<{
        readonly $: "FalseBranch";
        readonly body: statements;
    }>;
    type RegularField = $.Located<{
        readonly $: "RegularField";
        readonly fieldName: Id;
        readonly varName: Id;
    }>;
    type PunnedField = $.Located<{
        readonly $: "PunnedField";
        readonly name: Id;
    }>;
    type destructItem = RegularField | PunnedField;
    type RestArgument = $.Located<{
        readonly $: "RestArgument";
    }>;
    type NoRestArgument = $.Located<{
        readonly $: "NoRestArgument";
    }>;
    type optionalRest = RestArgument | NoRestArgument;
    type Conditional = $.Located<{
        readonly $: "Conditional";
        readonly head: or;
        readonly tail: {
            readonly thenBranch: or;
            readonly elseBranch: Conditional;
        } | undefined;
    }>;
    type expression = Conditional;
    type Binary<T, U> = $.Located<{
        readonly $: "Binary";
        readonly exprs: inter<T, Operator<U>>;
    }>;
    type Unary = $.Located<{
        readonly $: "Unary";
        readonly prefixes: readonly Operator<"-" | "+" | "!" | "~">[];
        readonly expression: Suffix;
    }>;
    type mul = Binary<Unary, "*" | "/" | "%">;
    type add = Binary<mul, "+" | "-">;
    type bitwiseShift = Binary<add, "<<" | ">>">;
    type compare = Binary<bitwiseShift, "<=" | "<" | ">=" | ">">;
    type equality = Binary<compare, "!=" | "==">;
    type bitwiseAnd = Binary<equality, "&">;
    type bitwiseXor = Binary<bitwiseAnd, "^">;
    type bitwiseOr = Binary<bitwiseXor, "|">;
    type and = Binary<bitwiseOr, "&&">;
    type or = Binary<and, "||">;
    type Suffix = $.Located<{
        readonly $: "Suffix";
        readonly expression: primary;
        readonly suffixes: readonly suffix[];
    }>;
    type Operator<U> = $.Located<{
        readonly $: "Operator";
        readonly name: U;
    }>;
    type SuffixUnboxNotNull = $.Located<{
        readonly $: "SuffixUnboxNotNull";
    }>;
    type SuffixCall = $.Located<{
        readonly $: "SuffixCall";
        readonly params: parameterList<expression>;
    }>;
    type SuffixFieldAccess = $.Located<{
        readonly $: "SuffixFieldAccess";
        readonly name: Id;
    }>;
    type suffix = SuffixUnboxNotNull | SuffixCall | SuffixFieldAccess;
    type Parens = $.Located<{
        readonly $: "Parens";
        readonly child: parens;
    }>;
    type StructInstance = $.Located<{
        readonly $: "StructInstance";
        readonly type: TypeId;
        readonly fields: commaList<StructFieldInitializer> | undefined;
    }>;
    type IntegerLiteral = $.Located<{
        readonly $: "IntegerLiteral";
        readonly value: IntegerLiteralHex | IntegerLiteralBin | IntegerLiteralOct | IntegerLiteralDec;
    }>;
    type BoolLiteral = $.Located<{
        readonly $: "BoolLiteral";
        readonly value: "true" | "false";
    }>;
    type InitOf = $.Located<{
        readonly $: "InitOf";
        readonly name: Id;
        readonly params: parameterList<expression>;
    }>;
    type CodeOf = $.Located<{
        readonly $: "CodeOf";
        readonly name: Id;
    }>;
    type Null = $.Located<{
        readonly $: "Null";
    }>;
    type primary = Parens | StructInstance | IntegerLiteral | BoolLiteral | InitOf | CodeOf | Null | StringLiteral | Id;
    type parens = expression;
    type StructFieldInitializer = $.Located<{
        readonly $: "StructFieldInitializer";
        readonly name: Id;
        readonly init: expression | undefined;
    }>;
    type parameterList<T> = commaList<T> | undefined;
    type IntegerLiteralHex = $.Located<{
        readonly $: "IntegerLiteralHex";
        readonly digits: underscored<hexDigit>;
    }>;
    type IntegerLiteralBin = $.Located<{
        readonly $: "IntegerLiteralBin";
        readonly digits: underscored<"0" | "1">;
    }>;
    type IntegerLiteralOct = $.Located<{
        readonly $: "IntegerLiteralOct";
        readonly digits: underscored<string>;
    }>;
    type underscored<T> = string;
    type digit = string;
    type idPart = string | string | string | "_";
    type FuncId = $.Located<{
        readonly $: "FuncId";
        readonly accessor: "." | "~" | undefined;
        readonly id: string;
    }>;
    type hexDigit = string | string | string;
    type escapeChar = "\\" | "\"" | "n" | "r" | "t" | "v" | "b" | "f" | string | string | string;
    type reservedWord = keyword<"extend" | "public" | "fun" | "let" | "return" | "receive" | "native" | "primitive" | "null" | "if" | "else" | "while" | "repeat" | "do" | "until" | "try" | "catch" | "foreach" | "as" | "map" | "mutates" | "extends" | "external" | "import" | "with" | "trait" | "initOf" | "override" | "abstract" | "virtual" | "inline" | "const">;
    type space = " " | "\t" | "\r" | "\n" | comment;
    type JustImports = $.Located<{
        readonly $: "JustImports";
        readonly imports: readonly Import[];
    }>;
}
export declare const Module: $.Parser<$ast.Module>;
export declare const Import: $.Parser<$ast.Import>;
export declare const PrimitiveTypeDecl: $.Parser<$ast.PrimitiveTypeDecl>;
export declare const $Function: $.Parser<$ast.$Function>;
export declare const AsmFunction: $.Parser<$ast.AsmFunction>;
export declare const NativeFunctionDecl: $.Parser<$ast.NativeFunctionDecl>;
export declare const Constant: $.Parser<$ast.Constant>;
export declare const StructDecl: $.Parser<$ast.StructDecl>;
export declare const MessageDecl: $.Parser<$ast.MessageDecl>;
export declare const Contract: $.Parser<$ast.Contract>;
export declare const Trait: $.Parser<$ast.Trait>;
export declare const moduleItem: $.Parser<$ast.moduleItem>;
export declare const ContractInit: $.Parser<$ast.ContractInit>;
export declare const Receiver: $.Parser<$ast.Receiver>;
export declare const FieldDecl: $.Parser<$ast.FieldDecl>;
export declare const semicolon: $.Parser<$ast.semicolon>;
export declare const storageVar: $.Parser<$ast.storageVar>;
export declare const contractItemDecl: $.Parser<$ast.contractItemDecl>;
export declare const traitItemDecl: $.Parser<$ast.traitItemDecl>;
export declare const FunctionDefinition: $.Parser<$ast.FunctionDefinition>;
export declare const FunctionDeclaration: $.Parser<$ast.FunctionDeclaration>;
export declare const Id: $.Parser<$ast.Id>;
export declare const IntegerLiteralDec: $.Parser<$ast.IntegerLiteralDec>;
export declare const shuffle: $.Parser<$ast.shuffle>;
export declare const ConstantAttribute: $.Parser<$ast.ConstantAttribute>;
export declare const ConstantDefinition: $.Parser<$ast.ConstantDefinition>;
export declare const ConstantDeclaration: $.Parser<$ast.ConstantDeclaration>;
export declare const inter: <A, B>(A: $.Parser<A>, B: $.Parser<B>) => $.Parser<$ast.inter<A, B>>;
export declare const structFields: $.Parser<$ast.structFields>;
export declare const keyword: <T>(T: $.Parser<T>) => $.Parser<$ast.keyword<T>>;
export declare const commaList: <T>(T: $.Parser<T>) => $.Parser<$ast.commaList<T>>;
export declare const inheritedTraits: $.Parser<$ast.inheritedTraits>;
export declare const ContractAttribute: $.Parser<$ast.ContractAttribute>;
export declare const FunctionAttribute: $.Parser<$ast.FunctionAttribute>;
export declare const GetAttribute: $.Parser<$ast.GetAttribute>;
export declare const ReceiverType: $.Parser<$ast.ReceiverType>;
export declare const Parameter: $.Parser<$ast.Parameter>;
export declare const StringLiteral: $.Parser<$ast.StringLiteral>;
export declare const receiverParam: $.Parser<$ast.receiverParam>;
export declare const assembly: $.Parser<$ast.assembly>;
export declare const multiLineComment: $.Parser<$ast.multiLineComment>;
export declare const singleLineComment: $.Parser<$ast.singleLineComment>;
export declare const comment: $.Parser<$ast.comment>;
export declare const assemblyItem: $.Parser<$ast.assemblyItem>;
export declare const assemblySequence: $.Parser<$ast.assemblySequence>;
export declare const TypeAs: $.Parser<$ast.TypeAs>;
export declare const $type: $.Parser<$ast.$type>;
export declare const ascription: $.Parser<$ast.ascription>;
export declare const TypeOptional: $.Parser<$ast.TypeOptional>;
export declare const TypeGeneric: $.Parser<$ast.TypeGeneric>;
export declare const TypeRegular: $.Parser<$ast.TypeRegular>;
export declare const typePrimary: $.Parser<$ast.typePrimary>;
export declare const MapKeyword: $.Parser<$ast.MapKeyword>;
export declare const Bounced: $.Parser<$ast.Bounced>;
export declare const TypeId: $.Parser<$ast.TypeId>;
export declare const StatementLet: $.Parser<$ast.StatementLet>;
export declare const StatementDestruct: $.Parser<$ast.StatementDestruct>;
export declare const StatementBlock: $.Parser<$ast.StatementBlock>;
export declare const StatementReturn: $.Parser<$ast.StatementReturn>;
export declare const StatementCondition: $.Parser<$ast.StatementCondition>;
export declare const StatementWhile: $.Parser<$ast.StatementWhile>;
export declare const StatementRepeat: $.Parser<$ast.StatementRepeat>;
export declare const StatementUntil: $.Parser<$ast.StatementUntil>;
export declare const StatementTry: $.Parser<$ast.StatementTry>;
export declare const StatementForEach: $.Parser<$ast.StatementForEach>;
export declare const StatementExpression: $.Parser<$ast.StatementExpression>;
export declare const StatementAssign: $.Parser<$ast.StatementAssign>;
export declare const statement: $.Parser<$ast.statement>;
export declare const statements: $.Parser<$ast.statements>;
export declare const augmentedOp: $.Parser<$ast.augmentedOp>;
export declare const FalseBranch: $.Parser<$ast.FalseBranch>;
export declare const RegularField: $.Parser<$ast.RegularField>;
export declare const PunnedField: $.Parser<$ast.PunnedField>;
export declare const destructItem: $.Parser<$ast.destructItem>;
export declare const RestArgument: $.Parser<$ast.RestArgument>;
export declare const NoRestArgument: $.Parser<$ast.NoRestArgument>;
export declare const optionalRest: $.Parser<$ast.optionalRest>;
export declare const Conditional: $.Parser<$ast.Conditional>;
export declare const expression: $.Parser<$ast.expression>;
export declare const Binary: <T, U>(T: $.Parser<T>, U: $.Parser<U>) => $.Parser<$ast.Binary<T, U>>;
export declare const Unary: $.Parser<$ast.Unary>;
export declare const mul: $.Parser<$ast.mul>;
export declare const add: $.Parser<$ast.add>;
export declare const bitwiseShift: $.Parser<$ast.bitwiseShift>;
export declare const compare: $.Parser<$ast.compare>;
export declare const equality: $.Parser<$ast.equality>;
export declare const bitwiseAnd: $.Parser<$ast.bitwiseAnd>;
export declare const bitwiseXor: $.Parser<$ast.bitwiseXor>;
export declare const bitwiseOr: $.Parser<$ast.bitwiseOr>;
export declare const and: $.Parser<$ast.and>;
export declare const or: $.Parser<$ast.or>;
export declare const Suffix: $.Parser<$ast.Suffix>;
export declare const Operator: <U>(U: $.Parser<U>) => $.Parser<$ast.Operator<U>>;
export declare const SuffixUnboxNotNull: $.Parser<$ast.SuffixUnboxNotNull>;
export declare const SuffixCall: $.Parser<$ast.SuffixCall>;
export declare const SuffixFieldAccess: $.Parser<$ast.SuffixFieldAccess>;
export declare const suffix: $.Parser<$ast.suffix>;
export declare const Parens: $.Parser<$ast.Parens>;
export declare const StructInstance: $.Parser<$ast.StructInstance>;
export declare const IntegerLiteral: $.Parser<$ast.IntegerLiteral>;
export declare const BoolLiteral: $.Parser<$ast.BoolLiteral>;
export declare const InitOf: $.Parser<$ast.InitOf>;
export declare const CodeOf: $.Parser<$ast.CodeOf>;
export declare const Null: $.Parser<$ast.Null>;
export declare const primary: $.Parser<$ast.primary>;
export declare const parens: $.Parser<$ast.parens>;
export declare const StructFieldInitializer: $.Parser<$ast.StructFieldInitializer>;
export declare const parameterList: <T>(T: $.Parser<T>) => $.Parser<$ast.parameterList<T>>;
export declare const IntegerLiteralHex: $.Parser<$ast.IntegerLiteralHex>;
export declare const IntegerLiteralBin: $.Parser<$ast.IntegerLiteralBin>;
export declare const IntegerLiteralOct: $.Parser<$ast.IntegerLiteralOct>;
export declare const underscored: <T>(T: $.Parser<T>) => $.Parser<$ast.underscored<T>>;
export declare const digit: $.Parser<$ast.digit>;
export declare const idPart: $.Parser<$ast.idPart>;
export declare const FuncId: $.Parser<$ast.FuncId>;
export declare const hexDigit: $.Parser<$ast.hexDigit>;
export declare const escapeChar: $.Parser<$ast.escapeChar>;
export declare const reservedWord: $.Parser<$ast.reservedWord>;
export declare const space: $.Parser<$ast.space>;
export declare const JustImports: $.Parser<$ast.JustImports>;

# Tact compilation report
Contract: ComputePhaseErrorsTester
BoC Size: 1572 bytes

## Structures (Structs and Messages)
Total structures: 11

### DataSize
TL-B: `_ cells:int257 bits:int257 refs:int257 = DataSize`
Signature: `DataSize{cells:int257,bits:int257,refs:int257}`

### StateInit
TL-B: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

### Context
TL-B: `_ bounceable:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounceable:bool,sender:address,value:int257,raw:^slice}`

### SendParameters
TL-B: `_ mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell value:int257 to:address bounce:bool = SendParameters`
Signature: `SendParameters{mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell,value:int257,to:address,bounce:bool}`

### MessageParameters
TL-B: `_ mode:int257 body:Maybe ^cell value:int257 to:address bounce:bool = MessageParameters`
Signature: `MessageParameters{mode:int257,body:Maybe ^cell,value:int257,to:address,bounce:bool}`

### DeployParameters
TL-B: `_ mode:int257 body:Maybe ^cell value:int257 bounce:bool init:StateInit{code:^cell,data:^cell} = DeployParameters`
Signature: `DeployParameters{mode:int257,body:Maybe ^cell,value:int257,bounce:bool,init:StateInit{code:^cell,data:^cell}}`

### StdAddress
TL-B: `_ workchain:int8 address:uint256 = StdAddress`
Signature: `StdAddress{workchain:int8,address:uint256}`

### VarAddress
TL-B: `_ workchain:int32 address:^slice = VarAddress`
Signature: `VarAddress{workchain:int32,address:^slice}`

### BasechainAddress
TL-B: `_ hash:Maybe int257 = BasechainAddress`
Signature: `BasechainAddress{hash:Maybe int257}`

### ComputePhaseErrorsTester$Data
TL-B: `_ tmpI:int257 tmpC:^cell = ComputePhaseErrorsTester`
Signature: `ComputePhaseErrorsTester{tmpI:int257,tmpC:^cell}`

### ExitCode4
TL-B: `exit_code4#00000004 val0:uint2 val1:uint2 = ExitCode4`
Signature: `ExitCode4{val0:uint2,val1:uint2}`

## Get methods
Total get methods: 0

## Exit codes
* 2: Stack underflow
* 3: Stack overflow
* 4: Integer overflow
* 5: Integer out of expected range
* 6: Invalid opcode
* 7: Type check error
* 8: Cell overflow
* 9: Cell underflow
* 10: Dictionary error
* 11: 'Unknown' error
* 12: Fatal error
* 13: Out of gas error
* 14: Virtualization error
* 32: Action list is invalid
* 33: Action list is too long
* 34: Action is invalid or not supported
* 35: Invalid source address in outbound message
* 36: Invalid destination address in outbound message
* 37: Not enough Toncoin
* 38: Not enough extra currencies
* 39: Outbound message does not fit into a cell after rewriting
* 40: Cannot process a message
* 41: Library reference is null
* 42: Library change action error
* 43: Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree
* 50: Account state size exceeded limits
* 128: Null reference exception
* 129: Invalid serialization prefix
* 130: Invalid incoming message
* 131: Constraints error
* 132: Access denied
* 133: Contract stopped
* 134: Invalid argument
* 135: Code of a contract was not found
* 136: Invalid standard address
* 2696: Negation didn't cause an integer overflow
* 2983: 1024 bits didn't cause the cell overflow
* 4287: Loading 1 ref from an empty Slice didn't cause the cell underflow
* 13102: Subtraction didn't cause an integer overflow
* 13733: Division didn't cause an integer overflow
* 16776: Loading 1 bit from an empty Slice didn't cause the cell underflow
* 19158: 5 refs didn't cause the cell overflow
* 27951: Division by zero didn't cause an integer overflow
* 34908: Modulo by zero didn't cause an integer overflow
* 43549: Multiplication didn't cause an integer overflow
* 54296: Addition didn't cause an integer overflow

## Trait inheritance diagram

```mermaid
graph TD
ComputePhaseErrorsTester
ComputePhaseErrorsTester --> BaseTrait
```

## Contract dependency diagram

```mermaid
graph TD
ComputePhaseErrorsTester
```
# Tact compilation report

Contract: MapTraverseTestContract
BoC Size: 5028 bytes

## Structures (Structs and Messages)

Total structures: 10

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

### DeployParameters

TL-B: `_ mode:int257 body:Maybe ^cell value:int257 bounce:bool init:StateInit{code:^cell,data:^cell} = DeployParameters`
Signature: `DeployParameters{mode:int257,body:Maybe ^cell,value:int257,bounce:bool,init:StateInit{code:^cell,data:^cell}}`

### StdAddress

TL-B: `_ workchain:int8 address:uint256 = StdAddress`
Signature: `StdAddress{workchain:int8,address:uint256}`

### VarAddress

TL-B: `_ workchain:int32 address:^slice = VarAddress`
Signature: `VarAddress{workchain:int32,address:^slice}`

### MyStruct

TL-B: `_ a:int257 b:bool = MyStruct`
Signature: `MyStruct{a:int257,b:bool}`

### MyStructWithMap

TL-B: `_ m:dict<int, int> = MyStructWithMap`
Signature: `MyStructWithMap{m:dict<int, int>}`

### MapTraverseTestContract$Data

TL-B: `null`
Signature: `null`

## Get methods

Total get methods: 21

## test_int_int

No arguments

## test_int_coins

No arguments

## test_int_varint16

No arguments

## test_int_bool

No arguments

## test_int_cell

No arguments

## test_int_address

No arguments

## test_int_struct

No arguments

## test_address_int

No arguments

## test_address_coins

No arguments

## test_address_varint16

No arguments

## test_address_bool

No arguments

## test_address_cell

No arguments

## test_address_address

No arguments

## test_address_struct

No arguments

## test_empty_map

No arguments

## test_null

No arguments

## test_map_modification_during_traversal1

No arguments

## test_map_modification_during_traversal2

No arguments

## test_map_size

No arguments

## test_map_as_field

No arguments

## test_map_as_struct_field

No arguments

## Exit codes

- 2: Stack underflow
- 3: Stack overflow
- 4: Integer overflow
- 5: Integer out of expected range
- 6: Invalid opcode
- 7: Type check error
- 8: Cell overflow
- 9: Cell underflow
- 10: Dictionary error
- 11: 'Unknown' error
- 12: Fatal error
- 13: Out of gas error
- 14: Virtualization error
- 32: Action list is invalid
- 33: Action list is too long
- 34: Action is invalid or not supported
- 35: Invalid source address in outbound message
- 36: Invalid destination address in outbound message
- 37: Not enough Toncoin
- 38: Not enough extra currencies
- 39: Outbound message does not fit into a cell after rewriting
- 40: Cannot process a message
- 41: Library reference is null
- 42: Library change action error
- 43: Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree
- 50: Account state size exceeded limits
- 128: Null reference exception
- 129: Invalid serialization prefix
- 130: Invalid incoming message
- 131: Constraints error
- 132: Access denied
- 133: Contract stopped
- 134: Invalid argument
- 135: Code of a contract was not found
- 136: Invalid standard address

## Trait inheritance diagram

```mermaid
graph TD
MapTraverseTestContract
MapTraverseTestContract --> BaseTrait
```

## Contract dependency diagram

```mermaid
graph TD
MapTraverseTestContract
```

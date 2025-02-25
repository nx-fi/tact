# Tact compilation report

Contract: SampleContract
BoC Size: 1435 bytes

## Structures (Structs and Messages)

Total structures: 16

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

### EntryFirst

TL-B: `entry_first#a45b74a8 amountToAdd:uint32 toAddress:address = EntryFirst`
Signature: `EntryFirst{amountToAdd:uint32,toAddress:address}`

### EntrySecond

TL-B: `entry_second#ff40dc10 amountToAdd:uint32 toAddress:address = EntrySecond`
Signature: `EntrySecond{amountToAdd:uint32,toAddress:address}`

### First

TL-B: `first#bec08f38 amount:uint32 myCoins:coins myBool3:bool anAddress:address = First`
Signature: `First{amount:uint32,myCoins:coins,myBool3:bool,anAddress:address}`

### Second

TL-B: `second#17571ec8 amount_bigger:uint64 myBool:bool thisDoesNotFit:uint256 myAddress:address myBool2:bool myStruct:MyStruct{amount:int257} myStruct2:MyStruct{amount:int257} = Second`
Signature: `Second{amount_bigger:uint64,myBool:bool,thisDoesNotFit:uint256,myAddress:address,myBool2:bool,myStruct:MyStruct{amount:int257},myStruct2:MyStruct{amount:int257}}`

### Large

TL-B: `large#24dd4543 address:address value:coins = Large`
Signature: `Large{address:address,value:coins}`

### SmallBounce

TL-B: `small_bounce#c0dee6d6 amount:uint32 myBool3:bool = SmallBounce`
Signature: `SmallBounce{amount:uint32,myBool3:bool}`

### MyStruct

TL-B: `_ amount:int257 = MyStruct`
Signature: `MyStruct{amount:int257}`

### SampleContract$Data

TL-B: `null`
Signature: `null`

### SampleContract2$Data

TL-B: `null`
Signature: `null`

## Get methods

Total get methods: 1

## amount

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
SampleContract
SampleContract --> BaseTrait
```

## Contract dependency diagram

```mermaid
graph TD
SampleContract
```

# Tact compilation report

Contract: MultisigContract
BoC Size: 464 bytes

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

### DeployParameters

TL-B: `_ mode:int257 body:Maybe ^cell value:int257 bounce:bool init:StateInit{code:^cell,data:^cell} = DeployParameters`
Signature: `DeployParameters{mode:int257,body:Maybe ^cell,value:int257,bounce:bool,init:StateInit{code:^cell,data:^cell}}`

### StdAddress

TL-B: `_ workchain:int8 address:uint256 = StdAddress`
Signature: `StdAddress{workchain:int8,address:uint256}`

### VarAddress

TL-B: `_ workchain:int32 address:^slice = VarAddress`
Signature: `VarAddress{workchain:int32,address:^slice}`

### Operation

TL-B: `_ seqno:uint32 amount:coins target:address = Operation`
Signature: `Operation{seqno:uint32,amount:coins,target:address}`

### Execute

TL-B: `execute#1f0d5570 operation:Operation{seqno:uint32,amount:coins,target:address} signature1:^slice signature2:^slice signature3:^slice = Execute`
Signature: `Execute{operation:Operation{seqno:uint32,amount:coins,target:address},signature1:^slice,signature2:^slice,signature3:^slice}`

### Executed

TL-B: `executed#9e12cfb8 seqno:uint32 = Executed`
Signature: `Executed{seqno:uint32}`

### MultisigContract$Data

TL-B: `null`
Signature: `null`

## Get methods

Total get methods: 4

## key1

No arguments

## key2

No arguments

## key3

No arguments

## seqno

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
- 17654: Invalid seqno
- 48401: Invalid signature

## Trait inheritance diagram

```mermaid
graph TD
MultisigContract
MultisigContract --> BaseTrait
```

## Contract dependency diagram

```mermaid
graph TD
MultisigContract
```

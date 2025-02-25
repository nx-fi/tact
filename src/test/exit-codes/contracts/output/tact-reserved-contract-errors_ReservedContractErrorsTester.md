# Tact compilation report
Contract: ReservedContractErrorsTester
BoC Size: 3557 bytes

## Structures (Structs and Messages)
Total structures: 12

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

### ChangeOwner
TL-B: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

### ChangeOwnerOk
TL-B: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

### DNSResolveResult
TL-B: `_ prefix:int257 record:Maybe ^cell = DNSResolveResult`
Signature: `DNSResolveResult{prefix:int257,record:Maybe ^cell}`

### SpanishInquisition
TL-B: `spanish_inquisition#000005c6  = SpanishInquisition`
Signature: `SpanishInquisition{}`

### ReservedContractErrorsTester$Data
TL-B: `null`
Signature: `null`

## Get methods
Total get methods: 1

## owner
No arguments

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
* 20158: dnsInternalNormalize() didn't error on Slice with refs
* 24161: Invalid DNS name
* 25189: Slice.fromBase64() didn't error on invalid Base64
* 28760: Slice.asAddress() didn't error on invalid tag prefix for a masterchain address
* 37468: Slice.asAddress() didn't error on invalid account ID size for a basechain address
* 41357: Slice.asAddress() didn't error on invalid tag prefix for a basechain address
* 43850: Int.toFloatString() didn't error on digits 78
* 46964: String.fromBase64() didn't error on invalid Base64
* 49334: Slice.asAddress() didn't error on invalid account ID size for a masterchain address
* 53355: Slice.asAddress() didn't error on invalid account ID size for a workchain address
* 60204: Int.toFloatString() didn't error on digits -1
* 61605: Slice.asAddress() didn't error on invalid tag prefix for a workchain address

## Trait inheritance diagram

```mermaid
graph TD
ReservedContractErrorsTester
ReservedContractErrorsTester --> BaseTrait
ReservedContractErrorsTester --> Ownable
Ownable --> BaseTrait
```

## Contract dependency diagram

```mermaid
graph TD
ReservedContractErrorsTester
```
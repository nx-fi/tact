"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const receiver_precedence_ReceiverTester_1 = require("./contracts/output/receiver-precedence_ReceiverTester");
const receiver_precedence_Calculator_1 = require("./contracts/output/receiver-precedence_Calculator");
require("@ton/test-utils");
const receiver_precedence_AllReceiverTester_1 = require("./contracts/output/receiver-precedence_AllReceiverTester");
const receiver_precedence_BinaryAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_BinaryAndSliceReceiverTester");
const receiver_precedence_BinaryReceiverTester_1 = require("./contracts/output/receiver-precedence_BinaryReceiverTester");
const receiver_precedence_CommentAndBinaryAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_CommentAndBinaryAndSliceReceiverTester");
const receiver_precedence_CommentAndBinaryReceiverTester_1 = require("./contracts/output/receiver-precedence_CommentAndBinaryReceiverTester");
const receiver_precedence_CommentAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_CommentAndSliceReceiverTester");
const receiver_precedence_CommentAndStringAndBinaryAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_CommentAndStringAndBinaryAndSliceReceiverTester");
const receiver_precedence_CommentAndStringAndBinaryReceiverTester_1 = require("./contracts/output/receiver-precedence_CommentAndStringAndBinaryReceiverTester");
const receiver_precedence_CommentAndStringAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_CommentAndStringAndSliceReceiverTester");
const receiver_precedence_CommentAndStringReceiverTester_1 = require("./contracts/output/receiver-precedence_CommentAndStringReceiverTester");
const receiver_precedence_CommentReceiverTester_1 = require("./contracts/output/receiver-precedence_CommentReceiverTester");
const receiver_precedence_EmptyAndBinaryAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndBinaryAndSliceReceiverTester");
const receiver_precedence_EmptyAndBinaryReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndBinaryReceiverTester");
const receiver_precedence_EmptyAndCommentAndBinaryAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndCommentAndBinaryAndSliceReceiverTester");
const receiver_precedence_EmptyAndCommentAndBinaryReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndCommentAndBinaryReceiverTester");
const receiver_precedence_EmptyAndCommentAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndCommentAndSliceReceiverTester");
const receiver_precedence_EmptyAndCommentAndStringAndBinaryReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndCommentAndStringAndBinaryReceiverTester");
const receiver_precedence_EmptyAndCommentAndStringAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndCommentAndStringAndSliceReceiverTester");
const receiver_precedence_EmptyAndCommentAndStringReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndCommentAndStringReceiverTester");
const receiver_precedence_EmptyAndCommentReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndCommentReceiverTester");
const receiver_precedence_EmptyAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndSliceReceiverTester");
const receiver_precedence_EmptyAndStringAndBinaryAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndStringAndBinaryAndSliceReceiverTester");
const receiver_precedence_EmptyAndStringAndBinaryReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndStringAndBinaryReceiverTester");
const receiver_precedence_EmptyAndStringAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndStringAndSliceReceiverTester");
const receiver_precedence_EmptyAndStringReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyAndStringReceiverTester");
const receiver_precedence_EmptyReceiverTester_1 = require("./contracts/output/receiver-precedence_EmptyReceiverTester");
const receiver_precedence_NoReceiverTester_1 = require("./contracts/output/receiver-precedence_NoReceiverTester");
const receiver_precedence_SliceReceiverTester_1 = require("./contracts/output/receiver-precedence_SliceReceiverTester");
const receiver_precedence_StringAndBinaryAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_StringAndBinaryAndSliceReceiverTester");
const receiver_precedence_StringAndBinaryReceiverTester_1 = require("./contracts/output/receiver-precedence_StringAndBinaryReceiverTester");
const receiver_precedence_StringAndSliceReceiverTester_1 = require("./contracts/output/receiver-precedence_StringAndSliceReceiverTester");
const receiver_precedence_StringReceiverTester_1 = require("./contracts/output/receiver-precedence_StringReceiverTester");
const receiver_precedence_AllBouncedTester_1 = require("./contracts/output/receiver-precedence_AllBouncedTester");
const receiver_precedence_EmptyBouncedTester_1 = require("./contracts/output/receiver-precedence_EmptyBouncedTester");
const receiver_precedence_BinaryBouncedTester_1 = require("./contracts/output/receiver-precedence_BinaryBouncedTester");
const receiver_precedence_SliceBouncedTester_1 = require("./contracts/output/receiver-precedence_SliceBouncedTester");
describe("receivers-precedence", () => {
    let blockchain;
    let treasure;
    let contract;
    let calculator;
    // All combinations of contracts with receivers
    let noReceivers;
    let emptyReceiver;
    let commentReceiver;
    let stringReceiver;
    let binaryReceiver;
    let sliceReceiver;
    let emptyAndCommentReceiver;
    let emptyAndStringReceiver;
    let emptyAndBinaryReceiver;
    let emptyAndSliceReceiver;
    let commentAndStringReceiver;
    let commentAndBinaryReceiver;
    let commentAndSliceReceiver;
    let stringAndBinaryReceiver;
    let stringAndSliceReceiver;
    let binaryAndSliceReceiver;
    let emptyAndCommentAndStringReceiver;
    let emptyAndCommentAndBinaryReceiver;
    let emptyAndCommentAndSliceReceiver;
    let emptyAndStringAndBinaryReceiver;
    let emptyAndStringAndSliceReceiver;
    let emptyAndBinaryAndSliceReceiver;
    let commentAndStringAndBinaryReceiver;
    let commentAndStringAndSliceReceiver;
    let commentAndBinaryAndSliceReceiver;
    let stringAndBinaryAndSliceReceiver;
    let emptyAndCommentAndStringAndBinaryReceiver;
    let emptyAndCommentAndStringAndSliceReceiver;
    let emptyAndCommentAndBinaryAndSliceReceiver;
    let emptyAndStringAndBinaryAndSliceReceiver;
    let commentAndStringAndBinaryAndSliceReceiver;
    let allReceivers;
    let emptyBounced;
    let binaryBounced;
    let sliceBounced;
    let allBounced;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await receiver_precedence_ReceiverTester_1.ReceiverTester.fromInit());
        calculator = blockchain.openContract(await receiver_precedence_Calculator_1.Calculator.fromInit());
        // All receiver contracts
        noReceivers = blockchain.openContract(await receiver_precedence_NoReceiverTester_1.NoReceiverTester.fromInit());
        emptyReceiver = blockchain.openContract(await receiver_precedence_EmptyReceiverTester_1.EmptyReceiverTester.fromInit());
        commentReceiver = blockchain.openContract(await receiver_precedence_CommentReceiverTester_1.CommentReceiverTester.fromInit());
        stringReceiver = blockchain.openContract(await receiver_precedence_StringReceiverTester_1.StringReceiverTester.fromInit());
        binaryReceiver = blockchain.openContract(await receiver_precedence_BinaryReceiverTester_1.BinaryReceiverTester.fromInit());
        sliceReceiver = blockchain.openContract(await receiver_precedence_SliceReceiverTester_1.SliceReceiverTester.fromInit());
        emptyAndCommentReceiver = blockchain.openContract(await receiver_precedence_EmptyAndCommentReceiverTester_1.EmptyAndCommentReceiverTester.fromInit());
        emptyAndStringReceiver = blockchain.openContract(await receiver_precedence_EmptyAndStringReceiverTester_1.EmptyAndStringReceiverTester.fromInit());
        emptyAndBinaryReceiver = blockchain.openContract(await receiver_precedence_EmptyAndBinaryReceiverTester_1.EmptyAndBinaryReceiverTester.fromInit());
        emptyAndSliceReceiver = blockchain.openContract(await receiver_precedence_EmptyAndSliceReceiverTester_1.EmptyAndSliceReceiverTester.fromInit());
        commentAndStringReceiver = blockchain.openContract(await receiver_precedence_CommentAndStringReceiverTester_1.CommentAndStringReceiverTester.fromInit());
        commentAndBinaryReceiver = blockchain.openContract(await receiver_precedence_CommentAndBinaryReceiverTester_1.CommentAndBinaryReceiverTester.fromInit());
        commentAndSliceReceiver = blockchain.openContract(await receiver_precedence_CommentAndSliceReceiverTester_1.CommentAndSliceReceiverTester.fromInit());
        stringAndBinaryReceiver = blockchain.openContract(await receiver_precedence_StringAndBinaryReceiverTester_1.StringAndBinaryReceiverTester.fromInit());
        stringAndSliceReceiver = blockchain.openContract(await receiver_precedence_StringAndSliceReceiverTester_1.StringAndSliceReceiverTester.fromInit());
        binaryAndSliceReceiver = blockchain.openContract(await receiver_precedence_BinaryAndSliceReceiverTester_1.BinaryAndSliceReceiverTester.fromInit());
        emptyAndCommentAndStringReceiver = blockchain.openContract(await receiver_precedence_EmptyAndCommentAndStringReceiverTester_1.EmptyAndCommentAndStringReceiverTester.fromInit());
        emptyAndCommentAndBinaryReceiver = blockchain.openContract(await receiver_precedence_EmptyAndCommentAndBinaryReceiverTester_1.EmptyAndCommentAndBinaryReceiverTester.fromInit());
        emptyAndCommentAndSliceReceiver = blockchain.openContract(await receiver_precedence_EmptyAndCommentAndSliceReceiverTester_1.EmptyAndCommentAndSliceReceiverTester.fromInit());
        emptyAndStringAndBinaryReceiver = blockchain.openContract(await receiver_precedence_EmptyAndStringAndBinaryReceiverTester_1.EmptyAndStringAndBinaryReceiverTester.fromInit());
        emptyAndStringAndSliceReceiver = blockchain.openContract(await receiver_precedence_EmptyAndStringAndSliceReceiverTester_1.EmptyAndStringAndSliceReceiverTester.fromInit());
        emptyAndBinaryAndSliceReceiver = blockchain.openContract(await receiver_precedence_EmptyAndBinaryAndSliceReceiverTester_1.EmptyAndBinaryAndSliceReceiverTester.fromInit());
        commentAndStringAndBinaryReceiver = blockchain.openContract(await receiver_precedence_CommentAndStringAndBinaryReceiverTester_1.CommentAndStringAndBinaryReceiverTester.fromInit());
        commentAndStringAndSliceReceiver = blockchain.openContract(await receiver_precedence_CommentAndStringAndSliceReceiverTester_1.CommentAndStringAndSliceReceiverTester.fromInit());
        commentAndBinaryAndSliceReceiver = blockchain.openContract(await receiver_precedence_CommentAndBinaryAndSliceReceiverTester_1.CommentAndBinaryAndSliceReceiverTester.fromInit());
        stringAndBinaryAndSliceReceiver = blockchain.openContract(await receiver_precedence_StringAndBinaryAndSliceReceiverTester_1.StringAndBinaryAndSliceReceiverTester.fromInit());
        emptyAndCommentAndStringAndBinaryReceiver = blockchain.openContract(await receiver_precedence_EmptyAndCommentAndStringAndBinaryReceiverTester_1.EmptyAndCommentAndStringAndBinaryReceiverTester.fromInit());
        emptyAndCommentAndStringAndSliceReceiver = blockchain.openContract(await receiver_precedence_EmptyAndCommentAndStringAndSliceReceiverTester_1.EmptyAndCommentAndStringAndSliceReceiverTester.fromInit());
        emptyAndCommentAndBinaryAndSliceReceiver = blockchain.openContract(await receiver_precedence_EmptyAndCommentAndBinaryAndSliceReceiverTester_1.EmptyAndCommentAndBinaryAndSliceReceiverTester.fromInit());
        emptyAndStringAndBinaryAndSliceReceiver = blockchain.openContract(await receiver_precedence_EmptyAndStringAndBinaryAndSliceReceiverTester_1.EmptyAndStringAndBinaryAndSliceReceiverTester.fromInit());
        commentAndStringAndBinaryAndSliceReceiver = blockchain.openContract(await receiver_precedence_CommentAndStringAndBinaryAndSliceReceiverTester_1.CommentAndStringAndBinaryAndSliceReceiverTester.fromInit());
        allReceivers = blockchain.openContract(await receiver_precedence_AllReceiverTester_1.AllReceiverTester.fromInit());
        emptyBounced = blockchain.openContract(await receiver_precedence_EmptyBouncedTester_1.EmptyBouncedTester.fromInit());
        binaryBounced = blockchain.openContract(await receiver_precedence_BinaryBouncedTester_1.BinaryBouncedTester.fromInit());
        sliceBounced = blockchain.openContract(await receiver_precedence_SliceBouncedTester_1.SliceBouncedTester.fromInit());
        allBounced = blockchain.openContract(await receiver_precedence_AllBouncedTester_1.AllBouncedTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        const calcDeploy = await calculator.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "deploy");
        expect(calcDeploy.transactions).toHaveTransaction({
            from: treasure.address,
            to: calculator.address,
            success: true,
            deploy: true,
        });
        // Deploy contracts
        await deploy(noReceivers.address, await receiver_precedence_NoReceiverTester_1.NoReceiverTester.init());
        await deploy(emptyReceiver.address, await receiver_precedence_EmptyReceiverTester_1.EmptyReceiverTester.init());
        await deploy(commentReceiver.address, await receiver_precedence_CommentReceiverTester_1.CommentReceiverTester.init());
        await deploy(stringReceiver.address, await receiver_precedence_StringReceiverTester_1.StringReceiverTester.init());
        await deploy(binaryReceiver.address, await receiver_precedence_BinaryReceiverTester_1.BinaryReceiverTester.init());
        await deploy(sliceReceiver.address, await receiver_precedence_SliceReceiverTester_1.SliceReceiverTester.init());
        await deploy(emptyAndCommentReceiver.address, await receiver_precedence_EmptyAndCommentReceiverTester_1.EmptyAndCommentReceiverTester.init());
        await deploy(emptyAndStringReceiver.address, await receiver_precedence_EmptyAndStringReceiverTester_1.EmptyAndStringReceiverTester.init());
        await deploy(emptyAndBinaryReceiver.address, await receiver_precedence_EmptyAndBinaryReceiverTester_1.EmptyAndBinaryReceiverTester.init());
        await deploy(emptyAndSliceReceiver.address, await receiver_precedence_EmptyAndSliceReceiverTester_1.EmptyAndSliceReceiverTester.init());
        await deploy(commentAndStringReceiver.address, await receiver_precedence_CommentAndStringReceiverTester_1.CommentAndStringReceiverTester.init());
        await deploy(commentAndBinaryReceiver.address, await receiver_precedence_CommentAndBinaryReceiverTester_1.CommentAndBinaryReceiverTester.init());
        await deploy(commentAndSliceReceiver.address, await receiver_precedence_CommentAndSliceReceiverTester_1.CommentAndSliceReceiverTester.init());
        await deploy(stringAndBinaryReceiver.address, await receiver_precedence_StringAndBinaryReceiverTester_1.StringAndBinaryReceiverTester.init());
        await deploy(stringAndSliceReceiver.address, await receiver_precedence_StringAndSliceReceiverTester_1.StringAndSliceReceiverTester.init());
        await deploy(binaryAndSliceReceiver.address, await receiver_precedence_BinaryAndSliceReceiverTester_1.BinaryAndSliceReceiverTester.init());
        await deploy(emptyAndCommentAndStringReceiver.address, await receiver_precedence_EmptyAndCommentAndStringReceiverTester_1.EmptyAndCommentAndStringReceiverTester.init());
        await deploy(emptyAndCommentAndBinaryReceiver.address, await receiver_precedence_EmptyAndCommentAndBinaryReceiverTester_1.EmptyAndCommentAndBinaryReceiverTester.init());
        await deploy(emptyAndCommentAndSliceReceiver.address, await receiver_precedence_EmptyAndCommentAndSliceReceiverTester_1.EmptyAndCommentAndSliceReceiverTester.init());
        await deploy(emptyAndStringAndBinaryReceiver.address, await receiver_precedence_EmptyAndStringAndBinaryReceiverTester_1.EmptyAndStringAndBinaryReceiverTester.init());
        await deploy(emptyAndStringAndSliceReceiver.address, await receiver_precedence_EmptyAndStringAndSliceReceiverTester_1.EmptyAndStringAndSliceReceiverTester.init());
        await deploy(emptyAndBinaryAndSliceReceiver.address, await receiver_precedence_EmptyAndBinaryAndSliceReceiverTester_1.EmptyAndBinaryAndSliceReceiverTester.init());
        await deploy(commentAndStringAndBinaryReceiver.address, await receiver_precedence_CommentAndStringAndBinaryReceiverTester_1.CommentAndStringAndBinaryReceiverTester.init());
        await deploy(commentAndStringAndSliceReceiver.address, await receiver_precedence_CommentAndStringAndSliceReceiverTester_1.CommentAndStringAndSliceReceiverTester.init());
        await deploy(commentAndBinaryAndSliceReceiver.address, await receiver_precedence_CommentAndBinaryAndSliceReceiverTester_1.CommentAndBinaryAndSliceReceiverTester.init());
        await deploy(stringAndBinaryAndSliceReceiver.address, await receiver_precedence_StringAndBinaryAndSliceReceiverTester_1.StringAndBinaryAndSliceReceiverTester.init());
        await deploy(emptyAndCommentAndStringAndBinaryReceiver.address, await receiver_precedence_EmptyAndCommentAndStringAndBinaryReceiverTester_1.EmptyAndCommentAndStringAndBinaryReceiverTester.init());
        await deploy(emptyAndCommentAndStringAndSliceReceiver.address, await receiver_precedence_EmptyAndCommentAndStringAndSliceReceiverTester_1.EmptyAndCommentAndStringAndSliceReceiverTester.init());
        await deploy(emptyAndCommentAndBinaryAndSliceReceiver.address, await receiver_precedence_EmptyAndCommentAndBinaryAndSliceReceiverTester_1.EmptyAndCommentAndBinaryAndSliceReceiverTester.init());
        await deploy(emptyAndStringAndBinaryAndSliceReceiver.address, await receiver_precedence_EmptyAndStringAndBinaryAndSliceReceiverTester_1.EmptyAndStringAndBinaryAndSliceReceiverTester.init());
        await deploy(commentAndStringAndBinaryAndSliceReceiver.address, await receiver_precedence_CommentAndStringAndBinaryAndSliceReceiverTester_1.CommentAndStringAndBinaryAndSliceReceiverTester.init());
        await deploy(allReceivers.address, await receiver_precedence_AllReceiverTester_1.AllReceiverTester.init());
        await deploy(emptyBounced.address, await receiver_precedence_EmptyBouncedTester_1.EmptyBouncedTester.init());
        await deploy(binaryBounced.address, await receiver_precedence_BinaryBouncedTester_1.BinaryBouncedTester.init());
        await deploy(sliceBounced.address, await receiver_precedence_SliceBouncedTester_1.SliceBouncedTester.init());
        await deploy(allBounced.address, await receiver_precedence_AllBouncedTester_1.AllBouncedTester.init());
        async function deploy(addr, init) {
            const deployable = await blockchain.getContract(addr);
            const trans = await deployable.receiveMessage((0, sandbox_1.internal)({
                from: treasure.address,
                to: deployable.address,
                value: (0, core_1.toNano)("10"),
                stateInit: init,
                bounce: false,
            }));
            expect(trans.endStatus).toBe("active");
        }
    });
    it("should implement receivers precedence correctly", async () => {
        // Initially, since we sent a deploy message with empty message, the empty receiver executed
        const receiver1 = await contract.getReceiverKind();
        expect(receiver1).toBe("empty");
        // Send now a "message"
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "message");
        const receiver2 = await contract.getReceiverKind();
        // Note the receiver "error_comment" did not execute
        expect(receiver2).toBe("comment");
        // Send now an arbitrary string different from "message"
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "msg");
        const receiver3 = await contract.getReceiverKind();
        // Now, the receiver for general strings executed.
        // Note that "error_comment" still does not execute, nor the "message_slice" receiver.
        expect(receiver3).toBe("comment_fallback");
        // Send now a Message (note the capital letter in Message)
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, { $$type: "Message", msg: "message" });
        const receiver4 = await contract.getReceiverKind();
        // Now, the receiver for Message executed.
        expect(receiver4).toBe("binary_message");
        // Now, simulate different kinds of messages using slices
        // First, an empty message, which can be simulated with an empty slice
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, new core_1.Cell().asSlice());
        // The empty receiver executed
        const receiver5 = await contract.getReceiverKind();
        expect(receiver5).toBe("empty");
        // Send now a "message" simulated as slice
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, 
        // String receivers are triggered by passing an operation code 0 at the start of the slice
        (0, core_1.beginCell)()
            .storeUint(0, 32)
            .storeStringTail("message")
            .endCell()
            .asSlice());
        const receiver6 = await contract.getReceiverKind();
        // Note the receiver "error_comment" did not execute, nor the receiver "message_slice".
        expect(receiver6).toBe("comment");
        // Send now an arbitrary string different from "message"
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, 
        // String receivers are triggered by passing an operation code 0 at the start of the slice
        (0, core_1.beginCell)()
            .storeUint(0, 32)
            .storeStringTail("msg")
            .endCell()
            .asSlice());
        const receiver7 = await contract.getReceiverKind();
        // Now, the receiver for general strings executed.
        // Note that "error_comment" still does not execute.
        expect(receiver7).toBe("comment_fallback");
        // Note that it is possible to trigger the "message_slice" receiver by passing an operation code different from 0, for example 10.
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, (0, core_1.beginCell)()
            .storeUint(10, 32)
            .storeStringTail("message")
            .endCell()
            .asSlice());
        const receiver8 = await contract.getReceiverKind();
        // Now, the receiver for slices takes the "message" path
        expect(receiver8).toBe("message_slice");
        // Send now an arbitrary slice
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, (0, core_1.beginCell)().storeUint(10, 32).endCell().asSlice());
        const receiver9 = await contract.getReceiverKind();
        // Now, the receiver for slices executed.
        expect(receiver9).toBe("fallback");
        // In all the cases, "error_comment" did not execute, as it should be.
    });
    it("should implement bounced receiver precedence correctly", async () => {
        // Tell the contract to send a request to the calculator with an unsupported arithmetical operation.
        // The contract will send the request: 1 + 1
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "do_unsupported_op");
        const receiver1 = await contract.getReceiverKind();
        // The request was bounced back, because the calculator does not do additions.
        // Note the bounced fallback receiver did not execute
        expect(receiver1).toBe("bounced_binary_message");
        // Tell the contract to send a request to the calculator with a division by zero.
        // The contract will send the request: 10/0
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "do_div_by_zero");
        const receiver2 = await contract.getReceiverKind();
        // The request was bounced back, because the calculator got a division by zero error
        // Note the bounced fallback receiver did not execute
        expect(receiver2).toBe("bounced_binary_message");
        // Tell the contract to send a request to the calculator with a successful division.
        // The contract will send the request: 10/2
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "do_success_div");
        const receiver3 = await contract.getReceiverKind();
        // The request was successful, since the contract does not receive BinaryIntResult messages (as returned by the calculator),
        // The contract processed the result in the fallback receiver (NOT the bounced fallback receiver).
        expect(receiver3).toBe("fallback");
        // Tell the contract to send an unknown non-arithmetical request to the calculator.
        const { transactions } = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "do_unknown_request");
        const receiver4 = await contract.getReceiverKind();
        // The request was bounced back, because the calculator does not know how to process it.
        // The contract gets the request bounced back into its bounced fallback receiver.
        expect(receiver4).toBe("bounced_fallback");
        // Additionally, the transaction in the calculator fails with exit code 130
        expect(transactions).toHaveTransaction({
            from: contract.address,
            to: calculator.address,
            exitCode: 130,
        });
    });
    it("should implement external receiver precedence correctly", async () => {
        // These tests are very similar to the tests for internal messages.
        // Send an empty message
        await contract.sendExternal(null);
        const receiver1 = await contract.getReceiverKind();
        expect(receiver1).toBe("external_empty");
        // Send now a "message"
        await contract.sendExternal("message");
        const receiver2 = await contract.getReceiverKind();
        // Note the external receiver "external_error_comment" did not execute
        expect(receiver2).toBe("external_comment");
        // Send now an arbitrary string different from "message"
        await contract.sendExternal("msg");
        const receiver3 = await contract.getReceiverKind();
        // Now, the external receiver for general strings executed.
        // Note that "external_error_comment" still does not execute, nor the "external_message_slice" receiver.
        expect(receiver3).toBe("external_comment_fallback");
        // Send now a Message
        await contract.sendExternal({ $$type: "Message", msg: "message" });
        const receiver4 = await contract.getReceiverKind();
        // Now, the external receiver for Message executed.
        expect(receiver4).toBe("external_binary_message");
        // First, an empty message, which can be simulated with an empty slice
        await contract.sendExternal(new core_1.Cell().asSlice());
        // The empty external receiver executed
        const receiver5 = await contract.getReceiverKind();
        expect(receiver5 === "external_empty").toBe(true);
        // Send now a "message" simulated as slice
        await contract.sendExternal(
        // String receivers are triggered by passing an operation code 0 at the start of the slice
        (0, core_1.beginCell)()
            .storeUint(0, 32)
            .storeStringTail("message")
            .endCell()
            .asSlice());
        const receiver6 = await contract.getReceiverKind();
        // Note the external receiver "external_error_comment" did not execute, nor the "external_message_slice".
        expect(receiver6 === "external_comment").toBe(true);
        // Send now an arbitrary string different from "message"
        await contract.sendExternal(
        // String receivers are triggered by passing an operation code 0 at the start of the slice
        (0, core_1.beginCell)()
            .storeUint(0, 32)
            .storeStringTail("msg")
            .endCell()
            .asSlice());
        const receiver7 = await contract.getReceiverKind();
        // Now, the external receiver for general strings executed.
        // Note that "external_error_comment" still does not execute.
        expect(receiver7 === "external_comment_fallback").toBe(true);
        // Note that it is possible to trigger the "external_message_slice" by passing an operation code different from 0, for example 10.
        await contract.sendExternal((0, core_1.beginCell)()
            .storeUint(10, 32)
            .storeStringTail("message")
            .endCell()
            .asSlice());
        const receiver8 = await contract.getReceiverKind();
        // Now, the external receiver for slices takes the "message" path
        expect(receiver8 === "external_message_slice").toBe(true);
        // Send now an arbitrary slice
        await contract.sendExternal((0, core_1.beginCell)().storeUint(10, 32).endCell().asSlice());
        const receiver9 = await contract.getReceiverKind();
        // Now, the external receiver for slices executed.
        expect(receiver9 === "external_fallback").toBe(true);
        // In all the cases, "external_error_comment" did not execute, as it should be.
    });
    it("internal receivers should process empty messages and empty strings correctly", async () => {
        // A message struct with empty string inside. Should only be accepted by binary receivers
        const emptyStringInMessageStruct = (0, core_1.beginCell)()
            .storeUint(100, 32)
            .storeStringRefTail("")
            .endCell();
        // An empty message struct, should only be accepted by binary receivers.
        const emptyMessageStruct = (0, core_1.beginCell)().storeUint(101, 32).endCell();
        // Message bodies with integer of size less than 32 bits will be processed by empty receivers (if present),
        // irrespective of the value of the integer
        const lessThan32Bits = (0, core_1.beginCell)().storeUint(10, 30).endCell();
        // An actual empty message body
        const emptyBody = new core_1.Cell();
        // Message bodies with integers of size exactly 32 bits but value 0 will be processed by empty receivers (if present).
        const zeroOf32Bits = (0, core_1.beginCell)().storeUint(0, 32).endCell();
        // The empty string will be processed by empty receivers (if present)
        const emptyString = (0, core_1.beginCell)()
            .storeUint(0, 32)
            .storeStringTail("")
            .endCell();
        const bodiesToTry = [
            emptyStringInMessageStruct,
            emptyMessageStruct,
            lessThan32Bits,
            emptyBody,
            zeroOf32Bits,
            emptyString,
        ];
        // Some utility functions that carry out the actual tests and assertions
        async function shouldFailFrom(testedContract, from, exitCode) {
            for (const body of bodiesToTry.slice(from)) {
                await shouldFailBody(testedContract, exitCode, body);
            }
        }
        async function shouldAcceptFrom(testedContract, from, receiverGetter, expectedRestReceiver) {
            for (const body of bodiesToTry.slice(from)) {
                await shouldAcceptBody(testedContract, receiverGetter, expectedRestReceiver, body);
            }
        }
        async function shouldFailIncompleteOpCode(testedContract, exitCode) {
            await shouldFailBody(testedContract, exitCode, lessThan32Bits);
        }
        async function shouldFailEmptyBody(testedContract, exitCode) {
            await shouldFailBody(testedContract, exitCode, emptyBody);
        }
        async function shouldFailMessageStruct(testedContract, exitCode) {
            await shouldFailBody(testedContract, exitCode, emptyStringInMessageStruct);
        }
        async function shouldFailEmptyMessageStruct(testedContract, exitCode) {
            await shouldFailBody(testedContract, exitCode, emptyMessageStruct);
        }
        async function shouldAcceptIncompleteOpCode(testedContract, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, receiverGetter, expectedReceiver, lessThan32Bits);
        }
        async function shouldAcceptEmptyBody(testedContract, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, receiverGetter, expectedReceiver, emptyBody);
        }
        async function shouldAcceptMessageStruct(testedContract, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, receiverGetter, expectedReceiver, emptyStringInMessageStruct);
        }
        async function shouldAcceptEmptyMessageStruct(testedContract, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, receiverGetter, expectedReceiver, emptyMessageStruct);
        }
        async function shouldAcceptBody(testedContract, receiverGetter, expectedReceiver, body) {
            const { transactions } = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
                $$type: "SendCellToAddress",
                address: testedContract,
                body: body,
            });
            expect(transactions).toHaveTransaction({
                from: contract.address,
                to: testedContract,
                success: true,
            });
            expect(await receiverGetter()).toBe(expectedReceiver);
        }
        async function shouldFailBody(testedContract, exitCode, body) {
            const { transactions } = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
                $$type: "SendCellToAddress",
                address: testedContract,
                body: body,
            });
            expect(transactions).toHaveTransaction({
                from: contract.address,
                to: testedContract,
                success: false,
                exitCode: exitCode,
            });
        }
        // Tests start here
        // noReceivers should fail in all the cases with exit code 130
        await shouldFailFrom(noReceivers.address, 0, 130);
        // emptyReceiver
        // Should fail on message structs
        // And accept the rest
        await shouldFailMessageStruct(emptyReceiver.address, 130);
        await shouldFailEmptyMessageStruct(emptyReceiver.address, 130);
        await shouldAcceptFrom(emptyReceiver.address, 2, emptyReceiver.getReceiver, "empty");
        // commentReceiver should fail in all the cases with exit code 130
        await shouldFailFrom(commentReceiver.address, 0, 130);
        // stringReceiver should accept from 4 onwards on string receiver
        await shouldFailMessageStruct(stringReceiver.address, 130);
        await shouldFailEmptyMessageStruct(stringReceiver.address, 130);
        await shouldFailIncompleteOpCode(stringReceiver.address, 130);
        await shouldFailEmptyBody(stringReceiver.address, 130);
        await shouldAcceptFrom(stringReceiver.address, 4, stringReceiver.getReceiver, "fallback_string");
        // binaryReceiver
        // Accepts binary cases
        // and fails in the rest with exit code 130
        await shouldAcceptMessageStruct(binaryReceiver.address, binaryReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(binaryReceiver.address, binaryReceiver.getReceiver, "binary_empty_message");
        await shouldFailFrom(binaryReceiver.address, 2, 130);
        // sliceReceiver should accept all the cases
        await shouldAcceptFrom(sliceReceiver.address, 0, sliceReceiver.getReceiver, "fallback");
        // emptyAndCommentReceiver
        // Fails in the message structs
        // and accepts the rest of cases in the empty receiver
        await shouldFailMessageStruct(emptyAndCommentReceiver.address, 130);
        await shouldFailEmptyMessageStruct(emptyAndCommentReceiver.address, 130);
        await shouldAcceptFrom(emptyAndCommentReceiver.address, 2, emptyAndCommentReceiver.getReceiver, "empty");
        // emptyAndStringReceiver
        // Fails in the message structs
        // and accepts the rest of cases in the empty receiver
        await shouldFailMessageStruct(emptyAndStringReceiver.address, 130);
        await shouldFailEmptyMessageStruct(emptyAndStringReceiver.address, 130);
        await shouldAcceptFrom(emptyAndStringReceiver.address, 2, emptyAndStringReceiver.getReceiver, "empty");
        // emptyAndBinaryReceiver
        // Accepts the message structs in the binary receiver
        // and accepts the rest of cases in the empty receiver
        await shouldAcceptMessageStruct(emptyAndBinaryReceiver.address, emptyAndBinaryReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(emptyAndBinaryReceiver.address, emptyAndBinaryReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(emptyAndBinaryReceiver.address, 2, emptyAndBinaryReceiver.getReceiver, "empty");
        // emptyAndSliceReceiver
        // Accepts the message structs in the fallback receiver
        // and accepts the rest of cases in the empty receiver
        await shouldAcceptMessageStruct(emptyAndSliceReceiver.address, emptyAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyMessageStruct(emptyAndSliceReceiver.address, emptyAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptFrom(emptyAndSliceReceiver.address, 2, emptyAndSliceReceiver.getReceiver, "empty");
        // commentAndStringReceiver accepts from 4 onwards on string receiver
        await shouldFailMessageStruct(commentAndStringReceiver.address, 130);
        await shouldFailEmptyMessageStruct(commentAndStringReceiver.address, 130);
        await shouldFailIncompleteOpCode(commentAndStringReceiver.address, 130);
        await shouldFailEmptyBody(commentAndStringReceiver.address, 130);
        await shouldAcceptFrom(commentAndStringReceiver.address, 4, commentAndStringReceiver.getReceiver, "fallback_string");
        // commentAndBinaryReceiver
        // Accepts the message structs in the binary receiver
        // and fails in the rest
        await shouldAcceptMessageStruct(commentAndBinaryReceiver.address, commentAndBinaryReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(commentAndBinaryReceiver.address, commentAndBinaryReceiver.getReceiver, "binary_empty_message");
        await shouldFailFrom(commentAndBinaryReceiver.address, 2, 130);
        // commentAndSliceReceiver should accept all the cases in the fallback receiver
        await shouldAcceptFrom(commentAndSliceReceiver.address, 0, commentAndSliceReceiver.getReceiver, "fallback");
        // stringAndBinaryReceiver
        // should accepts structs in binary receivers.
        // accepts from 4 onwards in the string receiver
        await shouldAcceptMessageStruct(stringAndBinaryReceiver.address, stringAndBinaryReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(stringAndBinaryReceiver.address, stringAndBinaryReceiver.getReceiver, "binary_empty_message");
        await shouldFailIncompleteOpCode(stringAndBinaryReceiver.address, 130);
        await shouldFailEmptyBody(stringAndBinaryReceiver.address, 130);
        await shouldAcceptFrom(stringAndBinaryReceiver.address, 4, stringAndBinaryReceiver.getReceiver, "fallback_string");
        // stringAndSliceReceiver should accept firsts in fallback receiver
        // and the rest from 4 onwards in the string receiver
        await shouldAcceptMessageStruct(stringAndSliceReceiver.address, stringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyMessageStruct(stringAndSliceReceiver.address, stringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptIncompleteOpCode(stringAndSliceReceiver.address, stringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyBody(stringAndSliceReceiver.address, stringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptFrom(stringAndSliceReceiver.address, 4, stringAndSliceReceiver.getReceiver, "fallback_string");
        // binaryAndSliceReceiver
        // should accept structs in binary receivers and rest in the fallback receiver
        await shouldAcceptMessageStruct(binaryAndSliceReceiver.address, binaryAndSliceReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(binaryAndSliceReceiver.address, binaryAndSliceReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(binaryAndSliceReceiver.address, 2, binaryAndSliceReceiver.getReceiver, "fallback");
        // emptyAndCommentAndStringReceiver
        // should fail on message structs
        // but accept all the rest in the empty receiver
        await shouldFailMessageStruct(emptyAndCommentAndStringReceiver.address, 130);
        await shouldFailEmptyMessageStruct(emptyAndCommentAndStringReceiver.address, 130);
        await shouldAcceptFrom(emptyAndCommentAndStringReceiver.address, 2, emptyAndCommentAndStringReceiver.getReceiver, "empty");
        // emptyAndCommentAndBinaryReceiver
        // should accept structs in binary receivers and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndCommentAndBinaryReceiver.address, emptyAndCommentAndBinaryReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndBinaryReceiver.address, emptyAndCommentAndBinaryReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(emptyAndCommentAndBinaryReceiver.address, 2, emptyAndCommentAndBinaryReceiver.getReceiver, "empty");
        // emptyAndCommentAndSliceReceiver
        // should accept the structs in fallback and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndCommentAndSliceReceiver.address, emptyAndCommentAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndSliceReceiver.address, emptyAndCommentAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptFrom(emptyAndCommentAndSliceReceiver.address, 2, emptyAndCommentAndSliceReceiver.getReceiver, "empty");
        // emptyAndStringAndBinaryReceiver
        // should accept structs in binary and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndStringAndBinaryReceiver.address, emptyAndStringAndBinaryReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(emptyAndStringAndBinaryReceiver.address, emptyAndStringAndBinaryReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(emptyAndStringAndBinaryReceiver.address, 2, emptyAndStringAndBinaryReceiver.getReceiver, "empty");
        // emptyAndStringAndSliceReceiver
        // should accept structs in fallback and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndStringAndSliceReceiver.address, emptyAndStringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyMessageStruct(emptyAndStringAndSliceReceiver.address, emptyAndStringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptFrom(emptyAndStringAndSliceReceiver.address, 2, emptyAndStringAndSliceReceiver.getReceiver, "empty");
        // emptyAndBinaryAndSliceReceiver
        // should accept structs in binary and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndBinaryAndSliceReceiver.address, emptyAndBinaryAndSliceReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(emptyAndBinaryAndSliceReceiver.address, emptyAndBinaryAndSliceReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(emptyAndBinaryAndSliceReceiver.address, 2, emptyAndBinaryAndSliceReceiver.getReceiver, "empty");
        // commentAndStringAndBinaryReceiver
        // should accept structs in binary receivers
        // and accept from 4 onwards at the string receiver
        await shouldAcceptMessageStruct(commentAndStringAndBinaryReceiver.address, commentAndStringAndBinaryReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(commentAndStringAndBinaryReceiver.address, commentAndStringAndBinaryReceiver.getReceiver, "binary_empty_message");
        await shouldFailIncompleteOpCode(commentAndStringAndBinaryReceiver.address, 130);
        await shouldFailEmptyBody(commentAndStringAndBinaryReceiver.address, 130);
        await shouldAcceptFrom(commentAndStringAndBinaryReceiver.address, 4, commentAndStringAndBinaryReceiver.getReceiver, "fallback_string");
        // commentAndStringAndSliceReceiver
        // should accept firsts in fallback
        // but accept the rest in the string receiver
        await shouldAcceptMessageStruct(commentAndStringAndSliceReceiver.address, commentAndStringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyMessageStruct(commentAndStringAndSliceReceiver.address, commentAndStringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptIncompleteOpCode(commentAndStringAndSliceReceiver.address, commentAndStringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyBody(commentAndStringAndSliceReceiver.address, commentAndStringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptFrom(commentAndStringAndSliceReceiver.address, 4, commentAndStringAndSliceReceiver.getReceiver, "fallback_string");
        // commentAndBinaryAndSliceReceiver
        // should accept structs in binary
        // should accept the rest in the fallback receiver
        await shouldAcceptMessageStruct(commentAndBinaryAndSliceReceiver.address, commentAndBinaryAndSliceReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(commentAndBinaryAndSliceReceiver.address, commentAndBinaryAndSliceReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(commentAndBinaryAndSliceReceiver.address, 2, commentAndBinaryAndSliceReceiver.getReceiver, "fallback");
        // stringAndBinaryAndSliceReceiver
        // should accept the structs in binary
        // should accept middle ones in fallback
        // and the rest in the string receiver
        await shouldAcceptMessageStruct(stringAndBinaryAndSliceReceiver.address, stringAndBinaryAndSliceReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(stringAndBinaryAndSliceReceiver.address, stringAndBinaryAndSliceReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptIncompleteOpCode(stringAndBinaryAndSliceReceiver.address, stringAndBinaryAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyBody(stringAndBinaryAndSliceReceiver.address, stringAndBinaryAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptFrom(stringAndBinaryAndSliceReceiver.address, 4, stringAndBinaryAndSliceReceiver.getReceiver, "fallback_string");
        // emptyAndCommentAndStringAndBinaryReceiver
        // structs in binary
        // rest in empty
        await shouldAcceptMessageStruct(emptyAndCommentAndStringAndBinaryReceiver.address, emptyAndCommentAndStringAndBinaryReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndStringAndBinaryReceiver.address, emptyAndCommentAndStringAndBinaryReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(emptyAndCommentAndStringAndBinaryReceiver.address, 2, emptyAndCommentAndStringAndBinaryReceiver.getReceiver, "empty");
        // emptyAndCommentAndStringAndSliceReceiver
        // structs in fallback
        // rest in empty
        await shouldAcceptMessageStruct(emptyAndCommentAndStringAndSliceReceiver.address, emptyAndCommentAndStringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndStringAndSliceReceiver.address, emptyAndCommentAndStringAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptFrom(emptyAndCommentAndStringAndSliceReceiver.address, 2, emptyAndCommentAndStringAndSliceReceiver.getReceiver, "empty");
        // emptyAndCommentAndBinaryAndSliceReceiver
        // structs in binary
        // rest in empty
        await shouldAcceptMessageStruct(emptyAndCommentAndBinaryAndSliceReceiver.address, emptyAndCommentAndBinaryAndSliceReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndBinaryAndSliceReceiver.address, emptyAndCommentAndBinaryAndSliceReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(emptyAndCommentAndBinaryAndSliceReceiver.address, 2, emptyAndCommentAndBinaryAndSliceReceiver.getReceiver, "empty");
        // emptyAndStringAndBinaryAndSliceReceiver
        // structs in binary
        // rest in empty
        await shouldAcceptMessageStruct(emptyAndStringAndBinaryAndSliceReceiver.address, emptyAndStringAndBinaryAndSliceReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(emptyAndStringAndBinaryAndSliceReceiver.address, emptyAndStringAndBinaryAndSliceReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(emptyAndStringAndBinaryAndSliceReceiver.address, 2, emptyAndStringAndBinaryAndSliceReceiver.getReceiver, "empty");
        // commentAndStringAndBinaryAndSliceReceiver
        // structs in binary
        // middle ones in the fallback receiver,
        // and the rest in the string receiver
        await shouldAcceptMessageStruct(commentAndStringAndBinaryAndSliceReceiver.address, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(commentAndStringAndBinaryAndSliceReceiver.address, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "binary_empty_message");
        await shouldAcceptIncompleteOpCode(commentAndStringAndBinaryAndSliceReceiver.address, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptEmptyBody(commentAndStringAndBinaryAndSliceReceiver.address, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "fallback");
        await shouldAcceptFrom(commentAndStringAndBinaryAndSliceReceiver.address, 4, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "fallback_string");
        // allReceivers
        // structs in binary
        // the rest in the empty receiver
        await shouldAcceptMessageStruct(allReceivers.address, allReceivers.getReceiver, "binary");
        await shouldAcceptEmptyMessageStruct(allReceivers.address, allReceivers.getReceiver, "binary_empty_message");
        await shouldAcceptFrom(allReceivers.address, 2, allReceivers.getReceiver, "empty");
    });
    it("external receivers should process empty messages and empty strings correctly", async () => {
        // A message struct with empty string inside. Should only be accepted by binary receivers
        const emptyStringInMessageStruct = (0, core_1.beginCell)()
            .storeUint(100, 32)
            .storeStringRefTail("")
            .endCell();
        // An empty message struct, should only be accepted by binary receivers.
        const emptyMessageStruct = (0, core_1.beginCell)().storeUint(101, 32).endCell();
        // Message bodies with integer of size less than 32 bits will be processed by empty receivers (if present),
        // irrespective of the value of the integer
        const lessThan32Bits = (0, core_1.beginCell)().storeUint(10, 30).endCell();
        // An actual empty message body
        const emptyBody = new core_1.Cell();
        // Message bodies with integers of size exactly 32 bits but value 0 will be processed by empty receivers (if present).
        const zeroOf32Bits = (0, core_1.beginCell)().storeUint(0, 32).endCell();
        // The empty string will be processed by empty receivers (if present)
        const emptyString = (0, core_1.beginCell)()
            .storeUint(0, 32)
            .storeStringTail("")
            .endCell();
        const bodiesToTry = [
            emptyStringInMessageStruct,
            emptyMessageStruct,
            lessThan32Bits,
            emptyBody,
            zeroOf32Bits,
            emptyString,
        ];
        // Some utility functions that carry out the actual tests and assertions
        async function shouldFailFrom(testedContract, from) {
            for (const body of bodiesToTry.slice(from)) {
                await shouldFailBody(testedContract, body);
            }
        }
        async function shouldAcceptFrom(testedContract, from, receiverGetter, expectedRestReceiver) {
            for (const body of bodiesToTry.slice(from)) {
                await shouldAcceptBody(testedContract, receiverGetter, expectedRestReceiver, body);
            }
        }
        async function shouldFailIncompleteOpCode(testedContract) {
            await shouldFailBody(testedContract, lessThan32Bits);
        }
        async function shouldFailEmptyBody(testedContract) {
            await shouldFailBody(testedContract, emptyBody);
        }
        async function shouldFailMessageStruct(testedContract) {
            await shouldFailBody(testedContract, emptyStringInMessageStruct);
        }
        async function shouldFailEmptyMessageStruct(testedContract) {
            await shouldFailBody(testedContract, emptyMessageStruct);
        }
        async function shouldAcceptIncompleteOpCode(testedContract, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, receiverGetter, expectedReceiver, lessThan32Bits);
        }
        async function shouldAcceptEmptyBody(testedContract, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, receiverGetter, expectedReceiver, emptyBody);
        }
        async function shouldAcceptMessageStruct(testedContract, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, receiverGetter, expectedReceiver, emptyStringInMessageStruct);
        }
        async function shouldAcceptEmptyMessageStruct(testedContract, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, receiverGetter, expectedReceiver, emptyMessageStruct);
        }
        async function shouldAcceptBody(testedContract, receiverGetter, expectedRestReceiver, body) {
            const contract = await blockchain.getContract(testedContract);
            const transaction = await contract.receiveMessage((0, core_1.external)({
                to: contract.address,
                body: body,
            }));
            const transDesc = getTransactionDescription(transaction);
            expect(transDesc.aborted).toBe(false);
            expect(await receiverGetter()).toBe(expectedRestReceiver);
        }
        async function shouldFailBody(testedContract, body) {
            const contract = await blockchain.getContract(testedContract);
            try {
                await contract.receiveMessage((0, core_1.external)({
                    to: contract.address,
                    body: body,
                }));
                // It should not reach here
                expect(false).toBe(true);
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
                if (e instanceof Error) {
                    expect(e.message).toContain("External message not accepted by smart contract");
                }
            }
        }
        // Tests start here
        // noReceivers should fail in all the cases
        await shouldFailFrom(noReceivers.address, 0);
        // emptyReceiver
        // Should fail on message structs
        // And accept the rest
        await shouldFailMessageStruct(emptyReceiver.address);
        await shouldFailEmptyMessageStruct(emptyReceiver.address);
        await shouldAcceptFrom(emptyReceiver.address, 2, emptyReceiver.getReceiver, "external_empty");
        // commentReceiver should fail in all the cases
        await shouldFailFrom(commentReceiver.address, 0);
        // stringReceiver should accept from 4 onwards on string receiver
        await shouldFailMessageStruct(stringReceiver.address);
        await shouldFailEmptyMessageStruct(stringReceiver.address);
        await shouldFailIncompleteOpCode(stringReceiver.address);
        await shouldFailEmptyBody(stringReceiver.address);
        await shouldAcceptFrom(stringReceiver.address, 4, stringReceiver.getReceiver, "external_fallback_string");
        // binaryReceiver
        // Accepts binary cases
        // and fails in the rest
        await shouldAcceptMessageStruct(binaryReceiver.address, binaryReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(binaryReceiver.address, binaryReceiver.getReceiver, "external_binary_empty_message");
        await shouldFailFrom(binaryReceiver.address, 2);
        // sliceReceiver should accept all the cases
        await shouldAcceptFrom(sliceReceiver.address, 0, sliceReceiver.getReceiver, "external_fallback");
        // emptyAndCommentReceiver
        // Fails in the message structs
        // and accepts the rest of cases in the empty receiver
        await shouldFailMessageStruct(emptyAndCommentReceiver.address);
        await shouldFailEmptyMessageStruct(emptyAndCommentReceiver.address);
        await shouldAcceptFrom(emptyAndCommentReceiver.address, 2, emptyAndCommentReceiver.getReceiver, "external_empty");
        // emptyAndStringReceiver
        // Fails in the message structs
        // and accepts the rest of cases in the empty receiver
        await shouldFailMessageStruct(emptyAndStringReceiver.address);
        await shouldFailEmptyMessageStruct(emptyAndStringReceiver.address);
        await shouldAcceptFrom(emptyAndStringReceiver.address, 2, emptyAndStringReceiver.getReceiver, "external_empty");
        // emptyAndBinaryReceiver
        // Accepts the message structs in the binary receiver
        // and accepts the rest of cases in the empty receiver
        await shouldAcceptMessageStruct(emptyAndBinaryReceiver.address, emptyAndBinaryReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(emptyAndBinaryReceiver.address, emptyAndBinaryReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(emptyAndBinaryReceiver.address, 2, emptyAndBinaryReceiver.getReceiver, "external_empty");
        // emptyAndSliceReceiver
        // Accepts the message structs in the fallback receiver
        // and accepts the rest of cases in the empty receiver
        await shouldAcceptMessageStruct(emptyAndSliceReceiver.address, emptyAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyMessageStruct(emptyAndSliceReceiver.address, emptyAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptFrom(emptyAndSliceReceiver.address, 2, emptyAndSliceReceiver.getReceiver, "external_empty");
        // commentAndStringReceiver accepts from 4 onwards on string receiver
        await shouldFailMessageStruct(commentAndStringReceiver.address);
        await shouldFailEmptyMessageStruct(commentAndStringReceiver.address);
        await shouldFailIncompleteOpCode(commentAndStringReceiver.address);
        await shouldFailEmptyBody(commentAndStringReceiver.address);
        await shouldAcceptFrom(commentAndStringReceiver.address, 4, commentAndStringReceiver.getReceiver, "external_fallback_string");
        // commentAndBinaryReceiver
        // Accepts the message structs in the binary receiver
        // and fails in the rest
        await shouldAcceptMessageStruct(commentAndBinaryReceiver.address, commentAndBinaryReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(commentAndBinaryReceiver.address, commentAndBinaryReceiver.getReceiver, "external_binary_empty_message");
        await shouldFailFrom(commentAndBinaryReceiver.address, 2);
        // commentAndSliceReceiver should accept all the cases in the fallback receiver
        await shouldAcceptFrom(commentAndSliceReceiver.address, 0, commentAndSliceReceiver.getReceiver, "external_fallback");
        // stringAndBinaryReceiver
        // should accepts structs in binary receivers.
        // accepts from 4 onwards in the string receiver
        await shouldAcceptMessageStruct(stringAndBinaryReceiver.address, stringAndBinaryReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(stringAndBinaryReceiver.address, stringAndBinaryReceiver.getReceiver, "external_binary_empty_message");
        await shouldFailIncompleteOpCode(stringAndBinaryReceiver.address);
        await shouldFailEmptyBody(stringAndBinaryReceiver.address);
        await shouldAcceptFrom(stringAndBinaryReceiver.address, 4, stringAndBinaryReceiver.getReceiver, "external_fallback_string");
        // stringAndSliceReceiver should accept firsts in fallback receiver
        // and the rest from 4 onwards in the string receiver
        await shouldAcceptMessageStruct(stringAndSliceReceiver.address, stringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyMessageStruct(stringAndSliceReceiver.address, stringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptIncompleteOpCode(stringAndSliceReceiver.address, stringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyBody(stringAndSliceReceiver.address, stringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptFrom(stringAndSliceReceiver.address, 4, stringAndSliceReceiver.getReceiver, "external_fallback_string");
        // binaryAndSliceReceiver
        // should accept structs in binary receivers and rest in the fallback receiver
        await shouldAcceptMessageStruct(binaryAndSliceReceiver.address, binaryAndSliceReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(binaryAndSliceReceiver.address, binaryAndSliceReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(binaryAndSliceReceiver.address, 2, binaryAndSliceReceiver.getReceiver, "external_fallback");
        // emptyAndCommentAndStringReceiver
        // should fail on message structs
        // but accept all the rest in the empty receiver
        await shouldFailMessageStruct(emptyAndCommentAndStringReceiver.address);
        await shouldFailEmptyMessageStruct(emptyAndCommentAndStringReceiver.address);
        await shouldAcceptFrom(emptyAndCommentAndStringReceiver.address, 2, emptyAndCommentAndStringReceiver.getReceiver, "external_empty");
        // emptyAndCommentAndBinaryReceiver
        // should accept structs in binary receivers and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndCommentAndBinaryReceiver.address, emptyAndCommentAndBinaryReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndBinaryReceiver.address, emptyAndCommentAndBinaryReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(emptyAndCommentAndBinaryReceiver.address, 2, emptyAndCommentAndBinaryReceiver.getReceiver, "external_empty");
        // emptyAndCommentAndSliceReceiver
        // should accept the structs in fallback and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndCommentAndSliceReceiver.address, emptyAndCommentAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndSliceReceiver.address, emptyAndCommentAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptFrom(emptyAndCommentAndSliceReceiver.address, 2, emptyAndCommentAndSliceReceiver.getReceiver, "external_empty");
        // emptyAndStringAndBinaryReceiver
        // should accept structs in binary and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndStringAndBinaryReceiver.address, emptyAndStringAndBinaryReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(emptyAndStringAndBinaryReceiver.address, emptyAndStringAndBinaryReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(emptyAndStringAndBinaryReceiver.address, 2, emptyAndStringAndBinaryReceiver.getReceiver, "external_empty");
        // emptyAndStringAndSliceReceiver
        // should accept structs in fallback and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndStringAndSliceReceiver.address, emptyAndStringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyMessageStruct(emptyAndStringAndSliceReceiver.address, emptyAndStringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptFrom(emptyAndStringAndSliceReceiver.address, 2, emptyAndStringAndSliceReceiver.getReceiver, "external_empty");
        // emptyAndBinaryAndSliceReceiver
        // should accept structs in binary and the rest in the empty receiver
        await shouldAcceptMessageStruct(emptyAndBinaryAndSliceReceiver.address, emptyAndBinaryAndSliceReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(emptyAndBinaryAndSliceReceiver.address, emptyAndBinaryAndSliceReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(emptyAndBinaryAndSliceReceiver.address, 2, emptyAndBinaryAndSliceReceiver.getReceiver, "external_empty");
        // commentAndStringAndBinaryReceiver
        // should accept structs in binary receivers
        // and accept from 4 onwards at the string receiver
        await shouldAcceptMessageStruct(commentAndStringAndBinaryReceiver.address, commentAndStringAndBinaryReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(commentAndStringAndBinaryReceiver.address, commentAndStringAndBinaryReceiver.getReceiver, "external_binary_empty_message");
        await shouldFailIncompleteOpCode(commentAndStringAndBinaryReceiver.address);
        await shouldFailEmptyBody(commentAndStringAndBinaryReceiver.address);
        await shouldAcceptFrom(commentAndStringAndBinaryReceiver.address, 4, commentAndStringAndBinaryReceiver.getReceiver, "external_fallback_string");
        // commentAndStringAndSliceReceiver
        // should accept firsts in fallback
        // but accept the rest in the string receiver
        await shouldAcceptMessageStruct(commentAndStringAndSliceReceiver.address, commentAndStringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyMessageStruct(commentAndStringAndSliceReceiver.address, commentAndStringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptIncompleteOpCode(commentAndStringAndSliceReceiver.address, commentAndStringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyBody(commentAndStringAndSliceReceiver.address, commentAndStringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptFrom(commentAndStringAndSliceReceiver.address, 4, commentAndStringAndSliceReceiver.getReceiver, "external_fallback_string");
        // commentAndBinaryAndSliceReceiver
        // should accept structs in binary
        // should accept the rest in the fallback receiver
        await shouldAcceptMessageStruct(commentAndBinaryAndSliceReceiver.address, commentAndBinaryAndSliceReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(commentAndBinaryAndSliceReceiver.address, commentAndBinaryAndSliceReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(commentAndBinaryAndSliceReceiver.address, 2, commentAndBinaryAndSliceReceiver.getReceiver, "external_fallback");
        // stringAndBinaryAndSliceReceiver
        // should accept the structs in binary
        // should accept middle ones in fallback
        // and the rest in the string receiver
        await shouldAcceptMessageStruct(stringAndBinaryAndSliceReceiver.address, stringAndBinaryAndSliceReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(stringAndBinaryAndSliceReceiver.address, stringAndBinaryAndSliceReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptIncompleteOpCode(stringAndBinaryAndSliceReceiver.address, stringAndBinaryAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyBody(stringAndBinaryAndSliceReceiver.address, stringAndBinaryAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptFrom(stringAndBinaryAndSliceReceiver.address, 4, stringAndBinaryAndSliceReceiver.getReceiver, "external_fallback_string");
        // emptyAndCommentAndStringAndBinaryReceiver
        // structs in binary
        // rest in empty
        await shouldAcceptMessageStruct(emptyAndCommentAndStringAndBinaryReceiver.address, emptyAndCommentAndStringAndBinaryReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndStringAndBinaryReceiver.address, emptyAndCommentAndStringAndBinaryReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(emptyAndCommentAndStringAndBinaryReceiver.address, 2, emptyAndCommentAndStringAndBinaryReceiver.getReceiver, "external_empty");
        // emptyAndCommentAndStringAndSliceReceiver
        // structs in fallback
        // rest in empty
        await shouldAcceptMessageStruct(emptyAndCommentAndStringAndSliceReceiver.address, emptyAndCommentAndStringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndStringAndSliceReceiver.address, emptyAndCommentAndStringAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptFrom(emptyAndCommentAndStringAndSliceReceiver.address, 2, emptyAndCommentAndStringAndSliceReceiver.getReceiver, "external_empty");
        // emptyAndCommentAndBinaryAndSliceReceiver
        // structs in binary
        // rest in empty
        await shouldAcceptMessageStruct(emptyAndCommentAndBinaryAndSliceReceiver.address, emptyAndCommentAndBinaryAndSliceReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(emptyAndCommentAndBinaryAndSliceReceiver.address, emptyAndCommentAndBinaryAndSliceReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(emptyAndCommentAndBinaryAndSliceReceiver.address, 2, emptyAndCommentAndBinaryAndSliceReceiver.getReceiver, "external_empty");
        // emptyAndStringAndBinaryAndSliceReceiver
        // structs in binary
        // rest in empty
        await shouldAcceptMessageStruct(emptyAndStringAndBinaryAndSliceReceiver.address, emptyAndStringAndBinaryAndSliceReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(emptyAndStringAndBinaryAndSliceReceiver.address, emptyAndStringAndBinaryAndSliceReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(emptyAndStringAndBinaryAndSliceReceiver.address, 2, emptyAndStringAndBinaryAndSliceReceiver.getReceiver, "external_empty");
        // commentAndStringAndBinaryAndSliceReceiver
        // structs in binary
        // middle ones in the fallback receiver,
        // and the rest in the string receiver
        await shouldAcceptMessageStruct(commentAndStringAndBinaryAndSliceReceiver.address, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(commentAndStringAndBinaryAndSliceReceiver.address, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "external_binary_empty_message");
        await shouldAcceptIncompleteOpCode(commentAndStringAndBinaryAndSliceReceiver.address, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptEmptyBody(commentAndStringAndBinaryAndSliceReceiver.address, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "external_fallback");
        await shouldAcceptFrom(commentAndStringAndBinaryAndSliceReceiver.address, 4, commentAndStringAndBinaryAndSliceReceiver.getReceiver, "external_fallback_string");
        // allReceivers
        // structs in binary
        // the rest in the empty receiver
        await shouldAcceptMessageStruct(allReceivers.address, allReceivers.getReceiver, "external_binary");
        await shouldAcceptEmptyMessageStruct(allReceivers.address, allReceivers.getReceiver, "external_binary_empty_message");
        await shouldAcceptFrom(allReceivers.address, 2, allReceivers.getReceiver, "external_empty");
    });
    it("bounced receivers should process empty messages and empty strings correctly", async () => {
        // A message struct with empty string inside
        const emptyStringInMessageStruct = (0, core_1.beginCell)()
            .storeUint(100, 32)
            .storeStringRefTail("")
            .endCell();
        // An empty message struct
        const emptyMessageStruct = (0, core_1.beginCell)().storeUint(101, 32).endCell();
        // Message body with less than 32 bits in its opcode.
        const lessThan32Bits = (0, core_1.beginCell)().storeUint(10, 30).endCell();
        // An actual empty message body
        const emptyBody = new core_1.Cell();
        // Message body with integer of size exactly 32 bits but value 0.
        const zeroOf32Bits = (0, core_1.beginCell)().storeUint(0, 32).endCell();
        // Empty string
        const emptyString = (0, core_1.beginCell)()
            .storeUint(0, 32)
            .storeStringTail("")
            .endCell();
        const bodiesToTry = [
            emptyStringInMessageStruct,
            emptyMessageStruct,
            lessThan32Bits,
            emptyBody,
            zeroOf32Bits,
            emptyString,
        ];
        // Some utility functions that carry out the actual tests and assertions
        async function shouldAcceptFrom(from, testedContract, testedContractSend, receiverGetter, expectedReceiver) {
            for (const body of bodiesToTry.slice(from)) {
                await shouldAcceptBody(testedContract, testedContractSend, receiverGetter, expectedReceiver, body);
            }
        }
        async function shouldAcceptMessageStruct(testedContract, testedContractSend, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, testedContractSend, receiverGetter, expectedReceiver, emptyStringInMessageStruct);
        }
        async function shouldAcceptEmptyMessageStruct(testedContract, testedContractSend, receiverGetter, expectedReceiver) {
            await shouldAcceptBody(testedContract, testedContractSend, receiverGetter, expectedReceiver, emptyMessageStruct);
        }
        async function shouldAcceptBody(testedContract, testedContractSend, receiverGetter, expectedReceiver, body) {
            // Request testedContract to send a message to the contract that has no receivers.
            // Such contract will reject all messages and bounce them back into the
            // testedContract
            const { transactions } = await testedContractSend(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
                $$type: "SendCellToAddress",
                address: noReceivers.address,
                body: body,
            });
            expect(transactions).toHaveTransaction({
                from: noReceivers.address,
                to: testedContract,
                success: true,
            });
            expect(await receiverGetter()).toBe(expectedReceiver);
            const resetResult = await testedContractSend(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "reset");
            expect(resetResult.transactions).toHaveTransaction({
                from: treasure.address,
                to: testedContract,
                success: true,
            });
            expect(await receiverGetter()).toBe("unknown");
        }
        // Tests start here
        // emptyBounced should ignore all bounced messages without errors.
        // It succeeds its transaction for all cases but remains in "unknown" receiver
        await shouldAcceptFrom(0, emptyBounced.address, emptyBounced.send, emptyBounced.getReceiver, "unknown");
        // binaryBounced
        // It will catch the bounced binary messages.
        // The rest will ignore them without error, and remain in "unknown".
        await shouldAcceptMessageStruct(binaryBounced.address, binaryBounced.send, binaryBounced.getReceiver, "bounced_binary");
        await shouldAcceptEmptyMessageStruct(binaryBounced.address, binaryBounced.send, binaryBounced.getReceiver, "bounced_binary_empty_message");
        await shouldAcceptFrom(2, binaryBounced.address, binaryBounced.send, binaryBounced.getReceiver, "unknown");
        // sliceBounced
        // It will catch all cases in the fallback bounced receiver
        await shouldAcceptFrom(0, sliceBounced.address, sliceBounced.send, sliceBounced.getReceiver, "bounced_fallback");
        // allBounced
        // It will catch the bounced binary messages in the binary bounced receivers
        // The rest in the fallback bounced receiver
        await shouldAcceptMessageStruct(allBounced.address, allBounced.send, allBounced.getReceiver, "bounced_binary");
        await shouldAcceptEmptyMessageStruct(allBounced.address, allBounced.send, allBounced.getReceiver, "bounced_binary_empty_message");
        await shouldAcceptFrom(2, allBounced.address, allBounced.send, allBounced.getReceiver, "bounced_fallback");
    });
});
function getTransactionDescription(tsx) {
    if (tsx.description.type === "generic") {
        return tsx.description;
    }
    throw new Error("Expected generic transaction");
}

// scripts/update.cjs
const hre = require("hardhat");

async function main() {
    const { ethers } = hre;

    const lockerAddress = "<PASTE_DEPLOYED_ADDRESS_HERE>"; // Replace with real address

    // Use getContractAt instead of attach
    const locker = await ethers.getContractAt("PersonalLocker", lockerAddress);

    const tx = await locker.updateMessage("Assignment Completed", "mySecret123");
    await tx.wait();

    console.log("Message updated successfully!");
    const newMessage = await locker.viewMessage();
    console.log("New message:", newMessage);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

const hre = require("hardhat");

async function main() {
    const { ethers } = hre;

    const initialMessage = "Hello World!";
    const password = "mySecret123";

    // Deploy contract with constructor arguments
    const PersonalLocker = await ethers.getContractFactory("PersonalLocker");
    const locker = await PersonalLocker.deploy(initialMessage, password);

    // Wait for deployment to be mined
    await locker.deploymentTransaction().wait();

    console.log("✅ PersonalLocker deployed to:", locker.target);

    // Update the message using the correct password
    const tx = await locker.updateMessage("Assignment Completed", password);
    await tx.wait();

    console.log("✅ Message updated successfully!");

    const newMessage = await locker.viewMessage();
    console.log("📬 New message:", newMessage);

    // Optional: reveal password
    const revealed = await locker.revealPassword();
    console.log("🔑 Password is:", revealed);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// scripts/deploy.cjs
const hre = require("hardhat");

async function main() {
    const { ethers } = hre;

    // Get the contract factory
    const PersonalLocker = await ethers.getContractFactory("PersonalLocker");

    // Deploy the contract
    const locker = await PersonalLocker.deploy();

    // Wait for deployment to be mined (Ethers v6 syntax)
    await locker.deploymentTransaction().wait();

    console.log("PersonalLocker deployed to:", locker.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

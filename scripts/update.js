const hre = require("hardhat");

async function main() {
  // The address where your contract was deployed (copy from deploy.js output!)
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Get the ContractFactory and attach it to the deployed address
  const PersonalLocker = await hre.ethers.getContractFactory("PersonalLocker");
  const locker = PersonalLocker.attach(contractAddress);

  // Interact with the contract
  const tx = await locker.updateMessage("mySecret123", "Hello Blockchain!");
  await tx.wait();

  console.log("Message updated successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

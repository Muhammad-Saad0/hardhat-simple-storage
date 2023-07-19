const hre = require("hardhat");
const {
  ethers,
  run,
  network,
} = require("hardhat");

async function main() {
  const SimpleStorageFactory =
    await ethers.getContractFactory(
      "SimpleStorage"
    );
  console.log(
    "deploying contract, please wait..."
  );
  const simpleStorage =
    await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(
    `contract deployed at: ${simpleStorage.address}`
  );
  if (network.config.chainId !== 31337) {
    /*etherscan can have problems the contract might not
    be on etherscan yet so we wait 6 blockconfirmations then
    verify the contract*/
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
}

//these args parameter is related to constructor
async function verify(contractAddress, args) {
  console.log("verifying contract");
  //this allows us to run any hardhat task
  //(that can br run in terminal)

  //verify:verify means seccond verify if the subtask of verift command
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    console.log(error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

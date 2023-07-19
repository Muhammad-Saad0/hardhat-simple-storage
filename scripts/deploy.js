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
    console.log(
      "waiting for block confirmations"
    );
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const favNumber =
    await simpleStorage.retrieve();
  console.log(`fav number is: ${favNumber}`);
  const transaction = await simpleStorage.store(
    7
  );
  await transaction.wait(1);
  const updatedNumber =
    await simpleStorage.retrieve();
  console.log(`fav number is: ${updatedNumber}`);
}

//these args parameter is related to constructor
async function verify(contractAddress, args) {
  console.log("verifying contract...");
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

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Chris", "Miguel", "Priscilla"], // names
    [
      "https://i.imgur.com/2Xob5U6.jpg", //images
      "https://i.imgur.com/3itq0gz.png",
      "https://i.imgur.com/HXTuQrA.png",
    ],
    [100, 200, 300], //hp values
    [100, 50, 25], //attack dmg values
    "UCSD", //boss name
    "https://ca-times.brightspotcdn.com/dims4/default/40a2203/2147483647/strip/true/crop/620x413+0+0/resize/840x560!/format/webp/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8c%2F5a%2Fb1004c7c5f44b66f73eee93f1d40%2Fsdl-geisel-library-on-the-campus-of-20160830-001", //boss image
    10000, //boss health
    50 // boss attack dmg
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;

  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error.stack);
    process.exit(1);
  }
};

runMain();

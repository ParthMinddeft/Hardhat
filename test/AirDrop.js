const { expect, assert } = require("chai");

describe("Token contract", function () {
  it("Should Assert True", async () => {
    const Token = await ethers.getContractFactory("Erc721");
    const deployToken = await Token.deploy();

    await deployToken.addWhiteList("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");
    const getWhoitelist = await deployToken.whitelist("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");
    await assert.equal(getWhoitelist,true);
    // console.log("couner:",await deployToken._tokenIdCounter());

  });
});

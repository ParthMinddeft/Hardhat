// require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY = "_XafYNbEqGAAdRfmpcQSDyi_Wz2w__eG";
const GOERLI_PRIVATE = "d298cef5f10db9a9574118089f45bf62a1ac8764f1ad72589aa3d0b6221995b0";
module.exports = {
  solidity: "0.8.9",
  networks:{
    goerli:{
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${GOERLI_PRIVATE}`],
    },
  }
};

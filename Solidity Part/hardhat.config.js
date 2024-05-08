require("@nomicfoundation/hardhat-toolbox");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { INFURA_API_KEY, PRIVATE_KEY } = process.env;
// console.log(PRIVATE_KEY);

module.exports = {
  solidity: "0.8.11",
  defaultNetwork: "volta",
  networks: {
    hardhat: {},
    volta: {
      url: "https://volta-rpc.energyweb.org/",
      accounts: [
        "0xbc49e102e8e7c8d67bfcf64b01f801be43fd8bd39a11d8926170faa57f81e9ac",
      ],
      gas: 210000000,
      gasPrice: 800000000000,
    },
  },
};

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let Token;
    let hardhatToken;
    let owner;
    let add1;
    let add2;
    let addrs;

    beforeEach(async function () {
        [owner, add1, add2, ...addrs] = await ethers.getSigners();

        hardhatToken = await (await ethers.getContractFactory("Token")).deploy();
    });

    describe("Deployment", function () {
        it("should set the right owner", async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });

        it("should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transaction", function () {
        it("should transfer tokens between accounts", async function () {
            //owner account to add1.address
            await hardhatToken.transfer(add1.address, 5);
            const add1Balance = await hardhatToken.balanceOf(add1.address);
            expect(add1Balance).to.equal(5);
            await hardhatToken.connect(add1).transfer(add2.address, 5);
            const add2Balance = await hardhatToken.balanceOf(add2.address);
            expect(add2Balance).to.equal(5);
        });

        it("should fail if sender does not have enough tokens", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(add1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens"); //initially 0 tokens add1
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it("should update balances after transfers", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(add1.address, 5);
            await hardhatToken.transfer(add2.address, 10);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - 15);

            const add1Balance = await hardhatToken.balanceOf(add1.address);
            expect(add1Balance).to.equal(5);

            const add2Balance = await hardhatToken.balanceOf(add2.address);
            expect(add2Balance).to.equal(10);
        });
    });
});


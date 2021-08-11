const Auction = artifacts.require("Auction");
const Auction1 = artifacts.require("Auction");
const truffleAssert = require('truffle-assertions');


contract("Auction check highestBid and highestBidder", async accounts => {
  it("should not let highest bidder withdraw", async () => {
    const instance =  await Auction.deployed();
    await instance.bid({value: 100, from: accounts[1]});
    await instance.bid({value: 10000, from: accounts[2]});
    const highestbidder = await instance.highestBidder();
    await truffleAssert.reverts(
        instance.withdraw({from:highestbidder}),
        "Highest Bidder cannot withdraw"
    )
  });
 
 it("should set correctly the highest bid", async () => {
    const instance =  await Auction.deployed();
    await instance.bid({value: 100000, from: accounts[1]});
    await instance.bid({value: 1000000, from: accounts[2]});
    const highestbid = await instance.highestBid();
    assert.equal(highestbid.valueOf() , 1000000);
  }); 
  
  
});


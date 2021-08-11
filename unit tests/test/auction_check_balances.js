const Auction = artifacts.require("Auction");
const truffleAssert = require('truffle-assertions');


contract("Auction test if balances are setted right", async accounts => {

  
  it("contract balance should increment right after bid", async () => {
    const instance =  await Auction.deployed();
    const initial_contract_balance = await web3.eth.getBalance(instance.address);
    assert.equal(initial_contract_balance.valueOf() , 0, "Balance wasn't initialise right(it uses balance from the previous contract)");
    await instance.bid({value: 10000000, from: accounts[1]});
    const contract_balance = await web3.eth.getBalance(instance.address);
    assert.equal(contract_balance.valueOf() , 10000000, "Balance wasn't incremented right in first bid");
    await instance.bid({value: 100000000, from: accounts[2]});
    const contract_balance_new = await web3.eth.getBalance(instance.address);
    assert.equal(contract_balance_new.valueOf() , 110000000,"Balance wasn't incremented right in second bid");
  }); 
  
});


//SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 <= 0.8.3;

contract Auction {
    
    address public highestBidder; // The highest bidder's address 
    uint public highestBid; // The amount of the highest bid  
    mapping(address => uint) public  userBalances; // mapping for the amount to return 
    address owner;
    uint public auction_finished;
    
    constructor() {
        owner = msg.sender;
        highestBidder = owner;
        highestBid = 0;
        auction_finished = 0;
    }
    
    
    modifier onlyOwner(){
        require(msg.sender == owner,"Not the owner");
        _;
    }
    
    
    function bid() public payable{
        //Function to process bid
        require(msg.value > highestBid,"Your offer is less than the highest bid");
        if(msg.value > userBalances[msg.sender]){
            payable(msg.sender).transfer(userBalances[msg.sender]);    
        }
        
        userBalances[msg.sender] =  msg.value;
        uint newBid = userBalances[msg.sender] ;
        
        if(newBid > highestBid){
            highestBid = newBid;
            highestBidder = msg.sender; 
        }
    }
    
    function withdraw() public payable{
        //Function to withdraw the ammount of bid to return
   
        
        require(highestBid>0,"Bid is equal to zero, nothing to withdraw");
        
        if (msg.sender == owner){
             payable(msg.sender).transfer(userBalances[highestBidder]);
            
        } 
        else if (msg.sender != highestBidder) {
            payable(msg.sender).transfer(userBalances[msg.sender]);   
        }
    } 
    

    function canWithdraw () public view  returns(bool){
        if(highestBid>0){
            return true;
        }
        return false;
    }
    
    
    receive() external payable{}
    
}

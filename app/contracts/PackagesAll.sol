// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract PackagesAll {
 

  

  struct Package{
    uint32 senderId;
    address owner;
    address receiver;
    bytes32 userId;
    bytes32 description;
    bool isPaid;
    bool isReceived;
  }

  struct UserPackages  {
    Package[] packages;

  }
  mapping (address=>UserPackages) userPackages;

  constructor(){

  }

 function getMyPackages() public returns(uint32[] memory) {
   


Package[] memory packages = userPackages[msg.sender].packages;

uint32[] memory array = new uint32[](packages.length);

for (uint i = 0; i < packages.length; i++) {
    Package memory member = packages[i];
    array[i] = member.senderId;
}

return array;
}



function addPackageFree(bytes32 userId, uint32 senderId, bytes32 description) public {

Package memory package =  Package({senderId: senderId, receiver:address(0), description:description, owner:msg.sender, isPaid:false, userId: userId, isReceived: false});

userPackages[msg.sender].packages.push(package);

}

function addPackagePaid(bytes32 userId, uint32 senderId, bytes32 description, address receiver ) public {

  Package memory package =  
  Package({
     senderId: senderId,
     receiver:receiver, 
     description:description, 
     owner:msg.sender, 
     isPaid:false, 
     userId: userId, 
     isReceived:false});
  
  userPackages[msg.sender].packages.push(package);
  
  }

function getOne() public returns(uint) {


Package[] memory packages = userPackages[msg.sender].packages;
return packages.length;
}

}
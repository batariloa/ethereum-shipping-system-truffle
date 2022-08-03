// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract PackagesAll {
 

  

  struct Package{
    bytes32 packageId;
    bytes32 senderId;
  
    bytes32 receiverAddress;
    bytes32 description;
    address owner;
    bool isReceived;
  }

  struct UserPackages  {
    mapping (bytes32=> Package) packages;
      bytes32[] index;
     uint16 count;

  }
  mapping (bytes32=>UserPackages) userPackages;

  constructor(){

  }

 function getMyPackages(bytes32 userId) public returns(bytes32[] memory) {
   

//paketi za jednu postu
UserPackages storage userPackagesTemp = userPackages[userId];

bytes32[] memory array = new bytes32[](userPackagesTemp.count);

for (uint i = 0; i < userPackagesTemp.count; i++) {
    Package memory member = userPackagesTemp.packages[userPackagesTemp.index[i]];
    array[i] = member.senderId;
}

return array;
}



function addPackageFree( 
  bytes32 packageId,
  bytes32 senderId, 
  bytes32 receiverAddress, 
  bytes32 description) public {

Package memory package =  Package({packageId:packageId, senderId: senderId,  receiverAddress: receiverAddress, description:description, owner:msg.sender,  isReceived: false});

userPackages[senderId].packages[packageId] = package;
userPackages[senderId].index.push(packageId);
userPackages[senderId].count+=1;

}

function setReceived(bytes32 userId,bytes32 packageId) public{

 userPackages[userId].packages[packageId].isReceived = true;
  

}


function getOne(bytes32 userId) public view returns(uint) {



return userPackages[userId].count;
}

}
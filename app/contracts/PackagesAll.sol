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

 function getMyPackages(bytes32 userId) public view returns(
 bytes32[] memory,
 bytes32[] memory,
 bytes32[] memory,
 bytes32[] memory,
 address[] memory,
 bool[] memory
 ) {

//paketi za jednog korisnika
UserPackages storage userPackagesTemp = userPackages[userId];

bytes32[] memory arrayPackageId = new bytes32[](userPackagesTemp.count);
bytes32[] memory arraySenderId = new bytes32[](userPackagesTemp.count);
bytes32[] memory arrayReceiverAddress = new bytes32[](userPackagesTemp.count);
bytes32[] memory arrayDescription = new bytes32[](userPackagesTemp.count);
address[] memory arrayOwner = new address[](userPackagesTemp.count);
bool[] memory arrayIsReceived = new bool[](userPackagesTemp.count);



for (uint i = 0; i < userPackagesTemp.count; i++) {
    Package memory member = userPackagesTemp.packages[userPackagesTemp.index[i]];
    arrayPackageId[i] = member.packageId;
    arraySenderId[i] = member.senderId;
    arrayReceiverAddress[i] = member.receiverAddress;
    arrayDescription[i] = member.description;
    arrayOwner[i] = member.owner;
    arrayIsReceived[i] = member.isReceived;

}

return (
  arrayPackageId,
  arraySenderId,
  arrayReceiverAddress, 
  arrayDescription, 
  arrayOwner, 
  arrayIsReceived);


}



function addPackageFree( 
  bytes32 packageId,
  bytes32 senderId, 
  bytes32 receiverAddress, 
  bytes32 description) public {

Package memory package =  Package({
  packageId:packageId, 
senderId: senderId,  receiverAddress: receiverAddress, description:description, owner:msg.sender,  isReceived: false});

userPackages[senderId].packages[packageId] = package;
userPackages[senderId].index.push(packageId);
userPackages[senderId].count+=1;

}

function setReceived(bytes32 userId,bytes32 packageId, bool value) public{

 userPackages[userId].packages[packageId].isReceived = value;
  

}


function getOne(bytes32 userId) public view returns(uint) {



return userPackages[userId].count;
}




}
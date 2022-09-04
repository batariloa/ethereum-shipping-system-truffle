// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract PackagesAll {
  

  struct Package{
    bytes32 packageId;
    bytes32 senderId;
    string receiverAddress;
    string description;
    address owner;
    bool isReceived;
    bytes32 shipmentDate;
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
 string[] memory,
 string[] memory,
 address[] memory,
 bool[] memory,
 bytes32[] memory
 ) {

//paketi za jednog korisnika
UserPackages storage userPackagesTemp = userPackages[userId];

bytes32[] memory arrayPackageId = new bytes32[](userPackagesTemp.count);
bytes32[] memory arraySenderId = new bytes32[](userPackagesTemp.count);
string[] memory arrayReceiverAddress = new string[](userPackagesTemp.count);
string[] memory arrayDescription = new string[](userPackagesTemp.count);
address[] memory arrayOwner = new address[](userPackagesTemp.count);
bool[] memory arrayIsReceived = new bool[](userPackagesTemp.count);
bytes32[] memory arrayDate = new bytes32[](userPackagesTemp.count);


for (uint i = 0; i < userPackagesTemp.count; i++) {
    Package memory member = userPackagesTemp.packages[userPackagesTemp.index[i]];
    arrayPackageId[i] = member.packageId;
    arraySenderId[i] = member.senderId;
    arrayReceiverAddress[i] = member.receiverAddress;
    arrayDescription[i] = member.description;
    arrayOwner[i] = member.owner;
    arrayIsReceived[i] = member.isReceived;
    arrayDate[i] = member.shipmentDate;
}

return (
  arrayPackageId,
  arraySenderId,
  arrayReceiverAddress, 
  arrayDescription, 
  arrayOwner, 
  arrayIsReceived,
  arrayDate);
}



function addPackageFree( 
  bytes32 packageId,
  bytes32 senderId, 
  string memory receiverAddress, 
  string memory description,
  bytes32 shipmentDate) public {

Package memory package =  Package({
  packageId:packageId, 
  senderId: senderId,  
  receiverAddress: receiverAddress, 
  description:description, 
  owner:msg.sender,  
  isReceived: false,
  shipmentDate: shipmentDate
});

userPackages[senderId].packages[packageId] = package;
userPackages[senderId].index.push(packageId);
userPackages[senderId].count+=1;

}

function setReceived(bytes32 userId,bytes32 packageId, bool value) public{

 require(msg.sender == userPackages[userId].packages[packageId].owner);
 userPackages[userId].packages[packageId].isReceived = value;
  
}


function getOne(bytes32 userId, bytes32 packageId) public view returns(
  bytes32, 
  bytes32,
  string memory,
  string memory,
  address,
  bool,
  bytes32
  ) {

    Package memory package = userPackages[userId].packages[packageId];  


    string memory receiverAddress = package.receiverAddress;
    string memory description = package.description;
    address owner = package.owner;
    bool isReceived = package.isReceived;
    bytes32 shipmentDate = package.shipmentDate;

return (
  packageId,
  userId,
  receiverAddress, 
  description, 
  owner, 
  isReceived,
  shipmentDate);
}




}
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract PackagesAll {
 

  

  struct Package{
    uint32 id;
    address owner;
    address receiver;
    bytes32 description;
  }

  struct UserPackages  {
    Package[] packages;
    int16 count;

  }
  mapping (address=>UserPackages) userPackages;

  constructor(){

  }

 function getMyPackages() public returns(uint32[] memory) {
   


Package[] memory packages = userPackages[msg.sender].packages;

uint32[] memory array = new uint32[](packages.length);

for (uint i = 0; i < packages.length; i++) {
    Package memory member = packages[i];
    array[i] = member.id;
}

return array;
}


function addPackage(address receiver, uint32 id) public {

Package memory package =  Package({id: id, receiver:receiver, description:'test', owner:msg.sender});

userPackages[msg.sender].packages.push(package);

}

function getOne() public returns(uint) {

Package[] memory packages = userPackages[msg.sender].packages;
return packages.length;
}

}
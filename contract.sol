pragma solidity >=0.7.0 <0.9.0;

contract ChoHanGame {
	address private owner;
	uint private seed;
	
	mapping (address => bool) public latestBets;
	
	constructor() public {
		owner = msg.sender;
	}
    
  event Win(uint number);
  event Loose(uint number);
  // uint256 to bytes32
  function toBytes(uint256 x) internal pure returns (bytes memory b) {
    b = new bytes(32);
    assembly {
      mstore(add(b, 32), x)
    }
  }
    
  // returns a pseudo-random number
  function getRandomNumber() public returns (uint) {
    seed += block.timestamp + uint(uint160(msg.sender));
    uint randomNumber = uint(sha256(toBytes(uint(blockhash(block.number - 1)) + seed))) % 6;
    return randomNumber + 1;
  }

	function roll(string memory betType) public {
    uint randomNumber1 = getRandomNumber();
    uint randomNumber2 = getRandomNumber();
    uint sumRandomNumbers = randomNumber1 + randomNumber2;
    string memory randomType;

    if (sumRandomNumbers % 2==0) {
      randomType='even';
    }
    else {
      randomType= 'odd';
    }
    if (keccak256(abi.encodePacked(randomType)) == keccak256(abi.encodePacked(betType))) {
      emit Win(sumRandomNumbers);
      latestBets[msg.sender] = true;
    } else {
      emit Loose(sumRandomNumbers);
      latestBets[msg.sender] = false;
    }
	}
}
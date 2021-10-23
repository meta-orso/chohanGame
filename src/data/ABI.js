const ABI = [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, {
  anonymous: false,
  inputs: [{
    indexed: false, internalType: 'uint256', name: 'number', type: 'uint256',
  }],
  name: 'Loose',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: false, internalType: 'uint256', name: 'number', type: 'uint256',
  }],
  name: 'Win',
  type: 'event',
}, {
  inputs: [], name: 'getRandomNumber', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'latestBets', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function',
}, {
  inputs: [{ internalType: 'string', name: 'betType', type: 'string' }], name: 'roll', outputs: [], stateMutability: 'nonpayable', type: 'function',
}]

export default ABI

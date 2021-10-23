export const formatBalance = (balance) => (
  parseFloat((parseFloat(balance) / 10 ** 18).toFixed(3))
)

export const formatAddress = (address) => (
  `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`
)

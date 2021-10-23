/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import { formatAddress, formatBalance } from '../utils'
import ConnectWallet from './ConnectWallet'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: #ccc;
`

const HeaderText = styled.p`
  font-size: 18px;
  color: black;
`
const Header = ({ balance, address, onPressConnect }) => (
  <HeaderContainer>
    {balance && address ? (
      <HeaderText>{`${formatAddress(address)} ${formatBalance(balance)} ETH`}</HeaderText>
    ) : (
      <ConnectWallet onPressConnect={onPressConnect} />
    )}
  </HeaderContainer>
)

export default Header

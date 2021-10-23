/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border: 1px solid #A9A9A9;
  border-radius: 10px;
`
const BtnText = styled.div`
  font-size: 18px;
`

const ConnectWallet = ({ onPressConnect }) => (
  <BtnContainer onClick={onPressConnect}>
    <BtnText>Connect Wallet</BtnText>
  </BtnContainer>
)

export default ConnectWallet

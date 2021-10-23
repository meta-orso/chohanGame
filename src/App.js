/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'

import CONFIG from './data/config.json'
import ABI from './data/ABI'
import Header from './components/Header'

const Body = styled.div`
  padding-top: 50px;
  height: 900px;
  background-color: #B0B0B0;
  text-align: center;
`

const BtnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  border: 1px solid #707070;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 20px;
  :hover {
    cursor: pointer;
  }
`

const LatestBetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid black;
`

const LatestBet = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
  border: 1px solid #707070;
  border-radius: 5px;
  width: 150px;
  height: 30px;
  align-items: center;
`

const Text = styled.span`
  font-size: 16px;
`

let { web3 } = window
web3 = new Web3(web3.currentProvider)

const App = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [betResult, setBetResult] = useState('')
  const [betNumber, setBetNumber] = useState(0)
  const [latestBets, setLatestBets] = useState([])

  const getLatestUserBets = async () => {
    const choHanContract = new web3.eth.Contract(ABI, CONFIG.contractAddress)
    const userBets = await choHanContract.getPastEvents('allEvents', { fromBlock: 0, toBlock: 'latest' })
    setLatestBets(userBets)
  }

  useEffect(() => {
    async function init() {
      // await sessionStorage.clear()
      const storageData = await sessionStorage.getItem('userData')
      if (storageData) {
        const jsonData = JSON.parse(storageData)
        await getLatestUserBets(jsonData.address)
        setBalance(jsonData.balance)
        setAddress(jsonData.address)
      }
    }
    init()
  }, [])

  useEffect(() => {
    getLatestUserBets()
  }, [betNumber])

  const onPressConnect = async () => {
    const { selectedAddress } = window.ethereum
    const userBalance = await web3.eth.getBalance(selectedAddress)
    await sessionStorage.setItem('userData', JSON.stringify({
      address: selectedAddress,
      balance: userBalance,
    }))
    setBalance(userBalance)
    setAddress(selectedAddress)
  }

  const onPressPlaceBet = async (betType) => {
    const choHanContract = new web3.eth.Contract(ABI, CONFIG.contractAddress)
    const result = await choHanContract.methods.roll(betType).send({
      from: window.ethereum.selectedAddress,
    })
    const resultBet = result.events.Win || result.events.Loose
    const resultSumNumber = web3.utils.hexToNumberString(resultBet.raw.data)
    setBetResult(resultBet.event)
    setBetNumber(resultSumNumber)
  }

  return (
    <>
      <Header
        balance={balance}
        address={address}
        onPressConnect={onPressConnect}
      />
      <Body>
        {betNumber && betResult ? (
          <Text>{`Result number is ${betNumber} and you ${betResult}`}</Text>
        ) : (
          <Text>Press on even or odd button to start a game</Text>
        )}
        <BtnsContainer>
          <BtnContainer onClick={() => onPressPlaceBet('even')}>
            <Text>Even</Text>
          </BtnContainer>
          <BtnContainer onClick={() => onPressPlaceBet('odd')}>
            <Text>Odd</Text>
          </BtnContainer>
        </BtnsContainer>
        <LatestBetsContainer>
          <Text>Your latest bets with results</Text>
          {latestBets.map((bet, i) => (
            <LatestBet key={i}>
              <Text>{bet.event}</Text>
              <Text>{bet.returnValues.number}</Text>
            </LatestBet>
          ))}
        </LatestBetsContainer>
      </Body>
    </>
  )
}

export default App

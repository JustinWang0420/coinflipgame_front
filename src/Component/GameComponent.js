import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Web3 } from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import { formatBalance, formatChainAsNum } from './utils'

import './styles.css'; // Make sure to import your CSS file

const { CoinFlipGameABI } = require("../ContractABI/CoinFlipGameContract_ABI.json")
const { StandardTokenABI } = require("../ContractABI/StandardToken_ABI.json")

const GameComponent = () => {
  const { userId } = useParams();

  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [], Etherbalance: "", chainId: "", tokenBalance: "" }  /* Updated */
  const [wallet, setWallet] = useState(initialState)  /* New */

  const [betAmount, setBetAmount] = useState(0);

  const tokenContractAddress = process.env.REACT_APP_TOKEN_ADDRESS;
  const gameContractAddress = process.env.REACT_APP_GAME_ADDRESS;
  const teamAddress = process.env.REACT_APP_TEAM_ADDRESSS;
  const web3Instance = new Web3(window.ethereum);

  const tokenContractInstance = new web3Instance.eth.Contract(StandardTokenABI, tokenContractAddress);
  const gameContractInstance = new web3Instance.eth.Contract(CoinFlipGameABI, gameContractAddress);
  const uniswapUrl = 'https://app.uniswap.org/#/swap?outputCurrency=0xc32db1d3282e872d98f6437d3bcfa57801ca6d5c';
  const metamaskUrl = 'https://metamask.io/download/';

  async function sendTransaction() {
    if (userId === 0) return;

    const userAccount = wallet.accounts[0];
    const GamegasEstimate = await gameContractInstance.methods.playGame(userId).estimateGas({ from: userAccount });
    const TokengasEstimate = await tokenContractInstance.methods.approve(gameContractAddress, betAmount.toString()).estimateGas({ from: userAccount });
    
    // Get gas price from the network
    const gasPrice = await web3Instance.eth.getGasPrice();
    try {
      const approvedAmount = await tokenContractInstance.methods.allowance(userAccount, gameContractAddress).call();
      if (betAmount > approvedAmount) {
        const ApprovalResponse = await tokenContractInstance.methods.approve(gameContractAddress, betAmount.toString()).send({ from: userAccount, gasPrice: gasPrice + 3000000n, gas: TokengasEstimate + 3000000n });
        console.log('Approve Transaction Hash:', ApprovalResponse.transactionHash)
      }

      // Send Token to Gameplay Function on Game Contract
      const transactionResponse = await gameContractInstance.methods.playGame(userId).send({ from: userAccount, gasPrice: gasPrice + 3000000, gas: GamegasEstimate + 3000000n });
      console.log('Transaction hash:', transactionResponse.transactionHash);

    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  }

  useEffect(() => {
    async function getBetAmount() {
      console.log("getBetAmountValue")
      try {
        const betAmountValue = await gameContractInstance.methods.betAmount().call();
        setBetAmount(betAmountValue);
        console.log(betAmountValue, "betAmountValue")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts)
      } else {
        // if length 0, user is disconnected
        setWallet(initialState)
      }
      getBetAmount()
    }

    const refreshChain = (chainId) => {               /* New */
      setWallet((wallet) => ({ ...wallet, chainId }))      /* New */
    }                                                      /* New */

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {
        const accounts = await window.ethereum.request(
          { method: 'eth_accounts' }
        )
        refreshAccounts(accounts)
        window.ethereum.on('accountsChanged', refreshAccounts)
        window.ethereum.on("chainChanged", refreshChain)  /* New */
      }
    }

    getProvider()

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
      window.ethereum?.removeListener("chainChanged", refreshChain)  /* New */
    }
  }, [])

  const updateWallet = async (accounts) => {
    const Etherbalance = formatBalance(await window.ethereum.request({   /* New */
      method: "eth_getBalance",                                      /* New */
      params: [accounts[0], "latest"],                               /* New */
    }))                                                              /* New */
    const chainId = await window.ethereum.request({                 /* New */
      method: "eth_chainId",                                         /* New */
    })

    const _tokenBalance = await tokenContractInstance.methods.balanceOf(accounts[0]).call();
    const tokenBalance = formatBalance(_tokenBalance);
    console.log(tokenBalance, "tokenBalance")
    setWallet({ accounts, Etherbalance, chainId, tokenBalance })                        /* Updated */
  }                                                /* New */

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    updateWallet(accounts)
  }

  return (
    <div className="token-game-container">
      <h1 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>SCROTO HUNT GAME</h1>
      <div className="button-container">
        {
          hasProvider ? (
            wallet.accounts.length > 0 ? (
              // This block will be rendered if 'connected' is true
              <p style={{ textAlign: "center" }}>You are connected to MetaMask.</p>
            ) : (
              // This block will be rendered if 'connected' is false
              <button onClick={handleConnect}>Connect MetaMask</button>
            )
          ) : (
            <a className="BuyVRT" href={metamaskUrl} target="_blank" rel="noopener noreferrer">
              Please Install MetaMask
            </a>
          )
        }
        {wallet.accounts.length > 0 &&
          <div className="account-info">
            <p className="balance">Bet Amount: {formatBalance(betAmount)}</p>
            <p className="account-title">Connected to Account: <b>{wallet.accounts[0]}</b></p>
            <p className="balance">VoldemortTrumpRobotnik-10Neko ETHEREUM Balance: {wallet.tokenBalance}</p>
            {parseInt(wallet.tokenBalance) > formatBalance(betAmount) ? <button onClick={sendTransaction}>Scroto</button> :
              <a className="BuyVRT" href={uniswapUrl} target="_blank" rel="noopener noreferrer">Buy VRT</a>}
          </div>
        }
      </div>
    </div>
  );
};

export default GameComponent;
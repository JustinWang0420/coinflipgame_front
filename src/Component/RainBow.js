import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getAccount, parseEther, Account, Chain, Transport, WalletClient } from "viem";
import { useAccount, useContractRead, useContractReads, useAllowance, useWaitForTransaction } from "wagmi";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { testABI } from "../ContractABI/testABI";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import './styles.css'; // Make sure to import your CSS file
import { formatBalance, formatChainAsNum } from './utils'
// import { waitForTransaction } from "@wagmi/core"

const { createWalletClient, custom, createPublicClient, http, providers, Wallet } = require('viem');

const { mainnet, goerli } = require('viem/chains');

const walletClient = createWalletClient({
    chain: goerli,
    transport: custom(window.ethereum)
});
const publicClient = createPublicClient({
    chain: goerli,
    transport: http()
});
const { CoinFlipGameABI } = require("../ContractABI/CoinFlipGameContract_ABI.js")
const { StandardTokenABI } = require("../ContractABI/StandardToken_ABI.js")

const contractAddress = process.env.REACT_APP_TOKEN_ADDRESS;
const tokenContractAddress = process.env.REACT_APP_TOKEN_ADDRESS;
const gameContractAddress = process.env.REACT_APP_GAME_ADDRESS;
const uniswapUrl = 'https://app.uniswap.org/#/swap?outputCurrency=0xc32db1d3282e872d98f6437d3bcfa57801ca6d5c';

const RainBow = () => {
    const provider = walletClient;
    const Instance = new Web3(provider);
    const gameContractInstance = new Instance.eth.Contract(CoinFlipGameABI, gameContractAddress);
    const tokenContractInstance = new Instance.eth.Contract(StandardTokenABI, tokenContractAddress);
    const gasPrice = Instance.eth.getGasPrice();
    const [clientAddress, setClientAddress] = useState("");
    const [tokenBalance, setTokenBalence] = useState("");
    const { userId } = useParams();
    const [betAmount, setBetAmount] = useState(0);
    const [approvedAmount, setApprovedAmount] = useState(0);
    const { isConnected, address } = useAccount();
    let playgameValue;
    useEffect(() => {
        // console.log("address.tokenBalance ::: ", address.tokenBalance)
        const betAmountValuePromise = gameContractInstance.methods.betAmount().call();
        betAmountValuePromise.then((betAmountValue) => {
            const betAmountValueString = betAmountValue.toString();
            // console.log("betamount ::: ", betAmountValueString * 10);
            setBetAmount(betAmountValueString * 10);
        });
        const _tokenBalance = tokenContractInstance.methods.balanceOf(address).call();
        _tokenBalance.then((tokenvalue) => {
            const tokenamountValueString = tokenvalue.toString();
            // console.log("_tokenbalance ::: ", tokenamountValueString)
            setTokenBalence(tokenamountValueString);
        })
        // console.log("_tokenbalance ::: ", _tokenBalance);
        // setBetAmount(betAmountValue.toString());
        // console.log("betamount ::: ", betAmountValue.toString(), betAmount)
        // console.log("provider", Instance);
        // console.log(userId);
        async function fetchAddresses() {
            if (walletClient && walletClient.getAddresses) {
                const addresses = await walletClient.getAddresses();
                setClientAddress(addresses[0]);
            }
        }
        // console.log("ApprovalResponse :: ", ApprovalResponse)
        fetchAddresses();
    }, [tokenBalance]);
    async function Transaction() {
        const account = getAccount(clientAddress);
        const spenderAddress = gameContractAddress;
        const amount = betAmount;
        const approvedAmountPromise = tokenContractInstance.methods.allowance(address, gameContractAddress).call();
        approvedAmountPromise.then((approvedAmountvalue) => {
            const approvedAmountString = approvedAmountvalue.toString();
            // console.log("approvedAmountString ::: ", approvedAmountString, " betAmountValueString ::: ", betAmount);
            setApprovedAmount(approvedAmount);
        });
        // console.log("approvedAmount ::: ", approvedAmount, "betAmount ::: ", betAmount.fulfilled);
        try {
            const approveValue = await walletClient.writeContract({
                address: tokenContractAddress,
                abi: StandardTokenABI,
                functionName: "approve",
                args: [spenderAddress, amount],
                account,
            });
            await new Promise(resolve => setTimeout(resolve, 13000));
            walletClient.writeContract({
                address: gameContractAddress,
                abi: CoinFlipGameABI,
                functionName: "playGame",
                args: [userId],
                account,
            });
        } catch (error) {
            console.log("ERROR:", error);
        }
    }
    return (
        <div className="token-game-container" >
            <h1 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>SCROTO HUNT GAME</h1>
            <ConnectButton />
            {address && (
                <>
                    <p className="balance" style={{ color: "black " }}>Bet Amount:{formatBalance(betAmount)}</p>
                    {!parseInt(tokenBalance) ? <p className="balance" style={{ color: "black " }}>Token Amount : 0</p> : <p className="balance" style={{ color: "black " }}>Token Amount : {parseInt(tokenBalance)}</p>}

                    {parseInt(tokenBalance) > formatBalance(betAmount) ? <Button onClick={Transaction} variant="outline" color="black" style={{ backgroundColor: 'black' }}>Scroto</Button> :
                        <a href={uniswapUrl} style={{ color: "white" }} target="_blank">
                            <Button variant="outline" color="black" style={{ backgroundColor: 'black' }}>
                                Buy VRT
                            </Button>

                        </a>}
                </>
            )}
        </div>
    );
};
export default RainBow;



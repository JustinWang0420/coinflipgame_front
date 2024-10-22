import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getAccount } from "viem";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import Web3 from "web3";
import './styles.css'; // Make sure to import your CSS file
import { formatBalance, formatChainAsNum } from './utils'
import { useSelector, useDispatch } from 'react-redux'
import { CSbetAmount, CStokenBalance, CSapproveamount } from '../reducers/counterSlice';
const { createWalletClient, custom, createPublicClient, http, providers, Wallet } = require('viem');
const { mainnet, goerli } = require('viem/chains');
const walletClient = createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum)
});
const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
});
const { CoinFlipGameABI } = require("../ContractABI/CoinFlipGameContract_ABI.js")
const { StandardTokenABI } = require("../ContractABI/StandardToken_ABI.js")
const tokenContractAddress = process.env.REACT_APP_TOKEN_ADDRESS;
const gameContractAddress = process.env.REACT_APP_GAME_ADDRESS;
const uniswapUrl = 'https://app.uniswap.org/#/swap?outputCurrency=0xc32db1d3282e872d98f6437d3bcfa57801ca6d5c';
const RainBow = () => {
    const { SbetAmount, StokenBalance, Sapproveamount } = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const { isConnected, address } = useAccount();
    const provider = walletClient;
    const Instance = new Web3(provider);
    const gameContractInstance = new Instance.eth.Contract(CoinFlipGameABI, gameContractAddress);
    const tokenContractInstance = new Instance.eth.Contract(StandardTokenABI, tokenContractAddress);
    const [clientAddress, setClientAddress] = useState("");
    const [tokenBalance, setTokenBalence] = useState("");
    const { userId } = useParams();
    const [betAmount, setBetAmount] = useState(0);
    const [approvedAmount, setApprovedAmount] = useState(0);
    useEffect(() => {
        async function fetchAddresses() {
            if (walletClient && walletClient.getAddresses) {
                const addresses = await walletClient.getAddresses();
                setClientAddress(addresses[0]);
            }
        }
        fetchAddresses();
        if (address) {
            TokenBalce();
            BetAmountVal();
            ApproveVal();
        }
    }, []);
    async function TokenBalce() {
        const _tokenBalance = tokenContractInstance.methods.balanceOf(address).call();
        _tokenBalance.then((tokenvalue) => {
            const tokenamountValueString = tokenvalue.toString();
            dispatch(CStokenBalance(tokenamountValueString));
            setTokenBalence(tokenamountValueString);
        })
    }
    async function ApproveVal() {
        const approvedAmountPromise = tokenContractInstance.methods.allowance(address, gameContractAddress).call();
        approvedAmountPromise.then((approvedAmountvalue) => {
            const approvedAmountString = approvedAmountvalue.toString();
            setApprovedAmount(approvedAmountString);
            dispatch(CSapproveamount(approvedAmountString));
        });
    }
    async function BetAmountVal() {
        const betAmountValuePromise = gameContractInstance.methods.betAmount().call();
        betAmountValuePromise.then((betAmountValue) => {
            const betAmountValueString = betAmountValue.toString();
            dispatch(CSbetAmount(betAmountValueString));
            setBetAmount(betAmountValueString);
        });
    }
    async function Transaction() {
        const account = getAccount(clientAddress);
        const spenderAddress = gameContractAddress;
        const amount = betAmount;
        try {
            const approvedAmountPromise = await tokenContractInstance.methods.allowance(address, gameContractAddress).call();
            if (approvedAmountPromise >= betAmount) {
                await walletClient.writeContract({
                    address: gameContractAddress,
                    abi: CoinFlipGameABI,
                    functionName: "playGame",
                    args: [userId],
                    account,
                });

            }
            else {
                const approveHash = await walletClient.writeContract({
                    address: tokenContractAddress,
                    abi: StandardTokenABI,
                    functionName: "approve",
                    args: [spenderAddress, amount],
                    account,
                });
                if (approveHash) {
                    const hashC = await publicClient.waitForTransactionReceipt({
                        hash: approveHash,
                    })
                    if (hashC.status) {
                        try {
                            await walletClient.writeContract({
                                address: gameContractAddress,
                                abi: CoinFlipGameABI,
                                functionName: "playGame",
                                args: [userId],
                                account,
                            });
                        }
                        catch (err) {
                            console.log("ERR", err)
                        }
                        console.log("betamount :::", betAmount);
                        console.log("approvedAmount ::: ", localStorage.getItem('allowanceValue'));
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
        }
        TokenBalce();
    }

    return (
        <div className="token-game-container" >
            <h1 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>SCROTO HUNT GAME</h1>
            <ConnectButton />
            {address && (
                <>
                    <p className="balance" style={{ color: '#ce30cf', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Bet Amount:{SbetAmount / 10 ** 18}</p>
                    {!parseInt(StokenBalance) ? <p className="balance" style={{ color: '#ce30cf', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Token Amount : 0</p> : <p className="balance" style={{ color: '#ce30cf', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Token Amount : {StokenBalance / 10 ** 18}</p>}
                    {parseInt(StokenBalance) > formatBalance(SbetAmount) ? <Button onClick={Transaction} variant="outline" color="black" style={{ backgroundColor: 'black' }}>Scroto</Button> :
                        <a href={uniswapUrl} style={{ color: "#ce30cf" }} target="_blank">
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
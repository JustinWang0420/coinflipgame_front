import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getAccount } from "viem";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import Web3 from "web3";
import './styles.css'; // Make sure to import your CSS file
import { formatBalance, formatChainAsNum } from './utils'

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
            const betAmountValuePromise = gameContractInstance.methods.betAmount().call();
            // console.log("betAmountValuePromise :::: ", betAmountValuePromise)
            betAmountValuePromise.then((betAmountValue) => {
                const betAmountValueString = betAmountValue.toString();
                // console.log("betamount ::: ", betAmountValueString);
                setBetAmount(betAmountValueString);
            });
            const _tokenBalance = tokenContractInstance.methods.balanceOf(address).call();
            _tokenBalance.then((tokenvalue) => {
                const tokenamountValueString = tokenvalue.toString();
                // console.log("_tokenbalance ::: ", tokenamountValueString)
                setTokenBalence(tokenamountValueString);
            })
            // console.log("_tokenbalance ::: ", _tokenBalance);
            // console.log("provider", Instance);
            // console.log(userId);
        }
    }, []);
    async function Transaction() {
        var allowanceval;
        const account = getAccount(clientAddress);
        // console.log(account);
        // return;
        const spenderAddress = gameContractAddress;
        const amount = betAmount
        const approvedAmountPromise = tokenContractInstance.methods.allowance(address, gameContractAddress).call();
        approvedAmountPromise.then((approvedAmountvalue) => {
            const approvedAmountString = approvedAmountvalue.toString();
            allowanceval = approvedAmountvalue.toString();
            // console.log("approvedAmountString ::: ", approvedAmountString, " betAmountValueString ::: ", betAmount);
            setApprovedAmount(approvedAmountString);
            console.log("approvedAmount ::: ", approvedAmount)
        });
        if (allowanceval >= betAmount) {
            walletClient.writeContract({
                address: gameContractAddress,
                abi: CoinFlipGameABI,
                functionName: "playGame",
                args: [userId],
                account,
            });
        }
        else {
            try {
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
                    if (hashC.status)
                        walletClient.writeContract({
                            address: gameContractAddress,
                            abi: CoinFlipGameABI,
                            functionName: "playGame",
                            args: [userId],
                            account,
                        });
                }
            } catch (error) {
                console.log("ERROR:", error);
            }
        }
        // return;

    }
    return (
        <div className="token-game-container" >
            <h1 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>SCROTO HUNT GAME</h1>
            <ConnectButton />
            {address && (
                <>
                    <p className="balance" style={{ color: '#ce30cf', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Bet Amount:{betAmount / 10 ** 18}</p>
                    {!parseInt(tokenBalance) ? <p className="balance" style={{ color: '#ce30cf', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Token Amount : 0</p> : <p className="balance" style={{ color: '#ce30cf', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Token Amount : {tokenBalance / 10 ** 18}</p>}

                    {parseInt(tokenBalance) > formatBalance(betAmount) ? <Button onClick={Transaction} variant="outline" color="black" style={{ backgroundColor: 'black' }}>Scroto</Button> :
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

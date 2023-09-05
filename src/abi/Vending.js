export const vendingAbi = [
    {
        "inputs": [
            { "internalType": "address", "name": "_admin", "type": "address" },
            { "internalType": "uint256", "name": "_cost", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_cost", "type": "uint256" }
        ],
        "name": "setCost",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_pool", "type": "address" }
        ],
        "name": "setPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "spin",
        "outputs": [
            { "internalType": "address", "name": "collection", "type": "address" },
            { "internalType": "uint96", "name": "id", "type": "uint96" },
            { "internalType": "uint256", "name": "idx", "type": "uint256" }
        ],
        "stateMutability": "payable",
        "type": "function"
    }
];

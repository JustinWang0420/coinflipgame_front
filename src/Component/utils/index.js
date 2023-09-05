export const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}

export const formatChainAsNum = (chainIdHex) => {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum
}

export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
        /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};
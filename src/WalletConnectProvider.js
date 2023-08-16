import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  rpc: {
    1: process.env.RPC_URL,
  },
};

const walletConnectProvider = new WalletConnectProvider(providerOptions);

export default walletConnectProvider;

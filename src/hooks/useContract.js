const { createWalletClient, custom, createPublicClient, http } = require('viem');
const { mainnet, goerli } = require('viem/chains');

const walletClient = createWalletClient({
  chain: goerli,
  transport: custom(window.ethereum)
});

const publicClient = createPublicClient({
  chain: goerli,
  transport: http()
});

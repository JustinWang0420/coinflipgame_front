import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index'
import reportWebVitals from './reportWebVitals';
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  Theme,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { ALCHEMY_ID, OPTIMISM_CHAIN, GOERLI_CHAIN, Mainnet_CHAIN } from "./constants/constants";
import { publicProvider } from "wagmi/providers/public";
import { merge } from "lodash";
const { chains, provider } = configureChains(
  [Mainnet_CHAIN],
  [alchemyProvider({ apiKey: "D08vr46q29Hiqhw4A5mijhrsA9hgUNIZ" }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Perpetual-lp-tool",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#1D4ED8",
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={myTheme} chains={chains}>
        <Provider store={store}>
          <App />
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Wagmi
import '@rainbow-me/rainbowkit/styles.css';
import {
  // getDefaultWallets,
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient,  WagmiConfig } from 'wagmi';
import { optimismGoerli, polygonMumbai, gnosis} from 'wagmi/chains';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Chain } from 'wagmi/chains';
import { Place } from "./Place";

import {
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';





const LatticeChain: Chain = {
  id: 4242,
  name: 'Lattice',
  network: 'lattice',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'eth',
  },
  rpcUrls: {
    default: {
      http: ['https://follower.testnet-chain.linfra.xyz'],
    },
    public: {
      http: ['https://follower.testnet-chain.linfra.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'explorer', url: 'https://explorer.testnet-chain.linfra.xyz' },
  },
  testnet: true,
};



const { chains, provider } = configureChains(
  [gnosis, optimismGoerli,  polygonMumbai , LatticeChain],
  [
    // alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);




// const { connectors } = getDefaultWallets({
//   appName: 'My RainbowKit App',
//   chains
// });

const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      metaMaskWallet({ chains })
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})





export const App = () => {


  return (
    <div className="w-screen h-screen flex items-center justify-center">
        <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <BrowserRouter>
      <Routes>
        {/* <Route path="leaderboard" element={<Search />} /> */}
        <Route path="*" element={<Place />}>
    </Route>
      </Routes>
    </BrowserRouter>
    </RainbowKitProvider>
    </WagmiConfig>

    </div>
  );
};
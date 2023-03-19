import { GameBoard } from "./Gameboard";
import { SyncState } from "@latticexyz/network";
import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { Palette } from "./Palette";
import { useState } from "react";

//Wagmi
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { optimism} from 'wagmi/chains';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Profile } from "./ConnectButton";
import { Chain } from 'wagmi/chains';
import { SelectTool } from "./SelectTool";


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
  [optimism, LatticeChain],
  [
    // alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export const App = () => {
  const [color, setColor] = useState(16);

  const {
    components: { LoadingState },
    singletonEntity,
  } = useMUD();

  const loadingState = useComponentValue(LoadingState, singletonEntity, {
    state: SyncState.CONNECTING,
    msg: "Connecting",
    percentage: 0,
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
        <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
         {loadingState.state !== SyncState.LIVE ? (
        <div>
          {loadingState.msg} ({Math.floor(loadingState.percentage)}%)
        </div>
      ) : (
        <div >
          
          <div className="fixed top-0 right-0 p-8"><Profile /></div>
        <Palette pickcolor={color} setcolor={setColor}/>
        <GameBoard pickcolor={color}/>
        </div>
      )}
           </RainbowKitProvider>
    </WagmiConfig>

    </div>
  );
};
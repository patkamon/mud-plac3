import { SetupContractConfig } from "@latticexyz/std-client";
import { getBurnerWallet } from "./getBurnerWallet";

const params = new URLSearchParams(window.location.search);



export declare type chainContracts = {
  graphURL?: string,
  chainId: number,
  worldAddress: string,
  colorSystemAddress: string,
  isDev: string,
  rpc: string,
  wss: string
  initialBlockNumber: number
}



export const Lattice:chainContracts = {
  worldAddress: "0xC8C8fFFdA9791A978478078Af96B68Ba170AC38e", // latticexyz
  colorSystemAddress:  "0x11E150fc2f43f53F03870D191C31975DEE5e4Adc", // lattice colorsystem
  chainId: 4242,
  isDev: "false",
  rpc: "https://follower.testnet-chain.linfra.xyz",
  wss: "wss://follower.testnet-chain.linfra.xyz",
  initialBlockNumber: 9554308
}

export const Mumbai:chainContracts = {
  graphURL: 'https://api.studio.thegraph.com/query/44126/demo-plac3/1.1',
  worldAddress: "0x99d12D5cCA713517c10733FBF44De401a96Af356",
  colorSystemAddress:  "0x40612C35d3AFC92C3b1e541F1cc8BeF6e5c1fD23", 
  chainId: 80001,
  isDev: "false",
  rpc: "https://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq",
  wss: "wss://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq",
  initialBlockNumber: 33544015
}

export const Optimism:chainContracts = {
  worldAddress: "0x5Ad8C2610D92870e37db9013FF8AE171E944C7c5",
  colorSystemAddress:  "0x9189b5a063bd2fE1e38227EE6e888a8eAA0e081E", 
  chainId: 10,
  isDev: "false",
  rpc: "https://opt-mainnet.g.alchemy.com/v2/XajVGvOXlQuwxZDV8OhZZsysww879C__",
  wss: "wss://opt-mainnet.g.alchemy.com/v2/XajVGvOXlQuwxZDV8OhZZsysww879C__",
  initialBlockNumber: 83587025
}

export const Local:chainContracts ={
  worldAddress: params.get("worldAddress")!, 
  colorSystemAddress:  "", 
  chainId: 31337,
  isDev: "true",
  rpc: "http://localhost:8545",
  wss: "ws://localhost:8545",
  initialBlockNumber: Number(params.get("initialBlockNumber")) || 0
}

export const Gnosis:chainContracts ={
  graphURL: "https://api.studio.thegraph.com/query/44126/plac3-gno/0.1",
  worldAddress: "0x93a43cD27a63B2295F4Bc0154cADDF3af84f5FaF", 
  colorSystemAddress:  "0x239303A4bB3a4e457E37921FCcB8a8A6795E84c4", 
  chainId: 100,
  isDev: "false",
  rpc: "https://rpc.gnosischain.com/",
  wss: "wss://rpc.gnosischain.com/wss",
  initialBlockNumber: 27115236
}


const chainid = -1 || (window as any).ethereum.networkVersion;

export const usedchain = chainid == 80001 ? Mumbai : chainid == 10 ? Optimism : chainid == 100 ? Gnosis : Lattice



export const config: SetupContractConfig & { faucetServiceUrl?: string } = {
  clock: {
    period: 1000,
    initialTime: 0,
    syncInterval: 5000,
  },
  provider: {
    jsonRpcUrl:
      params.get("rpc") ?? usedchain.rpc,
    wsRpcUrl: params.get("wsRpc") ?? usedchain.wss,
    chainId: Number(params.get("chainId")) || usedchain.chainId,
  },
  privateKey: getBurnerWallet().privateKey,
  chainId: Number(params.get("chainId")) || usedchain.chainId,
  snapshotServiceUrl:
    params.get("snapshot") ??
    "https://ecs-snapshot.testnet-mud-services.linfra.xyz",
  faucetServiceUrl:
    params.get("faucet") ?? "https://faucet.testnet-mud-services.linfra.xyz",
  initialBlockNumber: usedchain.initialBlockNumber,
  worldAddress: usedchain.worldAddress, // latticexyz
  devMode: params.get("dev") === usedchain.isDev,
};

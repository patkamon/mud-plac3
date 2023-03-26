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
  wss: string,
  initialBlockNumber: number,
  playerCompo?: string
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
  initialBlockNumber: 33544015,
  playerCompo: "0x919b4DdFa95Ae46DAfE2DC90a9A309b979Ce0b0e"
}

export const OptimismG:chainContracts = {
  graphURL: "https://api.studio.thegraph.com/query/44126/plac3-opt-goerli/1",
  worldAddress: "0x179Ae487Af52987005298C457d63aEE34846fADC",
  colorSystemAddress:  "0xE8A9A75050779E3a756FF70B63DE013a5ad5da69", 
  chainId: 420,
  isDev: "false",
  rpc: "https://opt-goerli.g.alchemy.com/v2/ntP1ouS6wLZKPDHTscanVmOJ9krFFHLs",
  wss: "wss://opt-goerli.g.alchemy.com/v2/ntP1ouS6wLZKPDHTscanVmOJ9krFFHLs",
  initialBlockNumber: 7200865,
  playerCompo: "0xb6487e7D9e6A08EE1f926d578622998b217b614F"
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
  initialBlockNumber: 27115236,
  playerCompo: "0xa9fd39524650aB6c881B4709828dDF0A2314bDbF"
}


let chainid 
 try {
  chainid =  (window as any).ethereum.networkVersion }
  catch(err){
   chainid = -1
  } 

export const usedchain = chainid == 80001 ? Mumbai : chainid == 420 ? OptimismG : chainid == 100 ? Gnosis : Lattice



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

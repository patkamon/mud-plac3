import { SetupContractConfig } from "@latticexyz/std-client";
import { getBurnerWallet } from "./getBurnerWallet";

const params = new URLSearchParams(window.location.search);

export declare type chainContracts = {
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
  worldAddress: "0x423dA7B583ED4D8fe7e2F4824bc6654B73beff91",
  colorSystemAddress:  "0x3060B21CfAe6D0Cd8A52B7777D9a264d8196814e", 
  chainId: 80001,
  isDev: "false",
  rpc: "https://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq",
  wss: "wss://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq",
  initialBlockNumber: 33378841
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

export const usedchain = Mumbai;

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

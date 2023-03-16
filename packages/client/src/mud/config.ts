import { SetupContractConfig } from "@latticexyz/std-client";
import { getBurnerWallet } from "./getBurnerWallet";

const params = new URLSearchParams(window.location.search);

export declare type chainContracts = {
  worldAddress: string,
  colorSystemAddress: string
}

export const Lattice:chainContracts = {
  worldAddress: "0xf573A8cCe71553D47e8A30E6f0c6292d25ecE945", // latticexyz
  colorSystemAddress:  "0xC5ee9B6f55bE96AAba03538b7b36f1dd5c8e3810", // lattice colorsystem
}

export const config: SetupContractConfig & { faucetServiceUrl?: string } = {
  clock: {
    period: 1000,
    initialTime: 0,
    syncInterval: 5000,
  },
  provider: {
    jsonRpcUrl:
      params.get("rpc") ?? "https://follower.testnet-chain.linfra.xyz",
    wsRpcUrl: params.get("wsRpc") ?? "wss://follower.testnet-chain.linfra.xyz",
    chainId: Number(params.get("chainId")) || 4242,
  },
  privateKey: getBurnerWallet().privateKey,
  chainId: Number(params.get("chainId")) || 4242,
  snapshotServiceUrl:
    params.get("snapshot") ??
    "https://ecs-snapshot.testnet-mud-services.linfra.xyz",
  faucetServiceUrl:
    params.get("faucet") ?? "https://faucet.testnet-mud-services.linfra.xyz",
  initialBlockNumber: 9250179,
  worldAddress: Lattice.worldAddress, // latticexyz
  devMode: params.get("dev") === "false",
};

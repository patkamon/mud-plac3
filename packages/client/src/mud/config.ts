import { SetupContractConfig } from "@latticexyz/std-client";
import { getBurnerWallet } from "./getBurnerWallet";

const params = new URLSearchParams(window.location.search);
const str = location.host
const port = str.substr(str.length - 4)

export const config: SetupContractConfig & { faucetServiceUrl?: string } = {
  // clock: {
  //   period: 1000,
  //   initialTime: 0,
  //   syncInterval: 5000,
  // },
  // provider: {
  //   jsonRpcUrl: params.get("rpc") ?? "http://localhost:8545",
  //   wsRpcUrl: params.get("wsRpc") ?? "ws://localhost:8545",
  //   chainId: Number(params.get("chainId")) || 31337,
  // },
  // privateKey: getBurnerWallet().privateKey,
  // chainId: Number(params.get("chainId")) || 31337,
  // snapshotServiceUrl: params.get("snapshot") ?? undefined,
  // faucetServiceUrl: params.get("faucet") ?? undefined,
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
  // initialBlockNumber: Number(params.get("initialBlockNumber")) || 0,
  initialBlockNumber: 9250179,
  // worldAddress: params.get("worldAddress")!,
  worldAddress: "0xf573A8cCe71553D47e8A30E6f0c6292d25ecE945",
  devMode: params.get("dev") === "false",
};

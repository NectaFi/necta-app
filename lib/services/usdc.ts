import { erc20Abi } from "viem";
import { env } from "@/env";
import { useContractWrite, useContractRead } from "wagmi";

const USDC_ADDRESS = env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;

export function useUSDCApproval() {
  return useContractWrite({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "approve",
  });
}

export function useUSDCBalance(address: `0x${string}` | undefined) {
  return useContractRead({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    enabled: !!address,
  });
}

export function useUSDCAllowance({
  owner,
  spender,
}: {
  owner: `0x${string}` | undefined;
  spender: `0x${string}` | undefined;
}) {
  return useContractRead({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "allowance",
    args: owner && spender ? [owner, spender] : undefined,
    enabled: !!owner && !!spender,
  });
}

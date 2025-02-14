"use client"

import { useContractWrite, useContractRead } from "wagmi"
import { type Address, erc20Abi } from "viem"
import { env } from "@/env"
import { useCallback } from "react"

const USDC_ADDRESS = env.NEXT_PUBLIC_USDC_ADDRESS as Address

export function useUSDCApproval() {
  return useContractWrite({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "approve",
  })
}

export function useUSDCBalance(address?: Address) {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const formattedBalance = useCallback(() => {
    if (!data) return "0"
    return (Number(data) / 1e6).toString() // USDC has 6 decimals
  }, [data])

  return {
    data: formattedBalance(),
    isError,
    isLoading,
    refetch,
  }
}

export function useUSDCAllowance({
  owner,
  spender,
}: {
  owner?: Address
  spender?: Address
}) {
  const { data, isError, isLoading, refetch } = useContractRead({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "allowance",
    args: owner && spender ? [owner, spender] : undefined,
    query: {
      enabled: !!(owner && spender),
    },
  })

  return {
    data: data as bigint,
    isError,
    isLoading,
    refetch,
  }
}

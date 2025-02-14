import { env } from "@/env"
import { type Address, formatUnits, parseUnits, erc20Abi } from "viem"
import { publicClient } from "@/lib/utils/wagmi"

const USDC_ADDRESS = env.NEXT_PUBLIC_USDC_ADDRESS as Address
const DECIMALS = 6

export async function getUSDCBalance(address: Address): Promise<string> {
  try {
    const balance = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address],
    })

    return formatUnits(balance, DECIMALS)
  } catch (error) {
    console.error("Error fetching USDC balance:", error)
    return "0"
  }
}

export async function getUSDCAllowance(
  owner: Address,
  spender: Address,
): Promise<bigint> {
  try {
    const allowance = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: "allowance",
      args: [owner, spender],
    })

    return allowance
  } catch (error) {
    console.error("Error fetching USDC allowance:", error)
    return BigInt(0)
  }
}

export function parseUSDCAmount(amount: string): bigint {
  try {
    return parseUnits(amount, DECIMALS)
  } catch (error) {
    console.error("Error parsing USDC amount:", error)
    return BigInt(0)
  }
}

export function formatUSDCAmount(amount: bigint): string {
  try {
    return formatUnits(amount, DECIMALS)
  } catch (error) {
    console.error("Error formatting USDC amount:", error)
    return "0"
  }
}

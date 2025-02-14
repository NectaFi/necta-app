import { ConsoleKit } from "brahma-console-kit"
import { env } from "@/env"
import type { Address } from "viem"

export class ConsoleKitService {
  private static instance: ConsoleKitService
  private consoleKit: ConsoleKit

  private constructor() {
    if (!env.NEXT_PUBLIC_CONSOLE_API_KEY) {
      throw new Error("CONSOLE_API_KEY is required")
    }
    this.consoleKit = new ConsoleKit({
      apiKey: env.NEXT_PUBLIC_CONSOLE_API_KEY,
      baseUrl: "https://console.brahma.fi/api",
      chainId: 8453, // Base mainnet
      rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`,
    })
  }

  static getInstance(): ConsoleKitService {
    if (!ConsoleKitService.instance) {
      ConsoleKitService.instance = new ConsoleKitService()
    }
    return ConsoleKitService.instance
  }

  async deployBrahmaAccount(userAddress: Address): Promise<Address> {
    try {
      const { accountAddress } = await this.consoleKit.deployAccount({
        owner: userAddress,
        chainId: 8453, // Base mainnet
      })
      return accountAddress as Address
    } catch (error) {
      throw new Error(
        `Failed to deploy Brahma account: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      )
    }
  }

  async getAccountStatus(accountAddress: Address): Promise<{
    isDeployed: boolean
    isActive: boolean
  }> {
    try {
      const { isDeployed, isActive } = await this.consoleKit.getAccountStatus({
        accountAddress,
        chainId: 8453, // Base mainnet
      })
      return {
        isDeployed,
        isActive,
      }
    } catch (error) {
      throw new Error(
        `Failed to get account status: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      )
    }
  }
}

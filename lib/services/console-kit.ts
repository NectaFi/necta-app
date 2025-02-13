import { ConsoleKit } from "brahma-console-kit";
import { env } from "@/env";

export class ConsoleKitService {
  private static instance: ConsoleKitService;
  private consoleKit: ConsoleKit;

  private constructor() {
    if (!env.NEXT_PUBLIC_CONSOLE_API_KEY) {
      throw new Error("CONSOLE_API_KEY is required");
    }
    this.consoleKit = new ConsoleKit(env.NEXT_PUBLIC_CONSOLE_API_KEY);
  }

  static getInstance(): ConsoleKitService {
    if (!ConsoleKitService.instance) {
      ConsoleKitService.instance = new ConsoleKitService();
    }
    return ConsoleKitService.instance;
  }

  async deployBrahmaAccount(
    userAddress: `0x${string}`
  ): Promise<`0x${string}`> {
    try {
      const response = await this.consoleKit.deployAccount({
        owner: userAddress,
        chainId: 8453, // Base mainnet
      });
      return response.accountAddress as `0x${string}`;
    } catch (error) {
      throw new Error(
        `Failed to deploy Brahma account: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getAccountStatus(accountAddress: `0x${string}`): Promise<{
    isDeployed: boolean;
    isActive: boolean;
  }> {
    try {
      const status = await this.consoleKit.getAccountStatus(accountAddress);
      return {
        isDeployed: status.isDeployed,
        isActive: status.isActive,
      };
    } catch (error) {
      throw new Error(
        `Failed to get account status: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

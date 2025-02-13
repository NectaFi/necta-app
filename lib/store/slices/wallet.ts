import type { StateCreator } from "zustand"
import { api } from "@/lib/api/client"
import type { WalletData } from "@/lib/types"

export interface WalletSlice {
  // State
  walletData: WalletData | null
  brahmaAccount: `0x${string}` | null
  deploymentStatus: "idle" | "deploying" | "deployed" | "error"

  // Actions
  fetchWalletData: () => Promise<void>
  setBrahmaAccount: (account: `0x${string}` | null) => void
  setDeploymentStatus: (
    status: "idle" | "deploying" | "deployed" | "error",
  ) => void
  deployBrahmaAccount: (userAddress: `0x${string}`) => Promise<void>
}

export const createWalletSlice: StateCreator<
  WalletSlice & { isLoading: boolean; error: string | null },
  [],
  [],
  WalletSlice
> = (set) => ({
  // Initial state
  walletData: null,
  brahmaAccount: null,
  deploymentStatus: "idle",

  // Actions
  fetchWalletData: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await api.wallet.getData()
      set({ walletData: data })
    } catch (_error) {
      set({ error: "Failed to fetch wallet data" })
    } finally {
      set({ isLoading: false })
    }
  },

  setBrahmaAccount: (account) => {
    set({ brahmaAccount: account })
  },

  setDeploymentStatus: (status) => {
    set({ deploymentStatus: status })
  },

  deployBrahmaAccount: async (userAddress) => {
    try {
      set({ deploymentStatus: "deploying", error: null })
      const account = await api.wallet.deployBrahmaAccount(userAddress)
      set({ brahmaAccount: account, deploymentStatus: "deployed" })
    } catch (error) {
      set({
        deploymentStatus: "error",
        error:
          error instanceof Error
            ? error.message
            : "Failed to deploy Brahma account",
      })
    }
  },
})

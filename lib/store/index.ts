import { create } from "zustand"
import { createWalletSlice, type WalletSlice } from "./slices/wallet"
import { createAgentSlice, type AgentSlice } from "./slices/agent"

interface Store extends WalletSlice, AgentSlice {
  isLoading: boolean
  error: string | null
}

export const useStore = create<Store>()((...args) => ({
  // Initial state
  isLoading: false,
  error: null,

  // Combine slices
  ...createWalletSlice(...args),
  ...createAgentSlice(...args),
}))

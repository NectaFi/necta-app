import { create } from "zustand"
import { createWalletSlice, type WalletSlice } from "./slices/wallet"
import { createAgentSlice, type AgentSlice } from "./slices/agent"

interface Store extends WalletSlice, AgentSlice {}

export const useStore = create<Store>()((...args) => ({
  // Combine slices
  ...createWalletSlice(...args),
  ...createAgentSlice(...args),
}))

// Export individual slice hooks
export const useWalletStore = () => {
  const store = useStore()
  return {
    walletData: store.walletData,
    brahmaAccount: store.brahmaAccount,
    deploymentStatus: store.deploymentStatus,
    error: store.error,
    fetchWalletData: store.fetchWalletData,
    setBrahmaAccount: store.setBrahmaAccount,
    setDeploymentStatus: store.setDeploymentStatus,
    deployBrahmaAccount: store.deployBrahmaAccount,
  }
}

export const useAgentStore = () => {
  const store = useStore()
  return {
    agents: store.agents,
    thoughts: store.thoughts,
    isLoading: store.isLoading,
    error: store.error,
    fetchAgentStatus: store.fetchAgentStatus,
    fetchThoughts: store.fetchThoughts,
    initializeAgents: store.initializeAgents,
  }
}

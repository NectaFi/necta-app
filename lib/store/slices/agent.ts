import type { StateCreator } from "zustand"
import { api } from "@/lib/api/client"
import type { AgentStatus, Thought } from "@/lib/types"
import type { Address } from "viem"

// Mock data for development
const _MOCK_AGENTS: AgentStatus[] = [
  {
    agent: "Sentinel",
    status: "active",
    lastActive: new Date().toISOString(),
    description:
      "Monitoring market conditions and yield opportunities across protocols.",
  },
  {
    agent: "Curator",
    status: "processing",
    lastActive: new Date().toISOString(),
    description:
      "Analyzing and selecting the best yield strategies based on risk parameters.",
  },
  {
    agent: "Executor",
    status: "active",
    lastActive: new Date().toISOString(),
    description:
      "Executing optimized yield strategies with gas-efficient operations.",
  },
]

const _MOCK_THOUGHTS: Thought[] = [
  {
    id: "1",
    agent: "Sentinel",
    message: "Detected higher APY opportunity on Morpho (10.78%)",
    timestamp: new Date().toISOString(),
    metadata: {
      tools: ["APY Scanner", "Risk Analyzer"],
    },
  },
  {
    id: "2",
    agent: "Curator",
    message: "Analyzing rebalancing opportunity: +2.5% APY increase possible",
    timestamp: new Date(Date.now() - 5000).toISOString(),
    metadata: {
      tools: ["Strategy Optimizer"],
    },
  },
  {
    id: "3",
    agent: "Executor",
    message: "Successfully rebalanced position for optimal yield",
    timestamp: new Date(Date.now() - 10000).toISOString(),
    metadata: {
      tools: ["Transaction Manager"],
      report: "Rebalanced 1000 USDC to Morpho for 10.78% APY",
    },
  },
]

export interface AgentSlice {
  // State
  agents: AgentStatus[]
  thoughts: Thought[]
  isLoading: boolean
  error: string | null

  // Actions
  fetchAgentStatus: (account: Address) => Promise<void>
  fetchThoughts: () => Promise<void>
  initializeAgents: (brahmaAccount: Address) => Promise<void>
}

export const createAgentSlice: StateCreator<AgentSlice, [], [], AgentSlice> = (
  set,
) => ({
  // Initial state
  agents: [],
  thoughts: [],
  isLoading: false,
  error: null,

  // Actions
  fetchAgentStatus: async (account) => {
    try {
      set({ isLoading: true, error: null })
      const data = await api.agents.getStatus(account)
      set({ agents: data })
    } catch (error) {
      set({
        error: `Failed to fetch agent status: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchThoughts: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await api.agents.getThoughts()
      set({ thoughts: data })
    } catch (error) {
      set({
        error: `Failed to fetch thoughts: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  initializeAgents: async (brahmaAccount) => {
    try {
      set({ isLoading: true, error: null })
      await api.agents.initialize(brahmaAccount)
    } catch (error) {
      set({
        error: `Failed to initialize agents: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      })
    } finally {
      set({ isLoading: false })
    }
  },
})

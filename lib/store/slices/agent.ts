import type { StateCreator } from "zustand"
import { api } from "@/lib/api/client"
import type { AgentStatus, Thought } from "@/lib/types"

export interface AgentSlice {
  // State
  agents: AgentStatus[]
  thoughts: Thought[]

  // Actions
  fetchAgentStatus: () => Promise<void>
  fetchThoughts: () => Promise<void>
}

export const createAgentSlice: StateCreator<
  AgentSlice & { isLoading: boolean; error: string | null },
  [],
  [],
  AgentSlice
> = (set) => ({
  // Initial state
  agents: [],
  thoughts: [],

  // Actions
  fetchAgentStatus: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await api.agents.getStatus()
      set({ agents: data })
    } catch (_error) {
      set({ error: "Failed to fetch agent status" })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchThoughts: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await api.agents.getThoughts()
      set({ thoughts: data })
    } catch (_error) {
      set({ error: "Failed to fetch thoughts" })
    } finally {
      set({ isLoading: false })
    }
  },
})

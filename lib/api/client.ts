import { env } from "@/env"
import {
  AgentStatusSchema,
  ThoughtSchema,
  WalletDataSchema,
  type AgentStatus,
  type Thought,
  type WalletData,
} from "@/lib/types"

const API_BASE = env.NEXT_PUBLIC_API_URL

// Agent-related API endpoints
const agents = {
  async initialize(brahmaAccount: `0x${string}`): Promise<any> {
    const response = await fetch(`${API_BASE}/agents/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brahmaAccount }),
    })

    if (!response.ok) {
      throw new Error("Failed to initialize agents")
    }

    return response.json()
  },

  async getStatus(brahmaAccount: `0x${string}`): Promise<AgentStatus[]> {
    const response = await fetch(
      `${API_BASE}/agents/status?account=${brahmaAccount}`,
    )
    if (!response.ok) {
      throw new Error("Failed to fetch agent status")
    }
    const data = await response.json()
    return AgentStatusSchema.array().parse(data)
  },

  async getThoughts(): Promise<Thought[]> {
    const response = await fetch(`${API_BASE}/thoughts`)
    if (!response.ok) {
      throw new Error("Failed to fetch thoughts")
    }
    const data = await response.json()
    return ThoughtSchema.array().parse(data)
  },
}

// Wallet-related API endpoints
const wallet = {
  async getData(): Promise<WalletData> {
    const response = await fetch(`${API_BASE}/wallet/data`)
    if (!response.ok) {
      throw new Error("Failed to fetch wallet data")
    }
    const data = await response.json()
    return WalletDataSchema.parse(data)
  },

  async deployBrahmaAccount(
    userAddress: `0x${string}`,
  ): Promise<`0x${string}`> {
    const response = await fetch(`${API_BASE}/wallet/deploy-brahma`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userAddress }),
    })

    if (!response.ok) {
      throw new Error("Failed to deploy Brahma account")
    }

    const data = await response.json()
    return data.accountAddress as `0x${string}`
  },
}

export const api = {
  agents,
  wallet,
}

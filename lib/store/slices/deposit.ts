import type { StateCreator } from "zustand"

export interface DepositSlice {
  // State
  amount: string
  status: "idle" | "approving" | "depositing" | "completed" | "error"

  // Actions
  setAmount: (amount: string) => void
  setStatus: (
    status: "idle" | "approving" | "depositing" | "completed" | "error",
  ) => void
  handleDeposit: (brahmaAccount: `0x${string}`) => Promise<void>
}

export const createDepositSlice: StateCreator<
  DepositSlice & { isLoading: boolean; error: string | null },
  [],
  [],
  DepositSlice
> = (set) => ({
  // Initial state
  amount: "",
  status: "idle",

  // Actions
  setAmount: (amount) => {
    set({ amount })
  },

  setStatus: (status) => {
    set({ status })
  },

  handleDeposit: async (_brahmaAccount) => {
    try {
      set({ status: "approving", error: null })

      // TODO: Implement USDC approval
      // const approved = await approveUSDC(brahmaAccount, parseUnits(amount, 6))

      set({ status: "depositing" })
      // TODO: Implement deposit
      // await depositUSDC(brahmaAccount, parseUnits(amount, 6))

      set({ status: "completed" })
    } catch (error) {
      set({
        status: "error",
        error:
          error instanceof Error ? error.message : "Failed to complete deposit",
      })
    }
  },
})

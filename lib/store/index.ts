import { create } from "zustand";
import { createWalletSlice, type WalletSlice } from "./slices/wallet";
import { createDepositSlice, type DepositSlice } from "./slices/deposit";

interface Store extends WalletSlice, DepositSlice {
  isLoading: boolean;
  error: string | null;
}

export const useStore = create<Store>()((...args) => ({
  // Initial state
  isLoading: false,
  error: null,

  // Combine slices
  ...createWalletSlice(...args),
  ...createDepositSlice(...args),
}));

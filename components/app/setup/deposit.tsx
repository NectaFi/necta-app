"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { parseUnits } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useUSDCApproval,
  useUSDCBalance,
  useUSDCAllowance,
} from "@/lib/services/usdc";
import { api } from "@/lib/api/client";

interface DepositProps {
  brahmaAccount: `0x${string}`;
  onSuccess?: () => void;
}

export function Deposit({ brahmaAccount, onSuccess }: DepositProps) {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<
    "idle" | "approving" | "depositing" | "completed"
  >("idle");

  // Get USDC contract interactions
  const { write: approve } = useUSDCApproval();
  const { data: balance } = useUSDCBalance(address);
  const { data: allowance, refetch: refetchAllowance } = useUSDCAllowance({
    owner: address,
    spender: brahmaAccount,
  });

  // Handle deposit flow
  const handleDeposit = async () => {
    if (!amount || !address || !brahmaAccount) return;

    try {
      const amountInWei = parseUnits(amount, 6); // USDC has 6 decimals

      // Check if approval is needed
      if (!allowance || allowance < amountInWei) {
        setStatus("approving");
        await approve({
          args: [brahmaAccount, amountInWei],
        });
        await refetchAllowance();
      }

      setStatus("depositing");
      // For MVP, we'll just initialize agents after approval
      await api.agents.initialize(brahmaAccount);

      setStatus("completed");
      onSuccess?.();
    } catch (error) {
      console.error("Deposit failed:", error);
      setStatus("idle");
    }
  };

  // Reset status if amount changes
  useEffect(() => {
    if (status !== "idle") {
      setStatus("idle");
    }
  }, [amount]);

  return (
    <div className="space-y-4">
      <Input
        type="number"
        placeholder="Amount (USDC)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="10"
        disabled={status !== "idle"}
      />
      <p className="text-sm text-muted-foreground">Minimum deposit: 10 USDC</p>
      <Button
        onClick={handleDeposit}
        disabled={
          !amount ||
          parseFloat(amount) < 10 ||
          status !== "idle" ||
          !balance ||
          parseFloat(amount) > parseFloat(balance.toString())
        }
      >
        {status === "approving"
          ? "Approving..."
          : status === "depositing"
          ? "Depositing..."
          : status === "completed"
          ? "Completed"
          : "Deposit & Activate Agents"}
      </Button>
    </div>
  );
}

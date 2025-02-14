"use client"

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { parseUnits } from "viem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  useUSDCApproval,
  useUSDCBalance,
  useUSDCAllowance,
} from "@/hooks/use-usdc"
import { api } from "@/lib/api/client"

interface DepositProps {
  brahmaAccount: `0x${string}`
  onSuccess?: () => void
}

export function Deposit({ brahmaAccount, onSuccess }: DepositProps) {
  const { address } = useAccount()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState<
    "idle" | "approving" | "depositing" | "completed"
  >("idle")
  const [error, setError] = useState<string | null>(null)

  // Get USDC contract interactions
  const { write: approve } = useUSDCApproval()
  const { data: balance } = useUSDCBalance(address)
  const { data: allowance, refetch: refetchAllowance } = useUSDCAllowance({
    owner: address,
    spender: brahmaAccount,
  })

  // Handle deposit flow
  const handleDeposit = async () => {
    if (!amount || !address || !brahmaAccount) return
    setError(null)

    try {
      const amountInWei = parseUnits(amount, 6) // USDC has 6 decimals

      // Check if approval is needed
      if (!allowance || allowance < amountInWei) {
        setStatus("approving")
        toast({
          title: "Approval Required",
          description: "Please approve USDC spending to continue",
        })

        await approve({
          args: [brahmaAccount, amountInWei],
        })
        await refetchAllowance()

        toast({
          title: "Approval Successful",
          description: "Proceeding with deposit...",
        })
      }

      setStatus("depositing")
      toast({
        title: "Initializing Agents",
        description: "Please wait while we set up your agents...",
      })

      // For MVP, we'll just initialize agents after approval
      await api.agents.initialize(brahmaAccount)

      setStatus("completed")
      toast({
        title: "Success",
        description: "Your deposit was successful and agents are now active!",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Deposit failed:", error)
      setStatus("idle")
      setError(
        error instanceof Error ? error.message : "Failed to process deposit",
      )
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to process deposit",
        variant: "destructive",
      })
    }
  }

  // Reset status if amount changes
  useEffect(() => {
    if (status !== "idle") {
      setStatus("idle")
    }
    setError(null)
  }, [amount])

  const isLoading = status === "approving" || status === "depositing"
  const buttonText =
    status === "approving"
      ? "Approving USDC..."
      : status === "depositing"
        ? "Initializing Agents..."
        : status === "completed"
          ? "Completed"
          : "Deposit & Activate Agents"

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          type="number"
          placeholder="Amount (USDC)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="10"
          disabled={isLoading}
          className="h-12 text-lg"
        />
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">Minimum deposit: 10 USDC</p>
          {balance && (
            <p className="text-muted-foreground">
              Balance: {Number.parseFloat(balance).toFixed(2)} USDC
            </p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        onClick={handleDeposit}
        disabled={
          !amount ||
          Number.parseFloat(amount) < 10 ||
          isLoading ||
          !balance ||
          Number.parseFloat(amount) > Number.parseFloat(balance.toString())
        }
        className="h-12 w-full"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {buttonText}
      </Button>
    </div>
  )
}

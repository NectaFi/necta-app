"use client"

import { useState } from "react"
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi"
import { parseUSDCAmount } from "@/lib/services/usdc"
import { env } from "@/env"
import { erc20Abi } from "viem"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useToast } from "./ui/use-toast"

export function Deposit({ safeAddress }: { safeAddress: string }) {
  const [amount, setAmount] = useState("")
  const { address } = useAccount()
  const { toast } = useToast()

  const { data: approveData, write: approve } = useContractWrite({
    abi: erc20Abi,
    functionName: "approve",
    address: env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
  })

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess() {
      toast({
        title: "Approval successful",
        description: "You can now deposit USDC",
      })
    },
    onError(error: Error) {
      toast({
        title: "Error approving USDC",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const handleApprove = async () => {
    if (!amount || !address || !approve) return
    try {
      const parsedAmount = parseUSDCAmount(amount)
      approve({
        args: [safeAddress, parsedAmount],
      })

      toast({
        title: "Approving USDC",
        description: "Please wait for the transaction to be confirmed",
      })
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (USDC)</Label>
        <Input
          id="amount"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min="0"
          step="0.000001"
        />
      </div>
      <Button
        onClick={handleApprove}
        disabled={!amount || isApproving}
        className="w-full"
      >
        {isApproving ? "Approving..." : "Approve USDC"}
      </Button>
    </div>
  )
}

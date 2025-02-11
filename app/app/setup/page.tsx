"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ChevronRight, Wallet, Shield } from "lucide-react"

type SetupStep = "deploy" | "deposit"

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState<SetupStep>("deploy")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDeploy = async () => {
    setIsLoading(true)
    // Simulate deployment
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setCurrentStep("deposit")
  }

  const handleDeposit = async () => {
    setIsLoading(true)
    // Simulate deposit
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    router.push("/app/dashboard")
  }

  return (
    <main className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center px-4 pt-24">
      <Card className="w-full max-w-[500px] border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
        <div className="flex items-center justify-between border-white/[0.08] border-b pb-4">
          <h1 className="font-semibold text-white text-xl">Setup Required</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">Step</span>
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-sm text-white">
              {currentStep === "deploy" ? "1" : "2"}/2
            </span>
          </div>
        </div>

        {currentStep === "deploy" && (
          <div className="mt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-white/[0.08] p-2">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-medium text-white">Deploy Smart Account</h2>
                <p className="mt-1 text-sm text-white/60">
                  Deploy a secure smart account to enable automated yield
                  optimization. You maintain full control of your assets at all
                  times.
                </p>
                <div className="mt-4 rounded-lg bg-white/[0.05] p-4">
                  <p className="text-sm text-white/80">
                    • Full self-custody - only you control your funds
                    <br />• No token approvals needed
                    <br />• All agent operations are gas-optimized
                  </p>
                </div>
                <Button
                  className="mt-4 w-full gap-2 bg-[#F29600] text-white hover:bg-[#F29600]/80"
                  onClick={handleDeploy}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Deploy Smart Account
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentStep === "deposit" && (
          <div className="mt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-white/[0.08] p-2">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-medium text-white">Initial Deposit</h2>
                <p className="mt-1 text-sm text-white/60">
                  Transfer USDC to start earning optimized yields. All agent
                  operations are gas-optimized with no additional costs.
                </p>
                <div className="mt-4">
                  <Input
                    type="number"
                    placeholder="Enter USDC amount"
                    className="mb-2 border-white/[0.08] bg-white/[0.05] text-white placeholder:text-white/40"
                  />
                  <p className="text-white/40 text-xs">
                    Minimum deposit: 10 USDC
                  </p>
                </div>
                <div className="mt-4 rounded-lg bg-white/[0.05] p-4">
                  <p className="text-sm text-white/80">
                    • All agent operation costs are covered
                    <br />• Withdraw your funds anytime
                    <br />• Automatic yield optimization across protocols
                  </p>
                </div>
                <Button
                  className="mt-4 w-full gap-2 bg-[#F29600] text-white hover:bg-[#F29600]/80"
                  onClick={handleDeposit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Deposit & Start Earning
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </main>
  )
}

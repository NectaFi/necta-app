"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ChevronRight, Wallet, Shield, Rocket } from "lucide-react"

type SetupStep = "deploy" | "deposit" | "activate"

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState<SetupStep>("deploy")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // TODO: Add smart account deployment logic
  const handleDeploy = async () => {
    setIsLoading(true)
    // Simulate deployment
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setCurrentStep("deposit")
  }

  // TODO: Add deposit logic
  const handleDeposit = async () => {
    setIsLoading(true)
    // Simulate deposit
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setCurrentStep("activate")
  }

  // TODO: Add activation logic
  const handleActivate = async () => {
    setIsLoading(true)
    // Simulate activation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <main className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center px-4 pt-24">
      <Card className="w-full max-w-[500px] border border-white/[0.08] bg-zinc-900/[0.65] p-6 backdrop-blur-md">
        <div className="flex items-center justify-between border-white/[0.08] border-b pb-4">
          <h1 className="font-semibold text-white text-xl">Setup Required</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">Step</span>
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-sm text-white">
              {currentStep === "deploy"
                ? "1"
                : currentStep === "deposit"
                  ? "2"
                  : "3"}
              /3
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
                  Deploy a smart account to enable automated yield optimization.
                  This is a one-time setup.
                </p>
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
                <h2 className="font-medium text-white">Deposit USDC</h2>
                <p className="mt-1 text-sm text-white/60">
                  Transfer USDC to your smart account to start earning yield.
                </p>
                <div className="mt-4">
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    className="mb-2 border-white/[0.08] bg-white/[0.05] text-white placeholder:text-white/40"
                  />
                  <Button
                    className="w-full gap-2 bg-[#F29600] text-white hover:bg-[#F29600]/80"
                    onClick={handleDeposit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    Deposit USDC
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === "activate" && (
          <div className="mt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-white/[0.08] p-2">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-medium text-white">Activate Agents</h2>
                <p className="mt-1 text-sm text-white/60">
                  Activate AI agents to start optimizing your yield across
                  protocols.
                </p>
                <Button
                  className="mt-4 w-full gap-2 bg-[#F29600] text-white hover:bg-[#F29600]/80"
                  onClick={handleActivate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  Activate Agents
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </main>
  )
}

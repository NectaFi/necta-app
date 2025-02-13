"use client"

import { useAccount } from "wagmi"
import { useWalletStore } from "@/lib/store/slices/wallet"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Deposit } from "@/components/app/setup/deposit"

export default function SetupPage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()

  const { brahmaAccount, deploymentStatus, deployBrahmaAccount } =
    useWalletStore()

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push("/app")
    }
  }, [isConnected, router])

  // Handle Brahma deployment
  const handleDeploy = async () => {
    if (!address) return
    await deployBrahmaAccount(address)
  }

  // Handle successful deposit
  const handleDepositSuccess = () => {
    router.push("/app/dashboard")
  }

  if (!isConnected) return null

  return (
    <div className="container mx-auto max-w-2xl space-y-8 py-8">
      <div className="space-y-4">
        <h1 className="font-bold text-2xl">Setup Your Account</h1>

        {/* Step 1: Deploy Brahma Account */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 font-semibold text-xl">
            Step 1: Deploy Brahma Account
          </h2>
          <Button
            onClick={handleDeploy}
            disabled={
              deploymentStatus === "deploying" || brahmaAccount !== null
            }
          >
            {deploymentStatus === "deploying"
              ? "Deploying..."
              : brahmaAccount
                ? "Account Deployed"
                : "Deploy Account"}
          </Button>
        </div>

        {/* Step 2: Initial Deposit */}
        {brahmaAccount && (
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 font-semibold text-xl">
              Step 2: Initial Deposit
            </h2>
            <Deposit
              brahmaAccount={brahmaAccount}
              onSuccess={handleDepositSuccess}
            />
          </div>
        )}
      </div>
    </div>
  )
}

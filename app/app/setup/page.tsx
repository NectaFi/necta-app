"use client"

import { useAccount } from "wagmi"
import { useWalletStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Deposit } from "@/components/app/setup/deposit"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SetupPage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const { toast } = useToast()

  const { brahmaAccount, deploymentStatus, deployBrahmaAccount, error } =
    useWalletStore()

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push("/app")
    }
  }, [isConnected, router])

  // Handle deployment errors
  useEffect(() => {
    if (error && deploymentStatus === "error") {
      toast({
        title: "Deployment Failed",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, deploymentStatus, toast])

  // Handle Brahma deployment
  const handleDeploy = async () => {
    if (!address) return
    try {
      await deployBrahmaAccount(address)
    } catch (error) {
      toast({
        title: "Deployment Failed",
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    }
  }

  // Handle successful deposit
  const handleDepositSuccess = () => {
    toast({
      title: "Success",
      description: "Your deposit was successful. Redirecting to dashboard...",
    })
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
          <div className="space-y-4">
            <Button
              onClick={handleDeploy}
              disabled={
                deploymentStatus === "deploying" || brahmaAccount !== null
              }
              className="w-full"
            >
              {deploymentStatus === "deploying" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : brahmaAccount ? (
                "Account Deployed"
              ) : (
                "Deploy Account"
              )}
            </Button>
            {deploymentStatus === "error" && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
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

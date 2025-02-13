"use client";

import { useAccount } from "wagmi";
import { useWalletStore } from "@/lib/store/slices/wallet";
import { useDepositStore } from "@/lib/store/slices/deposit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const { brahmaAccount, deploymentStatus, deployBrahmaAccount } =
    useWalletStore();

  const {
    amount,
    status: depositStatus,
    setAmount,
    handleDeposit,
  } = useDepositStore();

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push("/app");
    }
  }, [isConnected, router]);

  // Handle Brahma deployment
  const handleDeploy = async () => {
    if (!address) return;
    await deployBrahmaAccount(address);
  };

  // Handle deposit and agent activation
  const handleDepositAndActivate = async () => {
    if (!brahmaAccount) return;
    await handleDeposit(brahmaAccount);
  };

  if (!isConnected) return null;

  return (
    <div className="container max-w-2xl mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Setup Your Account</h1>

        {/* Step 1: Deploy Brahma Account */}
        <div className="p-6 rounded-lg bg-card border">
          <h2 className="text-xl font-semibold mb-4">
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
          <div className="p-6 rounded-lg bg-card border">
            <h2 className="text-xl font-semibold mb-4">
              Step 2: Initial Deposit
            </h2>
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Amount (USDC)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="10"
                disabled={depositStatus !== "idle"}
              />
              <p className="text-sm text-muted-foreground">
                Minimum deposit: 10 USDC
              </p>
              <Button
                onClick={handleDepositAndActivate}
                disabled={
                  !amount || parseFloat(amount) < 10 || depositStatus !== "idle"
                }
              >
                {depositStatus === "approving"
                  ? "Approving..."
                  : depositStatus === "depositing"
                  ? "Depositing..."
                  : depositStatus === "completed"
                  ? "Completed"
                  : "Deposit & Activate Agents"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

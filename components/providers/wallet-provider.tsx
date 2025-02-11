"use client"

import { WagmiProvider, createConfig } from "wagmi"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { base, arbitrum } from "viem/chains"
import { env } from "@/env"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { http } from "viem"

const queryClient = new QueryClient()

const config = createConfig(
  getDefaultConfig({
    // Your dApp's info
    appName: "NectaFi",
    // Supported chains
    chains: [base, arbitrum],
    // Chain configuration
    transports: {
      [base.id]: http(
        `https://base-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
      [arbitrum.id]: http(
        `https://arb-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },
    // WalletConnect Project ID
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    // Optional
    appDescription: "AI-Powered Yield Optimization",
    appUrl: env.NEXT_PUBLIC_APP_URL,
    appIcon: `${env.NEXT_PUBLIC_APP_URL}/logo.png`,
  }),
)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            "--ck-body-background": "rgb(24 24 27)",
            "--ck-body-background-secondary": "rgb(39 39 42)",
            "--ck-body-background-tertiary": "rgb(63 63 70)",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

"use client"

import { WagmiProvider, createConfig, http } from "wagmi"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { base, arbitrum } from "wagmi/chains"
import { env } from "@/env"

const config = createConfig(
  getDefaultConfig({
    // Your dApp's info
    appName: "Necta Labs",
    appDescription: "Necta Labs - DeFi Made Simple",
    appUrl: "https://necta.app",
    appIcon: "https://necta.app/icon.png",

    // Supported chains
    chains: [base, arbitrum],
    transports: {
      [base.id]: http(),
      [arbitrum.id]: http(),
    },

    // Wagmi config
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  }),
)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <ConnectKitProvider
        theme="midnight"
        customTheme={{
          "--ck-font-family": "var(--font-geist-sans)",
          "--ck-border-radius": "24px",
          "--ck-overlay-background": "rgba(0, 0, 0, 0.8)",
          "--ck-body-background": "rgb(24 24 27 / 0.65)",
          "--ck-body-background-secondary": "rgb(24 24 27 / 0.8)",
          "--ck-body-background-tertiary": "rgb(24 24 27 / 0.35)",
          "--ck-primary-button-background": "#F29600",
          "--ck-primary-button-hover-background": "rgb(242 150 0 / 0.8)",
          "--ck-secondary-button-background": "rgb(39 39 42 / 0.35)",
          "--ck-secondary-button-hover-background": "rgb(39 39 42 / 0.45)",
          "--ck-body-color": "#fff",
          "--ck-body-color-muted": "rgb(161 161 170)",
          "--ck-body-color-muted-hover": "#fff",
        }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiProvider>
  )
}

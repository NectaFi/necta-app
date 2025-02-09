import "@/styles/globals.css";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Necta | AI Agents for Automated DeFi Yield Optimization",
  description:
    "Necta automates and optimizes your stablecoin yield strategies across DeFi protocols, maximizing returns with no manual tracking – fully on-chain and self-custodial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          plusJakartaSans.variable,
          dmSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}

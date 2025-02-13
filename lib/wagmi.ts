import { env } from "@/env"
import { createPublicClient, http } from "viem"
import { base } from "viem/chains"

export const publicClient = createPublicClient({
  chain: base,
  transport: http(
    `https://base-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`,
  ),
})

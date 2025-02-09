import { ProtocolScroll } from "@/components/ui/protocol-scroll"
import { Connect } from "@/components/connect"

export default function AppPage() {
  return (
    <main className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center px-4 pt-24">
      <div className="flex w-full max-w-[800px] flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="font-semibold text-2xl text-white md:text-3xl lg:text-[40px]">
            AI-Powered Yield Optimization
          </h1>
          <p className="max-w-[600px] text-base text-white/60 md:text-lg">
            The Best to Earn DeFi Yields In 1-Click
          </p>
          <Connect />
        </div>

        <div className="relative w-full">
          <div className="absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-[#111111] to-transparent" />
          <ProtocolScroll />
          <div className="absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-[#111111] to-transparent" />
        </div>
      </div>
    </main>
  )
}

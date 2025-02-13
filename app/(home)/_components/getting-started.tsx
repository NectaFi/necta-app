import { GETTING_STARTED_STEPS } from "@/lib/constants/home"

type Step = {
  number: number
  title: string
  description: string
}

export function GettingStarted() {
  return (
    <section
      id="steps"
      className="relative overflow-hidden bg-[#101010] py-24 sm:py-32"
    >
      <div className="container mx-auto max-w-[1150px] px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-4xl text-white tracking-tight sm:text-5xl">
            Deposit Once, Earn Highest Yields Across Protocols
          </h2>
          <p className="text-lg text-white/60">
            Simply deposit USDC once and earn optimized, high-risk yields across
            multiple protocols—24/7. Getting started is really easy.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-3 lg:gap-12">
          {GETTING_STARTED_STEPS.map((step: Step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ number, title, description }: Step) {
  return (
    <div className="flex flex-col space-y-4 rounded-lg border border-white/10 bg-black/50 p-6 backdrop-blur-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F29600]">
        <span className="font-semibold text-lg text-white">{number}</span>
      </div>
      <h3 className="font-bold text-white text-xl">{title}</h3>
      <p className="text-base text-white/60">{description}</p>
    </div>
  )
}

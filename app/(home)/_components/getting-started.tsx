import { GETTING_STARTED_STEPS } from "@/lib/constants/home"

type Step = {
  number: number
  title: string
  description: string
}

export function GettingStarted() {
  return (
    <section id="steps" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto max-w-[1150px] px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
            Simply deposit USDC, and earn highest-risk yields accross multiple
            protocols 24/7
          </h2>
          <p className="text-gray-400 text-lg">
            Getting started is real simple
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
    <div className="flex flex-col space-y-4 rounded-lg border bg-white p-6 shadow-sm dark:bg-secondary">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600">
        <span className="font-semibold text-lg text-white">{number}</span>
      </div>
      <h3 className="font-bold text-foreground text-xl">{title}</h3>
      <p className="text-base text-muted-foreground">{description}</p>
    </div>
  )
}

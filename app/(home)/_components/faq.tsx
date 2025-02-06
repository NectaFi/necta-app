"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    id: "what-is-necta",
    question: "What is Necta Finance?",
    answer:
      "Necta Finance is an AI-powered DeFi yield optimization protocol that uses intelligent agents to automatically manage and maximize your crypto portfolio returns. Our platform simplifies DeFi farming by handling all the complex operations while you maintain full control of your assets.",
  },
  {
    id: "why-necta",
    question: "Why Necta and what are the benefits of using it?",
    answer:
      "Necta offers automated yield optimization, gas-efficient operations, and intelligent portfolio management. Benefits include maximized returns across multiple protocols, reduced time and effort in DeFi farming, and professional-grade portfolio management powered by AI.",
  },
  {
    id: "how-to-use",
    question: "How do I use Necta?",
    answer:
      "Getting started with Necta is simple: 1) Connect your wallet, 2) Deposit your assets, 3) Choose your risk preference, and 4) Let our AI agents optimize your yields. You can monitor your portfolio and withdraw at any time.",
  },
  {
    id: "risks",
    question: "What are the risks of using the protocol?",
    answer:
      "While we implement robust security measures and risk management protocols, DeFi investments carry inherent risks including smart contract risks, market volatility, and protocol-specific risks. We recommend users to understand these risks and invest accordingly.",
  },
  {
    id: "token",
    question: "Does Necta have a token?",
    answer:
      "Currently, Necta does not have a token. Our focus is on building a reliable and efficient yield optimization protocol. Any future token launches will be announced through our official channels.",
  },
]

export function FAQ() {
  return (
    <section className="relative bg-[#fff8f6] py-24">
      <div className="container mx-auto max-w-[1150px] px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[400px,1fr]">
          {/* Left side - Title */}
          <div>
            <h2 className="font-bold text-[64px] text-foreground leading-[1.1] tracking-[-0.02em]">
              Your Questions,
              <br />
              Answered.
            </h2>
          </div>

          {/* Right side - FAQ Items */}
          <div>
            <Accordion type="single" collapsible>
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-border border-t-2"
                >
                  <AccordionTrigger className="group py-8">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-left font-medium text-[22px]">
                        {faq.question}
                      </span>
                      <span className="ml-4 text-2xl text-foreground/60 transition-transform duration-200 group-data-[state=open]:rotate-45">
                        +
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <p className="text-[18px] text-muted-foreground">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="container mx-auto max-w-[1250px] px-4">
        <div className="mt-24 border-border/10 border-t" />
      </div>
    </section>
  )
}

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "@/lib/constants/home";

export function FAQ() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container mx-auto max-w-[1150px] px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-4xl text-[#23191A] tracking-tight sm:text-5xl">
            Frequently Asked Questionss
          </h2>
          <p className="text-[#23191A]/80 text-lg">
            Common questions about NectaFi.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-t border-[#23191A]/20"
              >
                <AccordionTrigger className="group py-6">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-left font-medium text-xl text-[#23191A]">
                      {faq.question}
                    </span>
                    <span className="ml-4 text-xl text-[#23191A]/60 transition-transform duration-200 group-data-[state=open]:rotate-45">
                      +
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-base text-[#23191A]/70">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

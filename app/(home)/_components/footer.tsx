import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { FOOTER_MENU } from "@/lib/constants/home";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto max-w-[1250px] px-4 pt-12 md:pt-16 lg:pt-32">
      <footer className="border-border/80 border-t px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-[400px] font-medium text-muted-foreground">
              Optimizing yields through agentic intelligence.
            </p>
            <p className="mt-2 font-medium text-brand-muted text-sm">
              &copy; {currentYear} NectaFi. All rights reserved.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:flex md:gap-12">
            {Object.entries(FOOTER_MENU).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-heading font-semibold text-foreground">
                  {category}
                </h3>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-medium text-[16px] text-[#23191A]/80 transition-colors hover:text-[#F29600]"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </footer>

      <span className="mx-auto block max-w-[1200px] bg-gradient-to-b from-brand-muted/20 to-brand-muted/5 bg-clip-text text-center font-bold font-heading text-[60px] text-transparent leading-none tracking-tight md:text-[100px] lg:text-[180px]">
        Necta Finance
      </span>
    </div>
  );
}

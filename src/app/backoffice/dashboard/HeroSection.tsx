"use client";

import { usePathname } from "next/navigation";
import CurrencyDropdown from "./CurrencyDropdown";

const pathMap: Record<string, string> = {
  "/backoffice/dashboard": "Overview",
  "/financial-metrics": "Financial Metrics & Revenue Performance",
  "/customer-analytics": "Customer Analytics",
  "/compliance-risk": "Compliance & Risk Management",
  "/operational-efficiency": "Operational Efficiency",
};

interface HeroSectionProps {
  currency: string;
  onCurrencyChange: (code: string) => void;
}

function HeroSection({ currency, onCurrencyChange }: HeroSectionProps) {
  const pathname = usePathname();
  const currentTitle = pathMap[pathname] || "Page";

  return (
    <div className="px-4 md:px-12 mt-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/70">
          Dashboard / <span className="text-white">{currentTitle}</span>
        </p>
        <div className="text-white/70">
          <CurrencyDropdown
            selectedCurrency={currency}
            onCurrencyChange={onCurrencyChange}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

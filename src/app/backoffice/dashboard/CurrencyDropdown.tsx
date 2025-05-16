import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CurrencyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: "GBP",
    name: "Great British Pounds",
    flag: "/backoffice/uk-flag.png",
  });

  const currencies = [
    {
      code: "GBP",
      name: "Great British Pounds",
      flag: "/backoffice/uk-flag.png",
    },
    {
      code: "KES",
      name: "Kenyan Shillings",
      flag: "/backoffice/kenya-flag.png",
    },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCurrency = (currency: (typeof currencies)[0]) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    // You can add additional logic here when currency changes
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-white/10 px-3 text-white/70 py-1.5 rounded text-sm space-x-2 hover:bg-white/20 transition-colors"
      >
        <span className="flex items-center space-x-1">
          <img
            src={selectedCurrency.flag}
            alt={`${selectedCurrency.code} Flag`}
            className="w-4 h-4 rounded-sm"
          />
          <span>{selectedCurrency.code}</span>
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 text-black/70 w-full bg-white/90 backdrop-blur-sm rounded-md shadow-lg overflow-hidden">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => selectCurrency(currency)}
              className={`flex items-center w-full px-3 py-2 text-sm space-x-2 hover:bg-white/20 ${
                selectedCurrency.code === currency.code
                  ? "bg-white/30 text-black/70"
                  : ""
              }`}
            >
              <img
                src={currency.flag}
                alt={`${currency.code} Flag`}
                className="w-4 h-4 rounded-sm"
              />
              <span>{currency.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;

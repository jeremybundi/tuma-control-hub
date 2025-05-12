import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Update from "./Update";

const Section = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rates, setRates] = useState({
    paybill: null,
    mpesa: null,
    bank: null,
    card: null,
  });
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchRates = async () => {
    try {
      const url = `https://tuma-dev-backend-alb-1553448571.us-east-1.elb.amazonaws.com/api/treasury/latest-exchange-rate?baseCurrency=GBP&targetCurrency=KES`;

      const response = await axios.get(url);

      setRates({
        paybill: response.data.paybillRate,
        mpesa: response.data.mpesaRate,
        bank: response.data.bankRate,
        card: response.data.currentRate,
      });

      if (response.data.updatedAt) {
        const updatedDate = new Date(response.data.updatedAt);
        updatedDate.setHours(updatedDate.getHours() + 3); // EAT

        const formattedDate = updatedDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });

        const formattedTime = updatedDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).replace(/\./g, "");

        setLastUpdated(`Updated on ${formattedDate}, ${formattedTime}`);
      }
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  };

  useEffect(() => {
    fetchRates();
  }, );

  return (
    <section className="p-6 bg-white rounded-xl font-poppins">
      <span className="flex justify-between mb-6">
        <span className="flex flex-col">
          <h2 className="text-[21px] font-bold text-gray-800 mb-4">Tuma App Rate</h2>
          <p className="text-gray-400">{lastUpdated || "Loading update time..."}</p>
        </span>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 h-fit mt-2 bg-[#276EF1] font-[600] text-white rounded-lg text-[16px] shadow hover:bg-blue-700 transition"
        >
          Update Rate
        </button>
      </span>

      <div className="grid grid-cols-4 gap-6">
        {/* Paybill */}
        <RateCard icon="/fx/svgs/paybill.svg" label="Paybill" rate={rates.paybill} color="#27AAE1" />

        {/* M-Pesa */}
        <RateCard icon="/fx/svgs/mpesa.svg" label="MPESA" rate={rates.mpesa} color="#3CA8A4" />

        {/* Bank */}
        <RateCard icon="/fx/svgs/Bank.svg" label="Bank" rate={rates.bank} color="#276EF1" />

        {/* Card */}
        <RateCard icon="/fx/svgs/card.svg" label="Card" rate={rates.card} color="#F9CB38" />
      </div>

      <Update isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

const RateCard = ({ icon, label, rate, color }) => (
  <div className="flex items-center border border-gray-200 p-3  bg-white rounded-xl">
    <Image
      src={icon}
      alt={label}
      className="mr-4 p-3 bg-[#F3F5F8] rounded-full"
      width={50}
      height={50}
    />
    <span className="flex flex-col">
      <h1 className="font-[700] text-[16px] text-[#101820] ">
        {rate !== null ? `KES ${rate.toFixed(3)}` : "Loading..."}
      </h1>
      <p
        className="mt-1 text-[12px] w-fit px-2 rounded-md font-500"
        style={{
          color: color,
          backgroundColor: `${color}1A`, // Add transparency
        }}
      >
        {label}
      </p>
    </span>
  </div>
);

export default Section;

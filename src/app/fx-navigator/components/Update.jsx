import { useEffect, useState } from "react";
import Image from 'next/image';
import Table from './Table';
import closeIcon from '../../../../public/fx/images/close.png';
import Update1 from './Update1'; 
import axios from 'axios';

const Update = ({ isOpen, onClose }) => {
  //const [dateOfEffect, setDateOfEffect] = useState("2023-10-15");
 // const [timeOfEffect, setTimeOfEffect] = useState("10:30 AM"); 
  const [isEditable, setIsEditable] = useState(false); 
  const [rateValue, setRateValue] = useState(null); // Initialize as null
  const [weightedAverage, setWeightedAverage] = useState("0.10"); 
  const [isUpdate1Open, setIsUpdate1Open] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Fetch exchange rate when component mounts or when isOpen changes
  useEffect(() => {
    if (isOpen) {
      fetchExchangeRate();
    }
  }, [isOpen]);

  const fetchExchangeRate = async () => {
    setIsLoading(true);
    setError(null);
    setRateValue(null); // Reset rate value before fetching
    try {
      const response = await axios.get(
        'https://tuma-dev-backend-alb-1553448571.us-east-1.elb.amazonaws.com/api/treasury/temporal-exchange-rates',
        {
          params: {
            baseCurrency: 'GBP',
            targetCurrency: 'KES'
          }
        }
      );
      setRateValue(response.data.interBankRate.toString());
    } catch (err) {
      setError('Failed to fetch exchange rate. Please try again later.');
      console.error('Error fetching exchange rate:', err);
      // Don't set any fallback value
    } finally {
      setIsLoading(false);
    }
  };

  const handleRateClick = () => {
    if (rateValue) { // Only allow editing if we have a rate value
      setIsEditable(true); 
      setIsUpdate1Open(true); 
    }
  };

  const handleRateChange = (e) => {
    setRateValue(e.target.value); 
  };

  const handleRateBlur = () => {
    setIsEditable(false); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center font-poppins justify-end bg-black/50  bg-opacity-50 z-50">
      <div className="bg-[#F3F5F8] p-6 w-[740px] rounded-lg h-screen shadow-lg">
        <span className="justify-between">
          <span className="flex flex-col">
            <h2 className="text-xl font-bold mb-4">Tuma App Ratess</h2>
          </span>

          <button className="absolute top-3 right-3" onClick={onClose}>
            <Image src={closeIcon} alt="Close Modal" width={40} height={35} />
          </button>
        </span>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading exchange rate...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        ) : null}

        {rateValue ? (
          <div className="bg-white rounded-xl items-center flex px-6 p-5">
            <p className="text-xl font-[700] mr-4">Current Bank Rate</p>
            <span className="border items-center flex rounded-lg px-3 py-2">
              <h1 className="px-4 mr-2 text-[20px] font-semibold">1</h1>
              <span className="px-2 rounded-lg flex gap-3 py-1 bg-[#F3F5F8]">
                <Image src="/fx/images/gbp.png" alt="GBP" width={25} height={16} />
                <p className="ml-1 mr- text-[16px] font-500">GBP</p>
                <Image src="/fx/svgs/arrow.svg" alt="Arrow" width={16} height={20} />
              </span>
            </span>
            <p className="mx-5 text-gray-800 text-2xl font-[600]">=</p>
            <span className="border items-center flex rounded-lg px-3 py-2">
              {isEditable ? (
                <input
                  type="text"
                  value={rateValue}
                  onChange={handleRateChange}
                  onBlur={handleRateBlur}
                  autoFocus
                  className="px-2 mr-2 text-2xl font-semibold outline-none"
                />
              ) : (
                <h1 className="px-2 mr-2 text-[20px] font-semibold cursor-pointer" onClick={handleRateClick}>
                  {rateValue}
                </h1>
              )}
              <span className="px-2 rounded-lg flex gap-3 py-1 bg-[#F3F5F8]">
                <Image src="/fx/images/kes.png" alt="kes" width={25} height={16} />
                <p className="ml-1  text-[20px] font-500">KES</p>
                <Image src="/fx/svgs/arrow.svg" alt="Arrow" width={16} height={20} />
              </span>
            </span>
          </div>
        ) : !isLoading && !error ? (
          <div className="bg-white rounded-xl items-center flex px-6 p-5 justify-center">
            <p className="text-xl font-[700]">No exchange rate data available</p>
          </div>
        ) : null}

        {rateValue && (
          <>
            <div>
              <Table />
            </div>

            {/* Date of Effect Section 
            <div className="mt-6">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label className="text-[17px] font-medium text-gray-700 mb-2">Date Of Effect</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={dateOfEffect}
                      readOnly
                      className="block w-48 px-6 py-3 border border-gray-300 text-[16px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Image src="/svgs/calendar.svg" alt="Calendar" width={26} height={20} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[17px] font-medium text-gray-700 mb-2">Time Of Effect</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={timeOfEffect}
                      readOnly
                      className="block w-48 px-6 py-3 border border-gray-300 text-[16px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Image src="/svgs/clock.svg" alt="Clock" width={26} height={25} />
                    </div>
                  </div>
                </div>
              </div>
            </div>*/}
          </>
        )}
      </div>

      {/* Render the Update1 modal */}
      {isUpdate1Open && (
        <Update1
          isOpen={isUpdate1Open}
          onClose={() => setIsUpdate1Open(false)}
          rateValue={rateValue}
          onRateChange={handleRateChange}
        />
      )}
    </div>
  );
};

export default Update;
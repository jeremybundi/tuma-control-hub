import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SpecialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpecialLimitsModal: React.FC<SpecialModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[420px] h-full bg-white shadow-lg p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-lg font-bold text-gray-900">#TR123456</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>

            {/* User Details */}
            <div className="flex flex-col items-center text-center mt-4">
              <img
                src="/backoffice/avatar.png"
                alt="User Avatar"
                className="w-16 h-16 rounded-full"
              />
              <h3 className="text-xl font-bold mt-2">Alice Smith</h3>
              <p className="text-gray-500 text-sm">alice@gmail.com</p>
              <p className="text-gray-500 text-sm">+254 7266273</p>
            </div>

            {/* Transaction Details */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                Transaction Details
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                <p className="text-gray-400">Amount Sent:</p>
                <p className="font-semibold text-black">50 GBP</p>
                <p className="text-gray-400">Date:</p>
                <p>May 10, 12:30 PM</p>
                <p className="text-gray-400">Exchange Rate:</p>
                <p>1 GBP = 100 KES</p>
                <p className="text-gray-400">Transfer Fee:</p>
                <p>0.00</p>
                <p className="text-gray-400">Amount Received:</p>
                <p>KES 5000</p>
                <p className="text-gray-400">Payment Method:</p>
                <p>Bank</p>
                <p className="text-gray-400">Reference Code:</p>
                <p>RF137YT</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
              <button className="text-blue-600 font-semibold">Escalate</button>
              <button className="text-blue-600 font-semibold">Retry</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpecialLimitsModal;

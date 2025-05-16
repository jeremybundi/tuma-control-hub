// app/transaction-analytics/components/AverageTransactionTime.tsx
"use client";

const transactionData = [
  { name: "Card Transactions", time: "13 Seconds", color: "bg-blue-500" },
  { name: "MPESA Transactions", time: "08 Seconds", color: "bg-purple-500" },
  { name: "Bank Transactions", time: "17 Seconds", color: "bg-indigo-600" },
  { name: "Till Transactions", time: "04 Seconds", color: "bg-pink-500" },
  { name: "Paybill Transactions", time: "02 Seconds", color: "bg-red-500" },
];

export default function AverageTransactionTime() {
  return (
    <div className="w-full max-w-3xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black">
          Average Time To Complete Transactions
        </h2>
        <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md">
          Weekly
        </button>
      </div>

      <div className="space-y-4">
        {transactionData.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className={`w-1.5 h-8 rounded-sm ${item.color}`}></span>
              <div>
                <p className="text-sm font-semibold text-black">{item.name}</p>
                <p className="text-sm text-gray-500 -mt-1">
                  Average time to complete transactions
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-black">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

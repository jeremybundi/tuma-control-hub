// components/KYCVerificationStats.tsx
export default function KYCVerificationStats() {
  const stats = [
    {
      label: "Document Verification",
      value: 74,
      total: 95,
      color: "bg-rose-400",
    },
    {
      label: "Credit Rating Check",
      value: 89,
      total: 105,
      color: "bg-yellow-400",
    },
    {
      label: "Fraud Check",
      value: 12,
      total: 48,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border-0 w-full ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl text-gray-800">
          Customers Verified at each KYC level.
        </h2>
        <button className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
          Yearly ▾
        </button>
      </div>
      <div className="space-y-12">
        {stats.map((item, idx) => {
          const percentage = Math.round((item.value / item.total) * 100);
          return (
            <div key={idx}>
              <div className="flex justify-between text-md text-gray-600 font-medium mb-1">
                <span>{item.label}</span>
                <span>{`${item.value} out of ${item.total} - ${percentage}%`}</span>
              </div>
              <div className="w-full h-10 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`${item.color} h-full`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

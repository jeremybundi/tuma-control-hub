import { FC, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import DateFilter from "./DateFilter"; // Adjust the import path if needed

type HeaderProps = {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateChange: (startDate: Date, endDate: Date) => void;
  onClearDateFilter: () => void;
};

const Header: FC<HeaderProps> = ({
  dateRange,
  onDateChange,
  onClearDateFilter,
}) => {
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center bg-none">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 bg-transparent px-4 py-2 rounded-lg text-gray-600 border"
            onClick={() => setIsDateFilterOpen(true)}
          >
            <FaCalendarAlt className="w-5 h-5" />
            {dateRange.startDate && dateRange.endDate ? (
              <>
                {dateRange.startDate.toLocaleDateString()} -{" "}
                {dateRange.endDate.toLocaleDateString()}
              </>
            ) : (
              "Filter by Date"
            )}
          </button>
        </div>
      </header>

      <DateFilter
        isOpen={isDateFilterOpen}
        onClose={() => setIsDateFilterOpen(false)}
        onChange={(startDate, endDate) => {
          onDateChange(startDate, endDate);
          setIsDateFilterOpen(false); // Close date filter after selecting
        }}
        onClear={() => {
          onClearDateFilter();
          setIsDateFilterOpen(false); // Close after clearing too
        }}
        initialStartDate={dateRange.startDate}
        initialEndDate={dateRange.endDate}
      />
    </>
  );
};

export default Header;

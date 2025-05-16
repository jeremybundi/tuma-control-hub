

    import Image from "next/image";
    import { useState } from "react";
    
    const LoanRepaymentWinners = () => {
      const [selectedWeek, setSelectedWeek] = useState(null);
      
      // Hardcoded data for weeks and winners with phone numbers
      const weeksData = [
        {
          week: 1,
          winners: [
            { name: "John Doe", phone: "+254712345678" },
            { name: "Jane Smith", phone: "+254723456789" },
            { name: "Michael Johnson", phone: "+254734567890" }
          ]
        },
        {
          week: 2,
          winners: [
            { name: "Sarah Williams", phone: "+254745678901" },
            { name: "David Brown", phone: "+254756789012" },
            { name: "Emily Davis", phone: "+254767890123" }
          ]
        },
        {
          week: 3,
          winners: [
            { name: "Winner One", phone: "+254700000001" },
            { name: "Winner Two", phone: "+254700000002" },
            { name: "Winner Three", phone: "+254700000003" }
          ]
        },
        {
          week: 4,
          winners: [
            { name: "Winner One", phone: "+254700000004" },
            { name: "Winner Two", phone: "+254700000005" },
            { name: "Winner Three", phone: "+254700000006" }
          ]
        },
        {
          week: 5,
          winners: [
            { name: "Winner One", phone: "+254700000007" },
            { name: "Winner Two", phone: "+254700000008" },
            { name: "Winner Three", phone: "+254700000009" }
          ]
        },
        {
          week: 6,
          winners: [
            { name: "Winner One", phone: "+254700000010" },
            { name: "Winner Two", phone: "+254700000011" },
            { name: "Winner Three", phone: "+254700000012" }
          ]
        },
        {
          week: 7,
          winners: [
            { name: "Winner One", phone: "+254700000013" },
            { name: "Winner Two", phone: "+254700000014" },
            { name: "Winner Three", phone: "+254700000015" }
          ]
        },
        {
          week: 8,
          winners: [
            { name: "Winner One", phone: "+254700000016" },
            { name: "Winner Two", phone: "+254700000017" },
            { name: "Winner Three", phone: "+254700000018" }
          ]
        },
        {
          week: 9,
          winners: [
            { name: "Winner One", phone: "+254700000019" },
            { name: "Winner Two", phone: "+254700000020" },
            { name: "Winner Three", phone: "+254700000021" }
          ]
        },
        {
          week: 10,
          winners: [
            { name: "Winner One", phone: "+254700000022" },
            { name: "Winner Two", phone: "+254700000023" },
            { name: "Winner Three", phone: "+254700000024" }
          ]
        }
      ];
    
      return (
        <div className="w-full max-w-3xl mx-auto">
          {/* Date Section */}
          <div className="flex items-center p-4 py-5 rounded-lg w-full border border-gray-600 justify-center gap-2 mb-6">
            <Image 
              src="/campaign/date.svg" 
              alt="Time icon" 
              width={16} 
              height={16}
              className="inline-block" 
            />
            <span className="text-white font-outfit text-[16px]">
              7 Apr 2025, 10:00am - 7 Apr 2025, 10:00am
            </span>
          </div>
    
          <div className="grid md:grid-cols-[1fr_auto_1fr] p-6 py-3 gap-6 rounded-lg border border-gray-600 mb-6">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold text-[#F1B80C] mb-2">52</span>
              <span className="text-gray-300 font-outfit text-lg">Total Participants</span>
            </div>
    
            {/* Vertical Divider */}
            <div className="w-px bg-gray-600 h-full my-2"></div>
    
            <div className="flex flex-col font-outfit justify-center space-y-2">
              <div className=" items-center gap-3">
              
                <span className="text-[16px] font-[400] text-gray-400">
               5 winners to rexeive     
               
               </span>
               <p className="text-[16px] font-[400] mt-2 text-gray-400">KES 250000</p>
              </div>
    
             
            </div>
          </div>
    
          {/* Weeks Vertical Section */}
          <div className="mb-6 rounded-xl border border-gray-600 p-6">
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {weeksData.map((weekData) => (
                <div key={weekData.week} className="w-full">
                  <button
                    onClick={() => setSelectedWeek(selectedWeek === weekData.week ? null : weekData.week)}
                    className={`w-full flex items-center justify-between text-left border-b border-gray-600 p-4 ${
                      selectedWeek === weekData.week 
                        ? "border-[#F1B80C] bg-gray-800" 
                        : "border-gray-600"
                    }`}
                  >
                    <span className="text-white font-outfit">Week {weekData.week}</span>
                    <svg
                      className={`w-4 h-4 text-white transition-transform duration-200 ${
                        selectedWeek === weekData.week ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  {/* Winners for this week - shown when selected */}
                  {selectedWeek === weekData.week && (
                    <div className="mt-2 p-4 rounded-lg border border-gray-600 bg-gray-800">
                      <h4 className="text-[#F1B80C] font-outfit text-lg mb-3">
                        Week {weekData.week} Winners
                      </h4>
                      <div className="space-y-3">
                        {weekData.winners.map((winner, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className="text-[#F1B80C] font-outfit min-w-[20px]">{index + 1}.</span>
                            <div className="flex-1">
                              <div className="text-white font-outfit">{winner.name}</div>
                              <div className="text-gray-400 font-outfit text-sm">{winner.phone}</div>
                            </div>
                            <Image 
                              src="/campaign/person.svg" 
                              alt="Winner icon"
                              width={16}
                              height={16}
                              className="ml-auto"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
    
            {/* Send Notification Button */}
            <button className="mt-6 w-full py-3 px-4 bg-[#F1B80C] text-black font-bold rounded-lg hover:bg-yellow-500 transition">
              Send Notification
            </button>
          </div>
        </div>
      );
    };
    
    export default LoanRepaymentWinners;
"use client"

import RegistrationWinners from './RegistrationWinners';
import HomeDepositsWinners from './HomeDepositsWinners';
import LoanRepaymentWinners from './LoanRepaymentWinners';

const CampaignWinners = ({ activeTab, setActiveTab }) => {
  return (
    <div className="h-screen  text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-[23px] text-left font-bold mb-8">Campaign Winners</h1>
        
        {/* Tabs Navigation */}
        <div className="flex border-b text-[14px] border-gray-600 mb-6">
          <button
            className={`py-2 px-3 font-medium ${activeTab === 'registration' ? 'text-[#F1B80C] border-b-2 border-[#F1B80C]' : 'text-white'}`}
            onClick={() => setActiveTab('registration')}
          >
            Registration
          </button>
          <button
            className={`py-2 px-3 font-medium ${activeTab === 'homeDeposits' ? 'text-[#F1B80C] border-b-2 border-[#F1B80C]' : 'text-white'}`}
            onClick={() => setActiveTab('homeDeposits')}
          >
            Home Deposits
          </button>
          <button
            className={`py-2 px-3 font-medium ${activeTab === 'loanRepayment' ? 'text-[#F1B80C] border-b-2 border-[#F1B80C]' : 'text-white'}`}
            onClick={() => setActiveTab('loanRepayment')}
          >
            Loan Repayment
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'registration' && <RegistrationWinners />}
          {activeTab === 'homeDeposits' && <HomeDepositsWinners />}
          {activeTab === 'loanRepayment' && <LoanRepaymentWinners />}
        </div>
      </div>
    </div>
  );
};

export default CampaignWinners;
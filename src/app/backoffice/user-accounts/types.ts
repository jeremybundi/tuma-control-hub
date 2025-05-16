export interface User {
    // From API
    accountId: number;
    accountKey: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string; // Changed from string | null to string
    accountStatus: string;
    registrationDate: string;
    
    
    
    // Optional fields expected by modal
    gender?: string;
    dob?: string;
    lastTransactionDate?: string;
    totalTransactions?: number;
    totalValue?: string;
    lastLogin?: string;
  }
export interface Transaction {
    transactionReference: string;
    transactionId: string;
    transactionKey:string;
    senderName: string;
    receiverName?: string;
    senderAmount: number;
    senderEmail:string;
    recipientAmount: number;
    currencyIso3a: string;
    receiverCurrencyIso3a:string;
    date: string;
    status: string;
    exchangeRate?: number;
    transactionType: string;
    receiverPhone:string;
    senderPhone:string;
    accountNumber:number;
    settlementReference:string;
    mpesaReference:string;
    tpReference:string;
    errorMessage:string;
    userID: number | null;
    bankName: string | null;
  }
  
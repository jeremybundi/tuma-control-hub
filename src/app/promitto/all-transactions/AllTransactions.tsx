"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import DateFilter from "../components/DateFilter";
import * as XLSX from "xlsx";
import useApi from '../../../hooks/useApi';
/*import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination"; */

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaCalendarAlt, FaFileExport } from "react-icons/fa";

export interface ApiTransactionResponse {
  transactionId?: number;
  transactionKey?: string;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  receiverName?: string;
  receiverPhone?: string | null;
  senderAmount?: number;
  recipientAmount?: number;
  exchangeRate?: number;
  date?: string;
  status?: string;
  currencyIso3a?: string;
  receiverCurrencyIso3a?: string;
  transactionType?: string;
  accountNumber?: string;
  settlementReference?: string;
  tpReference?: string;
  mpesaReference?: string | null;
  errorMessage?: string;
  userId?: string | null;
  bankName?: string | null;
}

export interface ApiTransactionsResponse {
  content: ApiTransactionResponse[];
  totalElements: number;
}


export interface Transaction {
  transactionId: number;
  transactionKey: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string | null;
  senderAmount: number;
  recipientAmount: number;
  exchangeRate: number;
  date: string;
  status:
    | "Success"
    | "Pending"
    | "Failed"
    | "Rejected"
    | "Reversed"
    | "Refunded"
    | "Escalated"
    | "Under Review";
  currencyIso3a: string;
  receiverCurrencyIso3a: string;
  transactionType: string;
  accountNumber: string;
  settlementReference: string;
  tpReference: string;
  mpesaReference: string | null;
  rawDate: Date;
  errorMessage: string;
  userId: string | null;
  bankName: string | null;
}

export default function AllTransactionsPage() {
  const { get } = useApi();
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
 // const [ totalRecords,  setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [exportType, setExportType] = useState<"all" | "filtered">("all");
  const [fileType, setFileType] = useState<"csv" | "excel">("csv");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const rowsPerPage = 10;

  // Format date as DD/MM/YYYY
  const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format time in 24-hour format (EAT - UTC+3)
  const formatTimeEAT = (dateString: string | Date | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    date.setHours(date.getHours() + 3);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Format date and time for table display
  const formatDateTimeForTable = (
    dateString: string | Date | undefined
  ): string => {
    if (!dateString) return "N/A";
    return `${formatDate(dateString)} ${formatTimeEAT(dateString)}`;
  };

  const formatChannelName = (channel: string): string => {
    if (!channel) return "Unknown";
    switch (channel.toUpperCase()) {
      case "CARD_TO_BANK":
        return "Bank";
      case "CARD_TO_PAYBILL":
        return "M-PESA";
      default:
        return channel;
    }
  };

  /*const statusOptions = [
    "Success",
    "Pending",
    "Failed",
    "Rejected",
    "Reversed",
    "Refunded",
    "Escalated",
    "Under Review",
  ]; */

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await get<ApiTransactionsResponse>(
          `/transfer/partner-transactions?page=${currentPage}&size=${rowsPerPage}`
        );
        const transactionsData = Array.isArray(data) ? data : data.content || [];
        //const total = data.totalElements || data.length || 0;

        const mappedTransactions = transactionsData.map((item: ApiTransactionResponse) => ({
          transactionId: item.transactionId || 0,
          transactionKey: item.transactionKey || "N/A",
          senderName: item.senderName || "Unknown",
          senderEmail: item.senderEmail || "N/A",
          senderPhone: item.senderPhone || "N/A",
          receiverName: item.receiverName || "Unknown",
          receiverPhone: item.receiverPhone || null,
          senderAmount: item.senderAmount || 0,
          recipientAmount: item.recipientAmount || 0,
          exchangeRate: item.exchangeRate || 0,
          date: item.date ? formatDateTimeForTable(item.date) : "N/A",
          status: (
            item.status === "SUCCESS"
              ? "Success"
              : item.status === "PENDING"
              ? "Pending"
              : item.status === "FAILED" || item.status === "ERROR"
              ? "Failed"
              : item.status === "REJECTED"
              ? "Rejected"
              : item.status === "UNDER_REVIEW"
              ? "Under Review"
              : item.status === "REVERSED"
              ? "Reversed"
              : item.status === "REFUNDED"
              ? "Refunded"
              : item.status === "ESCALATED"
              ? "Escalated"
              : "Failed"
          ) as Transaction['status'],
          currencyIso3a: item.currencyIso3a || "N/A",
          receiverCurrencyIso3a: item.receiverCurrencyIso3a || "N/A",
          transactionType: formatChannelName(item.transactionType || "Unknown"),
          accountNumber: item.accountNumber || "N/A",
          settlementReference: item.settlementReference || "N/A",
          tpReference: item.tpReference || "N/A",
          mpesaReference: item.mpesaReference || null,
          rawDate: item.date ? new Date(item.date) : new Date(),
          errorMessage: item.errorMessage || "N/A",
          userId: item.userId || null,  // Add this line
          bankName: item.bankName || null  // Add this line
        }));

        setAllTransactions(mappedTransactions);
        setFilteredTransactions(mappedTransactions);
      //  setTotalRecords(total);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setAllTransactions([]);
        setFilteredTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, get]); // Added 'get' to dependency array as it's used in useEffect

  // Filter transactions based on search term and date range
  useEffect(() => {
    let filtered = allTransactions;

    // Apply search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((transaction) => {
        return (
          transaction.transactionId?.toString().includes(query) ||
          transaction.senderName?.toLowerCase().includes(query) ||
          transaction.receiverName?.toLowerCase().includes(query) ||
          transaction.senderAmount?.toString().includes(query) ||
          transaction.transactionType?.toLowerCase().includes(query)
        );
      });
    }

    // Apply date filter if dates are selected
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((transaction) => {
        if (!transaction.rawDate) return false;

        // Get time in milliseconds for comparison
        const transactionTime = transaction.rawDate.getTime();
        const startTime = dateRange.startDate!.getTime();
        const endTime = dateRange.endDate!.getTime();

        return transactionTime >= startTime && transactionTime <= endTime;
      });
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, allTransactions, dateRange.startDate, dateRange.endDate]);

  // Calculate paginated data
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Calculate total pages based on filtered results
  const totalFilteredPages = Math.ceil(
    filteredTransactions.length / rowsPerPage
  );

  // Handle date filter changes
  const handleDateChange = (startDate: Date, endDate: Date) => {
    setDateRange({
      startDate: new Date(startDate.setHours(0, 0, 0, 0)),
      endDate: new Date(endDate.setHours(23, 59, 59, 999)),
    });
    console.log("Filtering from:", startDate, "to:", endDate);
  };

  // Clear date filters
  const clearDateFilter = () => {
    setDateRange({ startDate: null, endDate: null });
    console.log("Date filter cleared");
  };

  // Export data function
  const handleExport = () => {
    const dataToExport =
      exportType === "all" ? allTransactions : filteredTransactions;
    let fileName = "transactions";

    if (exportType === "filtered") {
      fileName += "_filtered";
    }
    if (currentPage > 1) fileName += `_page_${currentPage}`;

    if (dateRange.startDate && dateRange.endDate) {
      const start = dateRange.startDate.toISOString().split("T")[0];
      const end = dateRange.endDate.toISOString().split("T")[0];
      fileName += `_from_${start}_to_${end}`;
    }

    // Fixed date formatting function
    const formatDateTimeForExport = (
      dateString: string | Date | undefined
    ): string => {
      if (!dateString) return "N/A";

      // Ensure we have a Date object
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A"; // Check for invalid date

      // Format date as DD/MM/YYYY
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      // Format time in 24-hour format (EAT - UTC+3)
      date.setHours(date.getHours() + 3); // Add 3 hours for EAT
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    if (fileType === "excel") {
      const exportData = dataToExport.map((t) => ({
        "Transaction ID": t.transactionId,
        "User ID": t.userId || "N/A",
        "Transaction Key": t.transactionKey,
        "Sender Name": t.senderName,
        "Sender Email": t.senderEmail,
        "Sender Phone": t.senderPhone,
        "Receiver Name": t.receiverName,
        "Sender Amount": t.senderAmount,
        "Sender Currency": t.currencyIso3a,
        "Recipient Amount": t.recipientAmount,
        "Recipient Currency": t.receiverCurrencyIso3a,
        "Exchange Rate": t.exchangeRate,
        Date: formatDateTimeForExport(t.rawDate || t.date), // Use rawDate if available
        Status: t.status,
        "Transaction Type": t.transactionType,
        "Account Number": t.accountNumber,
        "Settlement Reference": t.settlementReference,
        "TP Reference": t.tpReference,
        "Mpesa Reference": t.mpesaReference,
        "Bank Name": t.bankName || "N/A",
        "Error Message": t.errorMessage,
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Transactions");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } else {
      const headers = [
        "Transaction ID",
        "User ID",
        "Transaction Key",
        "Sender Name",
        "Sender Email",
        "Sender Phone",
        "Receiver Name",
        "Sender Amount",
        "Sender Currency",
        "Recipient Amount",
        "Recipient Currency",
        "Exchange Rate",
        "Date",
        "Status",
        "Transaction Type",
        "Account Number",
        "Settlement Reference",
        "TP Reference",
        "Mpesa Reference",
        "Bank Name",
        "Error Message",
      ];

      const rows = dataToExport.map((t) => [
        t.transactionId,
        t.userId || "N/A",
        t.transactionKey,
        t.senderName,
        t.senderEmail,
        t.senderPhone,
        t.receiverName,
        t.senderAmount,
        t.currencyIso3a,
        t.recipientAmount,
        t.receiverCurrencyIso3a,
        t.exchangeRate,
        formatDateTimeForExport(t.rawDate || t.date), // Use rawDate if available
        t.status,
        t.transactionType,
        t.accountNumber,
        t.settlementReference,
        t.tpReference,
        t.mpesaReference,
        t.bankName || "N/A",
        t.errorMessage,
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")), // Ensure fields are stringified and quotes escaped
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setIsExportModalVisible(false);
  };

  // Show modal when transaction is selected
  useEffect(() => {
    if (selectedTransaction) {
      setIsModalVisible(true);
    }
  }, [selectedTransaction]);

  // Close modal and clear selected transaction
  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedTransaction(null);
    }, 300);
  };

  // Download receipt as PDF
  const handleDownloadReceipt = async () => {
    if (!selectedTransaction) return;

    const receiptElement = document.getElementById("receipt");
    if (!receiptElement) return;

    try {
      const clonedReceipt = receiptElement.cloneNode(true) as HTMLElement;
      clonedReceipt.style.opacity = "1";
      clonedReceipt.style.position = "static";
      clonedReceipt.style.pointerEvents = "auto";
      clonedReceipt.style.transform = "scale(1)";
      clonedReceipt.style.width = "700px";
      clonedReceipt.style.padding = "40px";
      clonedReceipt.style.margin = "auto";
      clonedReceipt.style.background = "white";

      const hiddenContainer = document.createElement("div");
      hiddenContainer.style.position = "fixed";
      hiddenContainer.style.top = "-9999px"; // Keep it off-screen
      hiddenContainer.style.left = "-9999px"; // Keep it off-screen
      hiddenContainer.style.width = "auto"; // Let content define width
      hiddenContainer.style.height = "auto"; // Let content define height
      // hiddenContainer.style.display = "flex"; // Not needed if positioning off-screen
      // hiddenContainer.style.justifyContent = "center"; // Not needed
      hiddenContainer.appendChild(clonedReceipt);
      document.body.appendChild(hiddenContainer);

      await document.fonts.ready;

      const canvas = await html2canvas(clonedReceipt, {
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 for A4
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 for A4
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate the aspect ratio
      const canvasAspectRatio = canvasWidth / canvasHeight;
      
      // Define margins (e.g., 10mm)
      const margin = 10; 
      let imgWidth = pdfWidth - 2 * margin;
      let imgHeight = imgWidth / canvasAspectRatio;

      // If image height exceeds page height with margins, scale by height instead
      if (imgHeight > pdfHeight - 2 * margin) {
        imgHeight = pdfHeight - 2 * margin;
        imgWidth = imgHeight * canvasAspectRatio;
      }
      
      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;


      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        xOffset,
        yOffset,
        imgWidth,
        imgHeight
      );
      pdf.save(`Receipt_${selectedTransaction.transactionId}.pdf`);

      document.body.removeChild(hiddenContainer);
    } catch (error) {
      console.error("Error generating PDF:", error);
       if (document.body.contains(hiddenContainer)) { // Check if container exists before removing
         document.body.removeChild(hiddenContainer);
       }
    }
  };

  /*const renderStatusBadge = (status: string) => {
    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${
          status === "Success"
            ? "text-green-600 bg-green-100"
            : status === "Pending"
            ? "text-yellow-600 bg-yellow-100"
            : status === "Failed"
            ? "text-red-600 bg-red-100"
            : status === "Refunded"
            ? "text-purple-600 bg-purple-100"
            : status === "Under Review"
            ? "text-blue-600 bg-blue-100"
            : status === "Rejected"
            ? "text-orange-600 bg-orange-100"
            : status === "Escalated"
            ? "text-amber-600 bg-amber-100"
            : "text-gray-600 bg-gray-100"
        }`}
      >
        {status}
      </span>
    );
  }; */

  // Render status icon for modal
  const renderStatusIcon = () => {
    if (!selectedTransaction) return null;

    const iconProps = {
      xmlns: "http://www.w3.org/2000/svg",
      width: "60",
      height: "60",
      viewBox: "0 0 24 24",
    };

    switch (selectedTransaction.status) {
      case "Success":
        return (
          <svg {...iconProps}>
            <path
              fill="#048020"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        );
      case "Pending":
        return (
          <svg {...iconProps}>
            <path
              fill="#FFA500"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z"
            />
          </svg>
        );
      case "Failed":
      case "Rejected":
        return (
          <svg {...iconProps}>
            <path
              fill="#FF0000"
              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
            />
          </svg>
        );
      case "Under Review":
      case "Escalated":
        return (
          <svg {...iconProps}>
            <path
              fill="#1E90FF"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            />
          </svg>
        );
      case "Refunded":
      case "Reversed":
        return (
          <svg {...iconProps}>
            <path
              fill="#800080"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
            />
          </svg>
        );
      default:
        return (
          <svg {...iconProps}>
            <path
              fill="#808080"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
            />
          </svg>
        );
    }
  };

  const renderStatusMessage = () => {
    if (!selectedTransaction) return null;

    const dateDisplay = selectedTransaction.date ? (
      <p className="text-md text-gray-400 mt-1">
        on{" "}
        <span className="text-black font-semibold">
          {selectedTransaction.date}
        </span>
      </p>
    ) : null;

    switch (selectedTransaction.status) {
      case "Success":
        return (
          <>
            <p className="text-gray-500 mt-1">
              Successfully sent to{" "}
              <span className="text-black font-semibold text-md">
                {selectedTransaction.receiverName}
              </span>
            </p>
            {dateDisplay}
          </>
        );
      case "Pending":
        return (
          <>
            <p className="text-gray-500 mt-1">
              Transaction pending with{" "}
              <span className="text-black font-semibold text-md">
                {selectedTransaction.receiverName}
              </span>
            </p>
            {dateDisplay}
          </>
        );
      case "Failed":
      case "Rejected":
        return (
          <>
            <p className="text-gray-500 mt-1">
              Transaction failed to{" "}
              <span className="text-black font-semibold text-md">
                {selectedTransaction.receiverName}
              </span>
            </p>
            {dateDisplay}
          </>
        );
      case "Under Review":
        return (
          <>
            <p className="text-gray-500 mt-1">
              Transaction under review for{" "}
              <span className="text-black font-semibold text-md">
                {selectedTransaction.receiverName}
              </span>
            </p>
            {dateDisplay}
          </>
        );
      case "Refunded":
      case "Reversed":
        return (
          <>
            <p className="text-gray-500 mt-1">
              Transaction refunded to{" "}
              <span className="text-black font-semibold text-md">
                {selectedTransaction.senderName}
              </span>
            </p>
            {dateDisplay}
          </>
        );
      case "Escalated":
        return (
          <>
            <p className="text-gray-500 mt-1">
              Transaction escalated for{" "}
              <span className="text-black font-semibold text-md">
                {selectedTransaction.receiverName}
              </span>
            </p>
            {dateDisplay}
          </>
        );
      default:
        return (
          <>
            <p className="text-gray-500 mt-1">
              Transaction {selectedTransaction.status} for{" "}
              <span className="text-black font-semibold text-md">
                {selectedTransaction.receiverName}
              </span>
            </p>
            {dateDisplay}
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-8 space-y-8 ml-80">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">All transactions</h1>
          <div className="flex items-center gap-6">
            <div className="relative w-[300px] sm:w-[400px] md:w-[500px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 flex-wrap" />
              <input
                type="text"
                placeholder="Search by name, ID, or channel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDateFilter(true)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-400 border border-gray-300"
              >
                <FaCalendarAlt /> Filter by Date
              </button>
              {showDateFilter && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-4 z-10">
                  <DateFilter
                    isOpen={showDateFilter}
                    onClose={() => setShowDateFilter(false)}
                    onChange={handleDateChange}
                    onClear={clearDateFilter}
                    initialStartDate={dateRange.startDate}
                    initialEndDate={dateRange.endDate}
                  />
                  {dateRange.startDate && (
                    <button
                      onClick={clearDateFilter}
                      className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                    >
                      Clear date filter
                    </button>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsExportModalVisible(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              <FaFileExport /> Export
            </button>
          </div>
        </div>
        {/* Date filter active indicator */}
        {dateRange.startDate && dateRange.endDate && (
          <div className="text-sm text-gray-500">
            Showing transactions from {dateRange.startDate.toLocaleDateString()}{" "}
            to {dateRange.endDate.toLocaleDateString()}
          </div>
        )}
        {/* Export Modal */}
        {isExportModalVisible && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="bg-black bg-opacity-30 w-full h-full fixed inset-0" // Ensure it covers the whole screen
              onClick={() => setIsExportModalVisible(false)}
            ></div>
            <div className="bg-white w-96 h-full shadow-lg p-6 overflow-y-auto relative transform transition-transform duration-300 translate-x-0">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setIsExportModalVisible(false)}
              >
                ×
              </button>
              <h2 className="text-lg font-bold text-gray-900">
                Export Transactions
              </h2>
              <div className="mt-4 space-y-4">
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">
                    All Transactions
                  </span>
                  <input
                    type="radio"
                    name="transactionType"
                    value="all"
                    checked={exportType === "all"}
                    onChange={() => setExportType("all")}
                    className="form-radio h-4 w-4 text-yellow-500 border-gray-300 focus:ring-yellow-400" // Tailwind form-radio
                  />
                </label>
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">
                    Filtered Transactions
                  </span>
                  <input
                    type="radio"
                    name="transactionType"
                    value="filtered"
                    checked={exportType === "filtered"}
                    onChange={() => setExportType("filtered")}
                    className="form-radio h-4 w-4 text-yellow-500 border-gray-300 focus:ring-yellow-400"
                  />
                </label>
              </div>
              <h3 className="mt-6 text-sm font-bold text-gray-900">
                Export as:
              </h3>
              <div className="mt-4 space-y-4">
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">CSV</span>
                  <input
                    type="radio"
                    name="fileType"
                    value="csv"
                    checked={fileType === "csv"}
                    onChange={() => setFileType("csv")}
                    className="form-radio h-4 w-4 text-yellow-500 border-gray-300 focus:ring-yellow-400"
                  />
                </label>
                <label className="flex justify-between items-center py-3 border-b border-gray-200 cursor-pointer">
                  <span className="text-gray-700 text-sm">Excel</span>
                  <input
                    type="radio"
                    name="fileType"
                    value="excel"
                    checked={fileType === "excel"}
                    onChange={() => setFileType("excel")}
                    className="form-radio h-4 w-4 text-yellow-500 border-gray-300 focus:ring-yellow-400"
                  />
                </label>
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setIsExportModalVisible(false)}
                  className="px-6 py-2 border border-yellow-500 text-yellow-500 text-sm font-semibold rounded-md hover:bg-yellow-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="px-6 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Transactions Table */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto"> {/* Added overflow-x-auto for responsiveness */}
          <table className="w-full table-auto text-left min-w-[1024px]"> {/* Added min-w for larger tables */}
            <thead className="bg-white">
              <tr className="text-gray-400 font-light text-sm">
                <th className="py-3 px-4 whitespace-nowrap">Customer</th>
                <th className="py-3 px-4 whitespace-nowrap">Transaction ID</th>
                <th className="py-3 px-4 whitespace-nowrap">Sender Amount</th>
                <th className="py-3 px-4 whitespace-nowrap">Sender Currency</th>
                <th className="py-3 px-4 whitespace-nowrap">Recipient Amount</th>
                <th className="py-3 px-4 whitespace-nowrap">Recipient Currency</th>
                <th className="py-3 px-4 whitespace-nowrap">Channel</th>
                <th className="py-3 px-4 whitespace-nowrap">Status</th>
                <th className="py-3 px-4 whitespace-nowrap">Date & Time</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    Loading transactions...
                  </td>
                </tr>
              ) : paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <tr
                    key={transaction.transactionId}
                    className="text-gray-700 cursor-pointer text-sm hover:bg-gray-50"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <td className="py-4 px-6 whitespace-nowrap">{transaction.senderName}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{transaction.transactionId}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {transaction.senderAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{transaction.currencyIso3a}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {transaction.recipientAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {transaction.receiverCurrencyIso3a}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{transaction.transactionType}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${ // changed text-sm to text-xs
                          transaction.status === "Success"
                            ? "text-green-600 bg-green-100"
                            : transaction.status === "Pending"
                            ? "text-yellow-600 bg-yellow-100"
                            : transaction.status === "Failed"
                            ? "text-red-600 bg-red-100"
                            : transaction.status === "Refunded"
                            ? "text-purple-600 bg-purple-100"
                            : transaction.status === "Under Review"
                            ? "text-blue-600 bg-blue-100"
                            : transaction.status === "Rejected"
                            ? "text-orange-600 bg-orange-100"
                            : transaction.status === "Escalated"
                            ? "text-amber-600 bg-amber-100"
                            : "text-gray-600 bg-gray-100"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{transaction.date}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <ArrowRight className="h-5 w-5 text-gray-500" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {filteredTransactions.length > 0 && totalFilteredPages > 1 && ( // Only show pagination if more than one page
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalFilteredPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalFilteredPages))} // Ensure not to go beyond totalFilteredPages
              disabled={currentPage >= totalFilteredPages}
              className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="bg-black bg-opacity-50 w-full h-full fixed inset-0" // Ensure it covers the whole screen
              onClick={closeModal}
            ></div>
            <div
              className={`bg-white w-[28rem] h-full shadow-lg p-8 overflow-y-auto fixed right-0 transform transition-transform duration-300 ${
                isModalVisible ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={closeModal}
              >
                ×
              </button>

              <div className="space-y-8">
                <div className="text-center mb-6">
                  <div className="mx-auto rounded-full flex items-center justify-center">
                    {renderStatusIcon()}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mt-4">
                    {selectedTransaction.senderAmount.toFixed(2)}{" "}
                    {selectedTransaction.currencyIso3a}
                  </h3>
                  {renderStatusMessage()}
                </div>

                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-y-4 text-gray-700">
                    <p className="text-gray-400">Transaction ID:</p>
                    <p className="break-all">{selectedTransaction.transactionId}</p>
                    <p className="text-gray-400">User ID:</p>
                    <p className="break-all">{selectedTransaction.userId || "N/A"}</p>
                    <p className="text-gray-400">Transaction Key:</p>
                    <p className="break-all">{selectedTransaction.transactionKey}</p>
                    <p className="text-gray-400">Channel:</p>
                    <p className="break-all">{selectedTransaction.transactionType}</p>
                    <p className="text-gray-400">Bank Name:</p>
                    <p className="break-all">{selectedTransaction.bankName || "N/A"}</p>
                    <p className="text-gray-400">Purpose:</p>
                    <p>Transfer</p>
                    <p className="text-gray-400">Sender Currency:</p>
                    <p>{selectedTransaction.currencyIso3a}</p>
                    <p className="text-gray-400">Recipient Currency:</p>
                    <p>{selectedTransaction.receiverCurrencyIso3a}</p>
                    <p className="text-gray-400">Trust Payments:</p>
                    <p className="break-all">{selectedTransaction.tpReference}</p>
                    <p className="text-gray-400">Settlement Reference:</p>
                    <p className="break-all">{selectedTransaction.settlementReference}</p>
                    <p className="text-gray-400">MPESA Reference:</p>
                    <p className="break-all">{selectedTransaction.mpesaReference || "N/A"}</p>
                    <p className="text-gray-400">Account Number:</p>
                    <p className="break-all">{selectedTransaction.accountNumber}</p>

                    <p className="text-gray-400">Error Message:</p>
                    <p className="break-all col-span-2">{selectedTransaction.errorMessage || "N/A"}</p> 
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-y-4 text-gray-700 border border-dotted py-2 px-2 border-gray-300">
                    <p className="text-gray-400">Exchange Rate:</p>
                    <p>{selectedTransaction.exchangeRate.toFixed(2)}</p>
                    <p className="text-gray-400">Transaction Fee:</p>
                    <p>0.00</p>
                    <p className="text-gray-400">Recipient Amount:</p>
                    <p>
                      {selectedTransaction.recipientAmount.toFixed(2)}{" "}
                      {selectedTransaction.receiverCurrencyIso3a}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t pt-4 text-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    Sender
                  </h4>
                  <div className="flex flex-col items-center space-y-4">
                    <div>
                      <p className="text-gray-700 font-semibold break-all">
                        {selectedTransaction.senderName}
                      </p>
                      <p className="text-gray-500 text-lg break-all">
                        {selectedTransaction.senderPhone}
                      </p>
                      <p className="text-gray-500 text-sm mt-1 break-all">
                        {selectedTransaction.senderEmail}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t pt-4 text-center">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    Receiver
                  </h4>
                  <div className="flex flex-col items-center space-y-4">
                    <div>
                      <p className="text-gray-700 font-semibold break-all">
                        {selectedTransaction.receiverName}
                      </p>
                      {selectedTransaction.receiverPhone && (
                        <p className="text-gray-500 text-lg break-all">
                          {selectedTransaction.receiverPhone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {selectedTransaction.status === "Success" && (
                  <div className="mt-8 text-center">
                    <button
                      className="flex items-center justify-center gap-2 text-yellow-500 font-semibold hover:text-yellow-600 mx-auto"
                      onClick={handleDownloadReceipt}
                    >
                      <svg // Using a download icon
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Download Receipt
                    </button>
                  </div>
                )}

                {/* Hidden receipt for PDF generation */}
                {selectedTransaction?.status === "Success" && (
                  <div
                    id="receipt"
                    style={{
                      opacity: 0,
                      position: "absolute",
                      pointerEvents: "none",
                      width: "700px", // Explicit width for PDF rendering consistency
                      padding: "40px",
                      boxSizing: "border-box",
                      left: "-9999px", // Move off-screen
                      top: "-9999px", // Move off-screen
                    }}
                    className="bg-white mx-auto shadow-lg rounded-lg text-gray-700"
                  >
                    {/* Header */}
                    <div className="text-center mb-1 mt-1">
                      <img
                        src="/logoimage.png" // Ensure this path is correct or use an absolute URL if hosted
                        className="w-10 h-10 mx-auto"
                        alt="Company Logo"
                        crossOrigin="anonymous" // Added for CORS if image is on different domain
                      />
                      <h2 className="text-2xl font-bold text-black mt-3">
                        {selectedTransaction.senderAmount.toFixed(2)}{" "}
                        {selectedTransaction.currencyIso3a}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Successfully sent to{" "}
                        <span className="font-semibold text-black">
                          {selectedTransaction.receiverName}
                        </span>
                      </p>
                      <p className="text-gray-500 mt-0">
                        on{" "}
                        <span className="font-semibold text-black">
                          {selectedTransaction.date}
                        </span>
                      </p>
                    </div>

                    {/* Transaction Details - 2 Column Layout */}
                    <div className="bg-gray-50 p-5 rounded-lg mb-3">
                      <h3 className="font-semibold text-black text-lg mb-3">
                        Transaction Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div>
                            <p className="text-gray-500 text-sm">
                              Transaction ID
                            </p>
                            <p className="text-black text-sm break-all font-semibold">
                              {selectedTransaction.transactionId}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Channel</p>
                            <p className="text-sm font-semibold break-all">
                              {selectedTransaction.transactionType}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Sender Currency
                            </p>
                            <p className="text-sm font-semibold">
                              {selectedTransaction.currencyIso3a}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              TP Reference
                            </p>
                            <p className="text-sm font-semibold break-all">
                              {selectedTransaction.tpReference}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-gray-500 text-sm">Purpose</p>
                            <p className="text-sm font-semibold">Transfer</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Recipient Currency
                            </p>
                            <p className="text-sm font-semibold">
                              {selectedTransaction.receiverCurrencyIso3a}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Settlement Ref
                            </p>
                            <p className="text-sm font-semibold break-all">
                              {selectedTransaction.settlementReference}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              MPESA Reference
                            </p>
                            <p className="text-sm font-semibold break-all">
                              {selectedTransaction.mpesaReference || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Key as full-width row */}
                      <div className="mt-4">
                        <p className="text-gray-500 text-sm">Transaction Key</p>
                        <p className="text-black font-semibold text-sm break-all p-2 rounded mt-1">
                          {selectedTransaction.transactionKey}
                        </p>
                      </div>

                      <div className="border-t border-gray-200 my-4"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">
                            Transaction Fee
                          </p>
                          <p className="text-sm font-semibold">0.00</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Exchange Rate</p>
                          <p className="text-sm font-semibold">
                            {selectedTransaction.exchangeRate.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm font-semibold">
                            Recipient Amount
                          </p>
                          <p className="text-sm font-semibold">
                            {selectedTransaction.recipientAmount.toFixed(2)}{" "}
                            {selectedTransaction.receiverCurrencyIso3a}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Bank Name</p>
                          <p className="text-sm font-semibold break-all">
                            {selectedTransaction.bankName || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sender & Receiver - Side by Side */}
                    <div className="flex gap-5 mb-5">
                      <div className="bg-gray-50 p-5 rounded-lg flex-1">
                        <h3 className="font-semibold text-black text-lg mb-3">
                          Sender
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-gray-500 text-sm">Name</p>
                            <p className="text-black text-sm font-semibold break-all">
                              {selectedTransaction.senderName}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Phone</p>
                            <p className="text-sm font-semibold break-all">
                              {selectedTransaction.senderPhone}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">Email</p>
                            <p className="text-sm font-semibold break-all">
                              {selectedTransaction.senderEmail}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-5 rounded-lg flex-1">
                        <h3 className="font-semibold text-black text-lg mb-3">
                          Receiver
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-gray-500 text-sm">Name</p>
                            <p className="text-black text-sm font-semibold break-all">
                              {selectedTransaction.receiverName}
                            </p>
                          </div>
                          {selectedTransaction.receiverPhone && (
                            <div>
                              <p className="text-gray-500 text-sm">Phone</p>
                              <p className="text-sm font-semibold break-all">
                                {selectedTransaction.receiverPhone}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-gray-500 text-sm">
                              Account Number
                            </p>
                            <p className="text-sm font-semibold break-all">
                              {selectedTransaction.accountNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-sm mt-4">
                      <p className="font-semibold">Thank you for using Tuma!</p>
                      <p className="text-gray-500 italic mt-1">
                        For inquiries or assistance, contact us:
                      </p>
                      <p className="text-gray-600 mt-1">support@tuma.com</p>
                      <p className="text-gray-600">+447-778-024-995</p>
                      <a
                        href="https://tuma.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block -mt-1"
                      >
                        <p className="text-blue-500">tuma.com</p>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
}
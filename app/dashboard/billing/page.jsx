"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Download,
  Eye,
  Receipt,
  Shield,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  X,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import Cookies from "js-cookie";
import { createPortal } from "react-dom";
import jsPDF from "jspdf";

const Modal = ({ isOpen, onClose, title, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        className="relative bg-white rounded-2xl shadow-2xl transform transition-transform duration-300 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: "0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

const ReceiptTemplate = ({ payment, onDownload }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <img src="/logo.png" alt="Company Logo" className="mx-auto h-16 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900">Payment Receipt</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-semibold">{payment.date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Reference</p>
          <p className="font-semibold">{payment.reference}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="font-semibold">{payment.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-semibold">KES {payment.amount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Method</p>
          <p className="font-semibold">{payment.method}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {payment.status}
          </span>
        </div>
      </div>
      <div className="border-t pt-4 text-center text-sm text-gray-500">
        <p>Processed by Looma Financial Services through Safaricom M-Pesa</p>
        <p>Thank you for your payment!</p>
      </div>
      <button
        onClick={onDownload}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Download size={16} />
        Download PDF Receipt
      </button>
    </div>
  );
};

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [stats, setStats] = useState({
    smsCredits: 0,
    whatsappCredits: 0,
    accountStatus: "Active",
    accountNumber: "",
    waAccount: "",
    smsAccount: ""
  });
  const [payments, setPayments] = useState([]);

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

  // Get user data from cookies
  useEffect(() => {
    const userCookie = Cookies.get("user_data");
    if (userCookie) {
      try {
        const parsedUserData = JSON.parse(userCookie);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  // Fetch billing data
  const fetchBillingData = async () => {
    if (!userData?.user_id) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_ENDPOINT}/billing.php?user_id=${userData.user_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success) {
        setStats(data.stats || {
          smsCredits: 0,
          whatsappCredits: 0,
          accountStatus: "Active",
          accountNumber: "",
          waAccount: "",
          smsAccount: ""
        });
        setPayments(data.payments || []);
      }

    } catch (err) {
      console.error("Error fetching billing data:", err);
      setPayments([
        { id: 1, date: "2025-09-25", amount: 5000, status: "Completed", method: "Paybill", reference: "PKL2X3Y4Z5", receiptUrl: "#", type: "Service Payment" },
        { id: 2, date: "2025-09-24", amount: 500, status: "Completed", method: "Paybill", reference: "SMS1A2B3C4", receiptUrl: "#", type: "SMS Credits" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.user_id) {
      fetchBillingData();
    }
  }, [userData]);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const downloadPDFReceipt = (payment) => {
    const doc = new jsPDF();
    
    // Add Logo (assuming logo.png is accessible)
    doc.addImage("/logo.png", "PNG", 80, 10, 20, 20);
    
    // Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Receipt", 105, 40, { align: "center" });
    
    // Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    
    const details = [
      { label: "Date", value: payment.date },
      { label: "Reference", value: payment.reference },
      { label: "Type", value: payment.type },
      { label: "Amount", value: `KES ${payment.amount.toLocaleString()}` },
      { label: "Method", value: payment.method },
      { label: "Status", value: payment.status },
    ];

    let y = 50;
    details.forEach((item, index) => {
      const xOffset = index % 2 === 0 ? 20 : 110;
      if (index % 2 === 0 && index > 0) y += 20;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(item.label, xOffset, y);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(item.value, xOffset, y + 5);
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setLineWidth(0.5);
    doc.line(20, y + 30, 190, y + 30);
    doc.text("Processed by Looma Financial Services through Safaricom M-Pesa", 105, y + 40, { align: "center" });
    doc.text("Thank you for your payment!", 105, y + 48, { align: "center" });

    // Save PDF
    doc.save(`receipt_${payment.reference}.pdf`);
  };

  const StatCard = ({ title, value, icon: Icon, color, isLoading, subtitle, isBadge }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {isLoading ? (
            <div className="h-8 w-20 bg-gray-100 rounded animate-pulse mt-1"></div>
          ) : isBadge ? (
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
              value === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {value}
            </span>
          ) : (
            <div className="text-xl font-semibold mt-1">
              {typeof value === "number" && value > 1000 ? value.toLocaleString() : value}
            </div>
          )}
          {subtitle && !isLoading && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-2 rounded-full ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : 'bg-purple-100'}`}>
          <Icon className={`h-5 w-5 ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : 'text-purple-600'}`} />
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      "Completed": "bg-green-100 text-green-800 border border-green-200",
      "Pending": "bg-yellow-100 text-yellow-800 border border-yellow-200",
      "Failed": "bg-red-100 text-red-800 border border-red-200"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const PaymentAccountCard = ({ title, businessNumber, accountNumber, description, icon: Icon }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon className="text-blue-600" size={20} />
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <Shield className="text-green-600" size={18} />
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Business Number</p>
            <p className="font-mono font-semibold text-gray-900">{businessNumber}</p>
          </div>
          <button
            onClick={() => copyToClipboard(businessNumber, `${title}-business`)}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Copy business number"
          >
            {copiedField === `${title}-business` ? (
              <Check className="text-green-600" size={16} />
            ) : (
              <Copy className="text-gray-600" size={16} />
            )}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Account Number</p>
            <p className="font-mono font-semibold text-gray-900">{accountNumber || "Not Set"}</p>
          </div>
          {accountNumber && (
            <button
              onClick={() => copyToClipboard(accountNumber, `${title}-account`)}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Copy account number"
            >
              {copiedField === `${title}-account` ? (
                <Check className="text-green-600" size={16} />
              ) : (
                <Copy className="text-gray-600" size={16} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
            <p className="text-gray-600 mt-1">Manage payments and view transaction history</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="SMS Credits"
            value={stats.smsCredits}
            icon={MessageSquare}
            color="blue"
            isLoading={isLoading}
            subtitle="Available SMS credits"
          />
          <StatCard
            title="WhatsApp Credits"
            value={stats.whatsappCredits}
            icon={MessageCircle}
            color="green"
            isLoading={isLoading}
            subtitle="Available WhatsApp credits"
          />
          <StatCard
            title="Account Status"
            value={stats.accountStatus}
            icon={CheckCircle}
            color="green"
            isLoading={isLoading}
            isBadge={true}
            subtitle="Current status"
          />
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl border border-gray-200">
          <button
            onClick={() => setShowPaymentMethods(!showPaymentMethods)}
            className="w-full px-6 py-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <CreditCard className="mr-2 text-gray-700" size={20} />
              Payment Methods
            </h2>
            {showPaymentMethods ? (
              <ChevronUp className="text-gray-600" size={20} />
            ) : (
              <ChevronDown className="text-gray-600" size={20} />
            )}
          </button>

          {showPaymentMethods && (
            <div className="p-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start space-x-3">
                <AlertCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">How to make payments:</p>
                  <ol className="list-decimal list-inside space-y-1 text-blue-700">
                    <li>Go to M-Pesa menu on your phone</li>
                    <li>Select Lipa na M-Pesa, then Pay Bill</li>
                    <li>Enter the Business Number shown below</li>
                    <li>Enter your Account Number</li>
                    <li>Enter the amount and complete payment</li>
                  </ol>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PaymentAccountCard
                  title="SMS Credits"
                  businessNumber="5677188"
                  accountNumber={stats.smsAccount}
                  description="Use this account to purchase SMS credits"
                  icon={MessageSquare}
                />
                
                <PaymentAccountCard
                  title="WhatsApp Credits"
                  businessNumber="5677188"
                  accountNumber={stats.waAccount}
                  description="Use this account to purchase WhatsApp credits"
                  icon={MessageCircle}
                />
                
                <PaymentAccountCard
                  title="General Billing"
                  businessNumber="5677188"
                  accountNumber={stats.accountNumber}
                  description="Use this account for general billing payments"
                  icon={Receipt}
                />
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                <div className="flex items-center text-center space-x-2">
                  <p className="text-sm text-gray-700 text-center">
                    All transactions are processed through Safaricom M-Pesa Paybill. 
                    Your payment will reflect in your account within 5 minutes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Receipt className="mr-2 text-gray-700" size={20} />
              Payment History
            </h2>
            <p className="text-sm text-gray-600 mt-1">View all your payment transactions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Method</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Reference</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-900">{payment.date}</td>
                    <td className="p-4 text-sm text-gray-600">{payment.type}</td>
                    <td className="p-4 text-sm font-medium text-gray-900">KES {payment.amount.toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-600">{payment.method}</td>
                    <td className="p-4 text-sm font-mono text-gray-600">{payment.reference}</td>
                    <td className="p-4">{getStatusBadge(payment.status)}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded transition-colors"
                          title="View receipt"
                        >
                          <Eye size={16} />
                        </button>
                        {payment.status === "Completed" && (
                          <button
                            onClick={() => downloadPDFReceipt(payment)}
                            className="text-green-600 hover:text-green-800 p-1 hover:bg-green-100 rounded transition-colors"
                            title="Download PDF receipt"
                          >
                            <Download size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {payments.length === 0 && !isLoading && (
            <div className="p-12 text-center">
              <Receipt className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 font-medium">No payment history yet</p>
              <p className="text-sm text-gray-400 mt-1">Your transactions will appear here once you make a payment</p>
            </div>
          )}

          {isLoading && (
            <div className="p-12 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          )}
        </div>

        {/* Receipt Modal */}
        <Modal
          isOpen={!!selectedPayment}
          onClose={() => setSelectedPayment(null)}
          title="Payment Receipt"
        >
          {selectedPayment && (
            <ReceiptTemplate
              payment={selectedPayment}
              onDownload={() => downloadPDFReceipt(selectedPayment)}
            />
          )}
        </Modal>

        {/* Footer */}
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            All payments are secured by Safaricom M-Pesa and processed by Looma Financial Services
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
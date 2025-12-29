"use client";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  Users,
  Wifi,
  DollarSign,
  Router,
  TrendingUp,
  Plus,
  Send,
  FileText,
  CreditCard,
  X,
  WifiOff,
  CheckCircle,
  Clock,
  RotateCw,
  Download,
  BarChart3,
  Bell,
  Eye,
  EyeOff
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useRouter } from "next/navigation";
import CustomToast from "@/components/customtoast";

// Portal Modal Component
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
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

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      <div
        className={`relative bg-white rounded-2xl shadow-2xl transform transition-all duration-300 p-6 w-full max-h-[90vh] overflow-y-auto ${sizeClasses[size]}`}
        style={{
          boxShadow: "0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Custom Tooltip for Pie Chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg backdrop-blur-sm">
        <p className="font-semibold text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600 mt-1">Customers: {data.value}</p>
        <p className="text-sm text-gray-600">Revenue: KES {data.amount?.toLocaleString()}</p>
        <p className="text-sm text-gray-600">
          Percentage: {((data.percent || 0) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

// Custom Label for Pie Chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  if (!percent || percent < 0.05) return null;

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, isLoading, subtitle, trend }) => {
  const colorClasses = {
    blue: { bg: "bg-blue-50", icon: "text-blue-600", text: "text-blue-600" },
    green: { bg: "bg-green-50", icon: "text-green-600", text: "text-green-600" },
    purple: { bg: "bg-purple-50", icon: "text-purple-600", text: "text-purple-600" },
    orange: { bg: "bg-orange-50", icon: "text-orange-600", text: "text-orange-600" },
    red: { bg: "bg-red-50", icon: "text-red-600", text: "text-red-600" },
    indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", text: "text-indigo-600" },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {isLoading ? (
            <div className="h-8 w-20 bg-gray-100 rounded-lg animate-pulse mt-1"></div>
          ) : (
            <>
              <div className={`text-2xl font-bold ${colors.text} mb-1`}>
                {typeof value === "number" && value > 1000 ? value.toLocaleString() : value}
              </div>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
              {trend && (
                <div className={`flex items-center text-xs mt-1 ${trend.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className={`h-3 w-3 mr-1 ${trend.value < 0 ? 'rotate-180' : ''}`} />
                  {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
                </div>
              )}
            </>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
};

// Quick Action Button Component
const QuickActionButton = ({ icon: Icon, title, onClick, color, description }) => {
  const colorClasses = {
    blue: { bg: "bg-blue-50", icon: "text-blue-600", hover: "hover:bg-blue-100" },
    green: { bg: "bg-green-50", icon: "text-green-600", hover: "hover:bg-green-100" },
    purple: { bg: "bg-purple-50", icon: "text-purple-600", hover: "hover:bg-purple-100" },
    orange: { bg: "bg-orange-50", icon: "text-orange-600", hover: "hover:bg-orange-100" },
    red: { bg: "bg-red-50", icon: "text-red-600", hover: "hover:bg-red-100" },
    indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", hover: "hover:bg-indigo-100" },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <button
      onClick={onClick}
      className={`flex items-start p-4 ${colors.bg} ${colors.hover} rounded-xl transition-all duration-200 text-left group border border-transparent hover:border-gray-200`}
      aria-label={title}
    >
      <div className={`p-2 rounded-lg ${colors.bg} group-hover:scale-110 transition-transform duration-200 mr-3`}>
        <Icon className={`h-5 w-5 ${colors.icon}`} />
      </div>
      <div className="flex-1">
        <span className="font-semibold text-gray-900 block mb-1">{title}</span>
        {description && (
          <span className="text-xs text-gray-500 block">{description}</span>
        )}
      </div>
    </button>
  );
};

// Notice Card Component
const NoticeCard = ({ type, title, message, icon: Icon, action }) => {
  const typeClasses = {
    warning: {
      bg: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      text: "text-yellow-900",
      subtitle: "text-yellow-700"
    },
    info: {
      bg: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      text: "text-blue-900",
      subtitle: "text-blue-700"
    },
    success: {
      bg: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      text: "text-green-900",
      subtitle: "text-green-700"
    }
  };

  const styles = typeClasses[type] || typeClasses.info;

  return (
    <div className={`p-4 rounded-xl border ${styles.bg} backdrop-blur-sm`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full ${styles.iconBg}`}>
          <Icon className={`h-5 w-5 ${styles.iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-sm font-semibold ${styles.text}`}>
            {title}
          </h3>
          <p className={`text-sm mt-1 ${styles.subtitle}`}>
            {message}
          </p>
          {action && (
            <button className={`text-xs font-medium mt-2 ${styles.subtitle} hover:underline`}>
              {action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(true);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    onlineCustomers: 0,
    todayPayments: 0,
    todayAmount: 0,
    pendingPayments: 0,
    totalRouters: 0,
    smsCredits: 0,
    paymentRate: 0,
  });
  const [packageDistribution, setPackageDistribution] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState({});

  const router = useRouter();

  const [toast, setToast] = useState({
    message: "",
    type: "error",
    isVisible: false
  });

  const showToast = (message, type = "error") => {
    setToast({
      message,
      type,
      isVisible: true
    });

    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/isp-stats.php`;

  // Check for notification preference cookie on mount
  useEffect(() => {
    const hiddenPref = Cookies.get("hide_dashboard_notifications");
    if (hiddenPref === "true") {
      setShowNotifications(false);
    }
  }, []);

  // Handler to toggle notifications
  const toggleNotifications = () => {
    const newState = !showNotifications;
    setShowNotifications(newState);
    
    if (newState === false) {
      // User is hiding them -> Set Cookie
      Cookies.set("hide_dashboard_notifications", "true", { expires: 7 }); // Expires in 7 days
    } else {
      // User is showing them -> Remove Cookie
      Cookies.remove("hide_dashboard_notifications");
    }
  };

  // Get user data from cookie
  useEffect(() => {
    const userCookie = Cookies.get("user_data");
    if (userCookie) {
      try {
        const parsedUserData = JSON.parse(userCookie);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        showToast("Invalid user session. Please login again.", "error");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } else {
      showToast("No user session found. Please login.", "error");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [router]);

  const fetchDashboardData = async () => {
    if (!userData?.user_id) return;

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isp_id: userData.user_id
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setStats(data.stats);
      setPackageDistribution(data.packageDistribution?.map((pkg, index) => ({
        ...pkg,
        color: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#06B6D4"][index % 6]
      })) || []);
      setRecentPayments(data.recentPayments || []);
      setAlerts(data.alerts || []);
      setSystemMetrics(data.systemMetrics || {});

      if (!isLoading) {
        showToast("Dashboard data refreshed successfully!", "success");
      }

    } catch (err) {
      console.error('Dashboard API Error:', err);
      let errorMessage = "Failed to load dashboard data. Please try again.";

      if (err.message.includes('fetch')) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (err.message.includes('500')) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.message.includes('401') || err.message.includes('403')) {
        errorMessage = "Session expired. Please login again.";
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else if (err.message) {
        errorMessage = err.message;
      }

      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.user_id) {
      fetchDashboardData();
    }
  }, [userData]);

  // Quick actions handlers
  const quickActions = [
    {
      icon: Plus,
      title: "Add Customer",
      description: "Create new customer account",
      color: "green",
      onClick: () => router.push("/dashboard/customers")
    },
    {
      icon: CreditCard,
      title: "Billing",
      description: "Manage payments & invoices",
      color: "blue",
      onClick: () => router.push("/dashboard/billing")
    },
    {
      icon: Send,
      title: "Send SMS",
      description: "Broadcast message to customers",
      color: "purple",
      onClick: () => setShowModal("sms")
    },
    {
      icon: FileText,
      title: "Reports",
      description: "Generate financial reports",
      color: "orange",
      onClick: () => setShowModal("reports")
    },
    {
      icon: Router,
      title: "Network",
      description: "Monitor network status",
      color: "indigo",
      onClick: () => setShowModal("network")
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "View detailed analytics",
      color: "red",
      onClick: () => router.push("/dashboard/analytics")
    },
  ];

  if (!userData && isLoading) {
    return (
      <>
        <CustomToast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
        <DashboardLayout>
          <div className="max-w-7xl mx-auto  lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <RotateCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Loading user session...</p>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </>
    );
  }

  return (
    <>
      <CustomToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-500 mt-2">
                Welcome back, {userData?.name || 'Admin'} • One PPPoE System
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/dashboard/ispnotepad')}
                title="Open notepad"
                aria-label="Open notepad"
                className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-sm text-gray-700">Notes</span>
              </button>
              <button
                onClick={fetchDashboardData}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Alerts / Notifications Panel with Toggle */}
          {alerts.length > 0 && !isLoading && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              {/* Notifications Header with Toggle Button */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                 <div className="flex items-center gap-2">
                   <div className="relative">
                      <Bell className="h-5 w-5 text-gray-600" />
                      {showNotifications && (
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                   </div>
                   <h3 className="font-semibold text-gray-900">
                     System Notifications 
                     <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                       {alerts.length}
                     </span>
                   </h3>
                 </div>

                 <button
                  onClick={toggleNotifications}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    showNotifications 
                    ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm' 
                    : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                  }`}
                 >
                   {showNotifications ? (
                     <>
                       <EyeOff className="h-4 w-4" />
                       Hide Notifications
                     </>
                   ) : (
                     <>
                       <Eye className="h-4 w-4" />
                       Show Notifications
                     </>
                   )}
                 </button>
              </div>

              {/* Collapsible Content */}
              {showNotifications && (
                <div className="p-6 grid gap-4 md:grid-cols-2 bg-white animate-in fade-in slide-in-from-top-2 duration-300">
                  {alerts.map((alert, index) => (
                    <NoticeCard
                      key={index}
                      type={alert.type}
                      icon={alert.type === "warning" ? WifiOff : Clock}
                      title={alert.title || (alert.type === "warning" ? "Service Maintenance" : "System Notice")}
                      message={alert.message}
                      action={alert.action}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Customers"
              value={stats.totalCustomers}
              icon={Users}
              color="blue"
              isLoading={isLoading}
              trend={{ value: 12, label: "from last month" }}
            />
            <StatCard
              title="Online Now"
              value={stats.onlineCustomers}
              icon={Wifi}
              color="green"
              isLoading={isLoading}
              subtitle={`${stats.totalCustomers > 0 ? ((stats.onlineCustomers / stats.totalCustomers) * 100).toFixed(1) : 0}% connected`}
            />
            <StatCard
              title="Today's Revenue"
              value={`KES ${stats.todayAmount.toLocaleString()}`}
              icon={DollarSign}
              color="purple"
              isLoading={isLoading}
              subtitle={`${stats.todayPayments} payments`}
            />
            <StatCard
              title="Payment Rate"
              value={`${stats.paymentRate}%`}
              icon={TrendingUp}
              color="orange"
              isLoading={isLoading}
              subtitle="Monthly collection rate"
            />
          </div>

          {/* Charts & Data Section */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Package Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Package Distribution</h3>
                  <p className="text-gray-500 text-sm mt-1">Customer distribution across packages</p>
                </div>
                <Link
                  href="/dashboard/packages"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {isLoading ? (
                <div className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
              ) : packageDistribution.length > 0 ? (
                <div className="space-y-4">
                  {/* Chart showing all packages */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={packageDistribution.slice(0, 10)}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={100}
                          paddingAngle={1}
                          dataKey="value"
                          label={renderCustomizedLabel}
                          labelLine={false}
                        >
                          {packageDistribution.slice(0, 10).map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="#fff"
                              strokeWidth={3}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Compact package grid - Limited to 10 items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packageDistribution.slice(0, 10).map((pkg, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: pkg.color }}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">{pkg.name}</p>
                            <p className="text-xs text-gray-500">
                              {((pkg.value / stats.totalCustomers) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="font-semibold text-gray-900">{pkg.value}</p>
                          <p className="text-xs text-gray-500">
                            KES {pkg.amount?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Show remaining packages count if more than 10 */}
                  {packageDistribution.length > 10 && (
                    <div className="text-center py-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700 font-medium">
                        +{packageDistribution.length - 10} more packages
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        {packageDistribution.slice(10).reduce((sum, pkg) => sum + pkg.value, 0)} additional customers
                      </p>
                    </div>
                  )}

                  {/* Enhanced summary with more stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">{stats.totalCustomers}</span> total
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">
                        {packageDistribution.length > 10 ? '10/' : ''}{packageDistribution.length}
                      </span> packages
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">
                        KES {packageDistribution.reduce((sum, pkg) => sum + (pkg.amount || 0), 0).toLocaleString()}
                      </span> revenue
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No package data available</p>
                  <p className="text-sm mt-1">Add packages and customers to see distribution data</p>
                </div>
              )}
            </div>
            {/* Recent Activity */}
            <div className="space-y-6">
              {/* Recent Payments */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
                    <p className="text-gray-500 text-sm mt-1">Latest customer transactions</p>
                  </div>
                  <Link
                    href="/dashboard/payments"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View All
                  </Link>
                </div>

                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3 animate-pulse">
                        <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentPayments.length > 0 ? (
                  <div className="space-y-4">
                    {recentPayments.slice(0, 5).map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <DollarSign className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{payment.customer}</p>
                            <p className="text-sm text-gray-500">{payment.package} • {payment.time}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-green-600 text-lg">
                          KES {payment.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No recent payments</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {quickActions.map((action, index) => (
                    <QuickActionButton key={index} {...action} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Modals */}
      <Modal isOpen={showModal === "sms"} onClose={() => setShowModal(null)} title="Send SMS Broadcast">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="Enter your broadcast message here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Customers ({stats.totalCustomers})</option>
              <option>Active Customers ({stats.onlineCustomers})</option>
              <option>Pending Payments ({stats.pendingPayments})</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                showToast("SMS broadcast sent successfully!", "success");
                setShowModal(null);
              }}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Send Broadcast
            </button>
            <button
              onClick={() => setShowModal(null)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showModal === "reports"} onClose={() => setShowModal(null)} title="Generate Reports" size="lg">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>Monthly Summary</option>
                <option>Daily Transactions</option>
                <option>Customer History</option>
                <option>Package Performance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                showToast("Report generated successfully!", "success");
                setShowModal(null);
              }}
              className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Generate Report
            </button>
            <button
              onClick={() => setShowModal(null)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showModal === "network"} onClose={() => setShowModal(null)} title="Network Status">
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Main Router</span>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
              </div>
              <p className="text-sm text-gray-600">192.168.1.1 • Uptime: 24h 15m</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Backup Router</span>
                <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Standby</span>
              </div>
              <p className="text-sm text-gray-600">192.168.1.2 • Last seen: 2m ago</p>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                showToast("Network diagnostics completed!", "success");
                setShowModal(null);
              }}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Run Diagnostics
            </button>
            <button
              onClick={() => setShowModal(null)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
"use client";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Bell,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calendar,
  Filter,
  Search,
  RotateCw,
  X,
  FileText,
  Rocket
} from "lucide-react";
import CustomToast from "@/components/customtoast";

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [stats, setStats] = useState({
    totalNotifications: 0,
    todayNotifications: 0,
  });
  const [notifications, setNotifications] = useState([]);

  // Toast state
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

  // Mock fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock Data for Accelerator
      const mockNotifications = [
        {
          id: 1,
          title: "New Startup Application",
          message: "GreenTech Solutions has submitted a new application for the Winter 2024 cohort.",
          type: "info",
          category: "Applications",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false
        },
        {
          id: 2,
          title: "Demo Day Schedule Finalized",
          message: "The schedule for the upcoming Demo Day has been confirmed. Please review the timeline.",
          type: "success",
          category: "Events",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          read: true
        },
        {
          id: 3,
          title: "Mentor Session Cancelled",
          message: "John Doe has cancelled his mentorship session with Team Alpha due to an emergency.",
          type: "warning",
          category: "Mentorship",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          read: false
        },
        {
          id: 4,
          title: "Funding Milestone Reached",
          message: "TechNova has successfully raised their Seed round of $2M.",
          type: "success",
          category: "Portfolio",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          read: true
        }
      ];

      // Filter logic
      let filtered = mockNotifications;
      if (filterType !== 'all') {
        filtered = filtered.filter(n => n.type === filterType);
      }
      if (searchTerm) {
        filtered = filtered.filter(n =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.message.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setNotifications(filtered);
      setStats({
        totalNotifications: mockNotifications.length,
        todayNotifications: mockNotifications.filter(n => {
          const date = new Date(n.timestamp);
          const today = new Date();
          return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
        }).length
      });

      if (!searchTerm && filterType === 'all') {
        showToast("Notifications loaded successfully!", "success");
      }

    } catch (err) {
      console.error('Error fetching notifications:', err);
      showToast("Failed to load notifications", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filterType, searchTerm]);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {isLoading ? (
            <div className="h-8 w-20 bg-gray-100 rounded animate-pulse mt-1"></div>
          ) : (
            <div className={`text-xl font-semibold text-${color}-600 mt-1`}>
              {value}
            </div>
          )}
          {subtitle && !isLoading && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-2 rounded-full bg-${color}-100`}>
          <Icon className={`h-5 w-5 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const getNotificationIcon = (type) => {
    const iconConfig = {
      info: { icon: Info, color: "text-blue-600", bg: "bg-blue-100" },
      warning: { icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-100" },
      success: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
      error: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
    };

    return iconConfig[type] || iconConfig.info;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
  };

  const NotificationCard = ({ notification }) => {
    const iconConfig = getNotificationIcon(notification.type);
    const NotificationIcon = iconConfig.icon;

    return (
      <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${!notification.read ? 'border-l-4' : ''
        } ${!notification.read && notification.type === 'info' ? 'border-l-blue-400' :
          !notification.read && notification.type === 'warning' ? 'border-l-yellow-400' :
            !notification.read && notification.type === 'success' ? 'border-l-green-400' :
              !notification.read && notification.type === 'error' ? 'border-l-red-400' :
                ''
        }`}>
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-xl ${iconConfig.bg} flex-shrink-0`}>
            <NotificationIcon className={`h-6 w-6 ${iconConfig.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${notification.type === 'info' ? 'bg-blue-100 text-blue-800' :
                      notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        notification.type === 'success' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                    }`}>
                    {notification.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatTime(notification.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotificationSkeleton = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
  };

  return (
    <>
      <CustomToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Note: In Next.js App Router, layout wraps page automatically if defined in layout.js 
          Since we are inside dashboard, the DashboardLayout is likely already applied by app/dashboard/layout.js.
          However, the previous file used it explicitly. Checking previous file...
          It used DashboardLayout as a wrapper. I will follow that pattern but ideally this should be in layout.js.
       */}
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Notifications</h1>
            <p className="text-muted-foreground mt-1">Stay updated with important system and program alerts.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              System Online
            </div>
            <button
              onClick={() => fetchNotifications()}
              disabled={isLoading}
              className="flex items-center px-3 py-1.5 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <RotateCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <StatCard
            title="Total Notifications"
            value={stats.totalNotifications}
            icon={Bell}
            color="blue"
            subtitle="All notifications"
          />
          <StatCard
            title="Today"
            value={stats.todayNotifications}
            icon={Calendar}
            color="green"
            subtitle="Last 24 hours"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border/50">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  <Filter className="h-4 w-4 inline mr-2" />
                  Notification Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                >
                  <option value="all">All Types</option>
                  <option value="info">Information</option>
                  <option value="warning">Warnings</option>
                  <option value="success">Success</option>
                  <option value="error">Errors</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  <Search className="h-4 w-4 inline mr-2" />
                  Search Notifications
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by title or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => <NotificationSkeleton key={i} />)
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="bg-card rounded-xl p-8 text-center border border-border/50">
              <Bell className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No notifications found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || filterType !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'You\'re all caught up! New notifications will appear here.'
                }
              </p>
              {(searchTerm || filterType !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-6 dark:bg-blue-950/20 dark:border-blue-800/30">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex-shrink-0">
              <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">About Notifications</h3>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                We send notifications for important program updates, application status changes, event schedules,
                and mentor requests.
                <span className="font-semibold"> Low priority notifications expire after 30 days.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
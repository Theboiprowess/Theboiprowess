"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, Check, Clock, Settings, Activity, Calendar, FileText, User, Trash2, Search } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  entity_type?: string;
  entity_id?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: any;
  created_at: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"notifications" | "activity" | "admissions">("notifications");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === "notifications") {
        const response = await fetch("/api/admin/notifications?unreadOnly=true");
        const data = await response.json();
        setUnreadCount(data.length);
        
        const allResponse = await fetch("/api/admin/notifications");
        const allData = await allResponse.json();
        setNotifications(allData);
      } else if (activeTab === "activity") {
        const response = await fetch("/api/admin/activity-logs?limit=50");
        const data = await response.json();
        setActivityLogs(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_read: true }),
      });
      fetchData();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mark_all_read: true }),
      });
      fetchData();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const deleteNotification = async (id: string) => {
    if (!confirm("Delete this notification?")) return;
    try {
      await fetch(`/api/admin/notifications?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "teacher_created":
      case "student_created":
      case "news_created":
      case "event_created":
      case "gallery_image_uploaded":
        return <User className="h-4 w-4 text-green-500" />;
      case "teacher_updated":
      case "student_updated":
      case "news_updated":
      case "event_updated":
      case "gallery_image_updated":
        return <Settings className="h-4 w-4 text-blue-500" />;
      case "teacher_deleted":
      case "student_deleted":
      case "news_deleted":
      case "event_deleted":
      case "gallery_image_deleted":
        return <Trash2 className="h-4 w-4 text-red-500" />;
      case "application_submitted":
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case "teacher":
        return <User className="h-4 w-4" />;
      case "student":
        return <User className="h-4 w-4" />;
      case "news":
        return <FileText className="h-4 w-4" />;
      case "event":
        return <Calendar className="h-4 w-4" />;
      case "gallery":
        return <FileText className="h-4 w-4" />;
      case "application":
        return <FileText className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const filteredNotifications = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivity = activityLogs.filter(
    (a) =>
      a.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.entity_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings & Activity</h1>
          <p className="text-gray-600">View notifications, activity logs, and configure settings</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex-1 px-6 py-4 text-sm font-medium relative ${
                  activeTab === "notifications"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Bell className="h-5 w-5 inline mr-2" />
                Notifications
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`flex-1 px-6 py-4 text-sm font-medium ${
                  activeTab === "activity"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Activity className="h-5 w-5 inline mr-2" />
                Activity Timeline
              </button>
              <button
                onClick={() => setActiveTab("admissions")}
                className={`flex-1 px-6 py-4 text-sm font-medium ${
                  activeTab === "admissions"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Settings className="h-5 w-5 inline mr-2" />
                Admissions Settings
              </button>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {activeTab === "notifications" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {unreadCount > 0 && `${unreadCount} unread`}
                </h2>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <BellOff className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.is_read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{notification.title}</h3>
                            {!notification.is_read && (
                              <span className="h-2 w-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {!notification.is_read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-green-600 hover:bg-green-100 rounded"
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="p-6">
              {filteredActivity.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No activity logs</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredActivity.map((log) => (
                    <div key={log.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-full shadow">
                        {getActionIcon(log.action)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 capitalize">
                            {log.action.replace(/_/g, " ")}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600 capitalize flex items-center gap-1">
                            {getEntityIcon(log.entity_type)}
                            {log.entity_type}
                          </span>
                        </div>
                        {log.details && (
                          <p className="text-sm text-gray-600">
                            {typeof log.details === "string"
                              ? log.details
                              : JSON.stringify(log.details)}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(log.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "admissions" && (
            <div className="p-6">
              <div className="text-center py-12 text-gray-500">
                <Settings className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Admissions settings configuration</p>
                <p className="text-sm mt-2">
                  Use the API endpoint <code>/api/admin/admissions-settings</code> to configure
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

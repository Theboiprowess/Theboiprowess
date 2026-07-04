"use client";

import { motion } from "framer-motion";
import { 
  Users, FileText, Calendar, Image, Download, Settings, TrendingUp,
  Plus, Bell, Upload, UserPlus, BookOpen, Phone, Mail, Newspaper,
  Edit, Database, Shield, BarChart3, LogOut, Clock, CheckCircle, XCircle,
  AlertCircle, Activity
} from "lucide-react";
import Link from "next/link";
import { getCurrentYear, getNextAcademicYear, getCurrentAcademicSession } from "@/lib/date-utils";
import { useEffect, useState } from "react";

interface DashboardStats {
  studentCount: number;
  teacherCount: number;
  applicationCount: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  applicationsToday: number;
  applicationsWeek: number;
  applicationsMonth: number;
  newsCount: number;
  eventsCount: number;
  galleryCount: number;
  unreadNotifications: number;
  admissionRate: number;
  recentActivities: any[];
  recentApplications: any[];
}

interface StatCard {
  title: string;
  value: number;
  change: string;
  icon: any;
  color: string;
}

const quickActions = [
  {
    title: "Add News",
    description: "Create and publish news articles",
    href: "/admin/news-events",
    icon: Newspaper,
    action: "create_news",
  },
  {
    title: "Create Announcement",
    description: "Post important announcements",
    href: "/admin/news-events",
    icon: Bell,
    action: "create_announcement",
  },
  {
    title: "Open Admissions",
    description: "Enable admission applications",
    href: "/admin/settings",
    icon: FileText,
    action: "open_admissions",
  },
  {
    title: "Close Admissions",
    description: "Disable admission applications",
    href: "/admin/settings",
    icon: FileText,
    action: "close_admissions",
  },
  {
    title: "Add Event",
    description: "Create new school events",
    href: "/admin/news-events",
    icon: Calendar,
    action: "create_event",
  },
  {
    title: "Upload Gallery Images",
    description: "Add photos to gallery",
    href: "/admin/gallery",
    icon: Upload,
    action: "upload_gallery",
  },
  {
    title: "Add Teacher",
    description: "Register new teacher",
    href: "/admin/teachers",
    icon: UserPlus,
    action: "add_teacher",
  },
  {
    title: "Add Student",
    description: "Register new student",
    href: "/admin/applications",
    icon: Users,
    action: "add_student",
  },
  {
    title: "Manage Staff",
    description: "View and manage staff",
    href: "/admin/teachers",
    icon: Users,
    action: "manage_staff",
  },
  {
    title: "Publish Notice",
    description: "Publish school notices",
    href: "/admin/news-events",
    icon: Bell,
    action: "publish_notice",
  },
  {
    title: "Edit Homepage",
    description: "Update homepage content",
    href: "/admin/settings",
    icon: Edit,
    action: "edit_homepage",
  },
  {
    title: "Update Contact Info",
    description: "Edit contact details",
    href: "/admin/settings",
    icon: Phone,
    action: "update_contact",
  },
  {
    title: "Send Email Broadcast",
    description: "Send mass emails",
    href: "/admin/settings",
    icon: Mail,
    action: "send_email",
  },
  {
    title: "Send SMS Notification",
    description: "Send SMS alerts",
    href: "/admin/settings",
    icon: Phone,
    action: "send_sms",
  },
  {
    title: "Create Blog Post",
    description: "Write and publish blog posts",
    href: "/admin/news-events",
    icon: Newspaper,
    action: "create_blog",
  },
  {
    title: "Manage Courses",
    description: "Update course information",
    href: "/admin/settings",
    icon: BookOpen,
    action: "manage_courses",
  },
  {
    title: "Manage Academic Calendar",
    description: "Update school calendar",
    href: "/admin/settings",
    icon: Calendar,
    action: "manage_calendar",
  },
  {
    title: "Manage Downloads",
    description: "Upload downloadable files",
    href: "/admin/downloads",
    icon: Download,
    action: "manage_downloads",
  },
  {
    title: "View Reports",
    description: "Access analytics reports",
    href: "/admin/dashboard",
    icon: BarChart3,
    action: "view_reports",
  },
  {
    title: "Backup Database",
    description: "Create database backup",
    href: "/admin/settings",
    icon: Database,
    action: "backup_database",
  },
];

export default function DashboardOverview() {
  const currentYear = getCurrentYear();
  const nextAcademicYear = getNextAcademicYear();
  const currentAcademicSession = getCurrentAcademicSession();
  const [stats, setStats] = useState<DashboardStats>({
    studentCount: 0,
    teacherCount: 0,
    applicationCount: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    applicationsToday: 0,
    applicationsWeek: 0,
    applicationsMonth: 0,
    newsCount: 0,
    eventsCount: 0,
    galleryCount: 0,
    unreadNotifications: 0,
    admissionRate: 0,
    recentActivities: [],
    recentApplications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/analytics');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statsCards: StatCard[] = [
    { title: "Total Students", value: stats.studentCount, change: "Active", icon: Users, color: "bg-blue-500" },
    { title: "Teachers", value: stats.teacherCount, change: "Active", icon: UserPlus, color: "bg-purple-500" },
    { title: "Pending Applications", value: stats.pendingCount, change: "Needs Review", icon: FileText, color: "bg-yellow-500" },
    { title: "Approved Applications", value: stats.approvedCount, change: "Accepted", icon: CheckCircle, color: "bg-green-500" },
    { title: "Rejected Applications", value: stats.rejectedCount, change: "Declined", icon: XCircle, color: "bg-red-500" },
    { title: "News Articles", value: stats.newsCount, change: "Published", icon: Newspaper, color: "bg-indigo-500" },
    { title: "Upcoming Events", value: stats.eventsCount, change: "Scheduled", icon: Calendar, color: "bg-pink-500" },
    { title: "Gallery Images", value: stats.galleryCount, change: "Uploaded", icon: Image, color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-200">Welcome back! Here&apos;s what&apos;s happening at WISEDELL ACADEMY.</p>
          <div className="mt-4 flex gap-6 text-sm">
            <span>Current Year: {currentYear}</span>
            <span>Current Academic Session: {currentAcademicSession}</span>
            <span>Next Admission Year: {nextAcademicYear}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{loading ? "..." : stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Application Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Applications Today</h3>
                <p className="text-2xl font-bold text-blue-600">{loading ? "..." : stats.applicationsToday}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">This Week</h3>
                <p className="text-2xl font-bold text-green-600">{loading ? "..." : stats.applicationsWeek}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">This Month</h3>
                <p className="text-2xl font-bold text-purple-600">{loading ? "..." : stats.applicationsMonth}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Admission Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg mb-12 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Admission Rate</h3>
              <p className="text-blue-100 text-sm">Percentage of approved applications</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">{loading ? "..." : stats.admissionRate}%</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg mb-12"
        >
          <div className="p-6 border-b">
            <h2 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
              <FileText size={24} />
              Recent Applications
            </h2>
          </div>
          <div className="p-6">
            {stats.recentApplications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No applications received yet.</p>
            ) : (
              <div className="space-y-4">
                {stats.recentApplications.map((app: any) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        app.status === 'approved' ? 'bg-green-100 text-green-600' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {app.status === 'pending' ? <Clock size={20} /> :
                         app.status === 'approved' ? <CheckCircle size={20} /> :
                         app.status === 'rejected' ? <XCircle size={20} /> :
                         <AlertCircle size={20} />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {app.student_first_name} {app.student_last_name}
                        </p>
                        <p className="text-sm text-gray-500">{app.application_number} • {app.grade_applying}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(app.submitted_at).toLocaleDateString()}
                      </p>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-lg mb-12"
        >
          <div className="p-6 border-b">
            <h2 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
              <Activity size={24} />
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            {stats.recentActivities.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent activity.</p>
            ) : (
              <div className="space-y-4">
                {stats.recentActivities.map((activity: any) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">
                        {activity.entity_type} • {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg mb-12"
        >
          <div className="p-6 border-b">
            <h2 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
              <FileText size={24} />
              Recent Applications
            </h2>
          </div>
          <div className="p-6">
            {stats.recentApplications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No applications received yet.</p>
            ) : (
              <div className="space-y-4">
                {stats.recentApplications.map((app: any) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        app.status === 'approved' ? 'bg-green-100 text-green-600' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {app.status === 'pending' ? <Clock size={20} /> :
                         app.status === 'approved' ? <CheckCircle size={20} /> :
                         app.status === 'rejected' ? <XCircle size={20} /> :
                         <AlertCircle size={20} />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {app.student_first_name} {app.student_last_name}
                        </p>
                        <p className="text-sm text-gray-500">{app.application_number} • {app.grade_applying}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(app.submitted_at).toLocaleDateString()}
                      </p>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-lg mb-12"
        >
          <div className="p-6 border-b">
            <h2 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
              <Activity size={24} />
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            {stats.recentActivities.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent activity.</p>
            ) : (
              <div className="space-y-4">
                {stats.recentActivities.map((activity: any) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">
                        {activity.entity_type} • {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-heading text-2xl font-bold text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.02 }}
              >
                <Link href={action.href}>
                  <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <action.icon className="text-primary" size={20} />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-primary mb-1">{action.title}</h3>
                    <p className="text-gray-600 text-xs">{action.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

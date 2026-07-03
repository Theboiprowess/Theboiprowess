"use client";

import { motion } from "framer-motion";
import { 
  Users, FileText, Calendar, Image, Download, Settings, TrendingUp,
  Plus, Bell, Upload, UserPlus, BookOpen, Phone, Mail, Newspaper,
  Edit, Database, Shield, BarChart3, LogOut
} from "lucide-react";
import Link from "next/link";
import { getCurrentYear, getNextAcademicYear, getCurrentAcademicSession } from "@/lib/date-utils";

const stats = [
  {
    title: "Total Students",
    value: "524",
    change: "+12%",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Applications",
    value: "45",
    change: "+8%",
    icon: FileText,
    color: "bg-green-500",
  },
  {
    title: "Upcoming Events",
    value: "8",
    change: "+2",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    title: "Gallery Items",
    value: "156",
    change: "+24",
    icon: Image,
    color: "bg-orange-500",
  },
];

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
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                  <TrendingUp size={16} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
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

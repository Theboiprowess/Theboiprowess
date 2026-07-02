"use client";

import { motion } from "framer-motion";
import { Users, FileText, Calendar, Image, Download, Settings, TrendingUp } from "lucide-react";
import Link from "next/link";

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
    title: "Manage Applications",
    description: "Review and process student applications",
    href: "/admin/applications",
    icon: FileText,
  },
  {
    title: "Manage Teachers",
    description: "Add, edit, or remove teacher profiles",
    href: "/admin/teachers",
    icon: Users,
  },
  {
    title: "Manage News & Events",
    description: "Post news and manage upcoming events",
    href: "/admin/news-events",
    icon: Calendar,
  },
  {
    title: "Manage Gallery",
    description: "Upload and organize gallery images",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    title: "Manage Downloads",
    description: "Upload and manage downloadable resources",
    href: "/admin/downloads",
    icon: Download,
  },
  {
    title: "Manage Users",
    description: "Manage user accounts and permissions",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    description: "Configure site settings and preferences",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function DashboardOverview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-200">Welcome back! Here&apos;s what&apos;s happening at WISEDELL ACADEMY.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <Link href={action.href}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <action.icon className="text-primary" size={24} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
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

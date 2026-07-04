"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download, Trash2, RefreshCw, Database, X, Calendar, HardDrive
} from "lucide-react";

export const dynamic = 'force-dynamic';

interface DatabaseBackup {
  id: string;
  file_name: string;
  file_size: string;
  backup_type: string;
  status: string;
  file_url: string | null;
  created_at: string;
}

export default function DatabaseBackupPage() {
  const [backups, setBackups] = useState<DatabaseBackup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingBackup, setCreatingBackup] = useState(false);

  const fetchBackups = async () => {
    try {
      const response = await fetch("/api/database-backup");
      if (!response.ok) throw new Error("Failed to fetch backups");
      const data = await response.json();
      setBackups(data || []);
    } catch (error) {
      console.error("Error fetching backups:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleCreateBackup = async (type: string) => {
    setCreatingBackup(true);
    try {
      const response = await fetch("/api/database-backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_name: `backup-${new Date().toISOString().split('T')[0]}.sql`,
          file_size: "0 MB",
          backup_type: type,
          status: "pending",
          file_url: null,
        }),
      });
      if (!response.ok) throw new Error("Failed to create backup");
      await fetchBackups();
      alert("Backup creation initiated!");
    } catch (error) {
      console.error("Error creating backup:", error);
      alert("Failed to create backup");
    } finally {
      setCreatingBackup(false);
    }
  };

  const handleDeleteBackup = async (id: string) => {
    if (!confirm("Are you sure you want to delete this backup?")) return;
    try {
      const response = await fetch(`/api/database-backup?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete backup");
      await fetchBackups();
    } catch (error) {
      console.error("Error deleting backup:", error);
      alert("Failed to delete backup");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Database Backup</h1>
          <p className="text-gray-200">Create and manage database backups</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="font-heading text-xl font-bold text-primary">Backups</h2>
            <button
              onClick={() => fetchBackups()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>

          <div className="p-6 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-4">Create New Backup</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCreateBackup("full")}
                disabled={creatingBackup}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                <Database size={18} />
                {creatingBackup ? "Creating..." : "Full Backup"}
              </button>
              <button
                onClick={() => handleCreateBackup("structure")}
                disabled={creatingBackup}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <HardDrive size={18} />
                {creatingBackup ? "Creating..." : "Structure Only"}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">Loading backups...</p>
            </div>
          ) : backups.length === 0 ? (
            <div className="p-12 text-center">
              <Database className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No backups found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {backups.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.file_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {item.backup_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.file_size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          {new Date(item.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          {item.file_url && (
                            <a
                              href={item.file_url}
                              download
                              className="text-primary hover:text-primary-dark"
                              title="Download"
                            >
                              <Download size={18} />
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteBackup(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

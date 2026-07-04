"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus, Edit, Trash2, Phone, Mail, MapPin, X, Globe, Facebook, Twitter, Instagram
} from "lucide-react";

export const dynamic = 'force-dynamic';

interface ContactInfo {
  id: string;
  type: string;
  label: string | null;
  value: string;
  icon: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingInfo, setEditingInfo] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState({
    type: "phone",
    label: "",
    value: "",
    icon: "",
    order_index: "0",
    is_active: true,
  });

  const fetchContactInfo = async () => {
    try {
      const response = await fetch("/api/contact-info");
      if (!response.ok) throw new Error("Failed to fetch contact info");
      const data = await response.json();
      setContactInfo(data || []);
    } catch (error) {
      console.error("Error fetching contact info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const handleAddInfo = () => {
    setEditingInfo(null);
    setFormData({
      type: "phone",
      label: "",
      value: "",
      icon: "",
      order_index: "0",
      is_active: true,
    });
    setShowModal(true);
  };

  const handleEditInfo = (info: ContactInfo) => {
    setEditingInfo(info);
    setFormData({
      type: info.type,
      label: info.label || "",
      value: info.value,
      icon: info.icon || "",
      order_index: info.order_index.toString(),
      is_active: info.is_active,
    });
    setShowModal(true);
  };

  const handleDeleteInfo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact info?")) return;
    try {
      const response = await fetch(`/api/contact-info?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete contact info");
      await fetchContactInfo();
    } catch (error) {
      console.error("Error deleting contact info:", error);
      alert("Failed to delete contact info");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const infoData = {
        ...formData,
        order_index: parseInt(formData.order_index) || 0,
      };

      if (editingInfo) {
        const response = await fetch("/api/contact-info", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingInfo.id, ...infoData }),
        });
        if (!response.ok) throw new Error("Failed to update contact info");
      } else {
        const response = await fetch("/api/contact-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(infoData),
        });
        if (!response.ok) throw new Error("Failed to create contact info");
      }

      setShowModal(false);
      await fetchContactInfo();
    } catch (error) {
      console.error("Error saving contact info:", error);
      alert("Failed to save contact info");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone size={20} />;
      case 'email': return <Mail size={20} />;
      case 'address': return <MapPin size={20} />;
      case 'social': return <Globe size={20} />;
      default: return <Phone size={20} />;
    }
  };

  const groupedInfo = contactInfo.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, ContactInfo[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Update Contact Info</h1>
          <p className="text-gray-200">Edit school contact details</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="font-heading text-xl font-bold text-primary">Contact Information</h2>
            <button
              onClick={handleAddInfo}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus size={18} />
              Add Contact Info
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">Loading contact info...</p>
            </div>
          ) : contactInfo.length === 0 ? (
            <div className="p-12 text-center">
              <Phone className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No contact information found.</p>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {Object.entries(groupedInfo).map(([type, items]) => (
                <div key={type} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-3 flex items-center gap-2">
                    {getTypeIcon(type)}
                    <h3 className="font-semibold text-gray-900 capitalize">{type}</h3>
                  </div>
                  <div className="divide-y">
                    {items.map((item) => (
                      <div key={item.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                        <div className="flex-1">
                          {item.label && (
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          )}
                          <p className="text-sm text-gray-600">{item.value}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditInfo(item)}
                            className="text-primary hover:text-primary-dark"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteInfo(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-primary">
                {editingInfo ? "Edit Contact Info" : "Add Contact Info"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="address">Address</option>
                  <option value="social">Social Media</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Main Office, Admissions"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
                <input
                  type="text"
                  required
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., +263 123 456 789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., facebook, twitter, instagram"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  Active
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {editingInfo ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

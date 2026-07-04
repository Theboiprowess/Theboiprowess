"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save, Home, Image as ImageIcon, Type, Layout, X, Eye
} from "lucide-react";

export const dynamic = 'force-dynamic';

interface HomepageContent {
  id: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function HomepagePage() {
  const [content, setContent] = useState<HomepageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/homepage-content");
      if (!response.ok) throw new Error("Failed to fetch content");
      const data = await response.json();
      setContent(data || []);
      
      // Initialize form data from content
      const initialFormData: Record<string, any> = {};
      data.forEach((item: HomepageContent) => {
        initialFormData[item.section] = {
          title: item.title || "",
          subtitle: item.subtitle || "",
          content: item.content || "",
          image_url: item.image_url || "",
          button_text: item.button_text || "",
          button_link: item.button_link || "",
          is_active: item.is_active,
          order_index: item.order_index,
        };
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (section: string) => {
    setSaving(true);
    try {
      const sectionData = formData[section];
      const response = await fetch("/api/homepage-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          ...sectionData,
          updated_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to save content");
      
      await fetchContent();
      alert("Content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const promises = Object.keys(formData).map(section => 
        fetch("/api/homepage-content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            section,
            ...formData[section],
            updated_at: new Date().toISOString(),
          }),
        })
      );

      await Promise.all(promises);
      await fetchContent();
      alert("All content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'hero': return <Home size={20} />;
      case 'about': return <Type size={20} />;
      case 'features': return <Layout size={20} />;
      case 'cta': return <Eye size={20} />;
      default: return <Type size={20} />;
    }
  };

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'hero': return 'Hero Section';
      case 'about': return 'About Section';
      case 'features': return 'Features Section';
      case 'cta': return 'Call to Action';
      default: return section.charAt(0).toUpperCase() + section.slice(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-primary text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-3xl font-bold mb-2">Edit Homepage</h1>
            <p className="text-gray-200">Update homepage content</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <p className="text-gray-500">Loading homepage content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Edit Homepage</h1>
          <p className="text-gray-200">Update homepage content</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6 gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye size={18} />
            {previewMode ? "Edit Mode" : "Preview Mode"}
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save All"}
          </button>
        </div>

        <div className="space-y-6">
          {content.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary text-white rounded-lg">
                    {getSectionIcon(item.section)}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary">
                    {getSectionTitle(item.section)}
                  </h3>
                </div>
                <button
                  onClick={() => handleSave(item.section)}
                  disabled={saving}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData[item.section]?.title || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      [item.section]: { ...formData[item.section], title: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={formData[item.section]?.subtitle || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      [item.section]: { ...formData[item.section], subtitle: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={formData[item.section]?.content || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      [item.section]: { ...formData[item.section], content: e.target.value }
                    })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData[item.section]?.image_url || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      [item.section]: { ...formData[item.section], image_url: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={formData[item.section]?.button_text || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        [item.section]: { ...formData[item.section], button_text: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                    <input
                      type="url"
                      value={formData[item.section]?.button_link || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        [item.section]: { ...formData[item.section], button_link: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`active-${item.section}`}
                    checked={formData[item.section]?.is_active || false}
                    onChange={(e) => setFormData({
                      ...formData,
                      [item.section]: { ...formData[item.section], is_active: e.target.checked }
                    })}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`active-${item.section}`} className="text-sm font-medium text-gray-700">
                    Section is active
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

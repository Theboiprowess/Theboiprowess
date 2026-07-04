"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus, Edit, Trash2, Search, Calendar, X, Clock
} from "lucide-react";

export const dynamic = 'force-dynamic';

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  start_date: string;
  end_date: string | null;
  academic_year: string;
  term: string | null;
  is_holiday: boolean;
  created_at: string;
  updated_at: string;
}

export default function AcademicCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "academic",
    start_date: "",
    end_date: "",
    academic_year: "",
    term: "",
    is_holiday: false,
  });

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/academic-calendar");
      if (!response.ok) throw new Error("Failed to fetch calendar events");
      const data = await response.json();
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      event_type: "academic",
      start_date: "",
      end_date: "",
      academic_year: "",
      term: "",
      is_holiday: false,
    });
    setShowModal(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || "",
      event_type: event.event_type,
      start_date: event.start_date.split('T')[0],
      end_date: event.end_date ? event.end_date.split('T')[0] : "",
      academic_year: event.academic_year,
      term: event.term || "",
      is_holiday: event.is_holiday,
    });
    setShowModal(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this calendar event?")) return;
    try {
      const response = await fetch(`/api/academic-calendar?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");
      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventData = {
        ...formData,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
      };

      if (editingEvent) {
        const response = await fetch("/api/academic-calendar", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingEvent.id, ...eventData }),
        });
        if (!response.ok) throw new Error("Failed to update event");
      } else {
        const response = await fetch("/api/academic-calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        });
        if (!response.ok) throw new Error("Failed to create event");
      }

      setShowModal(false);
      await fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event");
    }
  };

  const years = Array.from(new Set(events.map(item => item.academic_year).filter(Boolean)));
  const filteredEvents = events.filter(item => {
    const matchesYear = filterYear === "all" || item.academic_year === filterYear;
    const matchesType = filterType === "all" || item.event_type === filterType;
    const matchesSearch = 
      `${item.title} ${item.description || ""}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesType && matchesSearch;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800';
      case 'holiday': return 'bg-green-100 text-green-800';
      case 'term': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Academic Calendar</h1>
          <p className="text-gray-200">Manage academic year events and holidays</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="font-heading text-xl font-bold text-primary">Calendar Events</h2>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="academic">Academic</option>
                <option value="exam">Exam</option>
                <option value="holiday">Holiday</option>
                <option value="term">Term</option>
                <option value="event">Event</option>
              </select>
              <button
                onClick={handleAddEvent}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus size={18} />
                Add Event
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">Loading calendar...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No calendar events found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEvents.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.description?.substring(0, 50)}...</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEventTypeColor(item.event_type)}`}>
                          {item.event_type.charAt(0).toUpperCase() + item.event_type.slice(1)}
                        </span>
                        {item.is_holiday && (
                          <span className="ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Holiday
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.academic_year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.term || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          {new Date(item.start_date).toLocaleDateString()}
                          {item.end_date && (
                            <>
                              <Clock size={14} className="text-gray-400 ml-2" />
                              {new Date(item.end_date).toLocaleDateString()}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEvent(item)}
                            className="text-primary hover:text-primary-dark"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(item.id)}
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-primary">
                {editingEvent ? "Edit Calendar Event" : "Add Calendar Event"}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
                  <select
                    value={formData.event_type}
                    onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="academic">Academic</option>
                    <option value="exam">Exam</option>
                    <option value="holiday">Holiday</option>
                    <option value="term">Term</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                  <input
                    type="text"
                    required
                    value={formData.academic_year}
                    onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 2024-2025"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                <input
                  type="text"
                  value={formData.term}
                  onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Term 1, Term 2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_holiday"
                  checked={formData.is_holiday}
                  onChange={(e) => setFormData({ ...formData, is_holiday: e.target.checked })}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <label htmlFor="is_holiday" className="text-sm font-medium text-gray-700">
                  Mark as holiday
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
                  {editingEvent ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

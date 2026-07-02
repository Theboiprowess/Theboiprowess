import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Teachers - WISEDELL ACADEMY",
  description: "Manage teacher profiles",
};

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Manage Teachers</h1>
          <p className="text-gray-200">Add, edit, or remove teacher profiles</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-gray-600">Teachers management coming soon with Supabase integration.</p>
        </div>
      </div>
    </div>
  );
}

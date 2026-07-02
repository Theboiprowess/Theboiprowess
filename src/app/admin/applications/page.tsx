import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Applications - WISEDELL ACADEMY",
  description: "Manage student applications",
};

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold mb-2">Manage Applications</h1>
          <p className="text-gray-200">Review and process student applications</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-gray-600">Applications management coming soon with Supabase integration.</p>
        </div>
      </div>
    </div>
  );
}

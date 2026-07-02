import { Metadata } from "next";
import DashboardOverview from "@/components/admin/DashboardOverview";

export const metadata: Metadata = {
  title: "Admin Dashboard - WISEDELL ACADEMY",
  description: "Admin dashboard for managing WISEDELL ACADEMY",
};

export default function AdminPage() {
  return <DashboardOverview />;
}

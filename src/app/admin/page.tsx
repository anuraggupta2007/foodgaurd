import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard — FoodSafe",
};

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function AdminRoute({ searchParams }: PageProps) {
  const { lang } = await searchParams;
  return <AdminDashboard lang={lang} />;
}

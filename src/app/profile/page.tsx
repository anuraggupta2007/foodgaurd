import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile/ProfilePage";

export const metadata: Metadata = {
  title: "Profile",
};

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function ProfileRoute({ searchParams }: PageProps) {
  const { lang } = await searchParams;
  return <ProfilePage lang={lang} />;
}

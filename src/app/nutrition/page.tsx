import type { Metadata } from "next";
import { NutritionPage } from "@/components/nutrition/NutritionPage";

export const metadata: Metadata = {
  title: "Nutrition Details",
};

type PageProps = {
  searchParams: Promise<{ barcode?: string; lang?: string }>;
};

export default async function NutritionRoute({ searchParams }: PageProps) {
  const { barcode, lang } = await searchParams;
  return <NutritionPage barcode={barcode ?? ""} lang={lang} />;
}

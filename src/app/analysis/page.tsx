import { ProductAnalysisPage } from "@/components/analysis/ProductAnalysisPage";

export default async function AnalysisRoute({
  searchParams,
}: {
  searchParams: Promise<{ barcode?: string; lang?: string }>;
}) {
  const params = await searchParams;
  return (
    <ProductAnalysisPage
      barcode={params.barcode ?? ""}
      lang={params.lang ?? "en"}
    />
  );
}

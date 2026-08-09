import { AuthGuard } from "@/components/AuthGuard";
import { ProductAnalysisPage } from "@/components/analysis/ProductAnalysisPage";

type PageProps = {
  searchParams: Promise<{ barcode?: string; lang?: string }>;
};

export default async function AnalysisRoute({ searchParams }: PageProps) {
  const { barcode, lang } = await searchParams;
  return (
    <AuthGuard>
      <ProductAnalysisPage barcode={barcode ?? ""} lang={lang} />
    </AuthGuard>
  );
}

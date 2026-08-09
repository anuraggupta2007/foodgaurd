import { ScannerPage } from "@/components/scanner/ScannerPage";

export default async function ScanRoute({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  return <ScannerPage lang={params.lang ?? "en"} />;
}

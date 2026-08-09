import { HistoryPage } from "@/components/history/HistoryPage";

export default async function HistoryRoute({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  return <HistoryPage lang={params.lang ?? "en"} />;
}

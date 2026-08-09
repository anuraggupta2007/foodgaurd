import { SearchPage } from "@/components/search/SearchPage";

export default async function SearchRoute({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; lang?: string }>;
}) {
  const params = await searchParams;
  return (
    <SearchPage
      lang={params.lang ?? "en"}
      initialQuery={params.q ?? ""}
    />
  );
}

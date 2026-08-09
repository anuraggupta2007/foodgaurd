import type { Metadata } from "next";
import { IngredientPage } from "@/components/ingredient/IngredientPage";

export const metadata: Metadata = {
  title: "Ingredient Details",
};

type PageProps = {
  searchParams: Promise<{ id?: string; product?: string; lang?: string }>;
};

export default async function IngredientRoute({ searchParams }: PageProps) {
  const { id, product, lang } = await searchParams;
  return (
    <IngredientPage
      ingredientId={id ?? ""}
      productBarcode={product}
      lang={lang}
    />
  );
}

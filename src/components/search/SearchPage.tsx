"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info, Layers } from "lucide-react";
import Link from "next/link";
import type {
  SearchFilters,
  SortOption,
  UserCriteria,
  SearchProduct,
} from "@/data/search-data";
import {
  searchProducts,
  findAlternatives,
  SEARCH_SUGGESTIONS,
  POPULAR_CATEGORIES,
} from "@/data/search-data";
import { getSearchLabels } from "@/data/search-labels";
import { IngredientInput } from "./IngredientInput";
import { SearchSuggestions } from "./SearchSuggestions";
import { CategoryFilter } from "./CategoryFilter";
import { FilterPanel } from "./FilterPanel";
import { SearchResultCard } from "./SearchResultCard";
import { SortSelector } from "./SortSelector";
import { RecentSearches } from "./RecentSearches";
import { EmptySearchState } from "./EmptySearchState";
import { SearchLoading } from "./SearchLoading";
import { CriteriaSelector } from "./CriteriaSelector";
import { AlternativeSection } from "./AlternativeSection";
import { CompareView } from "./CompareView";

type SearchPhase = "idle" | "loading" | "results" | "empty" | "alternatives" | "compare";

type SearchPageProps = {
  lang?: string;
  initialQuery?: string;
};

function getInitialPhase(q: string): SearchPhase {
  return q.trim() ? "loading" : "idle";
}

export function SearchPage({ lang = "en", initialQuery = "" }: SearchPageProps) {
  const labels = getSearchLabels(lang);
  const router = useRouter();

  const [query, setQuery] = useState(initialQuery);
  const [phase, setPhase] = useState<SearchPhase>(() => getInitialPhase(initialQuery));
  const [showSuggestions, setShowSuggestions] = useState(!initialQuery.trim());
  const [filters, setFilters] = useState<SearchFilters>({
    category: "all",
    ingredientPreferences: [],
    concernLevel: "all",
    nutritionPreferences: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [alternativeResults, setAlternativeResults] = useState<SearchProduct[]>([]);

  const initialHandledRef = useRef(false);

  useEffect(() => {
    if (initialHandledRef.current || !initialQuery.trim()) return;
    initialHandledRef.current = true;

    const trimmed = initialQuery.trim();

    setRecentSearches((prev) => {
      return [trimmed, ...prev.filter((s) => s !== trimmed)].slice(0, 5);
    });

    const timer = setTimeout(() => {
      const found = searchProducts(trimmed, filters, sortBy);
      setResults(found);
      setPhase(found.length > 0 ? "results" : "empty");
    }, 800);

    return () => clearTimeout(timer);
  }, [initialQuery, filters, sortBy]);

  function doSearch(searchQuery: string) {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setActiveQuery(trimmed);
    setShowSuggestions(false);
    setPhase("loading");

    setRecentSearches((prev) => {
      return [trimmed, ...prev.filter((s) => s !== trimmed)].slice(0, 5);
    });

    setTimeout(() => {
      const found = searchProducts(trimmed, filters, sortBy);
      setResults(found);
      setPhase(found.length > 0 ? "results" : "empty");
    }, 800);
  }

  function handleFilterApply(newFilters: SearchFilters) {
    setFilters(newFilters);
    if (activeQuery) {
      setPhase("loading");
      setTimeout(() => {
        const found = searchProducts(activeQuery, newFilters, sortBy);
        setResults(found);
        setPhase(found.length > 0 ? "results" : "empty");
      }, 600);
    }
  }

  function handleFilterClear() {
    const cleared: SearchFilters = {
      category: "all",
      ingredientPreferences: [],
      concernLevel: "all",
      nutritionPreferences: [],
    };
    setFilters(cleared);
    if (activeQuery) {
      setPhase("loading");
      setTimeout(() => {
        const found = searchProducts(activeQuery, cleared, sortBy);
        setResults(found);
        setPhase(found.length > 0 ? "results" : "empty");
      }, 600);
    }
  }

  function handleSortChange(newSort: SortOption) {
    setSortBy(newSort);
    if (activeQuery) {
      const found = searchProducts(activeQuery, filters, newSort);
      setResults(found);
    }
  }

  function handleSelectProduct(barcode: string) {
    router.push(`/analysis?barcode=${encodeURIComponent(barcode)}`);
  }

  function handleClearRecent() {
    setRecentSearches([]);
  }

  function handleCompareToggle(id: string) {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  function handleCompare() {
    setPhase("compare");
  }

  function handleCriteriaFind(criteria: UserCriteria) {
    setPhase("loading");
    setTimeout(() => {
      const found = findAlternatives(criteria);
      setAlternativeResults(found);
      setPhase(found.length > 0 ? "alternatives" : "empty");
    }, 800);
  }

  function handleBackFromCompare() {
    setPhase(results.length > 0 ? "results" : "idle");
  }

  const sortOptions = [
    { value: "match" as const, label: labels.results.sortMatch },
    { value: "concern_low" as const, label: labels.results.sortConcernLow },
    { value: "concern_high" as const, label: labels.results.sortConcernHigh },
    { value: "relevance" as const, label: labels.results.sortRelevance },
  ];

  const compareProducts = results.filter((p) => compareIds.includes(p.id));

  if (phase === "compare") {
    return (
      <CompareView
        products={compareProducts.length >= 2 ? compareProducts : compareProducts.slice(0, 2)}
        labels={labels.comparison}
        onBack={handleBackFromCompare}
      />
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {labels.header.backButton}
          </Link>
          <h1 className="ml-4 text-sm font-semibold text-foreground">
            {labels.header.title}
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <p className="mb-5 text-center text-sm text-muted-foreground">
          {labels.header.subtitle}
        </p>

        {/* Search Input */}
        <div className="mb-6">
          <IngredientInput
            placeholder={labels.search.placeholder}
            searchButton={labels.search.searchButton}
            inputTypeLabels={labels.inputType}
            onSearch={doSearch}
          />
        </div>

        {/* Idle: suggestions + criteria */}
        {showSuggestions && phase === "idle" && (
          <div className="space-y-6">
            {recentSearches.length > 0 && (
              <RecentSearches
                title={labels.recent.title}
                clearLabel={labels.recent.clearButton}
                searches={recentSearches}
                onSelect={(s) => {
                  setQuery(s);
                  doSearch(s);
                }}
                onClear={handleClearRecent}
              />
            )}
            <SearchSuggestions
              title={labels.suggestions.title}
              suggestions={labels.suggestions.items}
              onSelect={(s) => {
                setQuery(s);
                doSearch(s);
              }}
            />
            <CriteriaSelector
              title={labels.criteria.title}
              subtitle={labels.criteria.subtitle}
              findButton={labels.criteria.findButton}
              avoidPlaceholder={labels.criteria.avoidPlaceholder}
              preferPlaceholder={labels.criteria.preferPlaceholder}
              customPlaceholder={labels.criteria.customPlaceholder}
              onFind={handleCriteriaFind}
            />
            <EmptySearchState
              title={labels.initial.title}
              description=""
              clearFiltersLabel=""
              searchAgainLabel=""
              tryNameLabel=""
              categoryTitle={labels.initial.categoryTitle}
              popularTitle={labels.initial.popularTitle}
              categories={POPULAR_CATEGORIES}
              popularSearches={SEARCH_SUGGESTIONS.slice(0, 4)}
              onClearFilters={() => {}}
              onSearchAgain={() => {}}
              onSelectCategory={(cat) => {
                setFilters((prev) => ({ ...prev, category: cat }));
                doSearch(query || "all");
              }}
              onSelectPopular={(s) => {
                setQuery(s);
                doSearch(s);
              }}
            />
          </div>
        )}

        {!showSuggestions && phase === "idle" && (
          <div className="space-y-6">
            <SearchSuggestions
              title={labels.suggestions.title}
              suggestions={labels.suggestions.items}
              onSelect={(s) => {
                setQuery(s);
                doSearch(s);
              }}
            />
          </div>
        )}

        {/* Loading */}
        {phase === "loading" && <SearchLoading message={labels.loading.message} />}

        {/* Results */}
        {(phase === "results" || phase === "empty") && (
          <div className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  {labels.results.title} &ldquo;{activeQuery}&rdquo;
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {labels.results.count.replace(
                    "{count}",
                    String(results.length),
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {compareIds.length >= 2 && (
                  <button
                    type="button"
                    onClick={handleCompare}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Layers className="size-4" aria-hidden="true" />
                    {labels.comparison.compareButton} ({compareIds.length})
                  </button>
                )}
                <SortSelector
                  label={labels.results.sortBy}
                  options={sortOptions}
                  value={sortBy}
                  onChange={handleSortChange}
                />
                <FilterPanel
                  buttonLabel={labels.filters.button}
                  labels={labels.filters}
                  categoryLabels={labels.categories}
                  filters={filters}
                  onApply={handleFilterApply}
                  onClear={handleFilterClear}
                />
              </div>
            </div>

            <CategoryFilter
              categories={labels.categories}
              active={filters.category}
              onChange={(cat) => {
                const newFilters = { ...filters, category: cat };
                setFilters(newFilters);
                if (activeQuery) {
                  setPhase("loading");
                  setTimeout(() => {
                    const found = searchProducts(activeQuery, newFilters, sortBy);
                    setResults(found);
                    setPhase(found.length > 0 ? "results" : "empty");
                  }, 400);
                }
              }}
            />

            {phase === "empty" ? (
              <EmptySearchState
                title={labels.empty.title}
                description={labels.empty.description}
                clearFiltersLabel={labels.empty.clearFilters}
                searchAgainLabel={labels.empty.searchAgain}
                tryNameLabel={labels.empty.tryName}
                categoryTitle=""
                popularTitle=""
                categories={[]}
                popularSearches={[]}
                onClearFilters={handleFilterClear}
                onSearchAgain={() => {
                  setPhase("idle");
                  setShowSuggestions(true);
                }}
                onSelectCategory={() => {}}
                onSelectPopular={() => {}}
              />
            ) : (
              <>
                {compareIds.length > 0 && compareIds.length < 2 && (
                  <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
                    <Layers className="size-4 shrink-0" aria-hidden="true" />
                    {labels.comparison.selectPrompt}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  {results.map((product) => (
                    <SearchResultCard
                      key={product.id}
                      product={product}
                      viewAnalysisLabel={labels.results.viewAnalysis}
                      compareLabel={labels.results.compare}
                      comparedLabel={labels.results.compared}
                      whyMatchDetailLabel={labels.results.whyMatchDetail}
                      matchLabels={{
                        matchLabel: labels.results.matchLabel,
                        whyMatch: labels.results.whyMatch,
                        matchedIngredients: labels.results.matchedIngredients,
                        missingIngredients: labels.results.missingIngredients,
                      }}
                      onSelect={handleSelectProduct}
                      onCompareToggle={handleCompareToggle}
                      isComparing={compareIds.includes(product.id)}
                      canCompare={compareIds.length < 4}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="flex items-start gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
              <Info className="size-4 shrink-0 text-muted-foreground mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {labels.transparency.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {labels.transparency.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Alternatives */}
        {phase === "alternatives" && (
          <div className="space-y-5">
            <AlternativeSection
              title={labels.alternatives.title}
              description={labels.alternatives.description}
              disclaimer={labels.alternatives.disclaimer}
            />

            {alternativeResults.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {alternativeResults.map((product) => (
                  <SearchResultCard
                    key={product.id}
                    product={product}
                    viewAnalysisLabel={labels.results.viewAnalysis}
                    compareLabel={labels.results.compare}
                    comparedLabel={labels.results.compared}
                    whyMatchDetailLabel={labels.results.whyMatchDetail}
                    matchLabels={{
                      matchLabel: labels.results.matchLabel,
                      whyMatch: labels.results.whyMatch,
                      matchedIngredients: labels.results.matchedIngredients,
                      missingIngredients: labels.results.missingIngredients,
                    }}
                    onSelect={handleSelectProduct}
                    onCompareToggle={handleCompareToggle}
                    isComparing={compareIds.includes(product.id)}
                    canCompare={compareIds.length < 4}
                  />
                ))}
              </div>
            ) : (
              <EmptySearchState
                title={labels.empty.title}
                description={labels.empty.description}
                clearFiltersLabel={labels.empty.clearFilters}
                searchAgainLabel={labels.empty.searchAgain}
                tryNameLabel={labels.empty.tryName}
                categoryTitle=""
                popularTitle=""
                categories={[]}
                popularSearches={[]}
                onClearFilters={() => {
                  setPhase("idle");
                  setShowSuggestions(true);
                }}
                onSearchAgain={() => {
                  setPhase("idle");
                  setShowSuggestions(true);
                }}
                onSelectCategory={() => {}}
                onSelectPopular={() => {}}
              />
            )}

            <div className="flex items-start gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
              <Info className="size-4 shrink-0 text-muted-foreground mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {labels.transparency.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {labels.transparency.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

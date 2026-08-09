"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Home, Search, Clock, User } from "lucide-react";

import { DEFAULT_LANGUAGE_ID } from "@/data/languages";
import { getDashboardLabels } from "@/data/dashboard-labels";
import {
  MOCK_USER,
  MOCK_RECENT_SCANS,
  MOCK_CONCERN_SUMMARY,
  MOCK_PREFERENCES,
} from "@/data/mock-data";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ScanHeroCard } from "@/components/dashboard/ScanHeroCard";
import { SearchCard } from "@/components/dashboard/SearchCard";
import { ProductOverview } from "@/components/dashboard/ProductOverview";
import { RecentScans } from "@/components/dashboard/RecentScans";
import { PersonalizedInsight } from "@/components/dashboard/PersonalizedInsight";
import { HowItWorks } from "@/components/dashboard/HowItWorks";
import { TrustFooter } from "@/components/dashboard/TrustFooter";
import {
  TopNavigation,
  BottomNavigation,
} from "@/components/dashboard/Navigation";

const LANGUAGE_KEY = "app-preferred-language";

function getInitialLang(): string {
  try {
    return sessionStorage.getItem(LANGUAGE_KEY) ?? DEFAULT_LANGUAGE_ID;
  } catch {
    return DEFAULT_LANGUAGE_ID;
  }
}

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "/", Icon: Home },
  { key: "search", label: "Search", href: "/search", Icon: Search },
  { key: "history", label: "History", href: "/history", Icon: Clock },
  { key: "profile", label: "Profile", href: "/profile", Icon: User },
];

export function HomeDashboard() {
  const router = useRouter();
  const [lang, setLang] = useState<string>(getInitialLang);
  const labels = getDashboardLabels(lang);

  const handleLanguageChange = useCallback((langId: string) => {
    setLang(langId);
    try {
      sessionStorage.setItem(LANGUAGE_KEY, langId);
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const hasScans = MOCK_RECENT_SCANS.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 lg:pb-0">
      <TopNavigation
        items={NAV_ITEMS}
        activeKey="home"
        currentLanguage={lang}
        onLanguageChange={handleLanguageChange}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-6">
          {/* Welcome + Scan Hero — full width */}
          <section className="flex flex-col gap-5">
            <WelcomeSection
              labels={labels.greeting}
              userName={MOCK_USER.name}
            />
            <ScanHeroCard
              labels={labels.scan}
              onScan={() => router.push("/scan?open=camera&mode=barcode")}
            />
          </section>

          {/* Search + Product Overview — two columns */}
          <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-5">
              <SearchCard
                labels={labels.search}
                onClick={() => router.push("/search")}
              />
              <ProductOverview
                labels={labels.summary}
                summary={MOCK_CONCERN_SUMMARY}
                onViewHistory={() => router.push("/history")}
              />
            </div>
            <div className="flex flex-col gap-5">
              <RecentScans
                labels={labels.recentScans}
                scans={MOCK_RECENT_SCANS}
                onViewAll={() => router.push("/history")}
                onScan={() => router.push("/scan?open=camera&mode=barcode")}
                hasScans={hasScans}
              />
            </div>
          </section>

          {/* Personalized Insight — full width */}
          <section>
            <PersonalizedInsight
              labels={labels.personalized}
              preferences={MOCK_PREFERENCES}
              onEdit={() => router.push("/profile")}
            />
          </section>

          {/* How It Works — full width */}
          <section>
            <HowItWorks labels={labels.howItWorks} />
          </section>

          {/* Trust Footer */}
          <section>
            <TrustFooter message={labels.trust.message} />
          </section>
        </div>
      </main>

      <BottomNavigation items={NAV_ITEMS} activeKey="home" />
    </div>
  );
}

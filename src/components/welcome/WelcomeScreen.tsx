"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { DEFAULT_LANGUAGE_ID } from "@/data/languages";
import { AppLogo } from "@/components/welcome/AppLogo";
import { LanguageSelector } from "@/components/welcome/LanguageSelector";
import { PrimaryButton } from "@/components/welcome/PrimaryButton";

const LANGUAGE_STORAGE_KEY = "app-preferred-language";

export function WelcomeScreen() {
  const router = useRouter();
  const [selectedLanguageId, setSelectedLanguageId] =
    useState(DEFAULT_LANGUAGE_ID);

  const handleContinue = useCallback(() => {
    try {
      sessionStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLanguageId);
    } catch {
      /* sessionStorage may be unavailable */
    }
    router.push("/login");
  }, [router, selectedLanguageId]);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-6 pt-10 sm:px-6 sm:pt-14 md:max-w-lg md:pt-16">
        <header className="flex flex-col items-center text-center">
          <AppLogo className="mb-8" />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.625rem]">
            Know What&apos;s Inside.
          </h1>
          <p className="mt-3 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
            Understand the products you use and make more informed choices.
          </p>
        </header>

        <div className="mt-10 flex flex-1 flex-col">
          <LanguageSelector
            selectedLanguageId={selectedLanguageId}
            onLanguageChange={setSelectedLanguageId}
          />

          <div className="mt-auto pt-8">
            <PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>
          </div>
        </div>
      </div>

      <footer className="border-t border-border/60 px-5 py-4">
        <nav
          className="mx-auto flex max-w-md justify-center gap-3 text-xs text-muted-foreground sm:max-w-lg"
          aria-label="Legal"
        >
          <a
            href="#"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={(e) => e.preventDefault()}
          >
            Privacy Policy
          </a>
          <span aria-hidden="true" className="text-border">
            ·
          </span>
          <a
            href="#"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={(e) => e.preventDefault()}
          >
            Terms of Service
          </a>
        </nav>
      </footer>
    </div>
  );
}

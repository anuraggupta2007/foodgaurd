"use client";

import { Globe } from "lucide-react";

import { APP_LANGUAGES } from "@/data/languages";
import { LanguageOption } from "@/components/welcome/LanguageOption";

type LanguageSelectorProps = {
  selectedLanguageId: string;
  onLanguageChange: (id: string) => void;
};

export function LanguageSelector({
  selectedLanguageId,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <section aria-labelledby="language-heading" className="w-full">
      <div className="mb-3 flex items-center gap-2">
        <Globe className="size-4 text-muted-foreground" aria-hidden="true" />
        <h2
          id="language-heading"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Choose your language
        </h2>
      </div>
      <div
        role="radiogroup"
        aria-labelledby="language-heading"
        className="flex flex-col gap-2.5"
      >
        {APP_LANGUAGES.map((language) => (
          <LanguageOption
            key={language.id}
            language={language}
            selected={selectedLanguageId === language.id}
            onSelect={onLanguageChange}
          />
        ))}
      </div>
    </section>
  );
}

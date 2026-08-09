"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { getAuthLabels, type AuthLabels } from "@/data/auth-labels";
import { AuthTabs, type AuthTab } from "@/components/auth/AuthTabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";

const LANGUAGE_STORAGE_KEY = "app-preferred-language";

function getInitialLabels(): AuthLabels {
  try {
    const stored = sessionStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) return getAuthLabels(stored);
  } catch {
    /* sessionStorage may be unavailable */
  }
  return getAuthLabels("en");
}

export function AuthPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [labels] = useState<AuthLabels>(getInitialLabels);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Mobile/tablet: full-width form */}
        {/* Desktop: side panel + form */}
        <div className="hidden flex-1 items-center justify-center p-8 lg:flex">
          <div className="max-w-sm text-center">
            <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-9 text-primary"
                aria-hidden="true"
              >
                <path
                  d="M24 8c-2.5 0-4.5 2-4.5 4.5v2.2c-6.2 1.4-10.5 7-10.5 13.3 0 7.7 6.3 14 14 14s14-6.3 14-14c0-6.3-4.3-11.9-10.5-13.3V12.5C28.5 10 26.5 8 24 8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 22h8M24 18v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="34"
                  cy="34"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M38.5 38.5L42 42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {labels.sidePanel.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {labels.sidePanel.description}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-border lg:h-auto lg:w-px" />

        {/* Form side */}
        <div className="flex flex-1 flex-col items-center px-5 py-8 sm:px-6 sm:py-12 lg:max-w-lg lg:py-16">
          <div className="w-full max-w-sm">
            {/* Back link */}
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </Link>

            {/* Mobile logo (visible on mobile only) */}
            <div className="mb-6 flex items-center gap-3 sm:hidden">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-primary"
                  aria-hidden="true"
                >
                  <path
                    d="M24 8c-2.5 0-4.5 2-4.5 4.5v2.2c-6.2 1.4-10.5 7-10.5 13.3 0 7.7 6.3 14 14 14s14-6.3 14-14c0-6.3-4.3-11.9-10.5-13.3V12.5C28.5 10 26.5 8 24 8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 22h8M24 18v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="34"
                    cy="34"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M38.5 38.5L42 42"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground">
                Know What&apos;s Inside
              </span>
            </div>

            <AuthTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              loginLabel="Login"
              signupLabel="Sign Up"
            />

            <div className="mt-8">
              {activeTab === "login" ? (
                <LoginForm
                  labels={labels.login}
                  validationLabels={labels.validation}
                  onCreateAccount={() => setActiveTab("signup")}
                />
              ) : (
                <SignupForm
                  labels={labels.signup}
                  validationLabels={labels.validation}
                  strengthLabels={labels.passwordStrength}
                  onSignIn={() => setActiveTab("login")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

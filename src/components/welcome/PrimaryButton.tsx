"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  className,
  disabled,
}: PrimaryButtonProps) {
  return (
    <Button
      type={type}
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className={cn("w-full rounded-xl", className)}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Button>
  );
}

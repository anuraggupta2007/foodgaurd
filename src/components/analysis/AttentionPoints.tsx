import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import type { AttentionPoint, AssessmentLevel } from "@/data/analysis-data";

type AttentionPointsProps = {
  title: string;
  points: AttentionPoint[];
};

const SEVERITY_CONFIG: Record<
  AssessmentLevel,
  { icon: typeof AlertTriangle; color: string; bg: string; borderColor: string }
> = {
  high: {
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
    borderColor: "border-red-200",
  },
  moderate: {
    icon: AlertCircle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  low: {
    icon: Info,
    color: "text-blue-600",
    bg: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  insufficient: {
    icon: Info,
    color: "text-gray-500",
    bg: "bg-gray-50",
    borderColor: "border-gray-200",
  },
};

export function AttentionPoints({ title, points }: AttentionPointsProps) {
  if (points.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="space-y-2">
        {points.map((point, i) => {
          const config = SEVERITY_CONFIG[point.severity];
          const Icon = config.icon;
          return (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl border ${config.borderColor} ${config.bg} p-3`}
            >
              <Icon
                className={`size-4 shrink-0 ${config.color} mt-0.5`}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {point.name}
                  </span>
                  {point.amount && (
                    <span className="text-xs text-muted-foreground">
                      {point.amount}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                  {point.reason}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

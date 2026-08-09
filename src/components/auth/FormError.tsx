import { cn } from "@/lib/utils";

type FormErrorProps = {
  message: string;
  className?: string;
};

export function FormError({ message, className }: FormErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
        className,
      )}
    >
      {message}
    </div>
  );
}

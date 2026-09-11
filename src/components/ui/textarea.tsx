import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-20 w-full rounded-md bg-input px-3 py-2 text-sm text-foreground shadow-[var(--shadow-border)] outline-none transition-[box-shadow] placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/60 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-purple-300/20 bg-purple-400/10 px-3 py-1 text-xs font-medium text-purple-100", className)} {...props} />;
}

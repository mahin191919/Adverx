import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("h-11 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white placeholder:text-muted-foreground outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30", className)} {...props} />
));
Input.displayName = "Input";

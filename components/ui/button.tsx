import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-glow hover:scale-[1.02]",
        secondary: "border border-white/10 bg-white/10 text-white hover:bg-white/15",
        ghost: "text-muted-foreground hover:bg-white/10 hover:text-white",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      },
      size: { default: "h-11 px-6", sm: "h-9 px-4", lg: "h-13 px-8 py-4 text-base", icon: "h-10 w-10" }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  if (asChild && React.isValidElement(props.children)) {
    return React.cloneElement(props.children as React.ReactElement<{ className?: string }>, {
      className: cn(buttonVariants({ variant, size, className }), (props.children as React.ReactElement<{ className?: string }>).props.className)
    });
  }
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };

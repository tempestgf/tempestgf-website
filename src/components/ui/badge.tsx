"use client";

import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        cyber: "border-transparent bg-cyan-500/10 text-cyan-400",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        tech: "bg-cyan-900/20 text-cyan-400 border-cyan-400/20"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export const Badge = ({ className, variant, ...props }) => {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
};
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-[0.78rem] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-paper before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:bg-rust before:transition-transform before:duration-500 before:[transition-timing-function:cubic-bezier(.76,0,.24,1)] hover:before:origin-left hover:before:scale-x-100",
        ghost:
          "border border-line bg-transparent text-ink hover:border-ink",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[44px] px-7",
        sm: "h-[38px] px-5 text-[0.7rem]",
        lg: "h-[52px] px-9",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

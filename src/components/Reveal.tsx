import { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Variant = "up" | "left" | "right" | "scale";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

const variantClass: Record<Variant, string> = {
  up: "animate-fade-in",
  left: "animate-fade-in-left",
  right: "animate-fade-in-right",
  scale: "animate-scale-in",
};

export const Reveal = ({ children, variant = "up", delay = 0, className, as: Tag = "div" }: RevealProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={cn(visible ? variantClass[variant] : "opacity-0", className)}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

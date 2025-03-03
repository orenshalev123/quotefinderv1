
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "right" | "left";
  glass?: boolean;
}

const AnimatedCard = ({
  children,
  className,
  delay = 0,
  direction = "up",
  glass = true,
}: AnimatedCardProps) => {
  const getAnimation = () => {
    switch (direction) {
      case "right":
        return "animate-slide-in-right";
      case "left":
        return "animate-slide-in-left";
      case "up":
      default:
        return "animate-fade-up";
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6",
        glass && "glass",
        getAnimation(),
        className
      )}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;

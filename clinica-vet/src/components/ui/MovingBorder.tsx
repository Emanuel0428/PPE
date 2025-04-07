import React from "react";
import { cn } from "../../utils/cn";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  ...props
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) => {
  return (
    <div
      className={cn(
        "moving-border relative rounded-xl bg-slate-900 p-[1px] hover:scale-105",
        className
      )}
      style={{ transitionDuration: `${duration}ms` }} // Apply duration dynamically
      {...props}
    >
      <div className="relative rounded-xl bg-slate-900 p-4">{children}</div>
    </div>
  );
};
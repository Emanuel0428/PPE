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
  [key: string]: any;
}) => {
  return (
    <div
      className={cn(
        "moving-border relative rounded-xl bg-slate-900 p-[1px] transition-all hover:scale-105",
        className
      )}
      {...props}
    >
      <div className="relative rounded-xl bg-slate-900 p-4">{children}</div>
    </div>
  );
};
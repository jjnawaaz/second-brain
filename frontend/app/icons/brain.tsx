"use client";

import { Brain } from "lucide-react";

export default function BrainSVG({
  className = "",
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <>
      <div className="brain-draw cursor-pointer">
        <Brain
          className={`stroke-1 transition-all duration-300 size-7 ${className}`}
          {...props}
        />
      </div>
    </>
  );
}

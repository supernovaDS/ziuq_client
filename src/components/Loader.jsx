import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">

      {/* background glow */}
      <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />

      {/* content */}
      <div className="relative flex flex-col items-center gap-6">

        {/* spinner */}
        <div className="relative w-16 h-16">
          
          {/* outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-outline"></div>

          {/* animated arc */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
        </div>

        {/* text */}
        <p className="text-xs uppercase tracking-widest text-on-surface-variant">
          Initializing System
        </p>

      </div>
    </div>
  );
};

export default Loader;
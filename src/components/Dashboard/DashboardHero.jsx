import React from "react";

const DashboardHero = ({ onTriggerCreate }) => {
  return (
    <section className="mb-24 px-4 md:px-0">
      <div className="relative rounded-4xl overflow-hidden bg-surface border border-outline shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

        {/* subtle purple glow accents */}
        <div className="absolute -top-20 -left-20 w-75 h-75 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-25 -right-25 w-75 h-75 bg-secondary/10 rounded-full blur-[120px]" />

        {/* grid overlay for consistency */}
        <div className="absolute inset-0 kinetic-grid opacity-40 pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-2 gap-10 p-10 md:p-16">

          {/* LEFT */}
          <div className="flex flex-col justify-between">

            <div>
              <span className="inline-block px-4 py-1 text-xs tracking-[0.25em] uppercase bg-primary/10 text-primary rounded-full mb-6 border border-primary/20">
                Quiz Engine
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-on-surface mb-6">
                Build smarter <br />
                <span className="text-primary italic">quizzes</span>
              </h1>

              <p className="text-on-surface-variant max-w-md leading-relaxed text-sm md:text-base">
                Design and deploy quizzes with precision and zero clutter.
              </p>
            </div>

            {/* stats */}
            <div className="mt-10 flex gap-6 text-xs text-on-surface-variant">
              <div>
                <p className="text-lg font-bold text-on-surface">Infinite</p>
                <p>Questions</p>
              </div>
              <div>
                <p className="text-lg font-bold text-on-surface">Realtime</p>
                <p>Control</p>
              </div>
              <div>
                <p className="text-lg font-bold text-on-surface">Zero Lag</p>
                <p>Experience</p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm p-8 rounded-2xl glass-card">

              <h3 className="text-on-surface text-lg font-semibold mb-4">
                Launch New Quiz
              </h3>

              <p className="text-on-surface-variant text-sm mb-6">
                Start instantly with your quiz builder.
              </p>

              <button
                onClick={onTriggerCreate}
                className="w-full py-4 rounded-xl text-white cursor-pointer bg-primary font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all kinetic-glow"
              >
                Create Quiz
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
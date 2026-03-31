import React from "react";

const DashboardHero = ({ onTriggerCreate }) => {
  return (
    <section className="mb-10 md:mb-24 px-4 md:px-0 pt-6 sm:pt-8 md:pt-10">
      <div className="relative rounded-3xl md:rounded-4xl overflow-hidden bg-surface border border-outline shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

        {/* glow accents (controlled) */}
        <div className="absolute -top-16 -left-16 sm:-top-20 sm:-left-20 w-52 h-52 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute -bottom-16 -right-16 sm:-bottom-24 sm:-right-24 w-52 h-52 sm:w-72 sm:h-72 bg-secondary/10 rounded-full blur-[100px] sm:blur-[120px]" />

        {/* grid overlay */}
        <div className="absolute inset-0 kinetic-grid opacity-30 sm:opacity-40 pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-10 p-6 sm:p-8 md:p-16">

          {/* LEFT */}
          <div className="flex flex-col justify-between text-center md:text-left">

            <div>
              <span className="inline-block px-3 py-1 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase bg-primary/10 text-primary rounded-full mb-4 sm:mb-6 border border-primary/20">
                Quiz Engine
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-on-surface mb-4 sm:mb-6">
                Build smarter <br />
                <span className="text-primary italic">quizzes</span>
              </h1>

              <p className="text-on-surface-variant max-w-md mx-auto md:mx-0 leading-relaxed text-sm sm:text-base">
                Design and deploy quizzes with precision and zero clutter.
              </p>
            </div>

            {/* stats */}
            <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-6 text-[10px] sm:text-xs text-on-surface-variant">
              <div className="text-center md:text-left">
                <p className="text-base sm:text-lg font-bold text-on-surface">
                  Infinite
                </p>
                <p>Questions</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-base sm:text-lg font-bold text-on-surface">
                  Realtime
                </p>
                <p>Control</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-base sm:text-lg font-bold text-on-surface">
                  Zero Lag
                </p>
                <p>Experience</p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex items-center justify-center mt-4 md:mt-0">
            <div className="relative w-full max-w-sm p-6 sm:p-8 rounded-2xl glass-card text-center md:text-left">

              <h3 className="text-on-surface text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Launch New Quiz
              </h3>

              <p className="text-on-surface-variant text-sm mb-5 sm:mb-6">
                Start instantly with your quiz builder.
              </p>

              <button
                onClick={onTriggerCreate}
                className="w-full py-3.5 sm:py-4 rounded-xl text-white cursor-pointer bg-primary font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all kinetic-glow"
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
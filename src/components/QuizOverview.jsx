import React from 'react';

const QuizOverview = ({ quiz, roundsCount, onStart, onExit }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">

      {/* ===== BACKGROUND SYSTEM ===== */}
      <div className="absolute inset-0 oracle-grid opacity-40"></div>

      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-primary/10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-secondary/10 blur-[140px] rounded-full"></div>

      {/* ===== MAIN LAYER ===== */}
      <div className="relative z-10 w-full max-w-6xl">

        {/* ===== HEADER FLOAT ===== */}
        <div className="mb-10 flex justify-between items-start flex-wrap gap-6">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-3">
              System Ready
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-tight max-w-xl">
              {quiz.title}
            </h1>
          </div>

          <button
            onClick={onExit}
            className="text-on-surface-variant hover:text-error text-xs font-bold uppercase tracking-widest border border-outline px-5 py-2 rounded-full transition"
          >
            Exit
          </button>

        </div>

        {/* ===== CORE GRID ===== */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-stretch">

          {/* ===== LEFT: BANNER PANEL ===== */}
          <div className="relative group">

            <div className="absolute inset-0 rounded-3xl border border-outline"></div>

            <div className="relative rounded-3xl overflow-hidden bg-surface-container shadow-2xl h-full">

              {quiz.bannerUrl ? (
                <img
                  src={quiz.bannerUrl}
                  alt="Banner"
                  className="w-full h-90 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                  No Preview
                </div>
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

              {/* floating info */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">

                <div>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                    Domain
                  </p>
                  <p className="text-secondary font-bold text-lg">
                    {quiz.topic}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                    Rounds
                  </p>
                  <p className="text-primary text-2xl font-black">
                    {roundsCount}
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* ===== RIGHT: CONTROL PANEL ===== */}
          <div className="relative flex flex-col justify-between">

            <div className="glass-card p-8 rounded-3xl border border-outline flex flex-col gap-6">

              <p className="text-on-surface-variant leading-relaxed text-sm">
                You are about to enter a structured sequence of rounds designed to evaluate your performance across multiple dimensions.
              </p>

              {/* DATA GRID */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs uppercase tracking-widest text-on-surface-variant">

                <div>
                  <p>Domain</p>
                  <p className="text-secondary font-bold text-sm mt-1 normal-case tracking-normal">
                    {quiz.topic}
                  </p>
                </div>

                <div>
                  <p>Rounds</p>
                  <p className="text-primary font-bold text-sm mt-1">
                    {roundsCount}
                  </p>
                </div>

                <div>
                  <p>Difficulty</p>
                  <p className="text-primary font-bold text-sm mt-1">
                    Adaptive
                  </p>
                </div>

                <div>
                  <p>Mode</p>
                  <p className="text-secondary font-bold text-sm mt-1">
                    Timed
                  </p>
                </div>

              </div>
            </div>

            {/* CTA BLOCK */}
            <div className="mt-6">

              <button
                onClick={onStart}
                className="w-full group relative py-5 bg-linear-to-r from-primary to-primary-container text-white cursor-pointer rounded-2xl font-black text-lg tracking-widest shadow-[0_0_40px_rgba(168,85,247,0.25)] overflow-hidden transition active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Initiate Quiz
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition">
                    arrow_forward
                  </span>
                </span>

                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition duration-500"></div>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default QuizOverview;
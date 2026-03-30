import React from 'react';

const QuizSummary = ({ grandTotal, roundsCount, quizTitle, onExit }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 font-['Plus_Jakarta_Sans'] text-[#dee5ff]">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* ================= LEFT: HERO ================= */}
        <section className="relative">

          {/* Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Ascension Complete
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            Quiz Completed
          </h1>

          <p className="text-on-surface-variant text-lg mb-8 max-w-md">
            You survived all {roundsCount} rounds of{" "}
            <span className="text-[#c49aff] font-semibold">{quizTitle}</span>
          </p>

          {/* SCORE BLOCK */}
          <div className="relative mt-10">

            <div className="absolute inset-0 blur-[80px] bg-[#c49aff]/20 rounded-full scale-75 pointer-events-none"></div>

            <div className="relative w-full md:w-[90%] bg-surface-container-high/60 backdrop-blur-xl rounded-4xl p-8 border border-outline-variant/30 shadow-2xl inline-flex flex-col">

              <span className="text-on-surface-variant text-xs uppercase tracking-widest mb-2">
                Final Score
              </span>

              <div
                className={`text-6xl md:text-8xl font-black tracking-tight ${
                  grandTotal > 0
                    ? "text-transparent bg-clip-text bg-linear-to-br from-[#c49aff] via-primary-container to-secondary"
                    : grandTotal === 0
                    ? "text-on-surface-variant"
                    : "text-error"
                }`}
              >
                {grandTotal > 0 ? `+${grandTotal}` : grandTotal}
              </div>
            </div>
          </div>
        </section>

        {/* ================= RIGHT: DETAILS ================= */}
        <section className="flex flex-col justify-center">

          {/* Stats */}
          <div className="space-y-6 mb-10">

            {/* Rounds */}
            <div className="bg-surface-container-high/40 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/20 flex items-center justify-between">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c49aff]/10 flex items-center justify-center text-[#c49aff]">
                  <span className="material-symbols-outlined">layers</span>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                    Rounds
                  </p>
                  <p className="text-xl font-bold">{roundsCount}/{roundsCount}</p>
                </div>
              </div>

              <span className="text-on-surface-variant text-xs">Completed</span>
            </div>

            {/* Status */}
            <div className="bg-surface-container-high/40 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/20 flex items-center justify-between">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">verified</span>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                    Status
                  </p>
                  <p className="text-lg font-bold">Verified</p>
                </div>
              </div>

              <span className="text-secondary text-xs font-bold">100%</span>
            </div>

          </div>

          {/* CTA */}
          <button 
            onClick={onExit}
            className="w-full group/btn relative py-3.5 bg-linear-to-tr from-[#c49aff] to-primary-container cursor-pointer hover:to-[#d2aeff] hover:text-white text-on-primary rounded-full font-black text-lg tracking-tight shadow-[0_5px_20px_rgba(196,154,255,0.2)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden active:scale-95"
          >
            <span className="material-symbols-outlined relative z-10 text-[1.25rem]">
              feed
            </span>

            <span className="relative z-10 uppercase tracking-widest">
              Back to Feed
            </span>

            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
          </button>

        </section>

      </div>
    </div>
  );
};

export default QuizSummary;
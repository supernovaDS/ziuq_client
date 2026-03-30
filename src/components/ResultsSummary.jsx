import React from 'react';

const ResultsSummary = ({ results, totalScore, onExit, hasNextRound, onNextRound, onCompleteQuiz, title = "Round Complete!" }) => {
  return (
    <div className="w-full max-w-3xl mx-auto font-['Plus_Jakarta_Sans'] text-[#dee5ff]">

      {/* Header Group */}
      <div className="text-center mb-10 space-y-2">
        <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block animate-pulse">
          Round Summary
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-[#dee5ff] tracking-tight mb-2">
          {title}
        </h1>
      </div>

      {/* Main Result Card */}
      <div className="bg-surface-container-high/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-outline-variant/30 relative overflow-hidden group">

        {/* Decorative Glows */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c49aff]/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">

          {/* Score Display */}
          <div className="flex flex-col items-center mb-12">
            <span className="text-on-surface-variant text-sm uppercase tracking-widest mb-1 font-bold">
              Round Score
            </span>
            <div className={`text-7xl md:text-8xl font-black tracking-tighter ${totalScore > 0 ? "text-[#c49aff] drop-shadow-[0_0_15px_rgba(196,154,255,0.5)]" : totalScore === 0 ? "text-on-surface-variant" : "text-error drop-shadow-[0_0_15px_rgba(255,110,132,0.5)]"}`}>
              {totalScore > 0 ? `+${totalScore}` : totalScore}
            </div>
          </div>

          {/* Review Section */}
          <div className="w-full space-y-6">
            <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
              <h2 className="text-xl font-bold text-[#dee5ff]">Review Your Answers</h2>
              <span className="text-on-surface-variant text-sm font-medium">
                {results.length} Questions
              </span>
            </div>

            <div className="space-y-4 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar">
              {results.length === 0 && (
                <p className="text-on-surface-variant italic text-center py-4">No questions answered.</p>
              )}

              {results.map((res, index) => (
                <div key={index} className="flex flex-col p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 transition-colors duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-4 pr-4">
                      <div className={`mt-1 min-w-8 h-8 rounded-full flex items-center justify-center ${res.score > 0 ? "bg-secondary/20 text-secondary" : "bg-error/20 text-error"}`}>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {res.score > 0 ? "check_circle" : "cancel"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-on-surface-variant text-xs font-bold mb-1 uppercase tracking-widest">Q{index + 1} Answer</span>
                        <span className="text-[#dee5ff] font-semibold text-lg leading-tight">
                          {res.userAnswer || "(No Answer)"}
                        </span>
                      </div>
                    </div>

                    <span className={`font-black text-xl whitespace-nowrap ${res.score > 0 ? 'text-secondary' : 'text-error'}`}>
                      {res.score > 0 ? `+${res.score}` : res.score}
                    </span>
                  </div>

                  {res.feedback && (
                    <div className="ml-12 pl-4 border-l-2 border-[#c49aff]/40">
                      <p className="text-sm text-on-surface-variant italic">
                        <span className="font-bold text-[#c49aff] mr-1">Note:</span>
                        {res.feedback}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons (Slimmed down) */}
          <div className="mt-10 w-full flex flex-col gap-3">
            {hasNextRound ? (
              <button
                onClick={onNextRound}
                className="w-full group/btn relative py-3.5 bg-linear-to-tr from-[#c49aff] to-primary-container hover:to-[#d2aeff] text-on-primary rounded-full font-black text-lg tracking-tight shadow-[0_5px_20px_rgba(196,154,255,0.2)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden active:scale-95"
              >
                <span className="relative z-10 uppercase tracking-widest">Start Next Round</span>
                <span className="material-symbols-outlined relative z-10 text-[1.25rem] group-hover/btn:translate-x-1.5 transition-transform duration-300">
                  arrow_forward
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
              </button>
            ) : (
              <button
                onClick={onCompleteQuiz}
                className="w-full group/btn relative py-3.5 bg-linear-to-tr from-primary to-primary-container hover:brightness-110 text-white cursor-pointer rounded-full font-black text-lg tracking-tight shadow-[0_5px_20px_rgba(168,85,247,0.25)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden active:scale-95"
              >
                <span className="relative z-10 uppercase tracking-wider">
                  Calculate Final Score
                </span>

                <span className="material-symbols-outlined relative z-10 text-[1.25rem] group-hover/btn:translate-x-1.5 transition-transform duration-300">
                  keyboard_double_arrow_right
                </span>

                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
              </button>
            )}

            <button
              onClick={onExit}
              className="mt-2 text-xs font-bold cursor-pointer text-on-surface-variant hover:text-error transition-colors uppercase tracking-widest flex items-center justify-center gap-1 py-2"
            >
              <span className="material-symbols-outlined text-[1.1rem]">close</span>
              Abort Quiz
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
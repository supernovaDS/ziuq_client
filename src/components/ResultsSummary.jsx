import React from 'react';

const ResultsSummary = ({
  results,
  totalScore,
  onExit,
  hasNextRound,
  onNextRound,
  onCompleteQuiz,
  title = "Round Complete!"
}) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-10 font-['Plus_Jakarta_Sans'] text-[#dee5ff]">

      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs block animate-pulse">
            Round Summary
          </span>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            {title}
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-surface-container-high/60 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-outline-variant/30 relative overflow-hidden">

          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c49aff]/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">

            {/* Score */}
            <div className="flex flex-col items-center mb-10">
              <span className="text-on-surface-variant text-sm uppercase tracking-widest mb-1 font-bold">
                Round Score
              </span>

              <div className={`text-6xl md:text-7xl font-black tracking-tighter ${
                totalScore > 0
                  ? "text-[#c49aff] drop-shadow-[0_0_15px_rgba(196,154,255,0.5)]"
                  : totalScore === 0
                  ? "text-on-surface-variant"
                  : "text-error drop-shadow-[0_0_15px_rgba(255,110,132,0.5)]"
              }`}>
                {totalScore > 0 ? `+${totalScore}` : totalScore}
              </div>
            </div>

            {/* Review */}
            <div className="w-full space-y-6">

              <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
                <h2 className="text-lg md:text-xl font-bold">
                  Review Your Answers
                </h2>

                <span className="text-on-surface-variant text-sm font-medium">
                  {results.length} Questions
                </span>
              </div>

              <div className="space-y-4 max-h-[40vh] md:max-h-[45vh] overflow-y-auto pr-2">

                {results.length === 0 && (
                  <p className="text-on-surface-variant italic text-center py-4">
                    No questions answered.
                  </p>
                )}

                {results.map((res, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      
                      <div className="flex items-start gap-3 pr-4">
                        <div className={`mt-1 min-w-8 h-8 rounded-full flex items-center justify-center ${
                          res.score > 0
                            ? "bg-secondary/20 text-secondary"
                            : "bg-error/20 text-error"
                        }`}>
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {res.score > 0 ? "check_circle" : "cancel"}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-on-surface-variant text-xs font-bold mb-1 uppercase tracking-widest">
                            Q{index + 1}
                          </span>

                          <span className="font-semibold text-sm md:text-base leading-tight">
                            {res.userAnswer || "(No Answer)"}
                          </span>
                        </div>
                      </div>

                      <span className={`font-black text-lg ${
                        res.score > 0 ? 'text-secondary' : 'text-error'
                      }`}>
                        {res.score > 0 ? `+${res.score}` : res.score}
                      </span>
                    </div>

                    {res.feedback && (
                      <div className="ml-10 pl-3 border-l-2 border-[#c49aff]/40">
                        <p className="text-xs md:text-sm text-on-surface-variant italic">
                          <span className="font-bold text-[#c49aff] mr-1">
                            Note:
                          </span>
                          {res.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 w-full flex flex-col gap-3">

              {hasNextRound ? (
                <button
                  onClick={onNextRound}
                  className="w-full py-3 cursor-pointer bg-linear-to-tr from-[#c49aff] to-primary-container text-on-primary rounded-full font-black text-sm md:text-base tracking-widest hover:brightness-110 transition"
                >
                  Start Next Round
                </button>
              ) : (
                <button
                  onClick={onCompleteQuiz}
                  className="w-full py-3 cursor-pointer bg-linear-to-tr from-primary to-primary-container text-white rounded-full font-black text-sm md:text-base tracking-widest hover:brightness-110 transition"
                >
                  Calculate Final Score
                </button>
              )}

              <button
                onClick={onExit}
                className="text-xs font-bold cursor-pointer text-on-surface-variant hover:text-error transition uppercase tracking-widest py-2"
              >
                Abort Quiz
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ResultsSummary;
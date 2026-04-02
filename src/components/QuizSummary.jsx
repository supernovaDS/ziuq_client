import React from 'react';

const QuizSummary = ({
  grandTotal,
  roundsCount,
  quizTitle,
  bannerUrl,
  quizId,
  onExit
}) => {

  // 🔥 FALLBACK IMAGE (stable, not random every render)
  const imageUrl = bannerUrl
    ? bannerUrl
    : `https://picsum.photos/800/400?random=${quizId || "quiz"}`;

  return (
    <div className="w-full md:h-[90vh] flex items-center justify-center max-w-6xl mx-auto px-4 py-10 font-['Plus_Jakarta_Sans'] text-[#dee5ff]">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* ================= LEFT ================= */}
        <section>

          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Ascension Complete
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Quiz Completed
          </h1>

          <p className="text-on-surface-variant text-lg mb-8 max-w-md">
            You survived all {roundsCount} rounds of{" "}
            <span className="text-[#c49aff] font-semibold">{quizTitle}</span>
          </p>

          {/* 🔥 IMAGE WITH FALLBACK */}
          <div className="relative rounded-2xl overflow-hidden border border-outline">
            <img
              src={imageUrl}
              alt="Quiz Banner"
              className="w-full h-64 object-cover opacity-90 hover:opacity-100 transition duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
          </div>

        </section>

        {/* ================= RIGHT ================= */}
        <section className="flex flex-col justify-center">

          <div className="space-y-6 my-10">

            {/* ROUNDS */}
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

            {/* STATUS */}
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

            {/* 🔥 SCORE */}
            <div className="bg-surface-container-high/40 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/20 flex items-center justify-between">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">emoji_events</span>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                    Final Score
                  </p>
                  <p className="text-2xl font-black">
                    {grandTotal > 0 ? `+${grandTotal}` : grandTotal}
                  </p>
                </div>
              </div>

              <span className="text-primary text-xs font-bold">Total</span>
            </div>

          </div>

          {/* CTA */}
          <button 
            onClick={onExit}
            className="w-full py-3.5 bg-primary hover:opacity-65 cursor-pointer text-on-primary rounded-full font-black text-lg tracking-tight shadow-[0_5px_20px_rgba(196,154,255,0.2)] transition-all duration-300"
          >
            Back to Feed
          </button>

        </section>

      </div>
    </div>
  );
};

export default QuizSummary;
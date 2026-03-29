import React from 'react';

const QuizSummary = ({ grandTotal, roundsCount, quizTitle, onExit }) => {
  return (
    <div className="w-full max-w-4xl mx-auto font-['Plus_Jakarta_Sans'] text-[#dee5ff] px-4 py-8">
      
      {/* Hero Section */}
      <section className="text-center mb-12 relative">
        <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold tracking-[0.2em] uppercase mb-6 animate-pulse">
          Ascension Complete
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#dee5ff] mb-4">
          Quiz Completed!
        </h1>
        <p className="text-on-surface-variant text-xl font-medium mb-8">
          You survived all {roundsCount} rounds of <span className="text-[#c49aff]">{quizTitle}</span>.
        </p>

        {/* Master Score Display */}
        <div className="relative mt-12 mb-12 flex justify-center">
          <div className="absolute inset-0 blur-[80px] bg-[#c49aff]/20 rounded-full scale-75 pointer-events-none"></div>
          
          <div className="relative bg-surface-container-high/60 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 border border-outline-variant/30 flex flex-col items-center shadow-2xl min-w-75">
            <span className="text-on-surface-variant font-bold text-sm uppercase tracking-widest mb-2">
              Final Master Score
            </span>
            <div className={`text-7xl md:text-9xl font-black drop-shadow-2xl tracking-tighter ${grandTotal > 0 ? "text-transparent bg-clip-text bg-linear-to-br from-[#c49aff] via-primary-container to-secondary" : grandTotal === 0 ? "text-on-surface-variant" : "text-error"}`}>
              {grandTotal > 0 ? `+${grandTotal}` : grandTotal}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
        
        {/* Rounds Stat */}
        <div className="bg-surface-container-high/40 backdrop-blur-md rounded-3xl p-6 border border-outline-variant/20 flex items-center gap-5 hover:bg-surface-container-high/60 transition-colors">
          <div className="w-14 h-14 rounded-2xl bg-[#c49aff]/10 flex items-center justify-center text-[#c49aff]">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
          </div>
          <div>
            <div className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold mb-1">Rounds Conquered</div>
            <div className="text-3xl font-bold text-[#dee5ff]">
              {roundsCount} <span className="text-xl text-on-surface-variant font-medium">/ {roundsCount}</span>
            </div>
          </div>
        </div>

        {/* Status Stat */}
        <div className="bg-surface-container-high/40 backdrop-blur-md rounded-3xl p-6 border border-outline-variant/20 flex items-center gap-5 hover:bg-surface-container-high/60 transition-colors">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <div>
            <div className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold mb-1">Completion Status</div>
            <div className="text-xl font-bold text-[#dee5ff] mt-1">100% Verified</div>
          </div>
        </div>
      </div>

      {/* Call to Action (Slimmed down) */}
      <div className="max-w-md mx-auto">
        <button 
          onClick={onExit}
          className="w-full group/btn relative py-3.5 bg-linear-to-tr from-[#c49aff] to-primary-container hover:to-[#d2aeff] text-on-primary rounded-full font-black text-lg tracking-tight shadow-[0_5px_20px_rgba(196,154,255,0.2)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden active:scale-95"
        >
          <span className="material-symbols-outlined relative z-10 text-[1.25rem]">feed</span>
          <span className="relative z-10 uppercase tracking-widest">Back to Feed</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
        </button>
      </div>

    </div>
  );
};

export default QuizSummary;
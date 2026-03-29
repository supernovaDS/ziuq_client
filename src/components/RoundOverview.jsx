import React from 'react';

const RoundOverview = ({ round, roundNumber, onStartRound }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 relative z-10">
      {/* Matrix Glass Card */}
      <div className="w-full max-w-2xl glass-card p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Header Section */}
          <span className="text-secondary text-xs font-black uppercase tracking-[0.3em] mb-2">
            Round {roundNumber} 
          </span>
          <h1 className="text-4xl font-extrabold mb-4 text-on-surface tracking-tighter">
            {round.title}
          </h1>
          <p className="text-on-surface-variant mb-8 max-w-lg leading-relaxed">
            {round.description}
          </p>

          {/* Round Media (Video or Image) */}
          {round.mediaUrl && (
            <div className="w-full mb-8 rounded-2xl overflow-hidden border border-white/10 bg-black/20 shadow-inner">
              {round.mediaType === 'video' ? (
                <video 
                  src={round.mediaUrl} 
                  controls 
                  className="w-full aspect-video object-contain" 
                />
              ) : (
                <img 
                  src={round.mediaUrl} 
                  alt="Sector Intel" 
                  className="w-full aspect-video object-contain hover:scale-105 transition-transform duration-500" 
                />
              )}
            </div>
          )}

          {/* HUD Parameter Grid (2x2) */}
          <div className="grid grid-cols-2 gap-4 mb-10 w-full">
            <div className="bg-surface/30 backdrop-blur-md border border-white/5 p-4 rounded-2xl">
              <span className="block text-2xl font-black text-primary tracking-tighter">
                +{round.pointsCorrect} 
              </span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Positive Scoring</span>
            </div>
            
            <div className="bg-surface/30 backdrop-blur-md border border-white/5 p-4 rounded-2xl">
              <span className="block text-2xl font-black text-primary tracking-tighter">
                -{round.pointsNegative}
              </span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Negative Scoring</span>
            </div>

            <div className="bg-surface/30 backdrop-blur-md border border-white/5 p-4 rounded-2xl">
              <span className="block text-2xl font-black text-on-surface tracking-tighter">
                {round.timeLimit}s
              </span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Time Limit</span>
            </div>

            <div className="bg-surface/30 backdrop-blur-md border border-white/5 p-4 rounded-2xl">
              <span className="block text-2xl font-black text-primary tracking-tighter">
                {round.numberOfQuestions}
              </span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Total Questions</span>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={onStartRound} 
             className="w-full max-w-xs bg-linear-to-r from-primary to-primary-container text-on-primary py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(196,154,255,0.3)]"
          >
            Start Round {roundNumber}
          </button>

        </div>
      </div>
    </div>
  );
};

export default RoundOverview;
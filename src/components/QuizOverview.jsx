import React from 'react';

const QuizOverview = ({ quiz, roundsCount, onStart, onExit }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 relative z-10">
      {/* Matrix Glass Card */}
      <div className="w-full max-w-2xl glass-card p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Banner Section - Optimized for Visibility */}
          {quiz.bannerUrl && (
            <div className="w-full mb-8 rounded-2xl overflow-hidden border border-white/10 bg-black/20 shadow-inner">
              <img 
                src={quiz.bannerUrl} 
                alt="Mission Banner" 
                // Changed h-56 to aspect-video and object-cover to object-contain
                className="w-full aspect-video object-contain hover:scale-105 transition-transform duration-500" 
              />
            </div>
          )}

          {/* Header Section */}
          <h1 className="text-4xl font-extrabold mb-4 text-on-surface tracking-tighter">
            {quiz.title}
          </h1>

          {/* Stats Grid */}
          <div className="flex justify-center gap-6 mb-10 w-full">
            <div className="bg-surface/30 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex-1 max-w-40">
              <span className="block text-3xl font-black text-primary tracking-tighter">{roundsCount}</span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Total Rounds</span>
            </div>
            <div className="bg-surface/30 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex-1 max-w-40">
              <span className="block text-xl font-black text-secondary tracking-tighter truncate px-1">
                {quiz.topic}
              </span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Quiz Theme</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button 
              onClick={onStart} 
              className="bg-linear-to-r from-primary to-primary-container text-on-primary py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(196,154,255,0.3)]"
            >
              Start Quiz
            </button>
            
            <button 
              onClick={onExit} 
              className="text-on-surface-variant hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest py-2"
            >
              Abort
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuizOverview;
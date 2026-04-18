import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const QuestionPlayer = ({
  question,
  roundTitle,
  roundNumber,
  questionIdx,
  totalQuestions,
  userAnswer,
  setUserAnswer,
  grading,
  onCheck,
  onNext,
  onExit
}) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRef = useRef(null);

  // Auto-focus input on question load
  useEffect(() => {
    if (!grading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [questionIdx, grading]);

  // Timer logic
  useEffect(() => {
    if (grading || !question) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(60);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onCheck(); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [questionIdx, grading, question, onCheck]);

  // Global Keyboard listener for Next Question when graded
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (grading && e.key === 'Enter') {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [grading, onNext]);

  if (!question) {
    return (
      <div className="text-center mt-20 text-on-surface-variant">
        Loading question...
      </div>
    );
  }

  const handleSkip = () => {
    setUserAnswer("");
    onCheck(); // Submit empty answer
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!userAnswer.trim()) {
        toast.warn("Please enter an answer or use Skip");
        return;
      }
      onCheck();
    }
  };

  const progressPercentage = ((questionIdx + 1) / totalQuestions) * 100;
  const timePercentage = (timeLeft / 60) * 100;

  return (
    <div className="w-full min-h-[90vh] pb-10 px-10 flex flex-col justify-center max-w-3xl mx-auto font-headline text-on-surface relative">

      {/* Top Question Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-surface-container-high overflow-hidden">
         <div 
           className="h-full bg-primary transition-all duration-500 ease-out" 
           style={{ width: `${progressPercentage}%` }}
         />
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 mt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <span className="material-symbols-outlined text-primary text-sm">public</span>
          <span className="font-bold tracking-widest text-xs text-primary uppercase">
            R{roundNumber}: {roundTitle}
          </span>
        </div>

        <button
          onClick={onExit}
          className="flex cursor-pointer items-center gap-1 text-on-surface-variant hover:text-error transition font-bold text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-base">close</span>
          Exit
        </button>
      </div>

      {/* MAIN CARD */}
      <section className="bg-surface-container-high/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-outline-variant/30 relative overflow-hidden transition-all duration-300">
        
        {/* subtle inner glows */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Timer Bar (Top of Card) */}
        {!grading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-surface-container">
            <div 
              className={`h-full transition-all duration-1000 linear ${timeLeft < 10 ? 'bg-error' : 'bg-secondary'}`}
              style={{ width: `${timePercentage}%` }}
            />
          </div>
        )}

        <div className="relative z-10">

          {/* META HEADER */}
          <div className="flex justify-between items-center mb-4">
             <span className="text-on-surface-variant font-bold text-xs tracking-widest uppercase">
               Question {(questionIdx + 1).toString().padStart(2, '0')} <span className="opacity-50">of</span> {totalQuestions.toString().padStart(2, '0')}
             </span>

             {!grading && (
               <span className={`font-mono text-sm font-bold flex items-center gap-1.5 ${timeLeft <= 10 ? 'text-error animate-pulse' : 'text-on-surface-variant'}`}>
                 <span className="material-symbols-outlined text-[16px]">timer</span>
                 00:{timeLeft.toString().padStart(2, '0')}
               </span>
             )}
          </div>

          {/* MEDIA */}
          {question.questionMedia?.length > 0 && (
            <div className="grid gap-3 mb-6">
              {question.questionMedia.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="question-media"
                  className="rounded-xl border border-outline-variant w-full max-h-60 object-contain bg-surface"
                />
              ))}
            </div>
          )}

          {/* QUESTION TEXT */}
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 leading-snug text-on-surface">
            {question.questionText}
          </h2>

          {/* ANSWER INPUT OR GRADING RESULTS */}
          {!grading ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <textarea
                ref={inputRef}
                onKeyDown={handleInputKeyDown}
                className="w-full bg-surface border border-outline-variant rounded-xl p-4 text-lg text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none resize-none transition"
                placeholder="Write your answer... (Press Enter to submit)"
                rows="2"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSkip}
                  className="w-1/3 py-4 rounded-xl bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface cursor-pointer font-bold text-sm tracking-widest uppercase transition active:scale-[0.98]"
                 >
                  Skip
                </button>

                <button
                  onClick={() => {
                    if (!userAnswer.trim()) {
                      toast.warn("Please enter an answer or use Skip");
                      return;
                    }
                    onCheck();
                  }}
                  className="w-2/3 py-4 rounded-xl bg-primary text-white cursor-pointer font-bold text-lg hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 kinetic-glow"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className={`rounded-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-500 ${
               grading.score > 0 ? "bg-primary/5 border-primary/20" : "bg-error/5 border-error/20"
            }`}>
              
              <div className={`p-4 border-b flex justify-between items-center ${grading.score > 0 ? "bg-primary/10 border-primary/20" : "bg-error/10 border-error/20"}`}>
                 <span className={`font-black text-3xl drop-shadow-sm ${grading.score > 0 ? "text-primary" : "text-error"}`}>
                  {grading.score > 0 ? `+${grading.score}` : grading.score} <span className="text-sm font-bold opacity-60">PTS</span>
                 </span>
                 <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-3xl ${grading.score > 0 ? "text-primary" : "text-error"}`}>
                      {grading.score > 0 ? 'check_circle' : 'cancel'}
                    </span>
                 </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* Answers Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container-low/50 p-5 rounded-xl border border-white/5">
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/70 mb-1">Your Answer</span>
                      <span className={`text-lg font-semibold ${userAnswer ? 'text-on-surface' : 'text-on-surface-variant italic'}`}>
                        {userAnswer || "(Passed)"}
                      </span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80 mb-1">Correct Answer</span>
                      <span className="text-lg font-semibold text-primary">
                        {question.correctAnswer}
                      </span>
                   </div>
                </div>

                {/* Explanation */}
                <div className="border-l-4 border-surface-container-highest pl-4 py-1">
                   <p className="text-on-surface-variant text-base leading-relaxed">
                     <span className="font-bold text-on-surface uppercase text-xs tracking-wider mr-2 block mb-1">Evaluation Note</span>
                     {grading.feedback}
                   </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onNext}
                    autoFocus
                    className="w-full py-4 rounded-xl bg-surface-container-high border border-outline hover:border-primary/50 text-on-surface font-black tracking-widest uppercase text-sm cursor-pointer hover:bg-surface-container-highest transition active:scale-[0.98] flex items-center justify-center gap-2 group"
                  >
                    {questionIdx === totalQuestions - 1 ? "Complete Round" : "Next Question"}
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300">
                      {questionIdx === totalQuestions - 1 ? "flag" : "arrow_forward"}
                    </span>
                  </button>
                  <p className="text-center text-[10px] text-on-surface-variant/50 uppercase tracking-widest mt-3">Press Enter to continue</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default QuestionPlayer;
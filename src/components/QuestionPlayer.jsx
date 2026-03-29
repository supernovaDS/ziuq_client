import React from 'react';

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
  return (
    <div className="w-full max-w-3xl mx-auto font-['Plus_Jakarta_Sans'] text-[#dee5ff]">
      
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c49aff]/10 border border-[#c49aff]/20">
          <span className="material-symbols-outlined text-[#c49aff] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
          <span className="font-bold tracking-widest text-xs text-[#c49aff] uppercase">
            R{roundNumber}: {roundTitle}
          </span>
        </div>
        
        <button 
          onClick={onExit} 
          className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-base">close</span> Exit
        </button>
      </div>

      {/* Main Card */}
      <section className="bg-surface-container-high/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl relative border border-outline-variant/30 overflow-hidden">
        
        {/* Decorative background glows */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#c49aff]/10 blur-[60px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary/10 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          
          <div className="mb-4">
            <span className="text-on-surface-variant font-bold text-xs tracking-widest uppercase">
              Question {(questionIdx + 1).toString().padStart(2, '0')} of {totalQuestions.toString().padStart(2, '0')}
            </span>
          </div>

          {/* Media Display (Top) */}
          {question.questionMedia?.length > 0 && (
            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.questionMedia.map((url, i) => (
                <img 
                  key={i} 
                  src={url} 
                  alt="question-media" 
                  className="rounded-xl border border-outline-variant/50 shadow-md w-full max-h-60 object-contain bg-[#060e20]/50" 
                />
              ))}
            </div>
          )}

          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-extrabold leading-snug mb-8 text-[#dee5ff]">
            {question.questionText}
          </h2>

          {/* Answer Area */}
          {!grading ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea 
                  className="w-full bg-surface-container-lowest/40 border border-outline-variant/30 rounded-xl p-4 text-lg font-medium focus:ring-2 focus:ring-[#c49aff]/50 focus:border-transparent transition-all placeholder:text-on-surface-variant/40 resize-none text-[#dee5ff] outline-none" 
                  placeholder="Write your answer here..." 
                  rows="2"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                ></textarea>
              </div>
              
              <button 
                onClick={onCheck}
                className="w-full py-4 rounded-xl bg-linear-to-r from-[#c49aff] to-primary-container text-on-primary font-extrabold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Submit Answer
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-2xl border ${grading.score > 0 ? "bg-secondary/10 border-secondary/30" : "bg-error/10 border-error/30"} transition-all`}>
              <div className="flex justify-between items-center mb-4">
                <span className={`font-black text-2xl ${grading.score > 0 ? 'text-secondary' : 'text-error'}`}>
                  Score: {grading.score > 0 ? `+${grading.score}` : grading.score}
                </span>
                <span className="bg-[#192540] px-3 py-1.5 rounded-lg border border-outline-variant/50 text-sm font-bold shadow-inner">
                  Correct: <span className="text-[#c49aff]">{question.correctAnswer}</span>
                </span>
              </div>
              
              <p className="text-[#dee5ff] text-lg italic mb-6 border-l-4 border-[#c49aff] pl-4 py-1 bg-surface-container-lowest/20 rounded-r-lg">
                "{grading.feedback}"
              </p>
              
              <button 
                onClick={onNext} 
                className="w-full py-4 rounded-xl bg-[#192540] text-[#dee5ff] font-bold text-lg hover:bg-surface-bright border border-outline-variant/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {questionIdx === totalQuestions - 1 ? "Finish Round" : "Next Question"}
                <span className="material-symbols-outlined">
                  {questionIdx === totalQuestions - 1 ? "done_all" : "arrow_forward"}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default QuestionPlayer;
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
    <div className="w-full max-w-3xl mx-auto font-headline text-on-surface">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <span className="material-symbols-outlined text-primary text-sm">public</span>
          <span className="font-bold tracking-widest text-xs text-primary uppercase">
            R{roundNumber}: {roundTitle}
          </span>
        </div>
        
        <button 
          onClick={onExit} 
          className="flex items-center gap-1 text-on-surface-variant hover:text-error transition font-bold text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-base">close</span>
          Exit
        </button>
      </div>

      {/* MAIN CARD */}
      <section className="bg-surface-container-high/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-outline-variant/30 relative overflow-hidden">

        {/* subtle glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10">

          {/* QUESTION INDEX */}
          <div className="mb-4">
            <span className="text-on-surface-variant font-bold text-xs tracking-widest uppercase">
              Question {(questionIdx + 1).toString().padStart(2, '0')} of {totalQuestions.toString().padStart(2, '0')}
            </span>
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

          {/* ANSWER INPUT */}
          {!grading ? (
            <div className="space-y-4">

              <textarea 
                className="w-full bg-surface border border-outline-variant rounded-xl p-4 text-lg text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/50 outline-none resize-none transition"
                placeholder="Write your answer..."
                rows="2"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />

              <button 
                onClick={onCheck}
                className="w-full py-4 rounded-xl bg-primary text-black font-bold text-lg hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 kinetic-glow"
              >
                Submit
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

            </div>
          ) : (

            <div className={`p-6 rounded-2xl border ${
              grading.score > 0 
                ? "bg-primary/10 border-primary/30" 
                : "bg-error/10 border-error/30"
            }`}>

              <div className="flex justify-between items-center mb-4">
                
                <span className={`font-black text-2xl ${
                  grading.score > 0 ? "text-primary" : "text-error"
                }`}>
                  {grading.score > 0 ? `+${grading.score}` : grading.score}
                </span>

                <span className="bg-surface px-3 py-1 rounded-lg border border-outline-variant text-sm font-bold">
                  Answer: <span className="text-primary">{question.correctAnswer}</span>
                </span>

              </div>

              <p className="text-on-surface text-lg italic mb-6 border-l-4 border-primary pl-4">
                "{grading.feedback}"
              </p>

              <button 
                onClick={onNext}
                className="w-full py-4 rounded-xl bg-primary cursor-pointer text-on-surface font-bold text-lg border border-outline hover:bg-primary/70 transition active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {questionIdx === totalQuestions - 1 ? "Finish" : "Next"}
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
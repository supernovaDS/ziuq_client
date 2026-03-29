import React from "react";

const QuizForm = ({ newQuiz, setNewQuiz, file, setFile, onSubmit, onCancel, editingId }) => (
  <div className="relative overflow-hidden rounded-[40px] bg-surface-container-high shadow-2xl border border-white/5 animate-in slide-in-from-top-10 duration-500 mb-20">
    <div className="p-8 md:p-12 relative z-10 glass-card">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-secondary/10 border border-secondary/20 text-secondary rounded-full">Quiz Maker</span>
          <h2 className="text-3xl font-bold text-on-surface tracking-tighter">{editingId ? "Re-configure Quiz" : "Create New Quiz"}</h2>
        </div>
        <button onClick={onCancel} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-bright text-on-surface-variant hover:text-white hover:bg-error/80 transition-all">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Quiz Title</label>
            <input
              className="bg-surface border border-outline-variant rounded-xl p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              required
              value={newQuiz.title}
              onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Quiz Theme</label>
            <input
              className="bg-surface border border-outline-variant rounded-xl p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              required
              value={newQuiz.topic}
              onChange={(e) => setNewQuiz({ ...newQuiz, topic: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Number of Rounds</label>
            <input
              type="number" min="1"
              className="bg-surface border border-outline-variant rounded-xl p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              value={newQuiz.numberOfRounds}
              onChange={(e) => setNewQuiz({ ...newQuiz, numberOfRounds: e.target.value })}
              required
            />
          </div>
          <label className="text-xs font-bold text-on-surface uppercase tracking-widest flex items-center justify-between bg-surface p-4 rounded-xl border border-outline-variant cursor-pointer hover:bg-surface-bright transition shadow-inner">
            <span>Make this Quiz Public ?</span>
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-secondary"
              checked={newQuiz.isPublic === "true" || newQuiz.isPublic === true}
              onChange={(e) => setNewQuiz({ ...newQuiz, isPublic: e.target.checked.toString() })} 
            />
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Upload Quiz Banner (Optional)</label>
          <label className="flex flex-col items-center justify-center gap-2 bg-surface border border-outline-variant border-dashed p-8 rounded-xl cursor-pointer hover:bg-surface-bright transition text-sm text-on-surface-variant text-center">
             <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
             <span className="font-semibold">{file ? file.name : "Select a high-resolution image..."}</span>
             <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button type="submit" className="bg-linear-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(196,154,255,0.3)] w-full md:w-auto">
            {editingId ? "Confirm Updates" : "Create Quiz ➔"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default QuizForm;
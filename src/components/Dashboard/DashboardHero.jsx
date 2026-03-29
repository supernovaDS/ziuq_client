import React from "react";

const DashboardHero = ({ onTriggerCreate }) => (
  <section className="mb-20 relative">
    <div className="relative group overflow-hidden rounded-[40px] bg-linear-to-br from-surface-container-high to-surface-container shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="max-w-2xl text-center md:text-left">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-primary/20 text-primary rounded-full">Create New Quiz</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[1.1]">Create a New <br/><span className="text-primary italic">Quiz</span></h1>
          <p className="text-on-surface-variant text-base md:text-lg max-w-md leading-relaxed mb-8">Deploy high-stakes intellectual quizzes using our Quiz Maker.</p>
        </div>
        <button 
          onClick={onTriggerCreate}
          className="relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full bg-linear-to-tr from-primary to-primary-container group-hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_0_50px_rgba(196,154,255,0.4)] hover:shadow-[0_0_70px_rgba(196,154,255,0.6)] cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full border-4 border-white/10 group-hover:scale-110 transition-transform duration-700"></div>
          <span className="material-symbols-outlined text-on-primary text-5xl md:text-7xl font-light">add</span>
        </button>
      </div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"></div>
    </div>
  </section>
);

export default DashboardHero;
import React, { useEffect, useState } from 'react';
import API from '../api';
import QuizSession from '../components/QuizSession';

const QuizCard = ({ q, idx, onStart }) => {
  const isFeatured = idx === 0;
  const isSide = idx === 1;
  const getImage = (q, w, h) =>
  q.bannerUrl || `https://picsum.photos/${w}/${h}?random=${q._id}`;

  if (isFeatured) {
    return (
      <div className="col-span-1 md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container/40 border border-white/5 transition-all hover:bg-surface-container/60 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img alt="Featured Quiz" className="w-full h-full object-cover opacity-30 grayscale-50 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-40 group-hover:grayscale-0" src={getImage(q, 800, 400)}/>
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent"></div>
        </div>
        <div className="p-8 md:p-12 relative z-10 flex flex-col justify-end h-full min-h-87.5">
          <div className="flex items-center gap-4 mb-5">
            <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase">Featured</span>
            <span className="text-on-surface-variant text-[9px] font-bold uppercase tracking-[0.15em] flex items-center gap-2">
               <span className="material-symbols-outlined text-[14px]">category</span> {q.topic || 'General'}
            </span>
          </div>
          <h3 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">{q.title}</h3>
          <p className="text-on-surface-variant leading-relaxed mb-8 max-w-2xl text-sm md:text-base line-clamp-2">
            {q.description || 'Embark on a challenging sequence of questions carefully curated to test your domain knowledge.'}
          </p>
          <button onClick={() => onStart(q)} className="flex cursor-pointer items-center gap-2 text-primary hover:bg-primary hover:text-white font-bold text-xs tracking-[0.2em] uppercase group/btn self-start py-2 px-6 border border-primary/20 rounded-full transition-all duration-300">
              Begin Evaluation <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1.5 text-lg">arrow_right_alt</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-1 md:col-span-4 group rounded-xl bg-surface-container/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all hover:bg-surface-container/60 border border-white/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5">
      <div>
        <div className={`w-full ${isSide ? 'aspect-square' : 'h-48'} rounded-lg overflow-hidden mb-6 relative`}>
          <img alt="Quiz Thumbnail" className={`w-full h-full object-cover opacity-60 transition-all duration-700 ${isSide ? 'grayscale-30 group-hover:scale-110 group-hover:opacity-80 group-hover:grayscale-0' : 'group-hover:opacity-80 group-hover:scale-105'}`} src={getImage(q, 800, 400)}/>
          <div className="absolute inset-0 rounded-lg shadow-inner border border-white/5"></div>
        </div>
        {isSide && <span className="font-label text-[9px] uppercase tracking-[0.2em] text-primary mb-2 block font-bold">{q.topic || 'Specialized Module'}</span>}
        <h3 className={`font-headline ${isSide ? 'text-2xl font-black mb-3' : 'text-lg font-bold mb-2'} text-on-surface group-hover:text-primary transition-colors leading-tight`}>{q.title}</h3>
        <p className={`text-on-surface-variant ${isSide ? 'text-sm mb-6' : 'text-xs mb-6'} leading-relaxed line-clamp-2`}>{q.description || 'Assess your understanding and precision in this focused topic.'}</p>
      </div>
      <div>
        {isSide ? (
           <button onClick={() => onStart(q)} className="w-full cursor-pointer py-4 rounded-xl shadow-[0_0_15px_rgba(216,180,254,0.1)] border border-primary/30 text-primary font-bold text-xs tracking-[0.15em] uppercase hover:bg-primary hover:text-white transition-all duration-300">
              Commence Sequence
           </button>
        ) : (
          <div className="pt-5 border-t border-white/5 flex justify-between items-center">
            <div className="flex flex-col gap-1.5">
               <div className="flex items-center gap-2 text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">
                 <span className="opacity-70">{q.topic || 'General'}</span>
               </div>
            </div>
            <button onClick={() => onStart(q)} className="text-primary font-bold text-[10px] flex items-center gap-1 uppercase tracking-[0.15em] group">
               Explore <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const QuizFeed = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const { data } = await API.get('/quizzes');
        setQuizzes(data);
      } catch (err) { console.error("Error loading quizzes", err); }
    };
    loadAll();
  }, []);

  if (activeQuiz) {
    return (
      // For QuizSession, we might want to isolate it or let it use the global styles. 
      // Wrapping it in a full-height container so it looks good visually on dark background.
      <div className="min-h-screen py-8 relative z-20">
         <QuizSession quiz={activeQuiz} onExit={() => setActiveQuiz(null)} />
      </div>
    );
  }

  return (
    <main className="relative md:pt-12 pb-24 px-6 md:px-8 max-w-7xl mx-auto z-10 w-full animate-in fade-in duration-700">
      
      {/* Header Section */}
      <header className="mb-16 md:mb-20 max-w-3xl">
        <span className="font-label text-[0.625rem] uppercase tracking-[0.3em] text-primary font-bold mb-4 block">Discovery Portal</span>
        <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
          Refine Your Perspective with <span className="text-primary italic">Ziuq.</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-lg">
          Explore our meticulously crafted library of intellectual assessments designed for those who seek depth over distraction.
        </p>
      </header>

      {/* Filters & Tools (Static Demo representation from Stitch) */}
      <section className="mb-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2.5">
          <button className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-bold text-[11px] uppercase tracking-wider transition-all kinetic-glow shadow-primary/20 shadow-lg">All Quizzes</button>
          <button className="px-5 py-2.5 rounded-full bg-surface-container-high/40 border border-white/5 hover:bg-surface-container-high text-on-surface-variant font-bold text-[11px] uppercase tracking-wider transition-all">Trending</button>
          <button className="px-5 py-2.5 rounded-full bg-surface-container-high/40 border border-white/5 hover:bg-surface-container-high text-on-surface-variant font-bold text-[11px] uppercase tracking-wider transition-all">Newly Added</button>
        </div>
      </section>

      {/* Quiz Gallery - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
        {quizzes.length === 0 ? (
          <div className="col-span-full py-32 text-center flex flex-col items-center">
             <span className="material-symbols-outlined text-6xl text-white/5 mb-4 animate-pulse">hourglass_top</span>
             <p className="text-on-surface-variant tracking-widest uppercase text-xs font-bold">Initializing Database...</p>
          </div>
        ) : (
          quizzes.map((q, idx) => (
            <QuizCard key={q._id} q={q} idx={idx} onStart={setActiveQuiz} />
          ))
        )}
      </div>

    </main>
  );
};

export default QuizFeed;
import React, { useEffect, useState } from 'react';
import API from '../api';
import QuizSession from '../components/QuizSession';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ q }) => {
  const getImage = (q, w, h) => q.bannerUrl || `https://picsum.photos/${w}/${h}?random=${q._id}`;
  const navigate = useNavigate();

  // Format the date if it exists
  const formattedDate = q.createdAt
    ? new Date(q.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : 'Recently Added';

  return (
    <div
      onClick={() => navigate(`${q._id}`)}
      className="group w-full flex flex-col md:flex-row overflow-hidden rounded-2xl bg-surface-container-low/40 border border-white/5 transition-all duration-500 hover:bg-surface-container/60 hover:shadow-[0_0_40px_-15px_rgba(var(--primary-rgb),0.2)] hover:border-primary/20 cursor-pointer backdrop-blur-md"
    >
      {/* Image Section */}
      <div className="w-full md:w-[35%] lg:w-[30%] relative aspect-[16/9] md:aspect-auto overflow-hidden shrink-0">
        <img
          alt={q.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-100"
          src={getImage(q, 800, 500)}
        />
        <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-background via-background/40 to-transparent md:to-transparent opacity-90 group-hover:opacity-50 transition-opacity duration-500"></div>

        {/* Quick stat overlay on image for mobile */}
        <div className="absolute bottom-4 left-4 md:hidden flex gap-2">
          <span className="bg-background/80 backdrop-blur-sm text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
            {q.topic || 'General'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow w-full md:w-[65%] lg:w-[70%] z-10 -mt-6 md:mt-0 bg-linear-to-t from-surface-container-low via-surface-container-low to-transparent md:bg-none relative rounded-t-2xl md:rounded-none">
        <div>
          <div className="hidden md:flex items-center justify-between mb-4">
            <span className="text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5 w-max">
              <span className="material-symbols-outlined text-[14px]">category</span>
              {q.topic || 'General'}
            </span>
          </div>

          <h3 className="font-headline text-2xl md:text-4xl font-extrabold text-on-surface mb-3 group-hover:text-primary transition-colors tracking-tight leading-[1.1]">
            {q.title}
          </h3>

          <p className="text-on-surface-variant leading-relaxed text-sm md:text-base max-w-3xl line-clamp-2 mb-6">
            {q.description || 'Embark on a challenging sequence of questions carefully curated to test your domain knowledge. Assess your understanding and precision in this focused topic.'}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 text-on-surface-variant text-xs font-semibold mb-2">
            {q.numberOfRounds !== undefined && (
              <span className="flex items-center gap-1.5 bg-surface-container-high/50 px-3 py-1.5 rounded-lg border border-white/5 transition-colors group-hover:border-primary/20">
                <span className="material-symbols-outlined text-[16px] text-primary">layers</span>
                <span className="tracking-wide uppercase text-[10px]">{q.numberOfRounds} {q.numberOfRounds === 1 ? 'Round' : 'Rounds'}</span>
              </span>
            )}
            <span className="flex items-center gap-1.5 bg-surface-container-high/50 px-3 py-1.5 rounded-lg border border-white/5 transition-colors group-hover:border-primary/20">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <span className="tracking-wide uppercase text-[10px]">{formattedDate}</span>
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end border-t border-white/5 pt-5 relative">
          <button className="flex items-center gap-2 text-primary group-hover:bg-primary group-hover:text-white font-bold text-xs tracking-[0.15em] uppercase py-2.5 px-6 border border-primary/30 rounded-full transition-all duration-500 overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-2">
              Commence Evaluation <span className="material-symbols-outlined transition-transform duration-500 group-hover:translate-x-2 text-base">arrow_forward</span>
            </span>
          </button>
        </div>
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
    <main className="relative pt-12 pb-24 px-6 md:px-8 max-w-7xl mx-auto z-10 w-full animate-in fade-in duration-700">

      {/* Header Section */}
      <header className="mb-16 md:mb-20">

        <h1 className="font-headline text-center text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
          Test your knowledge with <span className="text-primary italic">Ziuq.</span>
        </h1>
        <p className="text-on-surface-variant text-center text-base md:text-lg leading-relaxed">
          Play quizzes with topics spanning across all categories <br />
        </p>
      </header>

      {/* Filters & Tools (Static Demo representation from Stitch) */}
      <section className="mb-10 flex flex-col md:flex-row md:items-center justify-center">
        <div className="flex gap-5">
          <button className="px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-primary text-on-primary font-bold text-[11px] uppercase tracking-wider transition-all kinetic-glow shadow-primary/20 shadow-lg">All Quizzes</button>
          <button className="px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-surface-container-high/40 border border-white/5 hover:bg-surface-container-high text-on-surface-variant font-bold text-[11px] uppercase tracking-wider transition-all">Trending</button>
          <button className="px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-surface-container-high/40 border border-white/5 hover:bg-surface-container-high text-on-surface-variant font-bold text-[11px] uppercase tracking-wider transition-all">Newly Added</button>
        </div>
      </section>

      {/* Quiz Gallery - List Style */}
      <div className="flex flex-col gap-6 relative">
        {quizzes.length === 0 ? (
          <div className="py-32 text-center flex flex-col items-center w-full bg-surface-container-low/20 rounded-3xl border border-white/5">
            <span className="material-symbols-outlined text-6xl text-white/5 mb-4 animate-pulse">hourglass_empty</span>
            <p className="text-on-surface-variant tracking-widest uppercase text-xs font-bold">Initializing Catalog...</p>
          </div>
        ) : (
          quizzes.map((q) => (
            <QuizCard key={q._id} q={q} />
          ))
        )}
      </div>

    </main>
  );
};

export default QuizFeed;
import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

const Results = () => {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileRes, historyRes] = await Promise.all([
          API.get("/auth/me", { withCredentials: true }),
          API.get("/attempts/my-history", { withCredentials: true }),
        ]);
        setProfile(profileRes.data);
        setHistory(historyRes.data);
      } catch (err) {
        console.error("Error fetching profile data", err);
      }
      setLoading(false);
    };

    fetchProfileData();
  }, []);

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      <span className="material-symbols-outlined text-6xl text-primary animate-spin mb-4">refresh</span>
      <p className="text-on-surface-variant font-bold tracking-widest uppercase text-xs">Loading Analytics...</p>
    </div>
  );

  if (!profile) return (
    <div className="text-center mt-20 text-error font-bold">Failed to load analytics. Please sign in again.</div>
  );

  const getTopicIcon = (topic) => {
    const t = (topic || "").toLowerCase();
    if (t.includes('philosophy')) return 'account_balance';
    if (t.includes('astrophysics') || t.includes('science')) return 'rocket_launch';
    if (t.includes('engineering') || t.includes('computer') || t.includes('code')) return 'terminal';
    if (t.includes('art')) return 'palette';
    return 'analytics';
  };

  const accuracyCircle = Math.round(profile.stats?.accuracy || 0);
  const strokeDash = `${accuracyCircle}, 100`;

  return (
    <main className="px-6 max-w-7xl mx-auto pt-12 animate-in fade-in duration-700">

      {/* Header Section (Stats) */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">

          {/* Points Card */}
          <div className="flex-1 glass-card p-8 rounded-4xl border-t border-white/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
            <p className="text-on-surface-variant font-medium tracking-widest text-xs uppercase mb-4">Total Points</p>
            <h2 className="text-5xl font-extrabold text-primary neon-glow-purple tracking-tighter">{profile.stats?.totalScore || 0} PTS</h2>
            <div className="mt-6 flex items-center text-secondary text-sm font-semibold">
              <span className="material-symbols-outlined mr-1 text-base" data-icon="star">star</span>
              <span>Accumulated Points</span>
            </div>
          </div>

          {/* Attempted Card */}
          <div className="flex-1 glass-card p-8 rounded-4xl border-t border-white/5 relative overflow-hidden">
            <p className="text-on-surface-variant font-medium tracking-widest text-xs uppercase mb-4">Total Quizzes Attempted</p>
            <h2 className="text-5xl font-extrabold text-on-surface tracking-tighter">{profile.stats?.totalQuizzes || 0} <span className="text-2xl font-normal text-on-surface-variant">Quizzes</span></h2>
            <div className="mt-6 flex items-center text-on-surface-variant text-sm">
              <span className="material-symbols-outlined mr-1 text-base" data-icon="history">history</span>
              <span>Across all categories</span>
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="flex-1 glass-card p-8 rounded-4xl border-t border-white/5 relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-on-surface-variant font-medium tracking-widest text-xs uppercase mb-4">Global Accuracy</p>
                <h2 className="text-5xl font-extrabold text-secondary neon-glow-teal tracking-tighter">{accuracyCircle}%</h2>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle className="stroke-surface-container-highest" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                  <circle className="stroke-secondary" cx="18" cy="18" fill="none" r="16" strokeDasharray={strokeDash} strokeLinecap="round" strokeWidth="3"></circle>
                </svg>
              </div>
            </div>
            <div className="mt-6 flex items-center text-on-surface-variant text-sm">
              <span className="material-symbols-outlined mr-1 text-base" data-icon="bolt">bolt</span>
              <span>Lifetime precision metric</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content (Quiz History) */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-on-surface">Your Assessment History</h3>
            <p className="text-on-surface-variant mt-2">Deep dive into your intellectual milestones.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/quizzes" className="bg-surface-container-high px-6 py-2 rounded-full text-sm font-medium text-on-surface hover:bg-surface-bright transition-colors border border-white/5">
              Explore More
            </Link>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {history.length > 0 ? history.slice(0, visibleCount).map((attempt) => {
            const topic = attempt.quizId?.topic || "General";
            const icon = getTopicIcon(topic);

            // Cycle styling for visual flair like the mockup
            const themeIndex = attempt._id.charCodeAt(0) % 3;
            let colorClass = "text-primary";
            let bgClass = "bg-primary/10";

            if (themeIndex === 1) {
              colorClass = "text-secondary";
              bgClass = "bg-secondary/10";
            } else if (themeIndex === 2) {
              colorClass = "text-tertiary";
              bgClass = "bg-tertiary/10";
            }


            return (
              <div key={attempt._id} className="glass-card group p-1 rounded-4xl transition-all hover:bg-surface-container-high/60">
                <div className="bg-surface/40 rounded-[1.9rem] p-6 flex flex-col md:flex-row items-center gap-8">
                  <div className={`w-20 h-20 rounded-2xl ${bgClass} flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined ${colorClass} text-3xl`}>{icon}</span>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${colorClass} mb-1 block`}>{topic}</span>
                    <h4 className="text-xl font-bold text-on-surface mb-1">{attempt.quizId?.title || "Deleted Quiz"}</h4>
                    <p className="text-on-surface-variant text-sm">Completed on {new Date(attempt.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">Accuracy</p>
                      <p className="text-2xl font-bold text-secondary">{Math.round(attempt.accuracy || 0)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">Points</p>
                      <p className={`text-2xl font-bold ${attempt.score < 0 ? 'text-error' : 'text-on-surface'}`}>
                        {attempt.score > 0 ? `+${attempt.score}` : attempt.score}
                      </p>
                    </div>
                    <Link to="/dashboard" className="bg-surface-container-highest/50 border border-white/10 text-on-surface px-8 py-3 rounded-full font-bold text-sm transition-all hover:bg-surface-bright active:scale-95 text-center">
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="glass-card p-12 rounded-4xl text-center">
              <span className="material-symbols-outlined text-6xl text-primary/40 mb-4 animate-pulse">hourglass_empty</span>
              <h4 className="text-2xl font-bold text-on-surface mb-2">No History Found</h4>
              <p className="text-on-surface-variant mb-6">You haven't completed any assessments yet.</p>
            </div>
          )}
        </div>
        {history.length > visibleCount && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="flex items-center gap-2 group px-3 py-2 rounded-full font-medium text-primary transition-all cursor-pointer"
            >
              
              View More
              <span className="material-symbols-outlined group-hover:translate-x-1 transition">
                    arrow_forward
                  </span>
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Results;

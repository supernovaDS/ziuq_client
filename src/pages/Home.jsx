import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <div className="min-h-screen bg-black diamond-tile text-white overflow-x-hidden pt-8 pb-0 font-body">
      <main className="relative z-10 w-full">

        {/* ═══════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-28 md:pt-32 md:pb-40 flex flex-col md:flex-row items-center gap-16">

          {/* Left — Copy */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="font-headline text-5xl md:text-7xl leading-[1.1] mb-6 text-white">
              Create. <br />Compete. Conquer.<br />with ZIUQ.
            </h1>
            <p className="text-[#888] text-lg md:text-xl max-w-md mx-auto md:mx-0 mb-10 leading-relaxed">
              With Ziuq you can create personalized quizzes, compete with friends, and track your progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to={user ? "/dashboard" : "/auth"}
                className="bg-[#2563eb] text-white px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-[#1d4ed8] transition-colors duration-200"
              >
                Get started
              </Link>
              <Link
                to="/quizzes"
                className="border border-[#333] text-[#ccc] px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:border-[#555] hover:text-white transition-all duration-200"
              >
                Compete
              </Link>
            </div>
          </div>

          {/* Right — Abstract Shape */}
          <div className="md:w-1/2 flex justify-center items-center relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Gradient blob */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2563eb] via-[#7c3aed] to-[#ec4899] opacity-80 blur-3xl scale-110 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-bl from-[#06b6d4] via-[#3b82f6] to-[#8b5cf6] opacity-90 blur-2xl" />
              <div className="absolute inset-10 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#ef4444] to-[#ec4899] opacity-70 blur-xl" />
              <div className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-sm" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            FEATURES SECTION
        ═══════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 md:gap-y-20">

            {/* Feature 1 */}
            <div className="group">
              <div className="w-10 h-10 rounded-full bg-[#2563eb] mb-6" />
              <h3 className="font-headline text-2xl md:text-3xl mb-3 text-white">A personalized experience</h3>
              <p className="text-[#888] text-base leading-relaxed max-w-md">
                Create quizzes with multiple rounds, custom scoring rules, and adaptive question sets that evolve with your audience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="w-10 h-10 bg-[#f59e0b] rotate-45 mb-6" />
              <h3 className="font-headline text-2xl md:text-3xl mb-3 text-white">Creates infinite sets</h3>
              <p className="text-[#888] text-base leading-relaxed max-w-md">
                Design unlimited quiz sets across any topic. Build entire collections that you can share, play, and iterate on endlessly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="w-10 h-10 rounded-lg bg-[#ec4899] mb-6" />
              <h3 className="font-headline text-2xl md:text-3xl mb-3 text-white">Which you can track</h3>
              <p className="text-[#888] text-base leading-relaxed max-w-md">
                Deep insights into performance. Go beyond the score — understand patterns, track progress, and see where you really stand.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group">
              <div className="w-10 h-10 bg-[#06b6d4] rounded-full mb-6 flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full" />
              </div>
              <h3 className="font-headline text-2xl md:text-3xl mb-3 text-white">And compete globally</h3>
              <p className="text-[#888] text-base leading-relaxed max-w-md">
                Join a global community of quiz enthusiasts. Compete in real-time, climb leaderboards, and prove your expertise.
              </p>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════
            BOTTOM CTA SECTION
        ═══════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-6 py-24 md:py-36 text-center">
          <h2 className="font-headline text-4xl md:text-6xl mb-6 text-white">
            Make quizzing<br />work for you.
          </h2>
          <p className="text-[#888] text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
            You're just a few minutes away from creating quizzes designed by you, played by everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? "/dashboard" : "/auth"}
              className="bg-[#2563eb] text-white px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-[#1d4ed8] transition-colors duration-200"
            >
              Get started
            </Link>
            <Link
              to="/quizzes"
              className="border border-[#333] text-[#ccc] px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:border-[#555] hover:text-white transition-all duration-200"
            >
              Learn more
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;

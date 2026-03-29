import React from "react";

const StatsGrid = ({ quizzes }) => {
  const publicCount = quizzes.filter(q => q.isPublic === true || q.isPublic === 'true').length;
  
  return (
    <section className="mt-20 lg:mb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Outreach" value={`${(quizzes.length * 153).toLocaleString()} views`} color="primary" />
        <StatCard title="Avg. Completion" value={quizzes.length > 0 ? '78%' : '0%'} color="secondary" />
        <StatCard title="Active Deployments" value={publicCount} color="tertiary" />
        <StatCard title="Global Rank" value={quizzes.length > 0 ? '#42' : '--'} color="primary" isRank />
      </div>
    </section>
  );
};

const StatCard = ({ title, value, color, isRank }) => (
  <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}/10 rounded-full blur-2xl group-hover:bg-${color}/20 transition-colors`}></div>
    <p className="text-[10px] font-black tracking-widest uppercase text-on-surface-variant mb-2">{title}</p>
    <p className={`text-4xl font-extrabold ${isRank ? 'text-secondary' : 'text-on-surface'}`}>{value}</p>
  </div>
);

export default StatsGrid;
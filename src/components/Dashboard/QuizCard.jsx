import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz, index, onEdit, onDelete }) => {
  const isPublic = quiz.isPublic === true || quiz.isPublic === "true";
  const isTernary = (index + 1) % 3 === 0;
  const badgeColor = isPublic ? 'text-secondary bg-secondary/10' : 'text-on-surface-variant bg-surface-bright';
  const topicColor = isTernary ? 'text-tertiary' : (index % 2 === 0 ? 'text-secondary' : 'text-primary');

  return (
    <div className="group relative flex flex-col bg-surface-container-high rounded-4xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/5 shadow-2xl">
      <div className="h-48 overflow-hidden relative">
        <img src={quiz.bannerUrl || 'https://via.placeholder.com/600x400'} alt="Banner" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-linear-to-t from-surface-container-high to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border border-white/5 ${badgeColor}`}>{isPublic ? "Deployed" : "Restricted"}</span>
        </div>
      </div>
      <div className="p-8 grow flex flex-col justify-between -mt-8 relative z-10 text-left bg-linear-to-t from-surface-container-high to-transparent pt-8">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className={`text-[10px] font-black tracking-widest uppercase ${topicColor}`}>{quiz.topic || 'General Domain'}</span>
            <span className="text-[10px] font-medium text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">view_module</span>{quiz.numberOfRounds || 1} Stages
            </span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface mb-6 group-hover:text-primary transition-colors leading-[1.2]">{quiz.title}</h4>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20 mt-auto">
          <div className="flex gap-2">
            <button onClick={() => onEdit(quiz)} className="px-5 py-2 rounded-full border border-outline-variant/30 text-[10px] uppercase tracking-widest font-bold text-on-surface hover:bg-surface-bright hover:border-primary transition-colors">Edit</button>
            <button onClick={() => onDelete(quiz._id)} className="p-2 text-error/60 hover:text-error hover:bg-error/10 rounded-full transition-all flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
          <Link to={`/dashboard/manage/${quiz._id}`} className="flex items-center group/btn text-secondary uppercase text-[10px] font-black tracking-widest">Manage <span className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-1 ml-1 lg:ml-2">arrow_forward</span></Link>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
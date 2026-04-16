import React from "react";
import { Link, useNavigate } from "react-router-dom";

const QuizCard = ({ quiz, index, onEdit, onDelete }) => {
  const isPublic = quiz.isPublic === true || quiz.isPublic === "true";
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/quizzes/${quiz._id}`)} className="group cursor-pointer relative flex flex-col rounded-2xl border border-outline bg-surface-container overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">

      {/* IMAGE */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={quiz.bannerUrl || "https://picsum.photos/600/400"}
          alt="Quiz Banner"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
        />

        {/* overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* status badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-[9px] px-3 py-1 rounded-full font-bold tracking-widest ${
              isPublic
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-surface-container-high text-on-surface-variant border border-outline"
            }`}
          >
            {isPublic ? "LIVE" : "PRIVATE"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col grow">

        {/* TOP */}
        <div className="mb-3">
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
            {quiz.topic || "General"}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-semibold text-on-surface mb-3 leading-snug group-hover:text-primary transition-colors">
          {quiz.title}
        </h3>

        {/* META */}
        <div className="text-xs text-on-surface-variant mb-5 flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px]">
            view_module
          </span>
          {quiz.numberOfRounds || 1} stages
        </div>

        {/* ACTIONS */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/30">

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(quiz); }}
              className="px-4 py-1.5 cursor-pointer text-xs uppercase tracking-widest font-bold rounded-full border border-outline text-on-surface hover:border-primary hover:text-primary transition-all"
            >
              Edit
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onDelete(quiz._id); }}
              className="rounded-full text-error/70 hover:opacity-70 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-base">
                delete
              </span>
            </button>
          </div>

          <Link
            to={`/dashboard/manage/${quiz._id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center text-xs font-bold uppercase tracking-widest text-primary group/link"
          >
            Manage
            <span className="material-symbols-outlined text-base ml-1 transition-transform group-hover/link:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
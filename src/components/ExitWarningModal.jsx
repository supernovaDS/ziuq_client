import React from "react";

const ExitWarningModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">

      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* modal */}
      <div className="relative z-10 w-full max-w-md glass-card p-8 rounded-3xl border border-outline text-center">

        <h2 className="text-xl font-bold text-on-surface mb-3">
          Exit Quiz?
        </h2>

        <p className="text-on-surface-variant text-sm mb-8">
          Your current attempt will be lost. This action cannot be undone.
        </p>

        <div className="flex gap-4">

          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border cursor-pointer border-outline text-on-surface-variant font-bold text-sm uppercase tracking-widest hover:bg-surface transition"
          >
            Stay
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-primary text-white cursor-pointer font-bold text-sm uppercase tracking-widest hover:brightness-110"
          >
            Exit
          </button>

        </div>
      </div>
    </div>
  );
};

export default ExitWarningModal;
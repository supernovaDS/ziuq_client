import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

/* =========================
   ADD QUESTION FORM
========================= */
const AddQuestionForm = ({ quizId, roundId, onQuestionAdded }) => {
  const [question, setQuestion] = useState({
    questionNumber: 1,
    questionText: "",
    correctAnswer: "",
    checkingInstruction: "",
    maxPoints: 10,
  });
  const [files, setFiles] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!question.questionText || !question.correctAnswer) {
      return toast.error("Question & Answer are required");
    }

    const formData = new FormData();

    Object.entries({
      quizId,
      roundId,
      ...question,
    }).forEach(([key, val]) => formData.append(key, val));

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("questionMedia", files[i]);
      }
    }

    try {
      await API.post("/questions", formData);

      toast.success("Question added");

      setQuestion({
        ...question,
        questionNumber: Number(question.questionNumber) + 1,
        questionText: "",
        correctAnswer: "",
      });

      setFiles(null);
      e.target.reset();
      onQuestionAdded();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add question");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card p-5 rounded-xl border border-outline flex flex-col gap-4 mt-4"
    >
      <h4 className="font-bold text-primary">Add Question</h4>

      {/* GRID LAYOUT */}
      <div className="grid md:grid-cols-3 gap-3">
        <input
          type="number"
          required
          value={question.questionNumber}
          onChange={(e) =>
            setQuestion({ ...question, questionNumber: e.target.value })
          }
          className="bg-surface p-2 rounded border border-outline"
          placeholder="Q No"
        />

        <input
          type="text"
          required
          value={question.questionText}
          onChange={(e) =>
            setQuestion({ ...question, questionText: e.target.value })
          }
          className="bg-surface p-2 rounded border border-outline col-span-2"
          placeholder="Question"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <input
          type="text"
          required
          value={question.correctAnswer}
          onChange={(e) =>
            setQuestion({ ...question, correctAnswer: e.target.value })
          }
          className="bg-surface p-2 rounded border border-outline"
          placeholder="Correct Answer"
        />

        <input
          type="number"
          value={question.maxPoints}
          onChange={(e) =>
            setQuestion({ ...question, maxPoints: e.target.value })
          }
          className="bg-surface p-2 rounded border border-outline"
          placeholder="Points"
        />
      </div>

      <input
        type="text"
        value={question.checkingInstruction}
        onChange={(e) =>
          setQuestion({
            ...question,
            checkingInstruction: e.target.value,
          })
        }
        className="bg-surface p-2 rounded border border-outline"
        placeholder="Checking Instruction"
      />

      <div className="flex justify-between items-center">
        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />

        <button disabled={isSubmitting} className="bg-primary px-4 py-2 rounded font-bold text-black disabled:opacity-50">
          {isSubmitting ? "Saving question..." : "Save Question"}
        </button>
      </div>
    </form>
  );
};

/* =========================
   ROUND CARD
========================= */
const RoundCard = ({ quizId, round }) => {
  const [questions, setQuestions] = useState([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const fetchQuestions = async () => {
    try {
      const { data } = await API.get(`/questions/round/${round._id}`);
      setQuestions(data.questions);
    } catch {
      toast.error("Failed to fetch questions");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [round._id]);

  return (
    <div className="bg-surface-container border border-outline rounded-2xl p-5 space-y-4">

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-primary">
          Round {round.roundNumber}: {round.title}
        </h3>

        <span className="text-xs text-on-surface-variant">
          {questions.length} questions
        </span>
      </div>

      <p className="text-sm text-on-surface-variant">
        {round.description}
      </p>

      <div className="flex gap-4 text-sm">
        <span>+{round.pointsCorrect}</span>
        <span>-{round.pointsNegative}</span>
        <span>{round.timeLimit}s</span>
      </div>

      {/* QUESTIONS */}
      <div>
        {questions.length === 0 ? (
          <p className=" text-on-surface-variant">
            No questions added
          </p>
        ) : (
          <ul className="text-sm space-y-1">
            {questions.map((q) => (
              <li key={q._id}>
                Q{q.questionNumber}: {q.questionText}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => setShowAddQuestion(!showAddQuestion)}
        className="text-primary hover:underline cursor-pointer"
      >
        {showAddQuestion ? "Cancel" : "+ Add Question"}
      </button>

      {showAddQuestion && (
        <AddQuestionForm
          quizId={quizId}
          roundId={round._id}
          onQuestionAdded={fetchQuestions}
        />
      )}
    </div>
  );
};

/* =========================
   QUIZ MANAGER
========================= */
const QuizManager = () => {
  const { quizId } = useParams();
  const [rounds, setRounds] = useState([]);
  const [showAddRound, setShowAddRound] = useState(false);

  const [newRound, setNewRound] = useState({
    title: "",
    description: "",
    roundNumber: 1,
    numberOfQuestions: 5,
    pointsCorrect: 10,
    pointsNegative: 0,
    timeLimit: 60,
  });

  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRounds = async () => {
    try {
      const { data } = await API.get(`/rounds/${quizId}`);
      setRounds(data);
    } catch {
      toast.error("Failed to fetch rounds");
    }
  };

  useEffect(() => {
    if (quizId) fetchRounds();
  }, [quizId]);

  const handleAddRound = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!newRound.title) {
      return toast.error("Round title required");
    }

    const formData = new FormData();
    formData.append("quizId", quizId);

    Object.entries(newRound).forEach(([k, v]) =>
      formData.append(k, v)
    );

    if (file) formData.append("media", file);

    try {
      await API.post("/rounds", formData);

      toast.success("Round added");

      fetchRounds();
      setShowAddRound(false);

      setNewRound({
        ...newRound,
        roundNumber: Number(newRound.roundNumber) + 1,
      });

      setFile(null);
      e.target.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add round");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     FINAL SAVE VALIDATION
  ========================= */
  const handleFinalSave = async () => {
    if (rounds.length === 0) {
      return toast.error("Add at least 1 round");
    }

    try {
      const checks = await Promise.all(
        rounds.map((r) => API.get(`/questions/round/${r._id}`))
      );

      const invalidIndex = checks.findIndex(
        (res) => !res.data.questions || res.data.questions.length === 0
      );

      if (invalidIndex !== -1) {
        return toast.error(
          `Round ${rounds[invalidIndex].roundNumber} has no questions`
        );
      }

      toast.success("Quiz saved successfully 🎉");
    } catch {
      toast.error("Failed to validate questions");
    }
  };

  return (
    <div className="max-w-5xl pt-10 mx-auto p-6 space-y-6 text-on-surface">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Quiz</h1>

      {/* ADD ROUND */}
      <button
        onClick={() => setShowAddRound(!showAddRound)}
        className="bg-primary rounded-full cursor-pointer transition-all duration-200 hover:opacity-70 px-4 py-2 font-bold"
      >
        {showAddRound ? "Cancel" : "+ Add Round"}
      </button>
      </div>

      {showAddRound && (
        <form
          onSubmit={handleAddRound}
          className="glass-card p-6 rounded-xl space-y-4"
        >

          <div className="grid md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Round Number</label>
              <input
                type="number"
                required
                value={newRound.roundNumber}
                onChange={(e) =>
                  setNewRound({ ...newRound, roundNumber: e.target.value })
                }
                className="bg-surface p-2 rounded border border-outline"
              />
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Round Title</label>
              <input
                type="text"
                required
                placeholder="Title"
                className="bg-surface p-2 rounded border border-outline w-full"
                onChange={(e) =>
                  setNewRound({ ...newRound, title: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Description</label>
            <textarea
              placeholder="Description (Optional)"
              className="bg-surface p-2 rounded border w-full border-outline"
              onChange={(e) =>
                setNewRound({ ...newRound, description: e.target.value })
              }
            />
          </div>

          <div className="grid md:grid-cols-4 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Total Questions</label>
              <input
                type="number"
                placeholder="Total Qs"
                value={newRound.numberOfQuestions}
                onChange={(e) =>
                  setNewRound({
                    ...newRound,
                    numberOfQuestions: e.target.value,
                  })
                }
                className="bg-surface p-2 rounded border border-outline"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Correct Pts (+)</label>
              <input
                type="number"
                placeholder="Points"
                value={newRound.pointsCorrect}
                onChange={(e) =>
                  setNewRound({
                    ...newRound,
                    pointsCorrect: e.target.value,
                  })
                }
                className="bg-surface p-2 rounded border border-outline"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Negative Pts (-)</label>
              <input
                type="number"
                placeholder="Penalty"
                value={newRound.pointsNegative}
                onChange={(e) =>
                  setNewRound({
                    ...newRound,
                    pointsNegative: e.target.value,
                  })
                }
                className="bg-surface p-2 rounded border border-outline"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Time (Sec)</label>
              <input
                type="number"
                placeholder="Seconds"
                value={newRound.timeLimit}
                onChange={(e) =>
                  setNewRound({
                    ...newRound,
                    timeLimit: e.target.value,
                  })
                }
                className="bg-surface p-2 rounded border border-outline"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Media (Optional)</label>
            <div className="w-full flex items-center">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} className="bg-white/3 px-3 py-1 rounded-lg w-60"/>
              <button disabled={isSubmitting} className="bg-white/5 cursor-pointer hover:opacity-70 px-6 py-2 ml-auto rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? "Creating round..." : "Save Round"}
            </button>
            </div>
          </div>
        </form>
      )}

      {/* ROUNDS */}
      <div className="space-y-4">
        {rounds.map((round) => (
          <RoundCard key={round._id} quizId={quizId} round={round} />
        ))}
      </div>

      {/* FINAL SAVE */}
      <div className="flex justify-end pt-6 border-t border-outline">
        <button
          onClick={handleFinalSave}
          className="bg-primary px-7 py-2 font-bold cursor-pointer transition-all duration-200 hover:opacity-70 rounded-full"
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizManager;
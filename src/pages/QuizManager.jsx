import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      alert(err.response?.data?.error || err.response?.data?.message || "Failed to add question");
    }
  };

  return (
    <form className="mt-4 glass-card p-4 rounded-xl border border-outline flex flex-col gap-3 text-sm" onSubmit={handleSubmit}>
      <h4 className="font-bold text-on-surface">Add Question</h4>

      <div className="flex gap-2 text-xs">
        <input type="number" required value={question.questionNumber}
          onChange={(e) => setQuestion({ ...question, questionNumber: e.target.value })}
          className="bg-surface border border-outline p-2 rounded text-on-surface w-16" placeholder="Q#" />

        <input type="text" required value={question.questionText}
          onChange={(e) => setQuestion({ ...question, questionText: e.target.value })}
          className="bg-surface border border-outline p-2 rounded text-on-surface flex-1" placeholder="Question" />

        <input type="text" required value={question.correctAnswer}
          onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
          className="bg-surface border border-outline p-2 rounded text-on-surface flex-1" placeholder="Answer" />
      </div>

      <div className="flex gap-2 text-xs">
        <input type="number" value={question.maxPoints}
          onChange={(e) => setQuestion({ ...question, maxPoints: e.target.value })}
          className="bg-surface border border-outline p-2 rounded text-on-surface w-20" placeholder="Points" />

        <input type="text" value={question.checkingInstruction}
          onChange={(e) => setQuestion({ ...question, checkingInstruction: e.target.value })}
          className="bg-surface border border-outline p-2 rounded text-on-surface flex-1" placeholder="Instruction" />
      </div>

      <div className="flex items-center gap-2">
        <input type="file" multiple className="text-xs text-on-surface-variant"
          onChange={(e) => setFiles(e.target.files)} />

        <button className="ml-auto px-4 py-2 rounded-lg bg-primary text-black font-bold hover:brightness-110 transition">
          Save
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [round._id]);

  return (
    <div className="bg-surface-container border border-outline rounded-xl p-4 mb-4 shadow-lg">

      <h3 className="font-bold text-lg text-primary">
        Round {round.roundNumber}: {round.title}
      </h3>

      <p className="text-on-surface-variant text-sm mb-2">
        {round.description}
      </p>

      <div className="flex gap-4 text-xs font-semibold text-on-surface-variant">
        <span>+{round.pointsCorrect} / -{round.pointsNegative}</span>
        <span>{round.numberOfQuestions} Qs</span>
        <span>{round.timeLimit}s</span>
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-sm mb-2 border-b border-outline pb-1 text-on-surface">
          Saved Questions ({questions.length})
        </h4>

        {questions.length === 0 ? (
          <p className="text-xs text-on-surface-variant">
            No questions added yet.
          </p>
        ) : (
          <ul className="text-sm list-disc pl-5 text-on-surface">
            {questions.map((q) => (
              <li key={q._id}>
                <strong>Q{q.questionNumber}:</strong> {q.questionText}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowAddQuestion(!showAddQuestion)}
          className="text-primary font-bold text-sm hover:underline"
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

  const fetchRounds = async () => {
    try {
      const { data } = await API.get(`/rounds/${quizId}`);
      setRounds(data);
    } catch {
      alert("Failed to fetch rounds");
    }
  };

  useEffect(() => {
    if (quizId) fetchRounds();
  }, [quizId]);

  const handleAddRound = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("quizId", quizId);
    Object.entries(newRound).forEach(([k, v]) => formData.append(k, v));
    if (file) formData.append("media", file);

    try {
      await API.post("/rounds", formData);
      fetchRounds();
      setShowAddRound(false);
      setNewRound({
        ...newRound,
        roundNumber: Number(newRound.roundNumber) + 1,
      });
      setFile(null);
      e.target.reset();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add round");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-on-surface">

      <h1 className="text-3xl font-bold mb-6">Manage Quiz</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Rounds</h2>

        <button
          onClick={() => setShowAddRound(!showAddRound)}
          className="bg-primary text-black px-4 py-2 rounded font-bold hover:brightness-110 transition"
        >
          {showAddRound ? "Cancel" : "+ Add Round"}
        </button>
      </div>

      {showAddRound && (
        <form
          onSubmit={handleAddRound}
          className="glass-card p-6 rounded-xl border border-outline mb-8 flex flex-col gap-4"
        >

          <div className="flex gap-4">
            <input type="number" required
              className="bg-surface border border-outline p-2 rounded text-on-surface"
              value={newRound.roundNumber}
              onChange={(e) => setNewRound({ ...newRound, roundNumber: e.target.value })}
            />

            <input type="text" required placeholder="Title"
              className="bg-surface border border-outline p-2 rounded text-on-surface flex-1"
              onChange={(e) => setNewRound({ ...newRound, title: e.target.value })}
            />

            <input type="number" required
              className="bg-surface border border-outline p-2 rounded text-on-surface"
              value={newRound.numberOfQuestions}
              onChange={(e) => setNewRound({ ...newRound, numberOfQuestions: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Description"
            className="bg-surface border border-outline p-2 rounded text-on-surface"
            onChange={(e) => setNewRound({ ...newRound, description: e.target.value })}
          />

          <div className="flex gap-4">
            <input type="number"
              className="bg-surface border border-outline p-2 rounded text-on-surface w-24"
              value={newRound.pointsCorrect}
              onChange={(e) => setNewRound({ ...newRound, pointsCorrect: e.target.value })}
            />

            <input type="number"
              className="bg-surface border border-outline p-2 rounded text-on-surface w-24"
              value={newRound.pointsNegative}
              onChange={(e) => setNewRound({ ...newRound, pointsNegative: e.target.value })}
            />

            <input type="number"
              className="bg-surface border border-outline p-2 rounded text-on-surface w-24"
              value={newRound.timeLimit}
              onChange={(e) => setNewRound({ ...newRound, timeLimit: e.target.value })}
            />
          </div>

          <div className="flex justify-between items-center">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button className="bg-primary text-black px-6 py-2 rounded font-bold hover:brightness-110">
              Save Round
            </button>
          </div>
        </form>
      )}

      {rounds.length === 0 ? (
        <p className="text-on-surface-variant italic">
          No rounds added yet.
        </p>
      ) : (
        rounds.map((round) => (
          <RoundCard key={round._id} quizId={quizId} round={round} />
        ))
      )}
    </div>
  );
};

export default QuizManager;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

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
    formData.append("quizId", quizId);
    formData.append("roundId", roundId);
    formData.append("questionNumber", question.questionNumber);
    formData.append("questionText", question.questionText);
    formData.append("correctAnswer", question.correctAnswer);
    formData.append("checkingInstruction", question.checkingInstruction);
    formData.append("maxPoints", question.maxPoints);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("questionMedia", files[i]);
      }
    }

    try {
      await API.post("/questions", formData);
      setQuestion({ ...question, questionNumber: Number(question.questionNumber) + 1, questionText: "", correctAnswer: "" }); // Reset text fields
      setFiles(null);
      e.target.reset();
      onQuestionAdded();
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || "Failed to add question");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-50 border p-4 rounded text-sm flex flex-col gap-3">
      <h4 className="font-bold">Add Question</h4>
      <div className="flex gap-2 text-xs">
        <input type="number" placeholder="Q. Num" required className="border p-1 w-16" value={question.questionNumber} onChange={(e) => setQuestion({ ...question, questionNumber: e.target.value })} />
        <input type="text" placeholder="Question Text" required className="border p-1 flex-1" value={question.questionText} onChange={(e) => setQuestion({ ...question, questionText: e.target.value })} />
        <input type="text" placeholder="Correct Answer" required className="border p-1 flex-1" value={question.correctAnswer} onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })} />
      </div>
      <div className="flex gap-2 text-xs">
        <input type="number" placeholder="Points" className="border p-1 w-20" value={question.maxPoints} onChange={(e) => setQuestion({ ...question, maxPoints: e.target.value })} />
        <input type="text" placeholder="(Optional) Checking Instruction" className="border p-1 flex-1" value={question.checkingInstruction} onChange={(e) => setQuestion({ ...question, checkingInstruction: e.target.value })} />
      </div>
      <div className="flex gap-2 items-center">
        <label className="text-xs">Images (Optional):</label>
        <input type="file" multiple className="text-xs" onChange={(e) => setFiles(e.target.files)} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded ml-auto">Save Question</button>
      </div>
    </form>
  );
};

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
    <div className="bg-white p-4 rounded-lg shadow border mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-indigo-700">Round {round.roundNumber}: {round.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{round.description}</p>
          <div className="flex gap-4 text-xs font-semibold text-gray-500">
            <span>Points: +{round.pointsCorrect} / -{round.pointsNegative}</span>
            <span>Target Qs: {round.numberOfQuestions}</span>
            <span>Time: {round.timeLimit}s</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-sm mb-2 border-b pb-1">Saved Questions ({questions.length})</h4>
        {questions.length === 0 ? <p className="text-xs text-gray-400">No questions added yet.</p> : (
          <ul className="text-sm list-disc pl-5 mb-2">
            {questions.map((q) => (
              <li key={q._id}><strong>Q{q.questionNumber}:</strong> {q.questionText} (Answer: {q.correctAnswer}) {q.questionMedia?.length > 0 && <span>🖼️</span>}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <button onClick={() => setShowAddQuestion(!showAddQuestion)} className="text-blue-500 font-bold text-sm">
          {showAddQuestion ? "Cancel" : "+ Add Question"}
        </button>
        {showAddQuestion && <AddQuestionForm quizId={quizId} roundId={round._id} onQuestionAdded={fetchQuestions} />}
      </div>
    </div>
  );
};

const QuizManager = () => {
  const { quizId } = useParams();
  const [rounds, setRounds] = useState([]);
  const [showAddRound, setShowAddRound] = useState(false);
  const [newRound, setNewRound] = useState({
    title: "", description: "", roundNumber: 1, numberOfQuestions: 5, pointsCorrect: 10, pointsNegative: 0, timeLimit: 60
  });
  const [file, setFile] = useState(null);

  const fetchRounds = async () => {
    try {
      const { data } = await API.get(`/rounds/${quizId}`);
      setRounds(data);
    } catch (err) {
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
    Object.keys(newRound).forEach(key => formData.append(key, newRound[key]));
    if (file) formData.append("media", file);

    try {
      await API.post("/rounds", formData);
      fetchRounds();
      setShowAddRound(false);
      setNewRound({ ...newRound, roundNumber: Number(newRound.roundNumber) + 1 });
      setFile(null);
      e.target.reset();
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || "Failed to add round");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Quiz</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Rounds</h2>
        <button onClick={() => setShowAddRound(!showAddRound)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold">
          {showAddRound ? "Cancel" : "+ Add Round"}
        </button>
      </div>

      {showAddRound && (
        <form onSubmit={handleAddRound} className="bg-white p-6 rounded-lg shadow border border-indigo-200 mb-8 flex flex-col gap-4">
          <div className="flex gap-4">
            <input type="number" placeholder="Round Num" required className="border p-2 rounded" value={newRound.roundNumber} onChange={(e) => setNewRound({ ...newRound, roundNumber: e.target.value })} />
            <input type="text" placeholder="Round Title" required className="border p-2 rounded flex-1" onChange={(e) => setNewRound({ ...newRound, title: e.target.value })} />
            <input type="number" placeholder="# of Qs" required className="border p-2 rounded" value={newRound.numberOfQuestions} onChange={(e) => setNewRound({ ...newRound, numberOfQuestions: e.target.value })} />
          </div>
          <textarea placeholder="Instruction / Description (Optional)" className="border p-2 rounded w-full" onChange={(e) => setNewRound({ ...newRound, description: e.target.value })}></textarea>
          <div className="flex gap-4">
            <div className="flex items-center gap-1"><label className="text-sm">Points (Correct):</label><input type="number" required className="border p-2 rounded w-20" value={newRound.pointsCorrect} onChange={(e) => setNewRound({ ...newRound, pointsCorrect: e.target.value })} /></div>
            <div className="flex items-center gap-1"><label className="text-sm">Points (Negative):</label><input type="number" required className="border p-2 rounded w-20" value={newRound.pointsNegative} onChange={(e) => setNewRound({ ...newRound, pointsNegative: e.target.value })} /></div>
            <div className="flex items-center gap-1"><label className="text-sm">Time (Sec):</label><input type="number" required className="border p-2 rounded w-20" value={newRound.timeLimit} onChange={(e) => setNewRound({ ...newRound, timeLimit: e.target.value })} /></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div><label className="text-sm font-semibold block mb-1">Round Media / Video (Optional)</label><input type="file" onChange={(e) => setFile(e.target.files[0])} /></div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold">Save Round</button>
          </div>
        </form>
      )}

      {rounds.length === 0 ? <p className="text-gray-500 italic">No rounds added yet. Click "+ Add Round" to get started.</p> : (
        rounds.map(round => <RoundCard key={round._id} quizId={quizId} round={round} />)
      )}
    </div>
  );
};

export default QuizManager;

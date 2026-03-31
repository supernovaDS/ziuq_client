import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

import DashboardHero from "../components/Dashboard/DashboardHero";
import QuizForm from "../components/Dashboard/QuizForm";
import QuizCard from "../components/Dashboard/QuizCard";
import StatsGrid from "../components/Dashboard/StatsGrid";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: "", topic: "", isPublic: "false", numberOfRounds: 1 });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const fetchMyQuizzes = useCallback(async () => {
    try {
      const { data } = await API.get("/quizzes/my");
      setQuizzes(data);
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyQuizzes();
  }, [fetchMyQuizzes]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newQuiz).forEach(key => formData.append(key, newQuiz[key]));
    if (file) formData.append("banner", file);

    try {
      if (editingId) {
        await API.put(`/quizzes/${editingId}`, formData);
        cancelEdit();
        fetchMyQuizzes();
      } else {
        const { data } = await API.post("/quizzes", formData);
        navigate(`/dashboard/manage/${data.quiz._id}`);
      }
    } catch (err) { alert("Error processing request"); }
  };

  const startEdit = (quiz) => {
    setEditingId(quiz._id);
    setNewQuiz({ title: quiz.title, topic: quiz.topic, isPublic: quiz.isPublic ? "true" : "false", numberOfRounds: quiz.numberOfRounds || 1 });
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewQuiz({ title: "", topic: "", isPublic: "false", numberOfRounds: 1 });
    setFile(null);
    setIsCreating(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this sequence?")) {
      await API.delete(`/quizzes/${id}`);
      fetchMyQuizzes();
    }
  };

  return (
    <main className="px-6 mx-auto py-4 md:py-12 animate-in fade-in duration-700">
      {!isCreating ? (
        <DashboardHero onTriggerCreate={() => setIsCreating(true)} />
      ) : (
        <QuizForm 
          newQuiz={newQuiz} setNewQuiz={setNewQuiz} 
          file={file} setFile={setFile} 
          onSubmit={handleCreate} onCancel={cancelEdit} 
          editingId={editingId} 
        />
      )}

      <section>
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-on-surface-variant mb-2">Inventory</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">My Created Quizzes</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((q, idx) => (
            <QuizCard key={q._id} quiz={q} index={idx} onEdit={startEdit} onDelete={handleDelete} />
          ))}
        </div>
      </section>

      {/* <StatsGrid quizzes={quizzes} /> */}
    </main>
  );
};

export default Dashboard;
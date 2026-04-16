import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";
import QuizSession from "../../components/QuizSession";
import QuizOverview from "../../components/QuizOverview";
import Loader from "../../components/Loader";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await API.get(`/quizzes/${id}`);
        setQuiz(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) return <Loader />;

  if (!quiz) {
    return (
      <div className="text-center mt-20 text-on-surface">
        Quiz not found
      </div>
    );
  }

  // 🔥 START SESSION
  if (started) {
    return (
      <QuizSession
        quiz={quiz}
        onExit={() => setStarted(false)}
      />
    );
  }

  // 🔥 USE SAME UI AS QuizOverview
  return (
    <QuizOverview
      quiz={quiz}
      roundsCount={quiz.numberOfRounds || 0}
      onStart={() => setStarted(true)}
      onExit={() => navigate(-1)}
    />
  );
};

export default Quiz;
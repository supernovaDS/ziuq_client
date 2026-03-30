import React, { useState, useEffect } from "react";
import API from "../api";
import ResultsSummary from "./ResultsSummary";
import QuizOverview from "./QuizOverview";
import RoundOverview from "./RoundOverview";
import QuestionPlayer from "./QuestionPlayer";
import QuizSummary from "./QuizSummary";

const QuizSession = ({ quiz, onExit }) => {
  const [sessionState, setSessionState] = useState("QUIZ_OVERVIEW");
  const [rounds, setRounds] = useState([]);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const [userAnswer, setUserAnswer] = useState("");
  const [grading, setGrading] = useState(null);
  const [sessionResults, setSessionResults] = useState([]);
  const [globalResults, setGlobalResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.history.pushState({ state: sessionState }, "");
  }, [sessionState]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sessionState]);

  useEffect(() => {
    const handlePopState = () => {
      setSessionState((prev) => {
        switch (prev) {
          case "ROUND_OVERVIEW":
            return "QUIZ_OVERVIEW";

          case "PLAY_QUESTIONS":
            return "ROUND_OVERVIEW";

          case "ROUND_SUMMARY":
            return "PLAY_QUESTIONS";

          case "QUIZ_SUMMARY":
            return "ROUND_SUMMARY";

          default:
            // this is QUIZ_OVERVIEW → exit quiz
            onExit();
            return prev;
        }
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const { data } = await API.get(`/rounds/${quiz._id}`);
        setRounds(data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchRounds();
  }, [quiz._id]);

  const fetchQuestions = async (roundId) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/questions/round/${roundId}`);
      setQuestions(data.questions);
    } catch (error) { console.error(error); }
    setLoading(false);
  };

  const startRound = () => {
    fetchQuestions(rounds[currentRoundIdx]._id);
    setSessionState("PLAY_QUESTIONS");
  };

  const handleCheckAnswer = async () => {
    try {
      const { data } = await API.post("/questions/evaluate", {
        questionId: questions[currentQuestionIdx]._id,
        userAnswer: userAnswer,
      });

      let finalScore = data.score;
      const currentR = rounds[currentRoundIdx];
      if (finalScore === 0 && currentR.pointsNegative > 0) finalScore = -currentR.pointsNegative;

      setGrading({ ...data, score: finalScore });
      setSessionResults([...sessionResults, {
        questionId: questions[currentQuestionIdx]._id,
        questionText: questions[currentQuestionIdx].questionText,
        userAnswer,
        score: finalScore,
        maxPoints: questions[currentQuestionIdx].maxPoints || 10,
        feedback: data.feedback,
      }]);
      // eslint-disable-next-line no-unused-vars
    } catch (err) { alert("AI Grading failed"); }
  };

  const nextQuestion = async () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setUserAnswer("");
      setGrading(null);
    } else {
      try {
        await API.post("/questions/finish-round", {
          quizId: quiz._id,
          roundId: rounds[currentRoundIdx]._id,
          gradedAnswers: sessionResults,
        });
      } catch (err) { console.error(err); }
      setGlobalResults([...globalResults, ...sessionResults]);
      setSessionState("ROUND_SUMMARY");
    }
  };

  const handleNextRound = () => {
    setCurrentRoundIdx(currentRoundIdx + 1);
    setCurrentQuestionIdx(0);
    setSessionResults([]);
    setUserAnswer("");
    setGrading(null);
    setSessionState("ROUND_OVERVIEW");
  };

  const handleCompleteQuiz = async () => {
    const grandScore = globalResults.reduce((acc, curr) => acc + curr.score, 0);
    const grandMax = globalResults.reduce((acc, curr) => acc + curr.maxPoints, 0);
    const accuracy = grandMax > 0 ? (Math.max(0, grandScore) / grandMax) * 100 : 0;

    try {
      await API.post("/attempts", { quizId: quiz._id, score: grandScore, accuracy });
    } catch (err) { console.error(err); }
    setSessionState("QUIZ_SUMMARY");
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  switch (sessionState) {
    case "QUIZ_OVERVIEW":
      return <QuizOverview quiz={quiz} roundsCount={rounds.length} onStart={() => rounds.length ? setSessionState("ROUND_OVERVIEW") : alert("No rounds!")} onExit={onExit} />;

    case "ROUND_OVERVIEW":
      return <RoundOverview round={rounds[currentRoundIdx]} roundNumber={currentRoundIdx + 1} onStartRound={startRound} />;

    case "PLAY_QUESTIONS":
      return (
        <QuestionPlayer
          question={questions[currentQuestionIdx]}
          roundTitle={rounds[currentRoundIdx]?.title}
          roundNumber={currentRoundIdx + 1}
          questionIdx={currentQuestionIdx}
          totalQuestions={questions.length}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          grading={grading}
          onCheck={handleCheckAnswer}
          onNext={nextQuestion}
          onExit={onExit}
        />
      );

    case "ROUND_SUMMARY":
      return (
        <ResultsSummary
          results={sessionResults}
          totalScore={sessionResults.reduce((a, b) => a + b.score, 0)}
          onExit={onExit}
          hasNextRound={currentRoundIdx < rounds.length - 1}
          onNextRound={handleNextRound}
          onCompleteQuiz={handleCompleteQuiz}
          title={`Round ${currentRoundIdx + 1} Complete!`}
        />
      );

    case "QUIZ_SUMMARY":
      return <QuizSummary grandTotal={globalResults.reduce((a, b) => a + b.score, 0)} roundsCount={rounds.length} quizTitle={quiz.title} onExit={onExit} />;

    default:
      return null;
  }
};

export default QuizSession;
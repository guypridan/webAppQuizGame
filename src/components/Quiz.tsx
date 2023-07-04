import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";
import Question from "./Question";
import { decode } from "html-entities";
import End from "./End";
import Start from "./Start";

interface Question {
  category: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

const Quiz = () => {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [curQuestionIndex, setCurQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [err, setErr] = useState("");
  const [URL, setURL] = useState("https://opentdb.com/api.php?amount=10");

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get(URL)
      .then((res) => {
        setQuestions(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErr(err.message);
        console.log(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [URL]);

  const handleStart = (category: string, difficulty: string) => {
    let newURL = "https://opentdb.com/api.php?amount=10";
    if (category !== "8") {
      newURL += "&category=" + category;
    }
    newURL += "&difficulty=" + difficulty;
    setURL(newURL);
    setStarted(true);
  };

  const handleAnswer = (answer: string) => {
    if (answer === questions[curQuestionIndex].correct_answer)
      setScore(score + 1);
    setCurQuestionIndex(curQuestionIndex + 1);
  };

  const handleReplay = () => {
    setCurQuestionIndex(0);
    setScore(0);
    setStarted(false);
  };
  if (!started) return <Start onStart={handleStart}></Start>;
  if (loading) return <div className="spinner-border" />;
  if (err !== "") return <p>{err}</p>;
  if (curQuestionIndex === 10)
    return <End finalScore={score} onReplay={handleReplay} />;

  return (
    <>
      {loading && <div className="spinner-border shadow" />}
      <Question
        question={decode(questions[curQuestionIndex].question)}
        answers={[
          ...questions[curQuestionIndex].incorrect_answers,
          questions[curQuestionIndex].correct_answer,
        ]}
        onAnswer={handleAnswer}
      />
    </>
  );
};

export default Quiz;

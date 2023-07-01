import axios, { CanceledError } from "axios";
import { Fragment, useState, useEffect } from "react";
import Question from "./Question";
import { decode } from "html-entities";
import End from "./End";

interface Question {
  category: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

function shuffle(array: Question[]) {
  array.sort(() => Math.random() - 0.5);
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [curQuestionIndex, setCurQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [err, setErr] = useState("");
  const [round, setRound] = useState(0);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((res) => {
        setQuestions(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErr(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [round]);

  const handleAnswer = (answer: string) => {
    if (answer === questions[curQuestionIndex].correct_answer)
      setScore(score + 1);
    setCurQuestionIndex(curQuestionIndex + 1);
  };

  const handleReplay = () => {
    setCurQuestionIndex(0);
    setScore(0);
    setRound(round + 1);
  };

  if (loading) return <div className="spinner-border" />;
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

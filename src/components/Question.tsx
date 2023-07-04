import { decode } from "html-entities";
import Styles from "./Question.module.css";

interface Props {
  question: string;
  answers: string[];
  onAnswer: (answer: string) => void;
}

function shuffle(array: any[]) {
  array.sort(() => Math.random() - 0.5);
}

const Question = ({ question, answers, onAnswer }: Props) => {
  let shuffledAnswers = answers;
  shuffle(shuffledAnswers);
  return (
    <div className="list-group  w-75">
      <h1 key="question" className="text-white text-center">
        {question}
      </h1>
      {shuffledAnswers.map((answer, index) => (
        <div
          key={"answers" + index.toString()}
          className="btn-group-vertical"
          role="group"
        >
          <button
            key={index}
            type="button"
            className="btn btn-light btn-lg m-2"
            onClick={() => {
              onAnswer(answer);
            }}
          >
            {decode(answer)}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Question;

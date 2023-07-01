import { decode } from "html-entities";

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
    <div className="list-group mt-3 w-75">
      <h1 className="text-center border shadow rounded">{question}</h1>
      {shuffledAnswers.map((answer, index) => (
        <div>
          <button
            key={index}
            type="button"
            className="list-group-item list-group-item-action active mb-2 rounded"
            aria-current="true"
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

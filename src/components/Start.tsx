import { FormEvent, useRef } from "react";

const Start = ({
  onStart,
}: {
  onStart: (category: string, difficulty: string) => void;
}) => {
  const categoryRef = useRef<HTMLSelectElement>(null);
  const difficultyRef = useRef<HTMLSelectElement>(null);

  const categories = [
    "Any Category",
    "General Knowledge",
    "Books",
    "Film",
    "Music",
    "Musicals and Theater",
    "Television",
    "Video games",
    "Board games",
    "Sience and Nature",
    "Computers",
    "Math",
    "Mythology",
    "Sports",
  ];

  const difficulty = ["easy", "medium", "hard"];

  const handleStart = (event: FormEvent) => {
    event.preventDefault();
    if (categoryRef.current !== null && difficultyRef.current != null) {
      let category = (
        categories.indexOf(categoryRef.current.value) + 8
      ).toString();
      onStart(category, difficultyRef.current.value);
    }
  };

  return (
    <form onSubmit={handleStart}>
      <div className={"mb-3"}>
        <h1 className="text-center text-white mb-5">QuizzyQuest</h1>
        <label htmlFor="category" className="form-label text-white">
          Choose category
        </label>
        <select
          ref={categoryRef}
          className="form-control"
          id="category"
          required
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="expensePrice" className="form-label text-white">
          Choose difficulty
        </label>
        <select
          ref={difficultyRef}
          className="form-control"
          id="expensePrice"
          required
        >
          {difficulty.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Start quiz
        </button>
      </div>
    </form>
  );
};

export default Start;

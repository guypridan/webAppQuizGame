import { useRef } from "react";

const Start = () => {
  const categoryRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const categories = [
    "Any Category",
    "Geberal Knowledge",
    "Books",
    "Film",
    "Music",
    "Musicals and Theater",
    "Television",
    "Video games",
    "Sience and Nature",
    "Computers",
    "Math",
    "Mythology",
    "Sports",
  ];

  const difficulty = ["Easy", "Medium", "Hard"];

  const handleStart = () => {};

  return (
    <form onSubmit={handleStart}>
      <div className={"mb-3"}>
        <label htmlFor="category" className="form-label">
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
        <label htmlFor="expensePrice" className="form-label">
          Expense price
        </label>
        <input
          ref={priceRef}
          type="number"
          className="form-control"
          id="expensePrice"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="expenseType" className="form-label">
          Expense type
        </label>
        <select
          key="expenseType"
          ref={typeRef}
          id="expenseType"
          className="form-select"
          required
        >
          {expenseTypes.map((type) => (
            <option>{type}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Add expense
        </button>
      </div>
    </form>
  );
};

export default Start;

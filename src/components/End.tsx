import React from "react";

const End = ({
  finalScore,
  onReplay,
}: {
  finalScore: number;
  onReplay: () => void;
}) => {
  return (
    <div className="container text-center">
      <h1 className="text-center text-white">
        Finnished with {finalScore.toString()} points
      </h1>
      <button className="btn btn-primary btn-lg" onClick={onReplay}>
        Play again!
      </button>
    </div>
  );
};

export default End;

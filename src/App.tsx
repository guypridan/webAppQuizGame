// TODO:
// COMPONENTS
// timer
// answered history view
// feedback for answers

import Quiz from "./components/Quiz";
import Styles from "./App.module.css";
const App = () => {
  return (
    <div className={Styles.quiz}>
      <div className="d-flex justify-content-center">
        <Quiz />
      </div>
    </div>
  );
};

export default App;

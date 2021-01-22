import StringGroup from "./StringGroup";
import StartPage from "./StartPage";
import { useState } from "react";

function Main({ isStarted, setStarted }) {
  const [difficulty, setDifficulty] = useState(1);

  return isStarted ? (
    <StringGroup difficulty={difficulty} setStarted={setStarted} />
  ) : (
    <StartPage
      setDifficulty={setDifficulty}
      difficulty={difficulty}
      setStarted={setStarted}
    />
  );
}

export default Main;

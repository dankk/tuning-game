import StringGroup from "./StringGroup";
import StartPage from "./StartPage";
//import { useRecoilValue } from "recoil";
import { startState } from "../atoms/atoms";
import { useState } from "react";

function Main({ isStarted, setStarted }) {
  //const isStarted = useRecoilValue(startState);

  const [difficulty, setDifficulty] = useState(1);

  const startPageProps = {
    difficulty,
    setDifficulty: (d) => setDifficulty(d),
    setStarted,
  };
  const stringGroupProps = { difficulty, setStarted };

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

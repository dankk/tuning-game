import StringGroup from "./StringGroup";
import StartPage from "./StartPage";
import { useRecoilValue } from "recoil";
import { startState } from "../atoms/atoms";

function Main() {
  const isStarted = useRecoilValue(startState);
  return isStarted ? <StringGroup /> : <StartPage />;
}

export default Main;

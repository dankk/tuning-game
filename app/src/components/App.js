//import { RecoilRoot } from "recoil";
import { useState } from "react";
import Main from "./Main";

function App() {
  //new
  const [isStarted, setStarted] = useState(false);

  return (
    // <RecoilRoot>
    <Main
      isStarted={isStarted}
      setStarted={(isStarted) => setStarted(isStarted)}
    />
    // </RecoilRoot>
  );
}

export default App;

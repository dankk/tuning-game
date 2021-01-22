import { useState } from "react";
import Main from "./Main";

function App() {
  const [isStarted, setStarted] = useState(false);

  return (
    <Main
      isStarted={isStarted}
      setStarted={(isStarted) => setStarted(isStarted)}
    />
  );
}

export default App;

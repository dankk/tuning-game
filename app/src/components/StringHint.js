import { useState } from "react";
import useAudio from "../hooks/useAudio";

const { Button } = require("@material-ui/core");

function StringHint({ noteIndex }) {
  const [clicked, setClicked] = useState(false);
  const [audioObj] = useAudio(noteIndex);

  const playNote = () => {
    try {
      audioObj.audio.pause();
      audioObj.audio.currentTime = 0;
      audioObj.audio.play();
      setClicked(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button variant="outlined" disabled={clicked} onClick={() => playNote()}>
      Hint
    </Button>
  );
}

export default StringHint;

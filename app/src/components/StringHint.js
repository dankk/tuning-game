import { useEffect, useState } from "react";
import useAudio from "../hooks/useAudio";

const { Button, Tooltip } = require("@material-ui/core");

function StringHint({ noteIndex, roundNum }) {
  const [clicked, setClicked] = useState(false);
  const [audioObj] = useAudio(noteIndex);

  useEffect(() => {
    setClicked(false);
  }, [roundNum]);

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
    <Tooltip title="Listen to Correct Note">
      <Button variant="outlined" disabled={clicked} onClick={() => playNote()}>
        Hint
      </Button>
    </Tooltip>
  );
}

export default StringHint;

import useAudio from "../hooks/useAudio";

const { Button } = require("@material-ui/core");

function StringHint({ noteIndex }) {
  const [audioObj] = useAudio(noteIndex);

  const playNote = () => {
    try {
      audioObj.audio.pause();
      audioObj.audio.currentTime = 0;
      audioObj.audio.play();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button variant="outlined" onClick={() => playNote()}>
      Hint
    </Button>
  );
}

export default StringHint;

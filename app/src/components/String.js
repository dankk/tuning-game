import { Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import useAudio from "../hooks/useAudio";
import StringHint from "./StringHint";
import { notesArray } from "../utils/notesContoller";

const useStyles = makeStyles({
  stringRoot: { justifyContent: "center", margin: 3, width: "80vw" },
  stringMain: { width: "40%", backgroundColor: "white" },
  stringSolveMain: { backgroundColor: "gray", width: "40%" },
  stringChangeButton: { backgroundColor: "white" },
});

function String({
  stringIndex,
  selectedNoteIndex,
  realNoteIndex,
  isWrong,
  setSelectedNoteIndexes,
}) {
  const [audioObj, handleChangeAudio] = useAudio(selectedNoteIndex);

  const [noteChangeDisabled, setNoteChangeDisabled] = useState(false);

  const changeSelectedNoteIndexes = (stringIndex, newNoteIndex) => {
    setSelectedNoteIndexes((s) =>
      s.map((v, i) => (i === stringIndex ? newNoteIndex : v))
    );
  };

  const tempDisableNoteChange = (time) => {
    setNoteChangeDisabled(true);
    setTimeout(() => setNoteChangeDisabled(false), time);
  };

  const lowerString = () => {
    if (audioObj.noteIndex === 0) return;
    tempDisableNoteChange(100);
    changeSelectedNoteIndexes(stringIndex, audioObj.noteIndex - 1);
    handleChangeAudio(audioObj.noteIndex - 1);
  };

  const raiseString = () => {
    if (audioObj.noteIndex === notesArray.length - 1) return;
    tempDisableNoteChange(100);
    changeSelectedNoteIndexes(stringIndex, audioObj.noteIndex + 1);
    handleChangeAudio(audioObj.noteIndex + 1);
  };

  const playString = () => {
    try {
      audioObj.audio.pause();
      audioObj.audio.currentTime = 0;
      audioObj.audio.play();
    } catch (err) {
      console.log(err);
    }
  };

  const classes = useStyles();

  if (!isWrong) {
    return (
      <Grid container direction="row" className={classes.stringRoot}>
        <Grid item xs={1} />
        <Grid item xs={2} />
        <Grid item xs={6} className={classes.stringMain}>
          <Button variant="outlined" fullWidth onClick={() => playString()}>
            {`► ${audioObj.name}`}
          </Button>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={1} />
      </Grid>
    );
  }

  return (
    <Grid container direction="row" className={classes.stringRoot}>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <Button
          className={classes.stringChangeButton}
          variant="outlined"
          fullWidth
          disabled={noteChangeDisabled}
          onClick={() => lowerString()}
        >
          {"<- ♭"}
        </Button>
      </Grid>
      <Grid item xs={6} className={classes.stringSolveMain}>
        <Button variant="outlined" fullWidth onClick={() => playString()}>
          {`? ${notesArray[realNoteIndex].name} ?`}
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          className={classes.stringChangeButton}
          variant="outlined"
          fullWidth
          disabled={noteChangeDisabled}
          onClick={() => raiseString()}
        >
          {"♯ ->"}
        </Button>
      </Grid>
      <Grid item xs={1}>
        <StringHint noteIndex={realNoteIndex} />
      </Grid>
    </Grid>
  );
}

export default String;

import { Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { noteIndexesState } from "../atoms/atoms";
import useAudio from "../hooks/useAudio";
import StringHint from "./StringHint";

const useStyles = makeStyles({
  stringRoot: { justifyContent: "center", margin: 3, width: "80vw" },
  stringMain: { width: "40%", backgroundColor: "white" },
  stringSolveMain: { backgroundColor: "gray", width: "40%" },
  stringChangeButton: { backgroundColor: "white" },
});

function String({ stringIndex, selectedNoteIndex, realNoteIndex, isWrong }) {
  const [audioObj, handleChangeAudio] = useAudio(selectedNoteIndex);
  const [, setNoteIndexes] = useRecoilState(noteIndexesState);
  const [noteChangeDisabled, setNoteChangeDisabled] = useState(false);

  const changeSelectedNoteIndexes = (stringIndex, newNoteIndex) => {
    setNoteIndexes((s) => ({
      ...s,
      selectedNoteIndexes: s.selectedNoteIndexes.map((v, i) =>
        i === stringIndex ? newNoteIndex : v
      ),
    }));
  };

  const tempDisableNoteChange = (time) => {
    setNoteChangeDisabled(true);
    setTimeout(() => setNoteChangeDisabled(false), time);
  };

  const lowerString = () => {
    tempDisableNoteChange(500);
    changeSelectedNoteIndexes(stringIndex, audioObj.noteIndex - 1);
    handleChangeAudio(audioObj.noteIndex - 1);
  };

  const raiseString = () => {
    tempDisableNoteChange(500);
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
          {"?"}
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

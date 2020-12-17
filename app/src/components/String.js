import { Button, Grid, makeStyles } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { selectedNoteIndexesState } from "../atoms/atoms";
import useAudio from "../hooks/useAudio";
import StringHint from "./StringHint";

const useStyles = makeStyles({
  stringRoot: { justifyContent: "center", margin: 3 },
  stringMain: {},
  stringSolveMain: { backgroundColor: "gray" },
  stringChangeButton: {},
});

function String({ stringIndex, selectedNoteIndex, realNoteIndex, isWrong }) {
  const [audioObj, handleChangeAudio] = useAudio(selectedNoteIndex);
  const [, setSelectedNoteIndexes] = useRecoilState(selectedNoteIndexesState);

  const changeSelectedNoteIndexes = (stringIndex, newNoteIndex) => {
    setSelectedNoteIndexes((s) =>
      s.map((v, i) => (i === stringIndex ? newNoteIndex : v))
    );
  };

  const lowerString = () => {
    changeSelectedNoteIndexes(stringIndex, audioObj.noteIndex - 1);
    handleChangeAudio(audioObj.noteIndex - 1);
  };

  const raiseString = () => {
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
        <Grid item sm={2} />
        <Grid item sm={6}>
          <Button
            className={classes.stringMain}
            variant="outlined"
            onClick={() => playString()}
          >
            {`► ${audioObj.name}`}
          </Button>
        </Grid>
        <Grid item sm={2} />
        <Grid item sm={2} />
      </Grid>
    );
  }

  return (
    <Grid container direction="row" className={classes.stringRoot}>
      <Grid item sm={2}>
        <Button
          className={classes.stringChangeButton}
          variant="outlined"
          onClick={() => lowerString()}
        >
          {"<- ♭"}
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Button
          className={classes.stringSolveMain}
          variant="outlined"
          onClick={() => playString()}
        >
          {`? ${audioObj.name}`}
        </Button>
      </Grid>
      <Grid item sm={2}>
        <Button
          className={classes.stringChangeButton}
          variant="outlined"
          onClick={() => raiseString()}
        >
          {"♯ ->"}
        </Button>
      </Grid>
      <Grid item sm={2}>
        <StringHint noteIndex={realNoteIndex} />
      </Grid>
    </Grid>
  );
}

export default String;

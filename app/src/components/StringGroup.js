import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import String from "./String";
import ResultBox from "./ResultBox";
import { tunings, alteredNotesArray } from "../utils/notesContoller";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  stringGroupRoot: {
    alignItems: "center",
  },
  topInfo: {
    margin: theme.spacing(1),
    width: "90vw",
    justifyContent: "space-around",
    alignItems: "center",
  },
  difficulty: {},
  score: {},
}));

function StringGroup({ difficulty, setStarted }) {
  const classes = useStyles();
  const selectedTuning = tunings.standard; //make this changable?

  const [startingNoteIndexes, setStartingNoteIndexes] = useState([]);
  const [selectedNoteIndexes, setSelectedNoteIndexes] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitCorrect, setIsSubmitCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const getNewData = () => {
    const notesArray = alteredNotesArray(difficulty, selectedTuning);

    setSelectedNoteIndexes(notesArray);
    setStartingNoteIndexes(notesArray);

    setIsSubmitting(false);
  };

  //init
  useEffect(() => {
    getNewData();
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (selectedNoteIndexes.every((v, i) => v === selectedTuning[i])) {
      setIsSubmitCorrect(true);
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      getNewData();
    }, 1500);
  };

  const goHome = () => {
    setStarted(false);
  };

  return (
    <Grid container direction="column" className={classes.stringGroupRoot}>
      <Grid container direction="row" className={classes.topInfo}>
        <Grid item>
          <Button variant="outlined" size="small" onClick={() => goHome()}>
            {"<--"}
          </Button>
        </Grid>
        <Grid item className={classes.score}>
          <Typography>Score: {score}</Typography>
        </Grid>
        <Grid item className={classes.difficulty}>
          <Typography>Difficulty: {difficulty}</Typography>
        </Grid>
      </Grid>

      {selectedNoteIndexes.map((noteIndex, index) => (
        <String
          key={index}
          stringIndex={index}
          realNoteIndex={selectedTuning[index]}
          selectedNoteIndex={noteIndex}
          isWrong={startingNoteIndexes[index] !== selectedTuning[index]}
          setSelectedNoteIndexes={(arr) => setSelectedNoteIndexes(arr)}
        />
      ))}
      <Button
        variant="outlined"
        disabled={isSubmitting}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
      <ResultBox open={isSubmitting} isCorrect={isSubmitCorrect} />
    </Grid>
  );
}

export default StringGroup;

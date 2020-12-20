import { Button, Grid, makeStyles } from "@material-ui/core";
import String from "./String";
import ResultBox from "./ResultBox";
import { tunings, alteredNotesArray } from "../utils/notesContoller";
import { useRecoilValue } from "recoil";
import { difficultyState, noteIndexesState } from "../atoms/atoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const useStyles = makeStyles({
  stringGroupRoot: {
    alignItems: "center",
  },
});

function StringGroup() {
  const classes = useStyles();
  const selectedTuning = tunings.standard; //make this changable?
  const difficulty = useRecoilValue(difficultyState);
  const [
    { selectedNoteIndexes, startingNoteIndexes },
    setNoteIndexes,
  ] = useRecoilState(noteIndexesState);
  //const [startingNoteIndexes, setStartingNoteIndexes] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitCorrect, setIsSubmitCorrect] = useState(false);

  /*   //use difficulty to select random 'wrong' notes
  const notesArray = useCallback(
    alteredNotesArray(difficulty, selectedTuning),
    []
  ); */

  const getNewData = () => {
    const notesArray = alteredNotesArray(difficulty, selectedTuning);
    setNoteIndexes({
      selectedNoteIndexes: notesArray,
      startingNoteIndexes: notesArray,
    });
    //setSelectedNoteIndexes(notesArray);
    //setStartingNoteIndexes(notesArray);
    setIsSubmitting(false);
  };

  //init
  useEffect(() => {
    getNewData();
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setIsSubmitCorrect(
      selectedNoteIndexes.every((v, i) => v === selectedTuning[i])
    );

    setTimeout(() => {
      setIsSubmitting(false);
      getNewData();
    }, 1000);
  };

  return (
    <Grid container direction="column" className={classes.stringGroupRoot}>
      Difficulty: {difficulty}
      {selectedNoteIndexes.map((noteIndex, index) => (
        <String
          key={index}
          stringIndex={index}
          realNoteIndex={selectedTuning[index]}
          selectedNoteIndex={noteIndex}
          isWrong={startingNoteIndexes[index] !== selectedTuning[index]}
        />
      ))}
      {isSubmitting ? (
        <ResultBox isCorrect={isSubmitCorrect} />
      ) : (
        <Button
          variant="outlined"
          disabled={isSubmitting}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      )}
    </Grid>
  );
}

export default StringGroup;

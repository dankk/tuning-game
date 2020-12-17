import { Button, Grid, makeStyles } from "@material-ui/core";
import String from "./String";
import ResultBox from "./ResultBox";
import { tunings, alteredNotesArray } from "../utils/notesContoller";
import { useRecoilValue } from "recoil";
import { difficultyState, selectedNoteIndexesState } from "../atoms/atoms";
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
  const [selectedNoteIndexes, setSelectedNoteIndexes] = useRecoilState(
    selectedNoteIndexesState
  );
  const [startingNoteIndexes, setStartingNoteIndexes] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitCorrect, setIsSubmitCorrect] = useState(false);

  /*   //use difficulty to select random 'wrong' notes
  const notesArray = useCallback(
    alteredNotesArray(difficulty, selectedTuning),
    []
  ); */

  useEffect(() => {
    if (!isSubmitting) return;
    const notesArray = alteredNotesArray(difficulty, selectedTuning);
    console.log("new notes array");
    console.log(notesArray);
    setSelectedNoteIndexes(notesArray);
    setStartingNoteIndexes(notesArray);
    setIsSubmitting(false);
  }, [isSubmitting]); //updates but displays only first notes??

  const handleSubmit = () => {
    setIsSubmitting(true);
    setIsSubmitCorrect(
      selectedNoteIndexes.every((v, i) => v === selectedTuning[i])
    );
    console.log(selectedNoteIndexes);
    console.log(selectedTuning);
    console.log(selectedNoteIndexes.every((v, i) => v === selectedTuning[i]));
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

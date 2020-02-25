import React, { useReducer, useEffect, useCallback } from "react";

import { Paper, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { indexToNoteFile, notes_list } from "../utils/noteManager";

const pitchShiftReducer = (state, action) => {
  //console.log(state);
  switch (action.type) {
    case "flat":
      if (state.noteIdx <= 0) {
        return state;
      }
      return {
        noteIdx: state.noteIdx - 1,
        text: notes_list[state.noteIdx - 1],
        sound: new Audio(indexToNoteFile(state.noteIdx - 1))
      };
    case "sharp":
      if (state.noteIdx >= notes_list.length - 1) {
        return state;
      }
      return {
        noteIdx: state.noteIdx + 1,
        text: notes_list[state.noteIdx + 1],
        sound: new Audio(indexToNoteFile(state.noteIdx + 1))
      };
    default:
      return state;
  }
};

const useStyles = makeStyles({
  stringRow: {
    alignItems: "center"
  },
  string: {
    textAlign: "center"
  },
  stringBad: {
    textAlign: "center",
    backgroundColor: "red"
  }
});

const String = ({ initNoteIdx, correctNoteIdx, isBad }) => {
  const classes = useStyles();
  const initState = {
    noteIdx: initNoteIdx,
    text: notes_list[initNoteIdx],
    sound: new Audio(indexToNoteFile(initNoteIdx))
  };

  const [currentNote, dispatch] = useReducer(pitchShiftReducer, initState);

  const handleNoteClick = useCallback(() => {
    currentNote.sound.currentTime = 0;
    currentNote.sound.play();
    console.log(`clicked ${currentNote.text}!`);
  }, [currentNote]);

  const handleNoteChange = shift => {
    dispatch({ type: shift });
  };

  useEffect(() => {
    const p = currentNote.sound.play();
    if (p !== undefined) {
      p.catch(error => {}).then(() => {});
    }
  }, [currentNote]);

  return (
    <Grid container direction="row" className={classes.stringRow}>
      <Grid item>
        <Button onClick={() => handleNoteChange("flat")}>♭</Button>
      </Grid>
      <Grid xs={6} item>
        <Paper
          onClick={handleNoteClick}
          className={isBad ? classes.stringBad : classes.string}
        >
          {currentNote.text}
        </Paper>
      </Grid>
      <Grid item>
        <Button onClick={() => handleNoteChange("sharp")}>#</Button>
      </Grid>
    </Grid>
  );
};

export default String;
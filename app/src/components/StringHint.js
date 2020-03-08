import React, { useState } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { indexToNoteFile } from "../utils/noteManager";

const useStyle = makeStyles({
  hintButton: { position: "absolute", right: 300, maxWidth: 100 }
});

const StringHint = ({ noteIdx, maxHints }) => {
  const classes = useStyle();
  let timesClicked = 0;

  const initState = {
    hideHint: false,
    soundPath: indexToNoteFile(noteIdx)
  };
  const [state, setState] = useState(initState);

  const soundFile = new Audio(state.soundPath);

  const handleClick = () => {
    soundFile.currentTime = 0;
    const p = soundFile.play();
    if (p !== undefined) {
      p.catch(error => {}).then(() => {});
    }
    timesClicked += 1;
    if (timesClicked >= maxHints) {
      setState(s => ({ ...s, hideHint: true }));
    }
    console.log(timesClicked < maxHints);
  };

  return (
    <Grid item className={classes.hintButton}>
      {!state.hideHint ? (
        <Button onClick={handleClick} size={"small"}>
          Hint
        </Button>
      ) : null}
    </Grid>
  );
};

export default StringHint;

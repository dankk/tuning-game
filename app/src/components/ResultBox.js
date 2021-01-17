import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  resultBox: {
    display: "flex",
    width: "50px",
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
  },
});

function ResultBox({ open, isCorrect }) {
  const classes = useStyles();
  return (
    <Dialog open={open}>
      <Paper className={classes.resultBox}>
        {isCorrect ? (
          <CheckIcon color="primary" />
        ) : (
          <CloseIcon color="error" />
        )}
      </Paper>
    </Dialog>
  );
}

export default ResultBox;

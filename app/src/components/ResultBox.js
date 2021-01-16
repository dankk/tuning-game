import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog } from "@material-ui/core";

function ResultBox({ open, isCorrect }) {
  return (
    <Dialog open={open}>
      {isCorrect ? <CheckIcon color="primary" /> : <CloseIcon color="error" />}
    </Dialog>
  );
}

export default ResultBox;

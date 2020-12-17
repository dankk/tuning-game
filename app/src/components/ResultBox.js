import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

function ResultBox({ isCorrect }) {
  return isCorrect ? <CheckIcon /> : <CloseIcon />;
}

export default ResultBox;

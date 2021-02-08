import { useState, useEffect } from "react";
import { notesArray } from "../utils/notesContoller";

export default function useAudio(noteIndex) {
  const filePath = notesArray[noteIndex].path;
  const [audioObj, setAudio] = useState({
    audio: new Audio(filePath),
    noteIndex,
    name: notesArray[noteIndex].name,
  });

  useEffect(
    () =>
      setAudio({
        audio: new Audio(filePath),
        noteIndex,
        name: notesArray[noteIndex].name,
      }),
    [noteIndex]
  );

  const handleChangeAudio = (noteIndex) => {
    if (noteIndex < 0 || noteIndex >= notesArray.length) return;

    audioObj.audio.pause();
    const audio = new Audio(notesArray[noteIndex].path);
    audio.play();
    setAudio({ audio: audio, noteIndex, name: notesArray[noteIndex].name });
  };
  return [audioObj, handleChangeAudio];
}

import { useState, useCallback, useEffect } from "react";
import { notesArray } from "../utils/notesContoller";

export default function useAudio(noteIndex) {
  const filePath = notesArray[noteIndex].path;
  const [audioObj, setAudio] = useState({
    //recoil?
    audio: new Audio(filePath),
    noteIndex,
    name: notesArray[noteIndex].name,
  });

  //fixed
  useEffect(
    () =>
      setAudio({
        audio: new Audio(filePath),
        noteIndex,
        name: notesArray[noteIndex].name,
      }),
    [noteIndex]
  );

  console.log(noteIndex);
  console.log(audioObj);

  const handleChangeAudio = useCallback((noteIndex) => {
    if (noteIndex < 0 || noteIndex >= notesArray.length) return;

    audioObj.audio.pause();
    const audio = new Audio(notesArray[noteIndex].path);
    audio.play();
    setAudio({ audio: audio, noteIndex, name: notesArray[noteIndex].name });
  }, []);

  return [audioObj, handleChangeAudio];
}

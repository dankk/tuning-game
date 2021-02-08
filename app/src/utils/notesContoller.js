export const tunings = {
  //string 1 - 6
  standard: [28, 23, 19, 14, 9, 4],
};

const tones_list = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const octs_list = [2, 3, 4, 5];

export const notesArray = octs_list.reduce((notes, oct) => {
  const oct_notes = tones_list.map((n) => ({
    path: `/sound-files/${n}${oct}.mp3`.replace("#", "s"),
    name: `${n}${oct}`,
  }));
  return [...notes, ...oct_notes];
}, []);

export const alteredNotesArray = (n, notesArray) => {
  //n: num of notes to change; 1-6
  let randInd = []; //list of strings to alter
  let alteredNotesArray = Array.from(notesArray);
  while (randInd.length < n) {
    const r = Math.floor(Math.random() * 6);
    if (!randInd.includes(r)) {
      randInd.push(r);
    }
  }

  randInd.forEach((v) => {
    const randOffset =
      Math.ceil(Math.random(1) * 3) * (Math.random(1) > 0.5 ? 1 : -1);
    alteredNotesArray[v] = notesArray[v] + randOffset;
  });
  return alteredNotesArray;
};

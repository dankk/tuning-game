import { Button, Grid, makeStyles, Slider } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { difficultyState, startState } from "../atoms/atoms";

const useStyles = makeStyles({
  startPageRoot: { alignItems: "center" },
});

function StartPage() {
  const classes = useStyles();
  const [difficulty, setDifficulty] = useRecoilState(difficultyState);
  const [, setStarted] = useRecoilState(startState);

  const handleDifficultySelect = (event, value) => {
    setDifficulty(value);
  };

  return (
    <Grid container direction="column" className={classes.startPageRoot}>
      <Grid item>
        <Slider
          style={{ width: 200 }}
          value={difficulty}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={6}
          onChange={handleDifficultySelect}
        />
      </Grid>
      <Grid>
        <Button onClick={() => setStarted(true)} variant="outlined">
          Start
        </Button>
      </Grid>
    </Grid>
  );
}

export default StartPage;

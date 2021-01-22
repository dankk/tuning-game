import { Button, Grid, makeStyles, Slider, Tooltip } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles({
  startPageRoot: { alignItems: "center" },
});

function StartPage({ setDifficulty, difficulty, setStarted }) {
  const classes = useStyles();

  const handleDifficultySelect = (event, value) => {
    setDifficulty(value);
  };

  return (
    <Grid container direction="column" className={classes.startPageRoot}>
      <Grid item>
        Difficulty
        <Tooltip title="# of strings to guess">
          <InfoIcon fontSize="small" />
        </Tooltip>
      </Grid>
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

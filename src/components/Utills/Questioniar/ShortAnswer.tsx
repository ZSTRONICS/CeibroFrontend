import {
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import TextField from '../Inputs/TextField';

interface ShowAnswerInt {
  question: QuestioniarInterface;
}

const ShowAnswer: React.FC<ShowAnswerInt> = (props) => {
  const classes = useStyles();
  const [answer, setAnswer] = useState<string>("");
  const {
    question: { question }
  } = props;

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer((event.target as HTMLInputElement).value);
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Typography className={classes.question}>{question}</Typography>
      </Grid>
      <Grid item xs={12} style={{ paddingTop: 20 }}>
         <TextField
            inputProps={{
              style: { height: 15 },
            }}
            className={classes.inputs}
            placeholder="Type your question"
            onChange={handleAnswerChange}
            value={answer}
          />
      </Grid>
    </Grid>
  );
};

export default ShowAnswer;

const useStyles = makeStyles({
  wrapper: {
    paddingTop: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 500,
  },
  inputs: {
    width: "100%",
  },
});

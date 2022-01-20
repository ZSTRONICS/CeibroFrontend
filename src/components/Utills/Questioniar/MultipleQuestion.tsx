import {
  Grid,
  Typography,
  makeStyles,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useState } from "react";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { RadioProps } from "@material-ui/core/Radio";
interface multipleQuestionInt {
  question: QuestioniarInterface;
}

const MultipleQuestion: React.FC<multipleQuestionInt> = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<any>(1);
  const {
    question: { type, question, options },
  } = props;

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value);
    setSelected(+(event.target as HTMLInputElement).value);
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Typography className={classes.question}>{question}</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            onChange={handleChangeAnswer}
            value={selected}
            name="gender1"
          >
            {options?.map((option: string, index: number) => {
              return (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<CustomRadio />}
                  label={option}
                  className={`options-text ${classes.smallRadioButton}`}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default MultipleQuestion;

const CustomRadio = withStyles({
  root: {
    "&$checked": {
      color: colors.darkYellow,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const useStyles = makeStyles({
  wrapper: {
    paddingTop: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 500,
  },
  smallRadioButton: {
    fontSize: "14px !important",
    "& svg": {
      width: "0.8em",
      height: "0.8em",
    },
    "&$checked": {
      color: "green",
    },
  },
});

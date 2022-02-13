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
import { useEffect, useState } from "react";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { RadioProps } from "@material-ui/core/Radio";
import { setQuestions } from "../../../redux/action/chat.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
interface multipleQuestionInt {
  question: QuestioniarInterface;
  handleChange?: (value: any) => void;
}

const MultipleQuestion: React.FC<multipleQuestionInt> = (props) => {
  const classes = useStyles();
  const { questioniars, answeredByMe } = useSelector(
    (state: RootState) => state.chat
  );
  const [selected, setSelected] = useState<any>(-1);
  const dispatch = useDispatch();
  const {
    question: { type, id, question, options, answer },
  } = props;

  useEffect(() => {
    if (answer && typeof answer === "string") {
      setSelected(+answer);
    }
  }, []);

  useEffect(() => {
    //   updating question in global state
    const myQuestioniars = JSON.parse(JSON.stringify(questioniars));
    const myQuestionIndex: number = myQuestioniars?.findIndex(
      (question: QuestioniarInterface) => question?.id === id
    );
    if (myQuestionIndex > -1) {
      const myQuestion: QuestioniarInterface = myQuestioniars[myQuestionIndex];
      if (myQuestion) {
        myQuestion.answer = selected;
        dispatch(setQuestions(myQuestioniars));
      }
    }
  }, [selected]);

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                  disabled={answeredByMe}
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
    fontWeight: 500,
    "& svg": {
      width: "0.8em",
      height: "0.8em",
    },
    "&$checked": {
      color: "green",
    },
  },
});

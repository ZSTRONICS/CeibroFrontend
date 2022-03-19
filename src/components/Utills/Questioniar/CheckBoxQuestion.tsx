import {
  Checkbox,
  CheckboxProps, FormControl,
  FormControlLabel, FormGroup, Grid, makeStyles, Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { setQuestions } from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";
interface multipleQuestionInt {
  question: QuestioniarInterface;
}

const CheckBoxQuestion: React.FC<multipleQuestionInt> = (props) => {
  const classes = useStyles();
  const { questioniars, answeredByMe } = useSelector((state: RootState) => state.chat)
  const [selected, setSelected] = useState<any>([]);
  const {
    question: { type, question, options, answer, id },
  } = props;
  const dispatch = useDispatch();


  useEffect(() => {
    if(answer && Array.isArray(answer)) {
      setSelected(answer)
    }
  }, [])

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
  }, [selected])

  const handleChangeAnswer = (event: any) => {
    console.log((event.target as HTMLInputElement).value);
    setSelected(event.target.checked ? [...selected, event.target.value] : selected.filter((data: any) => data !== event.target.value));
    // setSelected(+(event.target as HTMLInputElement).value);
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Typography className={classes.question}>{question}</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormGroup onChange={handleChangeAnswer} >
            {options?.map((option: string, index: number) => {
              console.log('hella fkjal fjald f', index, selected,  selected.includes(index))
              return (
                <FormControlLabel
                  key={index}
                  className={`options-text ${classes.smallRadioButton}`}
                  control={<CustomCheckbox name={option} />}
                  label={option}
                  value={index}
                  disabled={answeredByMe}
                  checked={selected?.findIndex((selected: any) => selected == index ) > -1}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CheckBoxQuestion;

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


const CustomCheckbox = withStyles({
  root: {
    '&$checked': {
      color: colors.darkYellow,
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
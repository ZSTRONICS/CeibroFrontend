import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { getNewQuestionTemplate } from "../../../constants/questioniar.constants";
import { setQuestions } from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import CreateQuestion from "../../Utills/Questioniar/Question.create";
import PreviewQuestion from "../../Utills/Questioniar/PreviewQuestion";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useState } from "react";

const QuestioniarBody = () => {
  const classes = useStyles();
  const { questioniars } = useSelector((store: RootState) => store.chat);
  const [preview, setPreview] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChangePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(event.target.checked);
  };

  const addNewQuestion = () => {
    const myQuestions: QuestioniarInterface[] = JSON.parse(
      JSON.stringify(questioniars)
    );
    const newQuestion: QuestioniarInterface = getNewQuestionTemplate(
      myQuestions.length + 1
    );
    myQuestions.push(newQuestion);
    dispatch(setQuestions(myQuestions));
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12} className={classes.preview}>
        <FormControlLabel
          control={
            <Switch
              checked={preview}
              onChange={handleChangePreview}
              name="checkedB"
              color="primary"
            />
          }
          label="Preview"
        />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.datePickerWrapper}>
          <DatePicker />
        </div>
      {!preview  && <div className={classes.assignedToWrapper}>
          <SelectDropdown
            title="Assigned to"
            // data={dbUsers}
          />
        </div>}
      </Grid>

      <Grid item xs={12} className={classes.questionsWrapper}>
        {questioniars &&
          questioniars.map((question: QuestioniarInterface, index: number) => {
            if (preview) {
              return <PreviewQuestion key={index} question={question} />;
            }
            return <CreateQuestion key={index} id={question.id} />;
          })}
      </Grid>

    {!preview && 
      <Grid item xs={12} style={{ paddingTop: 20 }}>
        <Button onClick={addNewQuestion} variant="outlined" color="primary">
          + Add question
        </Button>
      </Grid>
      }

    </Grid>
  );
};

export default QuestioniarBody;

const useStyles = makeStyles({
  wrapper: {
    padding: 30,
    height: 'auto',
    background: colors.white,
  },
  datePickerWrapper: {
    maxWidth: 300,
    marginTop: 10,
  },
  assignedToWrapper: {
    maxWidth: 400,
    marginTop: 10,
  },
  questionsWrapper: {
    paddingTop: 30,
    maxWidth: 400,
  },
  preview: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
  },
});

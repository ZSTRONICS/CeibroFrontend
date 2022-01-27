import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { getNewQuestionTemplate } from "../../../constants/questioniar.constants";
import { saveQuestioniar, saveQuestioniarAnswers, setQuestions } from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import CreateQuestion from "../../Utills/Questioniar/Question.create";
import PreviewQuestion from "../../Utills/Questioniar/PreviewQuestion";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useState } from "react";
import { dbUsers } from "../../Topbar/CreateChat";

const QuestioniarBody = () => {
  const classes = useStyles();
  const { questioniars, selectedChat, questioniarsLoading, selectedQuestioniar, answeredByMe } = useSelector((store: RootState) => store.chat);
  const [preview, setPreview] = useState<boolean>(false);
  const [members, setMembers] = useState<any>([]);
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState<any>(null);
  console.log('dueDate: ', dueDate);

  const handleSave = () => {
    const myQuestions = questioniars?.map((question: QuestioniarInterface) => {
      return {
        id: question.id,
        answer: question.answer,
      }
    })
    const payload = {
      body: {
        questions: myQuestions
      },
      other: selectedQuestioniar
    }
    dispatch(saveQuestioniarAnswers(payload));
  }

  return (
    <Grid container className={classes.wrapper}>

      <Grid item xs={12} className={classes.questionsWrapper}>
        {questioniars && !questioniarsLoading &&
          questioniars.map((question: QuestioniarInterface, index: number) => {
              return <PreviewQuestion key={question.id} question={question} />;
          })}
          {
            questioniarsLoading && (
              <Typography>
                Loading please wait ....
              </Typography>
            )
          }
      </Grid>

      {!answeredByMe && !questioniarsLoading && <Grid item xs={12} className={classes.questionsWrapper}>
        <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
      </Grid>}

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
  wrapper2: {
    zIndex: 5
  }
});

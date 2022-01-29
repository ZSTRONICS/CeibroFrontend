import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { getNewQuestionTemplate } from "../../../constants/questioniar.constants";
import { closeQuestioniarDrawer, closeViewQuestioniarDrawer, getUserQuestioniarAnswer, saveQuestioniar, saveQuestioniarAnswers, setQuestions } from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import CreateQuestion from "../../Utills/Questioniar/Question.create";
import PreviewQuestion from "../../Utills/Questioniar/PreviewQuestion";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useState } from "react";
import { dbUsers } from "../../Topbar/CreateChat";
import { formatDate } from '../../../helpers/chat.helpers'
import { toast } from "react-toastify";

const QuestioniarBody = () => {
  const classes = useStyles();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const { questioniars, selectedChat, questioniarsLoading, selectedQuestioniar, answeredByMe, questioniarInfo  } = useSelector((store: RootState) => store.chat);
  const { user } = useSelector((store: RootState) => store.auth);
  console.log('hello from', String(questioniarInfo?.sender), ' vs ', String(user?._id))
  const myQuestion = String(questioniarInfo?.sender) === String(user?.id)

  const everyFilled = questioniars?.every((question: any) => {
    if(question?.type === 'shortAnswer') {
      return question?.answer?.length > 0;
    }
    if(question?.type === 'multiple') {
      return question?.answer?.toString()?.length > 0;
    }

    if(question?.type === 'checkbox') {
      return Array.isArray(question?.answer) && question?.answer.length > 0
    }

    return false;
  })
  
  const dispatch = useDispatch();
  const myDate = formatDate(questioniarInfo?.dueDate);

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
      success: () => {
        toast.success("Answers saved")
      },
      other: selectedQuestioniar
    }
    dispatch(saveQuestioniarAnswers(payload));
  }

  const handleClose = () => {
    dispatch(closeViewQuestioniarDrawer());
  }

  const handleUserChange = (e: any) => {
    setLoading(true);
    setMember(e);
    dispatch(getUserQuestioniarAnswer({
      other: {
        userId: e?.value,
        questioniarId: questioniarInfo?.id
      },
      success: () => {
        setLoading(false);
      }
    }))
  }

  return (
    <Grid container direction="column" className={classes.wrapper}>
      <Grid item xs={12} className={classes.questionsWrapper}>
        {!questioniarsLoading && (
          <Grid item xs={12} className={classes.wrapper2}>
            <div className={classes.datePickerWrapper}>
              <DatePicker disabled={true} value={myDate} />
            </div>
            <div className={classes.datePickerWrapper}>
              <SelectDropdown
                title="View answer"
                data={dbUsers}
                handleChange={handleUserChange}
                isMulti={false}
                // value={members}
              />
              {!questioniarInfo?.isAnswered && member && !loading && (<div>
                <Typography className={classes.error}>
                   Not Answered yet
                </Typography>
              </div>)
}
            </div>
          </Grid>
        )}
        {questioniars && !questioniarsLoading &&
          questioniars.map((question: QuestioniarInterface, index: number) => {
              return <PreviewQuestion key={question.id} question={question} />;
          })
        }
        {
          questioniarsLoading && (
            <Typography>
              Loading please wait ....
            </Typography>
          )
        }
      </Grid>

      {!myQuestion && !answeredByMe && !questioniarsLoading && <Grid item xs={12} className={classes.questionsWrapper}>
        <Button disabled={!everyFilled} onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleClose} variant="outlined">
            cancel
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
  },
  error: {
    color: colors.btnRed,
    paddingTop: 20
  }
});

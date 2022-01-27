import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { getNewQuestionTemplate } from "../../../constants/questioniar.constants";
import { saveQuestioniar, setQuestions } from "../../../redux/action/chat.action";
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
  const { questioniars, selectedChat } = useSelector((store: RootState) => store.chat);
  const [preview, setPreview] = useState<boolean>(false);
  const [members, setMembers] = useState<any>([]);
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState<any>(null);
  console.log('dueDate: ', dueDate);

  const handleChangePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(event.target.checked);
  };

  const handleDateChange = (e: any) => {
    setDueDate(e?.target?.value);
  }

  const handleUserChange = (e: any) => {
    setMembers(e)
  }

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

  const handleSave = () => {
    const payload = {
      body: {
        members: members.map((obj: any) => obj.value),
        dueDate: dueDate,
        questions: questioniars,
        chat: selectedChat
      }
    }
    dispatch(saveQuestioniar(payload));
  }

  return (
    <Grid container direction="column" className={classes.wrapper}>
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
      <Grid item xs={12} className={classes.wrapper2}>
        <div className={classes.datePickerWrapper}>
          <DatePicker onChange={handleDateChange} value={dueDate} />
        </div>
      {!preview  && <div className={classes.assignedToWrapper}>
          <SelectDropdown
            title="Assigned to"
            data={dbUsers}
            handleChange={handleUserChange}
            isMulti={true}
            value={members}
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


      <Grid item xs={12} className={classes.questionsWrapper}>
        <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
      </Grid>

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

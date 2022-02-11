import { Button, Divider, Grid, makeStyles, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { getNewQuestionTemplate } from "../../../constants/questioniar.constants";
import { closeQuestioniarDrawer, getRoomQuestioniars, saveQuestioniar, setQuestions, updateMessageById } from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import CreateQuestion from "../../Utills/Questioniar/Question.create";
import PreviewQuestion from "../../Utills/Questioniar/PreviewQuestion";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from "react";
import { dbUsers } from "../../Topbar/CreateChat";
import { PUSH_MESSAGE } from "../../../config/dist/chat.config";
import { toast } from "react-toastify";
import { removeCurrentUser } from "../../../helpers/chat.helpers";

const QuestioniarBody = () => {
  const classes = useStyles();
  const { questioniars, selectedChat, chat } = useSelector((store: RootState) => store.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const [preview, setPreview] = useState<boolean>(false);
  const [members, setMembers] = useState<any>([]);
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState<any>(null);
    // const remove = removeCurrentUser(dbUsers, user?.id))
    const [values,setValue] = useState();
  
  useEffect(() =>{
    setValue(removeCurrentUser(dbUsers, user?.id))
    // const chatIndex = chat?.findIndex?.((room: any) => String(room._id) === String(selectedChat))
    
  }, []); 

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
    const myId = new Date().valueOf();
                
    dispatch({
      type: PUSH_MESSAGE,
      payload: {
          type: "questioniar",
          username: user?.name,
          time: "1 seconds ago",
          seen: true,
          myMessage: true,
          replyOf: null,
          id: myId
      }
    });
    const payload = {
      body: {
        members: members.map((obj: any) => obj.value),
        dueDate: dueDate,
        questions: questioniars,
        chat: selectedChat
      },
      success: (res: any) => {
        toast.success("Questioniar sent")
        dispatch(updateMessageById({
          other: {
              oldMessageId: myId,
              newMessage: res.data
          }
      }))
      dispatch(getRoomQuestioniars({ other: selectedChat }))

      }
    }
    dispatch(saveQuestioniar(payload));
  }
  const handleClose = () => {
    dispatch(closeQuestioniarDrawer());
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
            data={values}
            handleChange={handleUserChange}
            isMulti={true}
            value={members}
          />
        </div>}
      </Grid>
      <Divider  />
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
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          disabled={!dueDate || !members || members?.length <= 0}
        >
            Save
          </Button>

          <Button onClick={handleClose} variant="outlined" style={{ background: colors.grey }}>
            cancel
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
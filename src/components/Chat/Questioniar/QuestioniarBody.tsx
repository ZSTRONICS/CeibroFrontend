import {
  Button,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { getNewQuestionTemplate } from "../../../constants/questioniar.constants";
import {
  closeQuestioniarDrawer,
  getRoomQuestioniars,
  saveQuestioniar,
  setQuestions,
  updateMessageById,
} from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import CreateQuestion from "../../Utills/Questioniar/Question.create";
import PreviewQuestion from "../../Utills/Questioniar/PreviewQuestion";
import { useEffect, useState } from "react";
import { dbUsers } from "../../Topbar/CreateChat";
import { PUSH_MESSAGE } from "../../../config/chat.config";
import { toast } from "react-toastify";
import {
  getDate,
  removeCurrentUser,
  validateQuestions,
} from "../../../helpers/chat.helpers";
import IosSwitchMaterialUi from "ios-switch-material-ui";
import Loading from "../../Utills/Loader/Loading";

const QuestioniarBody = () => {
  const classes = useStyles();
  const { questioniars, createQuestioniarLoading, selectedChat, chat } =
    useSelector((store: RootState) => store.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const [preview, setPreview] = useState<boolean>(false);
  const [nudge, setNudge] = useState<boolean>(false);
  const [members, setMembers] = useState<any>([]);
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState<any>(null);
  const isValidated = validateQuestions(questioniars);
  const [values, setValue] = useState();

  useEffect(() => {
    setValue(removeCurrentUser(dbUsers, user?.id));
    // const chatIndex = chat?.findIndex?.((room: any) => String(room._id) === String(selectedChat))
  }, []);

  const handleChangePreview = (notShowPreview: boolean) => {
    setPreview(!notShowPreview);
  };

  const handleDateChange = (e: any) => {
    setDueDate(e?.target?.value);
  };

  const handleUserChange = (e: any) => {
    setMembers(e);
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
        id: myId,
      },
    });
    const payload = {
      body: {
        members: members.map((obj: any) => obj.value),
        dueDate: dueDate,
        questions: questioniars,
        chat: selectedChat,
      },
      success: (res: any) => {
        toast.success("Questioniar sent");
        dispatch(
          updateMessageById({
            other: {
              oldMessageId: myId,
              newMessage: res.data,
            },
          })
        );
        dispatch(getRoomQuestioniars({ other: selectedChat }));
      },
    };
    !createQuestioniarLoading && dispatch(saveQuestioniar(payload));
  };
  const handleClose = () => {
    dispatch(closeQuestioniarDrawer());
  };

  const handleNudgeChange = (notActive: boolean) => {
    setNudge(!notActive);
  };

  return (
    <>
      <Grid container direction="column" className={classes.wrapper}>
        <Grid item xs={12} className={classes.wrapper2}>
          <div className={classes.datePickerWrapper}>
            <DatePicker
              min={getDate()}
              max={getDate(15)}
              onChange={handleDateChange}
              value={dueDate}
            />
          </div>
          {!preview && (
            <div className={classes.assignedToWrapper}>
              <SelectDropdown
                title="Assigned to"
                data={values}
                handleChange={handleUserChange}
                isMulti={true}
                value={members}
              />
            </div>
          )}
        </Grid>
        <Grid container item style={{ paddingTop: preview ? 20 : 0 }} xs={12}>
          <Grid item xs={12} md={4} className={classes.nudge}>
            <IosSwitchMaterialUi
              colorKnobOnLeft="#FFFFFF"
              colorKnobOnRight="#FFFFFF"
              colorSwitch={nudge ? colors.primary : colors.inputGrey}
              onChange={handleNudgeChange}
              defaultKnobOnLeft={true}
            />
            <Typography className={classes.nudgeText}>Nudge</Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.nudge}>
            <IosSwitchMaterialUi
              colorKnobOnLeft="#FFFFFF"
              colorKnobOnRight="#FFFFFF"
              colorSwitch={preview ? colors.primary : colors.inputGrey}
              onChange={handleChangePreview}
              defaultKnobOnLeft={true}
            />
            <Typography className={classes.nudgeText}>Preview</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.wrapper3}>
        {/* <Divider  /> */}
        <Grid
          item
          xs={12}
          style={{ paddingTop: 10 }}
          className={classes.questionsWrapper}
        >
          {questioniars &&
            questioniars.map(
              (question: QuestioniarInterface, index: number) => {
                if (preview) {
                  return <PreviewQuestion key={index} question={question} />;
                }
                return <CreateQuestion key={index} id={question.id} />;
              }
            )}
        </Grid>

        {!preview && (
          <Grid item xs={12}>
            <Button
              className={classes.addQuestion}
              onClick={addNewQuestion}
              variant="outlined"
              color="primary"
            >
              + Add question
            </Button>
          </Grid>
        )}

        <Grid item xs={12} className={classes.questionsWrapper}>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={
              !dueDate || !members || members?.length <= 0 || !isValidated
            }
          >
            {createQuestioniarLoading ? (
              <Loading type="spin" color="white" height={24} width={24} />
            ) : (
              "Create"
            )}
          </Button>

          <Button onClick={handleClose} variant="text">
            cancel
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default QuestioniarBody;

const useStyles = makeStyles({
  wrapper: {
    padding: 30,
    paddingTop: 0,
    paddingBottom: 20,
    borderBottom: `1px solid ${colors.grey}`,
    height: "auto",
    background: colors.white,
    width: "100%",
    minWidth: 500,
    maxWidth: 500,
    ["@media (max-width:960px)"]: {
      minWidth: 300,
    },
  },
  wrapper3: {
    padding: 30,
    paddingTop: 10,
    height: "auto",
    background: colors.white,
    width: "100%",
    minWidth: 500,
    maxWidth: 500,
    ["@media (max-width:960px)"]: {
      minWidth: 300,
    },
  },
  datePickerWrapper: {
    maxWidth: 250,
    marginTop: 10,
  },
  assignedToWrapper: {
    maxWidth: 450,
    marginTop: 10,
  },
  questionsWrapper: {
    paddingTop: 30,
    maxWidth: 450,
  },
  preview: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
  },
  nudge: {
    display: "flex",
    // justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
  },
  nudgeText: {
    fontWeight: 500,
    fontSize: 14,
    color: colors.black,
    paddingLeft: 10,
  },
  wrapper2: {
    zIndex: 5,
  },
  addQuestion: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

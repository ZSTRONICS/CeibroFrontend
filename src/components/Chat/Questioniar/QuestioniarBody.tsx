import { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Stack } from "@mui/system";
import { CBox } from "components/material-ui";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import colors from "../../../assets/colors";
import {
  PUSH_MESSAGE,
  UPDATE_MESSAGE_BY_ID,
} from "../../../config/chat.config";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { getNewQuestionTemplate } from "../../../constants/questioniar.constants";
import {
  getDate,
  removeCurrentUser,
  validateQuestions,
} from "../../../helpers/chat.helpers";
import {
  closeQuestioniarDrawer,
  getRoomQuestioniars,
  saveQuestioniar,
  setQuestions,
} from "../../../redux/action/chat.action";
import { RootState } from "../../../redux/reducers/appReducer";
import { dbUsers } from "../../Topbar/CreateIndividualChat";
import DatePicker from "../../Utills/Inputs/DatePicker";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import TextField from "../../Utills/Inputs/TextField";
import Loading from "../../Utills/Loader/Loading";
import PreviewQuestion from "../../Utills/Questioniar/PreviewQuestion";
import CreateQuestion from "../../Utills/Questioniar/Question.create";
import CustomizedSwitch from "./IOSSwitch";

const QuestioniarBody = () => {
  const classes = useStyles();
  const { questioniars, createQuestioniarLoading, selectedChatId, chat } =
    useSelector((store: RootState) => store.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  /////
  // const { selectedChatId, chat } = useSelector((state: RootState) => state.chat);
  const membersList = selectedChatId
    ? chat.find((room: any) => String(room._id) === String(selectedChatId))
        ?.members
    : [];
  ////

  // const listOfMember = membersList?.map((member: any) => ({
  //   label: ` ${member?.firstName} ${member?.surName}`,
  //   value: member?._id,
  // }));

  const [preview, setPreview] = useState<boolean>(false);
  const [nudge, setNudge] = useState<boolean>(false);
  const [members, setMembers] = useState<any>([]);
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState<any>(null);
  const isValidated = validateQuestions(questioniars);
  const [values, setValue] = useState();
  const [title, setTitle] = useState("");
  // const [listOfMembers, setListOfMembers] = useState<any>();

  useEffect(() => {
    setValue(removeCurrentUser(dbUsers, user?._id));
    // const chatIndex = chat?.findIndex?.((room: any) => String(room._id) === String(selectedChatId))
  }, []);

  const handleChangePreview = (e: any) => {
    setPreview(e.target.checked);
  };

  const listOfMember = membersList?.map((member: any) => ({
    label: ` ${member?.firstName} ${member?.surName}`,
    value: member?._id,
  }));

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
        username: user?.firstName + " " + user?.surName,
        sender: user,
        title,
        time: "a few seconds ago",
        seen: true,
        myMessage: user._id,
        replyOf: null,
        id: myId,
      },
    });
    const payload = {
      body: {
        members: members.map((obj: any) => obj.value),
        dueDate: dueDate,
        questions: questioniars,
        chat: selectedChatId,
        title,
      },
      success: (res: any) => {
        toast.success("Questioniar sent");
        dispatch({
          type: UPDATE_MESSAGE_BY_ID,
          payload: {
            other: {
              oldMessageId: myId,
              newMessage: res.data,
            },
          },
        });
        dispatch(getRoomQuestioniars({ other: selectedChatId }));
      },
    };
    !createQuestioniarLoading && dispatch(saveQuestioniar(payload));
  };
  const handleClose = () => {
    dispatch(closeQuestioniarDrawer());
  };

  const handleTitleChange = (e: any) => {
    setTitle(e?.target?.value);
  };

  const handleNudgeChange = (e: any) => {
    setNudge(e.target.checked);
  };

  const validated = validateQuestions(questioniars);

  return (
    <>
      <Grid container direction="column" className={classes.wrapper}>
        <Grid item xs={12} className={classes.titleWrapper}>
          <div className={classes.titleInput}>
            <TextField
              onChange={handleTitleChange}
              placeholder="Type questionarie title"
            />
          </div>
          <div className={classes.templateWrapper}>
            <Typography className={classes.selectFromTemplate}>
              Select from template
            </Typography>
          </div>
        </Grid>
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
                data={listOfMember}
                handleChange={handleUserChange}
                isMulti={true}
                value={members}
              />
            </div>
          )}
        </Grid>
        <CBox
          sx={{
            paddingTop: "10px",
          }}
        >
          <Stack direction="row">
            <CustomizedSwitch
              onChange={(e: any) => handleNudgeChange(e)}
              label="Nudge"
            />
            <CustomizedSwitch
              onChange={(e: any) => handleChangePreview(e)}
              label="Preview"
              disabled={!validated}
            />
          </Stack>
        </CBox>
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
                return <CreateQuestion key={index} id={question._id} />;
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

        <Grid item xs={12} className={classes.actionWrapper}>
          <Button onClick={handleClose} variant="text">
            cancel
          </Button>

          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={
              !dueDate ||
              !members ||
              members?.length <= 0 ||
              !isValidated ||
              !title
            }
          >
            {createQuestioniarLoading ? (
              <Loading type="spin" color="white" height={24} width={24} />
            ) : (
              "Create"
            )}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default QuestioniarBody;

const useStyles = makeStyles({
  titleWrapper: {
    display: "flex",
  },
  titleInput: {
    flex: 5,
  },
  templateWrapper: {
    flex: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectFromTemplate: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.textPrimary,
    paddingLeft: "28px",
  },
  wrapper: {
    padding: "20px",
    paddingTop: 0,
    paddingBottom: 20,
    borderBottom: `1px solid ${colors.grey}`,
    height: "auto",
    background: colors.white,
    width: "100%",
    minWidth: 500,
    maxWidth: 500,
    "@media (max-width:960px)": {
      minWidth: 300,
    },
  },
  wrapper3: {
    padding: "0px 20px",
    // paddingTop: 10,
    height: "auto",
    background: colors.white,
    width: "100%",
    minWidth: 500,
    maxWidth: 500,
    "@media (max-width:960px)": {
      minWidth: 300,
    },
  },
  actionWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "20px",
    paddingTop: "15px",
    paddingBottom: "20px",
    marginTop: "40px",
  },
  datePickerWrapper: {
    maxWidth: 230,
    marginTop: 10,
    // padding: "4px 5px",
  },
  assignedToWrapper: {
    maxWidth: 460,
    marginTop: 15,
  },
  questionsWrapper: {
    // display:"flex",
    // justifyContent:"flex-end",
    paddingTop: 30,
    maxWidth: 460,
  },
  preview: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
  },

  wrapper2: {
    zIndex: 5,
  },
  addQuestion: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

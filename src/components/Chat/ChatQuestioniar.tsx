
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { ChatMessageInterface } from "constants/interfaces/chat.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
// import FilePreviewer from "../Utills/ChatChip/FilePreviewer";
import assets from "assets/assets";
import colors from "assets/colors";
import { useState } from "react";
import QuestioniarSearch from "./QuestioniarSearch";
import {
  openViewQuestioniarDrawer,
  setSelectedQuestioniar,
} from "redux/action/chat.action";
import moment from "moment-timezone";

interface chatMInt {}

const ChatMembers: React.FC<chatMInt> = (props) => {
  const { roomQuestioniars } = useSelector((state: RootState) => state.chat);
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e: any) => {
    setSearchText(e?.target?.value);
  };

  let myQuestioniars = roomQuestioniars;
  if (searchText && myQuestioniars) {
    myQuestioniars = roomQuestioniars?.filter(
      (message: ChatMessageInterface) => {
        return message?.title
          ?.toLowerCase()
          ?.includes(searchText?.toLowerCase());
      }
    );
  }

  const handleClick = (questioniarId: string) => {
    dispatch(setSelectedQuestioniar(questioniarId));
    dispatch(openViewQuestioniarDrawer());
  };


  return (
    <Grid container className={`chat-member-chip ${classes.wrapper}`}>
      <QuestioniarSearch value={searchText} handleChange={handleSearchChange} />
      {myQuestioniars?.map?.((question: ChatMessageInterface) => {
     const DateString: string = moment(question?.dueDate).format("YYYY-MM-DD");
        return (
          <Grid item xs={12} className={classes.questioniarDetail}>
            <img src={assets.documentIcon} alt=""/>
            <div
              className={classes.innerWrapper}
              onClick={() => handleClick(question._id)}
            >
              <Typography className={classes.title}>
                {question.title}
              </Typography>
              <Typography className={classes.dueDate}>
                {DateString}
              </Typography>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ChatMembers;

const useStyles = makeStyles({
  questioniarDetail: {
    padding: 15,
    display: "flex",
    alignItems: "center",
  },
  innerWrapper: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.textPrimary,
  },
  dueDate: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.textGrey,
  },
  wrapper: {
    height: "auto",
    maxHeight: 240,
    overflow: "auto",
  },
});

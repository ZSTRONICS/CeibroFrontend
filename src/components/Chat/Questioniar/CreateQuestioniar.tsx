import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import { closeQuestioniarDrawer } from "../../../redux/action/chat.action";
// import colors from '../../../../assets/colors'
// import projectActions from '../../../../redux/action/project.action'
import { RootState } from "../../../redux/reducers";
import QuestioniarBody from "./QuestioniarBody";
import QuestioniarHeader from "./QuestioniarHeader";
// import CreateProjectBody from './CreateProjectBody'
// import CreateProjectFooter from './CreateProjectFooter'

const CreateQuestioniarDrawer = () => {
  const drawerOpen = useSelector(
    (store: RootState) => store.chat.questioniarDrawer
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    dispatch(closeQuestioniarDrawer());
  };

  return (
    <Dialog
      className={"custom-scrollbar"}
      onClose={handleClose}
      open={drawerOpen}
    >
      <div className={classes.outerWrapper}>
        <QuestioniarHeader />
        <QuestioniarBody />
      </div>
    </Dialog>
  );
};

export default CreateQuestioniarDrawer;

const useStyles = makeStyles({
  outerWrapper: {
    maxWidth: 500,
    backgroundColor: colors.white,
    // height:
    "@media (max-width:960px)": {
      // width: '100vw'
    },
  },
});

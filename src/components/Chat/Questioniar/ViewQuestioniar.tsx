import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors";
import {
  closeViewQuestioniarDrawer,
  getQuestioniarById
} from "../../../redux/action/chat.action";
// import colors from '../../../../assets/colors'
// import projectActions from '../../../../redux/action/project.action'
import { useEffect } from "react";
import { RootState } from "../../../redux/reducers/appReducer";
import QuestioniarHeader from "./QuestioniarHeader";
import ViewQuestioniarBody from "./ViewQuestioniarBody";
// import CreateProjectBody from './CreateProjectBody'
// import CreateProjectFooter from './CreateProjectFooter'

const ViewQuestioniarDrawer = () => {
  const drawerOpen = useSelector(
    (store: RootState) => store.chat.openViewQuestioniar
  );
  const selectedQuestioniar = useSelector(
    (store: RootState) => store?.chat?.selectedQuestioniar
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClose = () => {
    dispatch(closeViewQuestioniarDrawer());
  };
  
  useEffect(() => {
    dispatch(getQuestioniarById({ other: selectedQuestioniar }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuestioniar]);

  return (
    <Dialog
      onClose={handleClose}
      open={drawerOpen}
      className={"custom-scrollbar"}
    >
      <div className={classes.outerWrapper}>
        <QuestioniarHeader viewMode={true} />
        <ViewQuestioniarBody />
      </div>
    </Dialog>
  );
};

export default ViewQuestioniarDrawer;

const useStyles = makeStyles({
  outerWrapper: {
    maxWidth: 500,
    backgroundColor: colors.white,
    height: "100%",
    minHeight: 300,
    "@media (max-width:960px)": {
      // width: '100vw'
    },
  },
});

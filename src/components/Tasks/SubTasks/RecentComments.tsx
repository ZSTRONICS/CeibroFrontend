import {
  Box, Typography
} from "@mui/material";
import {
  RecentCommentsInterface
} from "constants/interfaces/subtask.interface";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
import RecentCommentsList from "./RecentCommentsList";

export default function RecentComments() {

  const { user } = useSelector((state: RootState) => state.auth);
  const { getAllCommentsOfSubtaskLoading, getAllRecentCommentsOfSubtask } =
    useSelector((state: RootState) => state.task);

  const recentCommentsBox = document.getElementById("RecentComments");
  if (recentCommentsBox) {
    recentCommentsBox.scrollTop = recentCommentsBox.scrollHeight;
  }

  return (
    <>
      <Box>
        <Typography className="recentComment">Recent Comments</Typography>
      </Box>
      <Box
        className="custom-scrollbar"
        id={"RecentComments"}
        sx={{
          maxHeight: '350px',
          overflow: 'auto',
          height: '100%'
        }}
      >
        {/* {!isEmpty && recentComments.map((comment: any) => (<RecentCommentsList comment={comment} />))} */}
        {getAllRecentCommentsOfSubtask.length > 0 ? (
          getAllRecentCommentsOfSubtask
            .slice(0, 4)
            .reverse()
            .map((userComment: RecentCommentsInterface) => {
              if (!userComment.access.includes(user._id)) {
                return;
              }
              return (
                <Box key={userComment._id}>
                  <RecentCommentsList comment={userComment} />
                </Box>
              );
            })
        ) : (
          <Box sx={{ textAlign: "center", paddingTop: "3rem", height: "100%" }}>
            No subtask comments found!
          </Box>
        )}
      </Box>
    </>
  );
}


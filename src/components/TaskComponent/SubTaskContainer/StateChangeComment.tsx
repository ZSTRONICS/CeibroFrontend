// mui
import { makeStyles } from "@material-ui/core";
import { DialogActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
// formik
import { Form, Formik } from "formik";
// reudx
import { useDispatch } from "react-redux";
import taskActions, { taskSubtaskStateChange } from "redux/action/task.action";
// components
import CButton from "components/Button/Button";
import { CBox } from "components/material-ui";
import "../../../components/material-ui/theming/CustomMuiStyles.css"

function StateChangeComment(props: any) {

  const { handleClose, payloadData } = props;
  const classes = useStyles()

  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    const { taskId, state, subTaskId, comment } = values;
    const payload = { taskId, state, subTaskId, comment };
    dispatch(
      taskSubtaskStateChange({
        body: payload,
        success: (res) => {
          if(res?.status === 200){
            handleClose();
            if(!Object.keys(res?.data.results.task).includes("_id")){
              dispatch(taskActions.closeTaskDrawer())
            }
          }
        },
      })
    );
  };

  const handleCloseModal = () => {
    handleClose();
  };
  const currentState = payloadData.state
  return (
    <>
      <Divider sx={{ width: '100%' }} />
      <CBox p='8px 5px'>
        <Formik
          initialValues={{
            state: payloadData.state,
            taskId: payloadData.taskId,
            subTaskId: payloadData.subTaskId,
            comment: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                required
                autoFocus
                margin="dense"
                id="name"
                label="Reason"
                placeholder="Type a reason..."
                type="text"
                onChange={(e) => {
                  setFieldValue("comment", e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.addCommentBox}
              />
              <DialogActions>
                <CButton
                  label='Reject'
                  type="submit"
                  variant="outlined"
                  styles={{
                    borderColor: "#FA0808",
                    // borderColor: "#55BCB3",
                    fontSize: 12,
                    fontWeight: "bold",
                    borderWidth: 2,
                    color: "#FA0808",
                    // color: "#55BCB3",
                  }}
                />
                <CButton
                  onClick={handleCloseModal}
                  variant="outlined"
                  styles={{
                    color: "#605C5C",
                    backgroundColor: "#ECF0F1",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                  label={"Cancel"}
                />
              </DialogActions>
            </Form>
          )}
        </Formik>
      </CBox>

    </>
  );
}

export default StateChangeComment;
const useStyles = makeStyles((theme) => ({

  addCommentBox: {
    '& textarea': {
      height: '70px !important'
    }
  }


}));

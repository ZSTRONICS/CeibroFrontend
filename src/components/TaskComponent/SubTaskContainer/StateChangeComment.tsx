// mui
import {DialogActions} from "@mui/material";
import TextField from "@mui/material/TextField";
// formik
import { Form, Formik } from "formik";
// reudx
import { useDispatch } from "react-redux";
import { taskSubtaskStateChange } from "redux/action/task.action";
// components
import CButton from "components/Button/Button";

function StateChangeComment(props: any) {

  const { handleClose, payloadData } = props;
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    const { taskId, state, subTaskId, comment } = values;
    const payload = { taskId, state, subTaskId, comment };
    dispatch(
      taskSubtaskStateChange({
        body: payload,
        success: (res) => {
        handleClose();
        },
      })
    );
  };

  const handleCloseModal = () => {
    handleClose();
  };
  return (
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
            variant="outlined"
            multiline
            maxRows={4}
            required
            autoFocus
            margin="dense"
            id="name"
            label="comment"
            type="text"
            onChange={(e) => {
              setFieldValue("comment", e.target.value);
            }}
          />
          <DialogActions>
            <CButton
              label={"Reject"}
              type="submit"
              variant="outlined"
              styles={{
                borderColor: "#FA0808",
                fontSize: 12,
                fontWeight: "bold",
                borderWidth: 2,
                color: "#FA0808",
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
  );
}

export default StateChangeComment;

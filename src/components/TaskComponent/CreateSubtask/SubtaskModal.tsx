import React from "react";

import {
  Button,
  makeStyles,
} from "@material-ui/core";
import { Dialog,
    DialogTitle, Grid, TextField, Typography, DialogContent,Autocomplete, DialogActions, DialogContentText } from '@mui/material';
import DatePicker from "../../Utills/Inputs/DatePicker";
import InputText from "../../Utills/Inputs/InputText";
import InputTextArea from "../../Utills/Inputs/InputTextArea";
import SelectDropdown from "../../Utills/Inputs/SelectDropdown";
import { CustomStack } from "../Tabs/TaskCard";
import CButton from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import taskActions from "redux/action/task.action";
import { Form, Formik } from "formik";
import { CBox } from "components/material-ui";
import SubtaskFields from "./SubtaskFields";

const SubtaskModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const dialogOpen = useSelector((state: RootState) => state.task.subTaskopen);

  const handleClose = () => {
    dispatch(taskActions.closeSubTask());
  };
  const handleSubmit = (values: any) => {
    // const { dueDate, taskTitle, projects, admins, assignTo } = values;
    // const payload = {
    //     other: {
    //         body: {

    //         }
    //     }
    // }

    // dispatch(taskActions.createTask())
};
  return (
    <>
      <Dialog onClose={handleClose} open={dialogOpen}>
        <DialogTitle>
          <CustomStack justifyContent="space-between">
            <Typography>New Subtask</Typography>
            <CButton label="Close" variant="outlined" onClick={handleClose} />
          </CustomStack>
        </DialogTitle>
        <Formik
                    initialValues={{
                        dueDate: '',
                        taskTitle: '',
                        projects: '',
                        admins: '',
                        assignTo: ''
                        // project: []

                    }}

                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form>
                            <DialogContent sx={{ padding: '0 20px 24px' }}>
                                <DialogContentText>
                                    <CBox>
                                        <SubtaskFields setFieldValue={setFieldValue} values={values} />
                                    </CBox>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{padding:' 20px 24px' }}>
        <Grid
              item
              container
              xs={12}
              
              className={`${classes.outerWrapper}`}
              justifyContent="space-between"
            >
              <Grid item >
                <Button variant="contained" size="small" color="primary">
                  Save As Draft
                </Button>
              </Grid>
              <Grid item justifyContent="flex-end">
                <Button variant="contained" size="small" color="primary">
                  Assign
                </Button>
                <Button variant="text" size="small" onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
        </DialogActions>
                        </Form>
                    )}
                </Formik>

          {/* <Grid container rowGap={2.3}>
            <Grid item xs={12} className={`${classes.outerWrapper}`}>
            <TextField
                        id="date"
                        name="dueDate"
                        label="Due date"
                        type="date"
                        defaultValue=""
                        size="small"
                        placeholder="DD/MM/YYYY"
                       
                        // onChange={(e) => { }}
                       
                    />
            </Grid>
            <Grid item xs={12} className={`${classes.outerWrapper}`}>
            <TextField
                size="small"
                name="SubTaskTitle"
                fullWidth
                id="outlined-basic"
                label="Enter Sub Task title"
                placeholder='Enter Sub Task title'
                variant="outlined"
                // onChange={(e) => {props.setFieldValue('taskTitle', e.target.value)}}
                />
                        
            </Grid>
            <Grid item xs={12} md={6} className={`${classes.outerWrapper}`}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={top100Films}
                // onChange={(e, value) => {   props.setFieldValue('projects', value !== null ? value : top100Films)}}
                renderInput={(params) => <TextField {...params} name='projects' label='Project' placeholder='select project' />}
            />
            </Grid>
            <Grid item xs={12} md={6} className={`${classes.outerWrapper}`}>
            <Autocomplete
                multiple
                disablePortal
                id="combo-box-demo"
                size="small"
                options={top100Films}
                // onChange={(e, value) => {   props.setFieldValue('projects', value !== null ? value : top100Films)}}
                renderInput={(params) => <TextField {...params} name='viewer' label='Viewer' placeholder='select viewer' />}
            />
            </Grid>
            <Grid item xs={12} className={`${classes.outerWrapper}`}>
              <InputTextArea placeholder="Enter subtask description" />
            </Grid>

            
          </Grid> */}
        
      </Dialog>
    </>
  );
};

const top100Films = [
    { label: 'Redemption', year: 1994 },
    { label: 'Kristo', year: 1972 },
    { label: 'Electic', year: 1972 },
]
export default SubtaskModal;

const useStyles = makeStyles({
  outerWrapper: {
    marginTop: 10,
    rowGap:'4px'
  },
  create: {
    marginTop: 10,
  },
});

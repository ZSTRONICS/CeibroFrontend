import { useState } from "react";

// mui
import { useTheme } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core";
import {
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider
} from '@mui/material';
import Link from '@mui/material/Link';

// formik
import { Form, Formik } from 'formik';

import useMediaQuery from '@mui/material/useMediaQuery';
// import CustomizedSwitch from "components/Chat/Questioniar/IOSSwitch";
import assets from "assets/assets";
import { CBox } from 'components/material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from "theme";
import taskActions from '../../../redux/action/task.action';
import { RootState } from '../../../redux/reducers';
// import { TaskAdvanceOptions } from './TaskAdvanceOptions';
import NewTaskMenu from './NewTaskMenu';
import CButton from "components/Button/Button";

export const TaskModal = () => {

    const classes = useStyles()
    const [open, setOpen]: any = useState(false)
    const dispatch = useDispatch()

    const dialogOpen = useSelector((state: RootState) => state.task.dialogOpen)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClose = () => {
        dispatch(taskActions.closeNewTask())
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
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: '600', paddingBottom: '0' }}>
                    New Task
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
                                        <NewTaskMenu setFieldValue={setFieldValue} values={values} />
                                        <Divider />
                                        <Link href="#" underline="none" onClick={(event) => setOpen(!open)}>
                                            <CBox color='#0076C8' fontSize={14} fontWeight={600} display='flex' alignItems='center' my={1.8}>
                                                {open ?
                                                    <>
                                                        < assets.KeyboardArrowUpIcon />                                                    </>
                                                    :
                                                    <>
                                                        < assets.KeyboardArrowRightIcon />
                                                    </>
                                                }
                                                Advance Options
                                            </CBox>
                                        </Link>
                                        {open ? null
                                            // <TaskAdvanceOptions />
                                            :
                                            ''
                                        }
                                    </CBox>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <CBox display='flex' width='100%' pl={1.5} pr={4.3} pb={1}>
                                    <CBox className={classes.btnDraft}>
                                        <CButton variant='outlined' styles={{ color: '#0076C8', fontSize: 12, fontWeight: 'bold' }} label={'Save as draft'} />
                                    </CBox>
                                    <div style={{ flex: '1 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                                        <CButton type='submit' variant='contained' styles={{ color: '#fff', fontSize: 12, fontWeight: 'bold', marginRight: 15 }} label={'Assign Task'} />
                                        <CButton onClick={handleClose} variant='contained' styles={{ color: '#605C5C', backgroundColor: '#ECF0F1', fontSize: 12, fontWeight: 'bold' }} label={'Cancel'} />
                                    </div>
                                </CBox>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div >
    )
}

const useStyles = makeStyles({
    btnDraft: {
        [theme.breakpoints.down('md')]: {
            position: 'absolute',
            top: 17,
            right: 25,
        },
    },

})

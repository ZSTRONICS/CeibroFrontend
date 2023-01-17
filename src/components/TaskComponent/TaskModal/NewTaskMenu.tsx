import React from 'react';

// mui-imports
import { Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

// redux
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../redux/reducers';

// components
import CustomizedSwitch from 'components/Chat/Questioniar/IOSSwitch';
import useStyles from './TaskDrawerStyles';
import { CustomStack, TaskStatus } from '../Tabs/TaskCard';

function NewTaskMenu(props: any) {

    const classes = useStyles()
    // const dispatch = useDispatch()
    // const selectedMenue = useSelector((state: RootState) => state.project.menue)

    const top100Films = [
        { label: 'Redemption', year: 1994 },
        { label: 'Kristo', year: 1972 },
        { label: 'Electic', year: 1972 },
    ]
    return (

        <Grid container className={classes.outerWrapper} rowGap={1}>
            <Grid item container columnGap={2} >
                <Grid item>
                    <TextField
                        id="date"
                        name="dueDate"
                        label="Due date"
                        type="date"
                        defaultValue="2017-05-24"
                        size="small"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => {
                            props.setFieldValue('dueDate', e.target.value);
                        }}
                    />
                </Grid>
                {/* <Grid item>
                 <CustomizedSwitch
                                label='Multi-task'
                                edge='start'
                            />
                </Grid> */}
            </Grid>
            <Grid xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <TextField
                        size="small"
                        name="taskTitle"
                        fullWidth
                        id="outlined-basic"
                        label="Enter task title"
                        placeholder='enter task title'
                        variant="outlined"
                        onChange={(e) => {
                            props.setFieldValue('taskTitle', e.target.value);
                        }}/>
                </div>
            </Grid>
            <Grid xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={top100Films}
                        onChange={(e, value) => {
                            props.setFieldValue('projects', value !== null ? value : top100Films);
                        }}
                        renderInput={(params) => <TextField {...params} name='projects' label='Project' placeholder='select project' />}
                    />
                </div>
            </Grid>
            <Grid xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <Autocomplete
                        multiple
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        size="small"
                        onChange={(e, value) => {
                            props.setFieldValue('admins', value !== null ? value : top100Films);
                        }}
                        renderInput={(params) => <TextField {...params} name='admins' label='Admins' />}
                    />
                </div>
            </Grid>
            <Grid xs={12} md={12}>
                <div className={classes.titleWrapper}>
                    <Autocomplete
                        multiple
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        size="small"
                        onChange={(e, value) => {
                            props.setFieldValue('assignTo', value !== null ? value : top100Films);
                        }}
                        renderInput={(params) => <TextField {...params} name='assignTo' label='Assign To' placeholder='select memebers(s)' />}
                    />
                </div>
            </Grid>
        </Grid>
    )
}

export default NewTaskMenu



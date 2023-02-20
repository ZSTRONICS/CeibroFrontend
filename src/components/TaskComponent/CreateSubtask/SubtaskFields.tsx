import React from 'react'
import { Divider, Grid, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../assets/colors";
import useStyles from './CreateSubTaskStyles'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { CBox } from 'components/material-ui';
import CustomizedSwitch from 'components/Chat/Questioniar/IOSSwitch';
// import { MediaIcon, NotificationIcon } from '../../../components/material-ui/icons/index';
 import { AttachmentIcon } from 'components/material-ui/icons';

// import CreateSubTaskAdvanceOption from './CreateSubTaskAdvanceOption';

import CButton from 'components/Button/Button';

export default function CreateSubTask({ setSubTask }: any) {
    const classes = useStyles();
    const projects = [
        { label: 'Redemption', year: 1994 },
        { label: 'Kristo', year: 1972 },
        { label: 'Electic', year: 1972 },
    ]
    return (
        <div>
            <Grid container className={classes.outerWrapper}>
                <Grid item xs={12} md={12}>
                    <div className={classes.titleWrapper}>
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
                        // onChange={(e) => {
                        //     props.setFieldValue('dueDate', e.target.value);
                        // }}
                        />
                    </div>
                </Grid>
                <Grid className={classes.titleWrapper} item xs={12} md={12}>
                    <TextField
                        size="small"
                        name="taskTitle"
                        fullWidth
                        id="outlined-basic"
                        label="Enter task title"
                        placeholder='enter task title'
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <div className={classes.titleWrapper}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            options={projects}
                            getOptionLabel={(option) => option.label}
                            // onChange={(e, value) => {
                            //     props.setFieldValue('projects', value !== null ? value : top100Films);
                            // }}
                            renderInput={(params) => <TextField {...params} name='subTask' label='Sub Task title' placeholder='select a sub-task project' />}
                        />
                        {/* <SelectDropdown
                        title="Project"
                    /> */}
                    </div>
                </Grid>
                <Grid item xs={12} md={12}>
                    <div className={classes.titleWrapper}>
                        <Autocomplete
                            filterSelectedOptions
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            options={projects}

                            // onChange={(e, value) => {
                            //     props.setFieldValue('projects', value !== null ? value : top100Films);
                            // }}
                            renderInput={(params) => <TextField {...params} name='viewer' label='Viewer' placeholder='select a viewer' />}
                        />
                        {/* <SelectDropdown
                        title="Project"
                    /> */}
                    </div>
                </Grid>
                <Grid item xs={12} md={12}>
                    <div className={classes.titleWrapper}>
                        <Autocomplete
                            filterSelectedOptions
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            options={projects}
                            // onChange={(e, value) => {
                            //     props.setFieldValue('projects', value !== null ? value : top100Films);
                            // }}
                            renderInput={(params) => <TextField {...params} name='admin' label='Admin' placeholder='select a admin' />}
                        />
                        {/* <SelectDropdown
                        title="Project"
                    /> */}
                    </div>
                </Grid>
                <Grid item xs={12} md={12} className={classes.textAreaBox}>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Enter subtask description"
                        minRows={7}
                        className={classes.textArea}
                    // style={{ }}
                    />
                    <CBox display='flex' alignItems='center' justifyContent='space-between' borderTop='1px solid #DBDBE5' px={1.8}>
                        <CBox className={classes.switch}>
                            <label>Required:</label>
                            <CustomizedSwitch
                                label='Image'
                                edge='start'
                            />
                            <CustomizedSwitch
                                label='Comment'
                                edge='start'
                            />

                        </CBox>
                        <CBox display='flex' alignItems='center'>
                            <AttachmentIcon />
                            &nbsp;
                            &nbsp;
                            {/* <MediaIcon /> */}
                            &nbsp;
                            &nbsp;
                            {/* <NotificationIcon /> */}
                        </CBox>
                    </CBox>
                </Grid>
                <Divider orientation='horizontal' flexItem variant='fullWidth' style={{ width: '100%', marginTop: 15, marginBottom: 8, height: 2 }} />

                {/* <CreateSubTaskAdvanceOption /> */}
                <CBox display='flex' width='100%' mt={6.2} mb={1}>
                    <CBox className={classes.btnDraft}>
                        <CButton variant='outlined' styles={{ color: '#0076C8', fontSize: 12, fontWeight: 'bold' }} label={'Save as draft'} />
                    </CBox>
                    <div style={{ flex: '1 0 0', display: 'flex', justifyContent: 'flex-end' }}>
                        <CButton type='submit' variant='contained' styles={{ color: '#fff', fontSize: 12, fontWeight: 'bold', marginRight: 15 }} label={'Assign Task'} />
                        <CButton onClick={() => setSubTask(false)} variant='contained' styles={{ color: '#605C5C', backgroundColor: '#ECF0F1', fontSize: 12, fontWeight: 'bold' }} label={'Cancel'} />
                    </div>
                </CBox>
            </Grid>
        </div>
    )
}

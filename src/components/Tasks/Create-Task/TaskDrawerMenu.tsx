import { Grid, makeStyles } from '@material-ui/core'
import { Divider, IconButton, TextField } from '@mui/material'

import { CBox } from 'components/material-ui'
import { useDispatch, useSelector } from 'react-redux'

import colors from '../../../assets/colors'
import { RootState } from '../../../redux/reducers'

import DatePicker from '../../Utills/Inputs/DatePicker'

import Autocomplete from '@mui/material/Autocomplete'
import Link from '@mui/material/Link'

import assets from "assets/assets"


import { useState } from "react"
import { AttachmentIcon } from 'components/material-ui/icons'
import CustomModal from 'components/Modal'

function TaskDrawerMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen]: any = useState(false)
  const selectedMenue = useSelector((state: RootState) => state.project.menue);
  const [imageAttach, setImageAttach]: any = useState(false);



  const handleClick = (id: number) => {
    // dispatch(projectActions.setMenue(id))
  }
  const projects = [
    { label: 'Redemption', year: 1994 },
    { label: 'Kristo', year: 1972 },
    { label: 'Electic', year: 1972 },
  ]

  return (
    <>
      <Grid container className={classes.outerWrapper}>
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
          <CBox display='flex' alignItems='center' mt={1}>
            <CBox className={classes.type}>
              Draft
            </CBox>
            <CBox color='#000' fontSize={12} fontWeight={600} ml={1}>
              22.05.2021
            </CBox>
          </CBox>
          {/* <InputText
                    placeholder="Enter Task title"
                /> */}

        </Grid>
        <Divider orientation='horizontal' flexItem variant='fullWidth' style={{ width: '100%', marginTop: 15, marginBottom: 8 }} />

        <Grid item xs={12} md={12}>
          <div className={classes.titleWrapper}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              options={projects}
              // onChange={(e, value) => {
              //     props.setFieldValue('projects', value !== null ? value : top100Films);
              // }}
              renderInput={(params) => <TextField {...params} name='projects' label='Project' placeholder='select project' />}
            />
            {/* <SelectDropdown
                        title="Project"
                    /> */}
          </div>
        </Grid>

        <Grid item xs={12} md={12} >
          <div className={classes.titleWrapper}>
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={projects}
              size="small"
              // onChange={(e, value) => {
              //     props.setFieldValue('admins', value !== null ? value : top100Films);
              // }}
              renderInput={(params) => <TextField {...params} name='admins' label='Admins' />}
            />

          </div>
        </Grid>
        <Grid item xs={12} md={12} >
          <div className={classes.titleWrapper}>
            <Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={projects}
              size="small"
              // onChange={(e, value) => {
              //     props.setFieldValue('admins', value !== null ? value : top100Films);
              // }}
              renderInput={(params) => <TextField {...params} name='assignTo' label='Assign To' placeholder='select memebers(s)' />}
            />

          </div>
        </Grid>



        <Grid item xs={12} md={12} style={{ marginTop: 15 }}>
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
            // onChange={(e) => {
            //     props.setFieldValue('dueDate', e.target.value);
            // }}
            />
          </Grid>

        </Grid>
        <Divider orientation='horizontal' flexItem variant='fullWidth' style={{ width: '100%', marginTop: 15, marginBottom: 8 }} />
        <Grid item xs={12} md={12} className={classes.textAreaBox}>
          <TextField
            id="standard-multiline-flexible"
            // label="Multiline"
            placeholder="Enter subtask description"
            multiline
            maxRows={4}
            minRows={4}
            style={{ padding: '10px 10px' }}
            variant="standard"
            className={classes.textArea}
          />
          <CBox display='flex' alignItems='center' justifyContent='flex-end' width='100%' borderTop='1px solid #DBDBE5' px={1.8}>

            <CBox display='flex' alignItems='center' >
              <IconButton onClick={() => setImageAttach(true)}>
                <AttachmentIcon />
              </IconButton>
              {/* &nbsp;
                            &nbsp; */}
              {/* <MediaIcon /> */}
              {/* &nbsp;
                            &nbsp; */}
              {/* <NotificationIcon /> */}
            </CBox>
          </CBox>
        </Grid>
        {/* <Link href="#" underline="none"> */}
        {/* <CBox color='#0076C8' fontSize={14} fontWeight={600} display='flex' alignItems='center' my={1.8}>
          {open ?
          <>
            < assets.KeyboardArrowRightIcon />                                                    </> */}
        {/* :
                                                    <> */}
        {/* < assets.KeyboardArrowDownIcon /> */}
        {/* </> */}
        {/* } */}
        {/* Advance Options */}
        {/* </CBox> */}
        {/* </Link> */}

        {/* <Grid item xs={12} md={10}>
        <div className={classes.dateWrapper}>
          <DatePicker />
        </div>
      </Grid> */}
        {/* <Divider sx={{ width: "100%", padding: "15px 0" }} />
      <CBox>
        <Link href="#" underline="none"
          onClick={(event) => setOpen(!open)}
        >
          <CBox
            color="#0076C8"
            fontSize={14}
            fontWeight={600}
            display="flex"
            alignItems="center"
            my={1.8}
          >
            {open ? (
              <>
                <assets.KeyboardArrowUpIcon />{" "}
              </>
            ) : (
              <>
                <assets.KeyboardArrowDownIcon />
              </>
            )}
            Advance Options
          </CBox>
        </Link>
        {open
          ? null
          : // <TaskAdvanceOptions />
          ""}
      </CBox> */}
        {/* <Grid item xs={12} >
                <div className={classes.createSubTask}>
                    <CreateSubTask/>
                </div>
            </Grid> */}
      </Grid>
      <CustomModal isOpen={imageAttach} handleClose={() => setImageAttach(false)} title={'Attach Image'} children={<>
        <TextField type='file' id="outlined-basic" label="Outlined" variant="outlined" />
      </>} />
    </>
  );
}

export default TaskDrawerMenu;

const useStyles = makeStyles({
  outerWrapper: {
    padding: "10px 10px",
    // background: colors.white,
  },

  titleWrapper: {
    marginTop: 10,
    '& .MuiFormLabel-root': {
      fontSize: 12,
      color: '#605C5C',
      fontFamily: 'Inter',
      fontWeight: 600,
    },
    // maxHeight: '41px !important',
    '&:hover': {
      // borderColor: '#0a95ff !important',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0a95ff !important',
        borderWidth: '1px',
      }
    }
  },
  // projectWrapper: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     padding: '5px 10px',
  //     // paddingTop: "20px",
  //     border: '1px solid #DBDBE5',
  //     // marginTop: 20,
  //     borderRadius: '4px',
  //     '&:hover': {
  //         borderColor: '#0a95ff',
  //         borderWidth: '1px',
  //     }
  // },
  inputWrapper: {
    paddingTop: 10,
    paddingLeft: 10,
    ['@media (max-width:600px)']: {
      paddingLeft: 0
    }
  },
  textAreaBox: {
    border: '1px solid #DBDBE5',
    borderRadius: 5,
    '&:hover': {
      borderColor: '#0a95ff',
      borderWidth: '1px',
    },
    '& .css-8q2m5j-MuiInputBase-root-MuiInput-root': {
      '&:before': {
        borderBottom: 'none !important'
      },
      '&:after': {
        borderBottom: 'none !important'
      }
    }

  },
  textArea: {
    width: '100%', padding: 15, border: 'none', borderRadius: 5,
    '& textarea:focus': {
      outline: 'none !important',
      borderColor: 'none',
      // boxShadow: '0 0 10px #719ECE',
    }
  },
  projectWrapper: {
    padding: "10px 0px",
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    // paddingTop: "20px",
    // border: '1px solid #DBDBE5',
    // marginTop: 20,
    borderRadius: '4px',
    '&:hover': {
      borderColor: '#0a95ff',
      borderWidth: '1px',
    }
  },


  dateWrapper: {
    paddingTop: 10,
    paddingLeft: 10,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
    },
  },
  createSubTask: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  type: {
    backgroundColor: '#7D7E80',
    borderRadius: 4,
    padding: '5px 10px',
    color: '#fff',
    fontSize: '12px'
  }
})

import React from 'react'
import {Box, Grid, Paper,  } from '@mui/material';

import DatePicker from 'components/Utills/Inputs/DatePicker';
import SelectDropdown from 'components/Utills/Inputs/SelectDropdown';
import CustomizedSwitch from 'components/Chat/Questioniar/IOSSwitch';
import assets from 'assets/assets';
import StatusMenu from 'components/Utills/Others/StatusMenu';
import { makeStyles } from '@material-ui/core';
import TaskList from './TaskList';
const TaskMain=()=> {
  let xsPoint = 12
  let mdPoint = 4
const classes = useStyles()
  return (<>
    <Box sx={{flexGrow:1}}>
    <Grid container spacing={1.7} className={classes.TaskWraper} >
      <Grid item xs={xsPoint} md={2} sm={4}>
      <DatePicker  Datetitle='Date'/>
      </Grid>
      <Grid item xs={xsPoint} md={mdPoint} sm={4}>
      <SelectDropdown title="Assigned to" />
      </Grid>
      <Grid item xs={xsPoint} md={mdPoint} sm={4}>
      <SelectDropdown title="Projects" />
      </Grid>
      <Grid  container item xs={xsPoint} md={3} sm= {12} lg={2} gap={1} alignItems='baseline'  className={classes.activeConainer}>
        <CustomizedSwitch
          // onChange={(e:any)=>handleChange(e)}
            label= 'Multi-task' />
            <Box sx={{maxWidth:'20px', width:'100%'}} flex={1}>
            <img src={assets.filterIcon} width='100%' alt=""/>
            </Box>
      </Grid>
      <Grid  item xs={12} pt={0}>
        <Paper sx={{display:'flex', flexWrap:'wrap', '&.MuiPaper-root':{padding:'7px 0 7px 20px'}}} elevation={0} variant='outlined' >
          <StatusMenu/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
      Task List
      </Grid>
    </Grid>
    </Box>
  </>
  )
}

export default TaskMain

const useStyles = makeStyles({
  TaskWraper:{
    // padding: '0 10px',
    "@media(max-width:1024px)":{
      // padding:''
    }
  },
  activeConainer: {
    justifyContent: 'space-between',
    // paddingLeft:'0 !important',
    "@media(max-width:1024px)":{
      alignItems:'baseline !important',
      justifyContent: 'inherit'
    }
}
  
})

// mui-imports
import { makeStyles } from '@material-ui/core';
import { Box, Grid, Paper } from '@mui/material';

// components
import DatePicker from 'components/Utills/Inputs/DatePicker';
import SelectDropdown from 'components/Utills/Inputs/SelectDropdown';
import StatusMenu from 'components/Utills/Others/StatusMenu';
import { TaskInterface } from 'constants/interfaces/task.interface';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import TaskList from './TaskList';


const TaskMain=()=> {
  const allTask: TaskInterface[] = useSelector((state: RootState) => state.task.allTask);
  let xsPoint = 12
  let mdPoint = 4
  let lgPoint = 3.2
  const classes = useStyles()
 
  // const localized = moment(dueDate, 'DD-MM-YYYY').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ')
  // console.log('localized', localized)

  const options = [
    {
      title: "All",
      count: allTask.length,
    },
    {
      title: "New",
      count: allTask.filter(task => task.state==="new").length,
    },
    {
      title: "Active",
      count: allTask.filter(task => task.state==="active").length,
    },
  
    {
      title: "Done",
      count: allTask.filter(task => task.state==="done").length,
    },
    {
      title: "Draft",
      count: allTask.filter(task => task.state==="draft").length,
    },
  ];

  return (<>
    <Box sx={{flexGrow:1}}>
      <Grid container spacing={1.7} className={classes.TaskWraper} >
      <Grid item xs={xsPoint} md={mdPoint} sm={4} lg={lgPoint}>
      <DatePicker  Datetitle='Date'/>
      {/* <CDatePicker
            required
            value={showDate}
            id="date"
            name="dueDate"
            onChange={(e:any) => {
              setShowDate(e)
              const currentDate = deDateFormat(e)
            }}
          /> */}
      </Grid>
      <Grid item xs={xsPoint} md={mdPoint} sm={4} lg={lgPoint}>
      <SelectDropdown title="Assigned to" />
      </Grid>
      <Grid item xs={xsPoint} md={mdPoint} sm={4} lg={lgPoint}>
      <SelectDropdown title="Projects" />
      </Grid>
      {/* <Grid  container item xs={xsPoint} md={3} sm= {12} lg={2} gap={2} alignItems='baseline'  className={classes.activeConainer}>
        <CustomizedSwitch
          // onChange={(e:any)=>handleChange(e)}
            label= 'Multi-task' />
            <Box sx={{maxWidth:'20px', width:'100%'}} flex={1}>
            <img src={assets.filterIcon} width='100%' alt=""/>
            </Box>
      </Grid> */}
      <Grid  item xs={12} pt={0}>
        <Paper className={classes.statusWrapper} sx={{display:'flex', '&.MuiPaper-root':{padding:'7px 0 7px 5px'}}} elevation={0} variant='outlined' >
          <StatusMenu options={options}/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TaskList/>
      </Grid>

    </Grid>
    </Box>
  </>
  )
}


export default TaskMain

const useStyles = makeStyles({
statusWrapper:{
  "@media(max-width:1024px)":{
    overflowX: 'scroll',
  }
},
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
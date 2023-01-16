import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Button, Grid, Paper } from '@mui/material'
import StatusMenu from 'components/Utills/Others/StatusMenu'
import ListIcon from '@material-ui/icons/List';
import DatePicker from 'components/Utills/Inputs/DatePicker';
import SelectDropdown from 'components/Utills/Inputs/SelectDropdown';
import colors from 'assets/colors';


function SubTaskStatusDrawer() {
    const classes = useStyles()
  return (<>
                    <div className={classes.drawerStatusContainer}>
                    <Paper className={classes.statusWrapper} sx={{display:'flex', '&.MuiPaper-root':{padding:'7px 0 7px 5px'}}} elevation={0} variant='outlined' >
                    <StatusMenu options={options} />
                    </Paper>
                </div>
                <Grid container gap={2} pl={2.2}>
                 <Grid item sm ={2} md={2}>
                    <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<ListIcon />}
                            className={classes.actionButton}
                        >
                            Bulk edit
                        </Button>
                    </Grid>
               
                <Grid item sm ={3} md={4}>
                <DatePicker  Datetitle='Date'/>
                </Grid>
                <Grid item sm ={5} md={4}>
                <SelectDropdown title="Assigned to" />
                </Grid>
                </Grid>
  </>
  )
}

const options = [
    {
      title: "All",
      count: 10,
    },
    {
      title: "Ongoing",
      count: 2,
    },
  
    {
      title: "Submitted",
      count: 3,
    },
    {
      title: "Rejected",
      count: 4,
    },
    {
      title: "Approve",
      count: 1,
    },
    {
      title: "Done",
      count: 1,
    },
    {
      title: "Draft",
      count: 10,
    },
  ];
export default SubTaskStatusDrawer

const useStyles = makeStyles({
    actionButton: { 
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'normal'
    },
    drawerStatusContainer:{
        padding:'11px 18px'
    },
    statusWrapper:{
        "@media(max-width:1024px)":{
          overflowX: 'scroll',
        }
      },

})

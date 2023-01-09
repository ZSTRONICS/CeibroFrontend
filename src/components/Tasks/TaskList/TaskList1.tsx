import React from 'react'
import { Grid } from '@mui/material'
import TaskCard from 'components/TaskComponent/Tabs/TaskCard'
import { getColorByStatus } from 'config/project.config'
import {  TaskInterface } from 'constants/interfaces/task.interface'
import { TASKS } from 'constants/task.constants'
import { makeStyles } from '@material-ui/core'

function TaskList1() {
    const classes = useStyles()

  return (
    <Grid container rowGap={2.5} columnGap={4.38} xs={12} className={classes.cardListContainer}>
    {TASKS && 
        TASKS.map((task:TaskInterface, index: number) => {
            return (
                <TaskCard ColorByStatus={getColorByStatus}  task={task}/>
            )
        })
    }
</Grid>
  )
}

export default TaskList1

const useStyles = makeStyles((theme) => ({
 
    cardListContainer: {
      [theme.breakpoints.down(1024)]: {
      justifyContent: 'center',
      },
    },
  
  }));
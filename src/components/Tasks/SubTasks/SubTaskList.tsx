
import { Grid } from '@material-ui/core'
import SubTask from 'components/TaskComponent/SubTaskContainer/SubTaskList'
import React from 'react'
import { TaskInterface } from '../../../constants/interfaces/task.interface'
import { TASKS } from '../../../constants/task.constants'
import {Divider} from '@mui/material'

const SubTaskList = () => {
    return (
        <Grid container>
            {TASKS &&
                TASKS.map((task: TaskInterface, index: number) => {
                    return (<>
                        <SubTask />
                    </>
                    )
                })
            }
        </Grid>
    )
}

export default SubTaskList;
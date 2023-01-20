import React from 'react'

import { Grid } from '@material-ui/core'
import SubTask from 'components/TaskComponent/SubTaskContainer/SubTaskList'
import { AllSubtasksForUserRoot } from 'constants/interfaces/AllSubTask'
import { SubtaskInterface } from 'constants/interfaces/subtask.interface'


const SubTaskList = ({results}:AllSubtasksForUserRoot) => {
    return (
        <Grid container>
            {results &&
                results.map((subTaskDetail:SubtaskInterface) => {
                    return (<>
                        <SubTask subTaskDetail= {subTaskDetail}/>
                    </>
                    )
                })
            }
        </Grid>
    )
}

export default SubTaskList;

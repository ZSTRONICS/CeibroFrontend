
import { Grid } from '@material-ui/core'
import SubTask from 'components/TaskComponent/SubTaskContainer/SubTaskList'
import { AllSubTaskRoot, AllSubTasResult } from 'constants/interfaces/AllSubTask'
import React from 'react'
import { TaskInterface } from '../../../constants/interfaces/task.interface'
import { TASKS } from '../../../constants/task.constants'

interface Props{
    allSubTaskList: AllSubTasResult[]
}

const SubTaskList = ({allSubTaskList}:Props) => {

    return (
        <Grid container>
            {allSubTaskList &&
                allSubTaskList.map((subTaskDetail:AllSubTasResult) => {
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
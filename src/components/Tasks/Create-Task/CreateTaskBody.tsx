import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
// import ProjectOverview from './ProjectOverview/ProjectOverview'
// import ProjectRoles from './ProjectRoles/ProjectRoles'
// import ProjectMembers from './ProjectMember/ProjectMembers'
// import ProjectGroups from './ProjectGroups/ProjectGroups'
// import ProjectDocuments from './ProjectDocuments/ProjectDocuments'
// import TimeProfile from './TimeProfile/TimeProfile'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import DrawerSubTask from './DrawerSubTask'
import SubTaskList from '../SubTasks/SubTaskList'
import SubTaskStatusDrawer from './SubTaskStatusDrawer'

const CreateProjectBody = () => {
    const classes = useStyles()

    const selectedMenue = useSelector((state: RootState) => state.project.menue)

    return (<>
   
             <div className={classes.subtaskWrapper}>
                <SubTaskStatusDrawer/>
            </div>  
        <Grid container className={classes.body}>
            {/* <DrawerSubTask/> */}
            <SubTaskList/>
        </Grid>
        </>
    )
}

export default CreateProjectBody

const useStyles = makeStyles({
    statusWraper:{
        overflowX:'scroll'
    },
    body: {
        padding: 20,
        overflow: 'scroll',
        height: 'calc(100vh - 80px)',
        background:'#F5F7F8'
    },
    subtaskWrapper:{
        '@media (max-width:854)': {
            maxWidth: '319px',
            width: '100%'
        }
    }
})

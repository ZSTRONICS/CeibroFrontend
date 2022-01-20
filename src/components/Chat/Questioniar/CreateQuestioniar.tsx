
import { Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import colors from '../../../assets/colors'
import { closeQuestioniarDrawer } from '../../../redux/action/chat.action';
// import colors from '../../../../assets/colors'
// import projectActions from '../../../../redux/action/project.action'
import { RootState } from '../../../redux/reducers';
import QuestioniarHeader from './QuestioniarHeader'
import QuestioniarBody from './QuestioniarBody'
// import CreateProjectBody from './CreateProjectBody'
// import CreateProjectFooter from './CreateProjectFooter'

const CreateQuestioniarDrawer = () => {
    const drawerOpen = useSelector((store: RootState) => store.chat.questioniarDrawer)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClose = () => {
        dispatch(closeQuestioniarDrawer());
    }

    return (    
        <Drawer onClose={handleClose} open={drawerOpen} anchor="right">
            <div className={classes.outerWrapper}>
                <QuestioniarHeader/>
                <QuestioniarBody/>
                {/* <ProjectDrawerMenu/>
                <CreateProjectBody/>
                <CreateProjectFooter/> */}
            </div>
          </Drawer>
    )
}

export default CreateQuestioniarDrawer;

const useStyles = makeStyles({
    outerWrapper: {
        width: 'calc(100vw - 200px)',
        backgroundColor: colors.white,
        height: '100vh',
        ['@media (max-width:960px)']: {
            width: '100vw'
        }
    }
})

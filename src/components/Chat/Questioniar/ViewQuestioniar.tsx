
import { Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import colors from '../../../assets/colors'
import { closeQuestioniarDrawer, closeViewQuestioniarDrawer, getQuestioniarById } from '../../../redux/action/chat.action';
// import colors from '../../../../assets/colors'
// import projectActions from '../../../../redux/action/project.action'
import { RootState } from '../../../redux/reducers';
import QuestioniarHeader from './QuestioniarHeader'
import ViewQuestioniarBody from './ViewQuestioniarBody'
import { useEffect } from 'react';
// import CreateProjectBody from './CreateProjectBody'
// import CreateProjectFooter from './CreateProjectFooter'

const ViewQuestioniarDrawer = () => {
    const drawerOpen = useSelector((store: RootState) => store.chat.openViewQuestioniar)
    const selectedQuestioniar = useSelector((store: RootState) => store.chat.selectedQuestioniar)
    const dispatch = useDispatch()
    const classes = useStyles();


    const handleClose = () => {
        dispatch(closeViewQuestioniarDrawer());
    }

    useEffect(() => {
        dispatch(getQuestioniarById({other: selectedQuestioniar}))
    }, [selectedQuestioniar])

    return (    
        <Drawer onClose={handleClose} open={drawerOpen} anchor="right">
            <div className={classes.outerWrapper}>
                <QuestioniarHeader/>
                <ViewQuestioniarBody />
            </div>
          </Drawer>
    )
}

export default ViewQuestioniarDrawer;

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
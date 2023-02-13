import react, {useState} from 'react'
import { makeStyles } from '@material-ui/core';
import CButton from 'components/Button/Button';
import { CBox } from 'components/material-ui';
import { AttachmentIcon } from 'components/material-ui/icons/index';
import { SubtaskInterface } from 'constants/interfaces/subtask.interface';
import TaskDetailHeader from './TaskDetailHeader';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import RecentComments from './RecentComments';
import { CustomStack } from 'components/TaskComponent/Tabs/TaskCard';
import CDrawer from 'Drawer/CDrawer';
import ViewRejectionComments from './ViewRejectionComments';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubTaskRejection } from 'redux/action/task.action';
import { isTrue } from 'components/Utills/Globals/Common';
import { RootState } from 'redux/reducers';


interface Props {
    subtaskDetail: SubtaskInterface
    taskAdmin: {id:string,label:string}[]
}
export default function TaskDetail({ subtaskDetail, taskAdmin }: Props) {
    const classes = useStyles()
    const [openCDrawer, setOpenCDrawer]= useState<boolean>(false)
    const dispatch = useDispatch()
    const {user} = useSelector((state:RootState)=> state.auth)
    const handleCDrawer =()=>{
        setOpenCDrawer((prev:boolean)=> !prev)
        dispatch(getAllSubTaskRejection({
            other:{
                subtaskId:subtaskDetail._id
            }
        }))
    }
    const isTaskAdmin = taskAdmin.some((item:any)=> item.id === user._id)

    return (<>
        <div>
            <CBox className={classes.wrapper}>
                <TaskDetailHeader subtaskDetail={subtaskDetail} />
            <CustomStack justifyContent='flex-end' gap={2} >
               {isTaskAdmin&& <CBox display='flex' alignItems='center' mt={1} >
                    <CButton styles={{ fontSize: 14, textTransform: 'capitalize' }} onClick={handleCDrawer} startIcon={<VisibilityOutlinedIcon />} label={'Rejections'} />
                </CBox>}
                <CBox display='flex' alignItems='center' justifyContent='flex-end' mt={1}>
                    <CButton  styles={{ fontSize: 14, textTransform: 'capitalize' }} startIcon={<AttachmentIcon />} label={'Attachments'} />
                </CBox>
            </CustomStack>
                {/* <CBox display='flex' alignItems='center' justifyContent='flex-end' mt={1}>
                    <CButton styles={{ fontSize: 14, textTransform: 'capitalize' }} endIcon={<EyeIcon />} label={'View all comments'} />
                </CBox> */}
                {/* <RecentComments subtaskDetail={subtaskDetail} /> */}
            </CBox>
        </div>
        <CDrawer showBoxShadow={true} hideBackDrop={true} openCDrawer={openCDrawer} handleCloseCDrawer={handleCDrawer} children={<ViewRejectionComments subTaskHeading="Subtask Rejection" handleCloseCDrawer={handleCDrawer}/>} />
    </>
    )
}
const useStyles = makeStyles({
    wrapper: {
        padding: '25px 20px',
        backgroundColor: '#F5F7F8'
    },
    heading: {
        fontSize: "12px",
        fontWeight: 600,
        color: '#7D7E80'
    },
    description: {
        fontSize: "12px", fontWeight: 600, color: '#000000', marginBottom: 5
    },

    status: {
        fontSize: 10,
        color: '#fff !important',
        backgroundColor: '#F1B740',
        borderRadius: '3px !important',
        width: '100%',
        maxWidth: '53px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 19,
        marginRight: '5px !important',

    }
})
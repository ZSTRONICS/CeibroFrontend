import react, {useState} from 'react'
import { makeStyles } from '@material-ui/core';
import CButton from 'components/Button/Button';
import { CBox } from 'components/material-ui';
import { AttachmentIcon } from 'components/material-ui/icons/index';
import { SubtaskInterface } from 'constants/interfaces/subtask.interface';
import TaskDetailHeader from './TaskDetailHeader';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RecentComments from './RecentComments';
import { CustomStack } from 'components/TaskComponent/Tabs/TaskCard';
import CDrawer from 'Drawer/CDrawer';
import ViewRejectionComments from './ViewRejectionComments';


interface Props {
    subtaskDetail: SubtaskInterface
}
export default function TaskDetail({ subtaskDetail }: Props) {
    const classes = useStyles()
    const [openCDrawer, setOpenCDrawer]= useState<boolean>(false)

    const handleOpenCDrawer =()=>{
        setOpenCDrawer((prev:boolean)=> !prev)
    }

    return (<>
        <div>
            <CBox className={classes.wrapper}>
                <TaskDetailHeader subtaskDetail={subtaskDetail} />
            <CustomStack justifyContent='flex-end' gap={2} >
                <CBox display='flex' alignItems='center' mt={1} >
                    <CButton styles={{ fontSize: 14, textTransform: 'capitalize' }} onClick={handleOpenCDrawer} startIcon={<VisibilityOutlinedIcon />} label={'View Rejections'} />
                </CBox>
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
        <CDrawer openCDrawer={openCDrawer} handleCloseCDrawer={handleOpenCDrawer} children={<ViewRejectionComments/>} />
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
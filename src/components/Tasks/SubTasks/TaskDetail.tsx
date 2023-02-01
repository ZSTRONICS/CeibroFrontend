import { Divider, makeStyles, Typography } from '@material-ui/core';
import { Link } from '@mui/material';
import { bgcolor } from '@mui/system';
import CButton from 'components/Button/Button';
import { CBox } from 'components/material-ui';
import { TaskStatus } from 'components/TaskComponent/Tabs/TaskCard';
import { AttachmentIcon, EyeIcon } from 'components/material-ui/icons/index'
import TaskDetailHeader from './TaskDetailHeader';
import Chip from '@mui/material/Chip';
import { theme } from 'theme';
import RecentComments from './RecentComments';
import CenterDivider from 'components/centerDivider/CenterDivider';
import { useSelector } from 'react-redux';
import { SubtaskInterface } from 'constants/interfaces/subtask.interface';

interface Props {
    subtaskDetail: SubtaskInterface
}
export default function TaskDetail({ subtaskDetail }: Props) {
    const classes = useStyles()
    console.log('subtask--->', subtaskDetail)
    return (
        <div>
            <CBox className={classes.wrapper}>
                <TaskDetailHeader subtaskDetail={subtaskDetail} />

                <CBox display='flex' alignItems='center' justifyContent='flex-end' mt={1}>
                    <CButton styles={{ fontSize: 14, textTransform: 'capitalize' }} endIcon={<AttachmentIcon />} label={'See Attachments'} />

                </CBox>
                {/* <CenterDivider label={'recent comments'} /> */}

                <CBox display='flex' alignItems='center' justifyContent='flex-end' mt={1}>
                    <CButton styles={{ fontSize: 14, textTransform: 'capitalize' }} endIcon={<EyeIcon />} label={'View all comments'} />
                </CBox>
                <RecentComments subtaskDetail={subtaskDetail} />

            </CBox>
        </div>
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
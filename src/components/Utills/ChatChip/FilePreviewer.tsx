import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
// @ts-ignore
import { FileIcon, defaultStyles } from 'react-file-icon';
import { useSelector } from 'react-redux';
import colors from '../../../assets/colors';
import { RootState } from '../../../redux/reducers';

interface FilePreviewerInterface {
    file: any;
    handleClick?: (id: number) => void;
    id?: any;
    showControls: boolean;
}

const FilePreviewer: React.FC<FilePreviewerInterface> = (props) => {
    const { file, showControls } = props;
    const classes = useStyles();
    const { selectedChat } = useSelector((store: RootState) => store.chat);

    const handleClick = () => {
        if(props.handleClick) {
            props.handleClick(props.id);
            return;
        } else {
            window.open(file.url);
        }
    }
    
    return (
        <div onClick={handleClick} className={`file-preview ${classes.wrapper} `} >
            {['png', 'jpg', 'jpeg'].includes(file?.fileType) ? (
                    <img src={file?.url} />
                ): (
                    <FileIcon 
                        {...defaultStyles[file?.fileType]} 
                        extension={file?.fileType || 'Unknown'}
                    />    
                )
            }
            {showControls && <span className={classes.crossIcon}>x</span>}
            <span className={classes.fileName}>{file?.fileName?.slice(0, 7)}</span>
        </div>
    )
}

export default FilePreviewer;

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    crossIcon: {
        position: 'absolute',
        left: 0,
        top: -8,
        fontWeight: 'bold',
        color: colors.btnRed,
        cursor: 'pointer'
    },
    fileName: {
        fontSize: 12,
        paddingTop: 6
    }
})

// @ts-ignore
import { FileIcon, defaultStyles } from 'react-file-icon';

interface FilePreviewerInterface {
    file: any;
    handleClick?: (file: any) => void;
}

const FilePreviewer: React.FC<FilePreviewerInterface> = (props) => {
    const { file } = props;

    const handleClick = () => {
        if(props.handleClick) {
            props.handleClick(file);
            return;
        } else {
            window.open(file.url);
        }
    }
    
    return (
        <div onClick={handleClick} className="file-preview">
            {['png', 'jpg', 'jpeg'].includes(file?.fileType) ? (
                    <img src={file?.url} />
                ): (
                    <FileIcon 
                        {...defaultStyles.docx} 
                        extension={file?.fileType || 'Unknown'}
                    />    
                )
            }
        </div>
    )
}

export default FilePreviewer

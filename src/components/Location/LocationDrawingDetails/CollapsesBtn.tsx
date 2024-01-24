import { Box } from '@mui/material';
import { Locationarrow } from "components/material-ui/icons/arrow/Locationarrow";

interface CollapsesBtnProps {
    collapseDiv: () => void;
}

const CollapsesBtn: React.FC<CollapsesBtnProps> = ({ collapseDiv }) => {
    return (
        <button
            style={{ padding: '16px 4px 16px 4px', border: 'none', position: 'absolute', left: '100%', top: '48%', backgroundColor: '#EBF5FB', zIndex: '20' }}
            onClick={collapseDiv}
        >
            <Box sx={{ transform: 'rotate(180deg)' }} >
                <Locationarrow />
            </Box>
        </button >

    )
}

export default CollapsesBtn
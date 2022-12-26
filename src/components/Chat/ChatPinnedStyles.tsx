import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import colors from "assets/colors";

export const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        box: {

        },
        chatBox: {
            background: '#FFFFFF',
            borderRadius: 4,
            padding: '8px 15px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',

            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#f5f7f8'
            }
        },
        memberPreview: {
            padding: "2px 0 0 10px",
            display: "flex",
            flexDirection: "column",
            alignItem: 'center'
        },
        iconBtn: {
            padding: '6px 42px 2px 8px',
            alignItems: 'end',
            '&:hover': {
                backgroundColor: 'transparent',
            },
            '& svg': {
                height: '18px !important',
                width: '18px !important',
            },
            '& .MuiTypography-root': {
                color: '#0076C8 !important'
            }
        },
        break: {
            border: 0,
            borderTop: `1px solid ${colors.grey}`,
        },
    }),
);

export default useStyles;
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import colors from "assets/colors";

export const useStyles = makeStyles((theme: Theme) =>

    createStyles({

        imgBox: {
            position: 'relative',
            '& .MuiAvatar-root': {
                width: '60px !important',
                height: '60px !important',
            }
        },
        playVideo: {
            position: 'absolute',
            top: 17,
            left: 19,
            '& svg': {
                fill: '#fff'
            }
        },
        size: {
            fontSize: 12,
            fontWeight: 500,
            color: '#605C5C',
            position: 'relative',
        },
        memberPreview: {
            padding: "2px 0 0 10px",
            display: "flex",
            flexDirection: "column",
            alignItem: 'center'
        },
        memberName: {
            fontSize: 14,
            fontWeight: 700,
            textOverflow: "ellipsis",
            width: "110px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            color: "#000000",
            textTransform: 'capitalize'
        },
        memberCompany: {
            fontSize: 12,
            fontWeight: 500,
            color: '#605C5C',
            position: 'relative',
            '&:after': {
                content: '"."',
                display: 'block',
                position: 'absolute',
                zIndex: 1,
                color: '#605C5C',
                top: '-3px',
                width: '77%',
                left: '66px',
                // left: '0px',
                // right: '65px',
                height: '2px',


            },
            '&:last-child:after': {
                content: '""',
            }

        },
        view: {
            position: 'absolute',
            right: 0,
            top: 11,
            display: 'flex',
            alignItems: 'center',
        },
        chatList: {
            marginBottom: 15,
            borderBottom: '2px solid #fff',
            paddingBottom: 10
        }

    }),
);

export default useStyles;
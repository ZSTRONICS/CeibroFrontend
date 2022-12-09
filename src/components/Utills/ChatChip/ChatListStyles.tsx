import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import colors from "../../../assets/colors";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chatListWrapper: {
            padding: 0,
            height: 70,
            border: `0.5px solid ${colors.grey}`,
            cursor: "pointer",
        },
        // bookMarkWrapper: {
        //   padding: 0,
        //   display: 'flex',
        //   flexDirection: 'column',
        //   alignItems: 'center',
        // },
        dot: {
            marginTop: 15,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: `linear-gradient(180deg, #F1B740 0%, #FF7A00 100%)`,
        },
        avatarWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        messageDetailWrapper: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingLeft: 6,
            paddingTop: 4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        userName: {
            fontSize: 14,
            fontWeight: 500,
            paddingTop: 5,
        },
        message: {
            fontSize: 12,
            fontWeight: 500,
            color: colors.textGrey,
            paddingLeft: 2,
        },
        chatProject: {
            fontSize: 10,
            fontWeight: 500,
            color: colors.black,
        },
        chatProjectName: {
            fontSize: 10,
            fontWeight: "bold",
            color: colors.textPrimary,
        },
        timeOuterWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 5,
        },
        timeWrapper: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-evenly",
        },
        time: {
            fontSize: 12,
            fontWeight: 500,
        },
        bookmarked: {
            color: colors.darkYellow,
            fontSize: 18,
        },
        startFilled: {
            color: colors.darkYellow,
            fontSize: 18,
        },
    }),
);

export default useStyles;
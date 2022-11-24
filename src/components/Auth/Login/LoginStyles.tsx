import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import colors from "../../../assets/colors";
import assets from "../../../assets/assets";

export const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        loginForm: {
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            padding: "10px 13%",
            "@media (max-width:960px)": {
                padding: "10 13%",
            },
            '& .MuiInputBase-input': {
                border: '1px solid #DBDBE5',
                padding: '10px 12px !important',
                position: 'relative',
            }
        },

        logoWrapper: {
            paddingTop: "2%",
            paddingLeft: "8%",
        },
        wrapper: {
            height: "94%",
        },
        login: {
            display: "flex",
            '@media (max-width:960px)': {
                flexDirection: "column",
                height: "100vh",
            },
        },
        PassInput: {
            marginTop: "10px",
        },

        form: {
            height: "100vh",
            '@media (max-width:960px)': {
                background: `url(${assets.visual})`,
                backgroundSize: "100vw 100vh",
                backgroundRepeat: "no-repeat",
            },
        },
        tileWrapper: {
            position: "relative",
        },
        dontHave: {
            paddingLeft: "13%",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
        },
        signup: {
            color: colors.textPrimary,
        },

    }),
);

export default useStyles;
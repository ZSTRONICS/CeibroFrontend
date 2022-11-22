import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import colors from "../../../assets/colors";
import assets from "../../../assets/assets";
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logoWrapper: {
            paddingTop: "2%",
            paddingLeft: "8%",
        },
        wrapper: {
            height: "94%",
        },
        titleWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 0,
            paddingTop: 2,
            alignItems: 'center',
        },
        title: {
            fontSize: 30,
            fontWeight: "bold",
        },
        loginForm: {
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            padding: "10px 13%",
            "@media (max-width:960px)": {
                padding: "10 13%",
            },
        },
        register: {
            display: "flex",
            "@media (max-width:960px)": {
                flexDirection: "column",
                height: "100vh",
            },
        },
        form: {
            height: "100vh",
            overflowY: 'scroll',
            paddingBottom: 10,
            "@media (max-width:960px)": {
                background: `url(${assets.visual})`,
                backgroundSize: "100vw 100vh",
                backgroundRepeat: "no-repeat",
            },
        },
        tileWrapper: {
            position: "relative",
        },
        dontHave: {
            paddingLeft: "12.5%",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer"
        },
        signup: {
            color: colors.textPrimary,
        },
        // formTile: {
        //     display: 'inline-block',
        //     margin: 'auto',
        //     textAlign: 'center'
        // }
    }),
);

export default useStyles;
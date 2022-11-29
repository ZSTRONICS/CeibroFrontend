import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import colors from "../../../assets/colors";
import assets from "../../../assets/assets";
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({


        langContainer: {
            justifyContent: "space-between",
            display: 'flex',
            alignItems: 'center',
            marginBottom: 20,
            paddingRight: 28,
            width: '100%',
            "@media (max-width:960px)": {
                color: '#fff'
            },

            // padding: "10px 13%",
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
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer"
        },
        signup: {
            color: colors.textPrimary,
            textDecoration: 'none'
        },
        // formTile: {
        //     display: 'inline-block',
        //     margin: 'auto',
        //     textAlign: 'center'
        // }
    }),
);

export default useStyles;
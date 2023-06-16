import "./login.css";

import { CBox, CSkeleton } from "components/material-ui";
import assets from "../../../assets/assets";
//style file
import useStyles from './LoginStyles';

const LoginSkeleton= () => {
    const classes = useStyles();

    return (
        <>
            <div className={`form-container ${classes.wrapper}`}>
                <div className={classes.logoWrapper}>
                    <img src={assets.logo} alt="ceibro-logo" />
                </div>
                <div className={classes.loginForm}>

                    <CBox>
                        <CSkeleton variant="circular" width={40} height={40} />
                    </CBox>
                    <CBox className={classes.PassInput}>
                        <CSkeleton variant="rectangular" height={40} />
                    </CBox>

                    <CBox display='flex' mt={4.3}>
                        <CSkeleton variant="circular" height={24} width={24} />
                        <CBox ml={3.7}>
                            <CSkeleton height={21} width={156} />
                        </CBox>
                    </CBox>
                    <CBox display='flex' alignItems="center" mt={2.5}>
                        <CSkeleton height={32} width={64} />
                        <CBox ml={3.7}>
                            <CSkeleton height={21} width={156} />
                        </CBox>
                    </CBox>
                </div>
            </div>
            <CBox className={classes.dontHave} display='flex' alignItems='center'>
                <CSkeleton height={32} width='59%' />
            </CBox>
        </>

    );
};

export default LoginSkeleton;


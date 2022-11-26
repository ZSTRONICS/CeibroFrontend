import { LoginInterface } from "../../../constants/interfaces/Login.interface";
import useStyles from "./RegisterStyles";
import assets from 'assets/assets'
import colors from 'assets/colors'
import { Typography } from "@mui/material";
import { CBox, CSkeleton } from "components/material-ui";
const RegisterSkeleton: React.FC<LoginInterface> = () => {
    const classes = useStyles();

    return (
        <>
            dasd</>
        // <div className={`form-container ${classes.wrapper} hide-scrollbar`}>
        //     <div className={classes.logoWrapper}>
        //         <img src={assets.logo} alt="ceibro-logo" />
        //     </div>

        //     <div className={classes.titleWrapper}>
        //         <Typography className={classes.title}>Register</Typography>
        //     </div>

        //     <div className={classes.loginForm}>

        //         {[0, 1, 2, 3].map(() => (
        //             <CBox mt={3.7}>

        //                 <CSkeleton variant="rectangular" height={40} />
        //             </CBox>

        //         )

        //         )}



        //         <CBox display='flex' alignItems='center' mt={1}>
        //             <CSkeleton height={32} width={64} />
        //         </CBox>

        //     </div>
        // </div>
    )
}
export default RegisterSkeleton;
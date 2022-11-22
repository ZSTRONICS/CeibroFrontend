import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageTile from "./ImageTile";
import "./login.css";
import LoginForm from "./LoginForm";

import { LoginInterface } from "../../../constants/interfaces/Login.interface";
import { useMediaQuery } from "react-responsive";
import assets from "../../../assets/assets";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { useEffect } from "react";
import colors from "../../../assets/colors";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { baseURL } from "utills/axios";
import axios from "axios";
import { CBox, CSkeleton } from "components/material-ui";
//style file
import useStyles from './LoginStyles'
import { FormControl } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';

const LoginSkeleton: React.FC<LoginInterface> = () => {
    const classes = useStyles();


    return (
        <>
            <div className={`form-container ${classes.wrapper}`}>
                <div className={classes.logoWrapper}>
                    <img src={assets.logo} alt="ceibro-logo" />
                </div>
                <div className={classes.loginForm}>

                    <CBox>
                        <CSkeleton variant="rectangular" height={40} />
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


import React from "react";

import ForgetPasswordForm from "./ForgetPasswordForm";
import AuthLayout from "../AuthLayout/AuthLayout";
import { t } from "i18next";
import useResponsive from "hooks/useResponsive";
import { BackToLoginTag, SubLabelTag, TopBarTitle } from "components/CustomTags";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "../Register/RegisterStyles";

const ForgetPassword = () => {
  const classes = useStyles();
  const isTabletOrMobile = useResponsive("down", "md", "");
  return (
    <Box className={classes.registerNumberFormContainer}>
       <AuthLayout title="Forgot password?" subTitle="No worries, we’ll send you reset instruction">
      {isTabletOrMobile && (<div className={classes.registerNumberForm}>
        <TopBarTitle sx={{ fontSize: 28, pb: 1 }}>
          Forgot password?
        </TopBarTitle>
        <SubLabelTag sx={{ fontSize: 16, pb: 2 }}>
        No worries, we’ll send you reset instruction
      </SubLabelTag>
      </div>
      )}
      <ForgetPasswordForm />
      <BackToLoginTag>
        {t("auth.Remember")} &nbsp; &nbsp;
        <Link to="/login" style={{color:'#0076c8', textDecoration:'none'}}>
          {t("auth.login")}
        </Link>
      </BackToLoginTag>
    </AuthLayout>
    </Box>
   
  );
};

export default ForgetPassword;

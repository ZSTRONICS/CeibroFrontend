import { Box } from "@mui/material";
import {
  BackToLoginTag,
  SubLabelTag,
  TopBarTitle,
} from "components/CustomTags";
import useResponsive from "hooks/useResponsive";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "utills/axios";
import AuthLayout from "../AuthLayout/AuthLayout";
import useStyles from "../Register/RegisterStyles";
import ForgetPasswordForm from "./ForgetPasswordForm";

const ForgetPassword = () => {
  const classes = useStyles();
  const isTabletOrMobile = useResponsive("down", "md", "");
  return (
    <Box className={classes.registerNumberFormContainer}>
      <AuthLayout
        title={t("auth.forgot_password")}
        subTitle={t("auth.no_worries_we_ll_send_you_reset_instruction ")}
      >
        {isTabletOrMobile && (
          <div className={classes.registerNumberForm}>
            <TopBarTitle sx={{ fontSize: 28, pb: 1 }}>
              {t("auth.forgot_password")}
            </TopBarTitle>
            <SubLabelTag sx={{ fontSize: 16, pb: 2 }}>
              {t("auth.no_worries_we_ll_send_you_reset_instruction ")}
            </SubLabelTag>
          </div>
        )}
        <ForgetPasswordForm />
        <BackToLoginTag>
          {t("auth.Remember")} &nbsp; &nbsp;
          <Link
            to={LOGIN_ROUTE}
            style={{ color: "#0076c8", textDecoration: "none" }}
          >
            {t("auth.login")}
          </Link>
        </BackToLoginTag>
      </AuthLayout>
    </Box>
  );
};

export default ForgetPassword;

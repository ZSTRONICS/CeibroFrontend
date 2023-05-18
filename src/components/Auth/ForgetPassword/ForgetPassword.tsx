import React, { useState } from "react";

import ForgetPasswordForm from "./ForgetPasswordForm";
import AuthLayout from "../AuthLayout/AuthLayout";
import { t } from "i18next";
import useResponsive from "hooks/useResponsive";
import { TopBarTitle } from "components/CustomTags";

const ForgetPassword = () => {

  const [tokenLoading, setTokenLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const isTabletOrMobile = useResponsive("down", "md", "");
  return (
    <AuthLayout title= {t("auth.phoneNumber")}>
        {isTabletOrMobile && (
          <TopBarTitle sx={{ fontSize: 28, pb:1,}}>{t("auth.phoneNumber")}</TopBarTitle>
      )}
        <ForgetPasswordForm
          tokenLoading={tokenLoading}
          showSuccess={success}
          showError={error}
        />
    </AuthLayout>
  );
};

export default ForgetPassword;

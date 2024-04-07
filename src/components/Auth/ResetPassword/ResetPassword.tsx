import { BackToLoginTag, TopBarTitle } from "components/CustomTags";
import useResponsive from "hooks/useResponsive";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "utills/axios";
import AuthLayout from "../AuthLayout/AuthLayout";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  const { t }: any = useTranslation<any>();

  const isTabletOrMobile = useResponsive("down", "md", "");

  return (
    <AuthLayout title={t("auth.new_password")}>
      {isTabletOrMobile && (
        <TopBarTitle sx={{ fontSize: { md: 28, xs: 20 }, my: 2, ml: 1.2 }}>
          {t("auth.new_password")}
        </TopBarTitle>
      )}
      <ResetPasswordForm />
      <BackToLoginTag>
        {t("auth.remember_me")} ! &nbsp; &nbsp;
        <Link
          to={LOGIN_ROUTE}
          style={{ color: "#0076c8", textDecoration: "none" }}
        >
          {t("auth.login")}
        </Link>
      </BackToLoginTag>
    </AuthLayout>
  );
};

export default ResetPassword;

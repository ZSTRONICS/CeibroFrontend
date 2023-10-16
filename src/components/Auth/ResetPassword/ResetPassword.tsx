import { BackToLoginTag, TopBarTitle } from "components/CustomTags";
import useResponsive from "hooks/useResponsive";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "utills/axios";
import AuthLayout from "../AuthLayout/AuthLayout";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  const isTabletOrMobile = useResponsive("down", "md", "");

  return (
    <AuthLayout title="Add new password">
      {isTabletOrMobile && (
        <TopBarTitle sx={{ fontSize: { md: 28, xs: 20 }, my: 2, ml: 1.2 }}>
          Add new password
        </TopBarTitle>
      )}
      <ResetPasswordForm />
      <BackToLoginTag>
        Remember! &nbsp; &nbsp;
        <Link to={LOGIN_ROUTE} style={{ color: "#0076c8", textDecoration: "none" }}>
          Login
        </Link>
      </BackToLoginTag>
    </AuthLayout>
  );
};

export default ResetPassword;

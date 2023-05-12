import { useTranslation } from "react-i18next";
import AuthLayout from "../AuthLayout/AuthLayout";
import RegisterForm from "./RegisterForm";
import "./register.css";
import useResponsive from "hooks/useResponsive";
import { TopBarTitle } from "components/CustomTags";
const Register = () => {
  const { t } = useTranslation();
  const isTabletOrMobile = useResponsive("down", "md", "");
  return (
    <AuthLayout title={t("auth.register.setup_profile")}>
       {isTabletOrMobile && (
        <div>
          <TopBarTitle sx={{ fontSize: 28, pb:1,}}>Setup a profile</TopBarTitle>
        </div>
      )}
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;

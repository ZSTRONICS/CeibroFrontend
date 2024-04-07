import { TopBarTitle } from "components/CustomTags";
import useResponsive from "hooks/useResponsive";
import { useTranslation } from "react-i18next";
import AuthLayout from "../AuthLayout/AuthLayout";
import RegisterForm from "./RegisterForm";
import "./register.css";
const Register = () => {
  const { t }: any = useTranslation<any>();
  const isTabletOrMobile = useResponsive("down", "md", "");
  return (
    <AuthLayout title={t("auth.profile_setup_heading")}>
      {isTabletOrMobile && (
        <div>
          <TopBarTitle sx={{ fontSize: 28, pb: 1 }}>
            Setup a profile
          </TopBarTitle>
        </div>
      )}
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;

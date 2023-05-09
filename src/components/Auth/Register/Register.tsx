import { useTranslation } from "react-i18next";
import AuthLayout from "../AuthLayout/AuthLayout";
import RegisterForm from "./RegisterForm";
import "./register.css";
const Register = () => {
  const { t } = useTranslation();
  // const history = useHistory();

  // const isLoggedIn = useSelector((store: RootState) => store.auth.isLoggedIn);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     history.push("/dashboard");
  //   }
  // }, [isLoggedIn]);

  return (
 <AuthLayout title= {t("auth.register.setup_profile")}>
 <RegisterForm />
 </AuthLayout>
  );
};

export default Register;

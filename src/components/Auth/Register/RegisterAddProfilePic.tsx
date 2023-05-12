import { CBox } from "components/material-ui";
import { useState } from "react";
import AuthLayout from "../AuthLayout/AuthLayout";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { t } from "i18next";
import DragAndDrop from "components/DropFileInput/DropFileInput";

const fileTypes: string[] = ["JPEG", "PNG", "GIF", "JPG"];

export default function RegisterAddProfilePic(): JSX.Element {
  const [file, setFile] = useState<File | null>();
  const history = useHistory();

  // const uploadProfilePicture = () => {
  //   const payload = {
  //     body: {
  //       email,
  //       password,
  //       firstName,
  //       surName,
  //       jobTitle,
  //       companyName,
  //     },
  //     success: (res: any) => {
  //       history.push("/profile-pic");
  //       action?.resetForm?.();
  //     },
  //     onFailAction: (err: any) => {
  //       if (err.response.data.code === 400) {
  //         setIncorrectAuth(true);
  //       }
  //     },
  //     other: `${dialCode}${phoneNumber}`,
  //   };
  //   dispatch(registerSetupProfile(payload));
  //   setTimeout(() => {
  //     setIncorrectAuth(false);
  //   }, 5000);
  //   history.push("/dashboard");
  // };

  return (
    <AuthLayout
      title={t("auth.add_photo")}
      subTitle={t("auth.photo_description")}
    >
      <CBox>
        <DragAndDrop
          setFile={setFile}
          deleteFile={() => {
            setFile(null);
          }}
        />
      </CBox>
      <Button
        sx={{ maxWidth: "360px", width: "100%", margin: "0 auto" }}
        variant="outlined"
        color="primary"
        type="submit"
        // onClick={uploadProfilePicture}
      >
        {file ? "Continue" : "Skip"}
      </Button>
    </AuthLayout>
  );
}

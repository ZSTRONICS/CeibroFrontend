import { CBox } from "components/material-ui";
import { useState } from "react";
import AuthLayout from "../AuthLayout/AuthLayout";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { t } from "i18next";
import DragAndDrop from "components/DropFileInput/DropFileInput";
import { SubLabelTag, TopBarTitle } from "components/CustomTags";
import useResponsive from "hooks/useResponsive";
import { useDispatch } from "react-redux";
import { UpdateProfilePicture } from "redux/action/auth.action";

export default function RegisterAddProfilePic(): JSX.Element {
  const [file, setFile] = useState<string | Blob>("");
  const dispatch = useDispatch();
  const history = useHistory();
  const isTabletOrMobile = useResponsive("down", "md", "");

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      if(file){
        formData.append('profilePic', file);
        const payload = {
          body: formData,
          success: (res: any) => {
            history.push("/tasks");
          },
          onFailAction: (err: any) => {
            if (err) {
              console.error('Failed to upload image');
            }
          },
        };
        dispatch(UpdateProfilePicture(payload));
      }else{
        history.push("/tasks");
      }
  
    } catch (error) {
      console.error('Error occurred while uploading image:', error);
    }
  };

  return (
    <AuthLayout
      title={t("auth.add_photo")}
      subTitle={t("auth.photo_description")}
    >
      {isTabletOrMobile && (
        <div>
          <TopBarTitle sx={{ fontSize: 28, pb: 1 }}>
            {t("auth.add_photo")}
          </TopBarTitle>
          <SubLabelTag sx={{ fontSize: 16, pb: 2 }}>
            {t("auth.photo_description")}
          </SubLabelTag>
        </div>
      )}
      <CBox sx={{ maxWidth: "390px", width: "100%", mt: 3 }}>
        <DragAndDrop
          setFile={setFile}
          deleteFile={() => {
            setFile("");
          }}
        />
      </CBox>
      <Button
        sx={{ maxWidth: "390px", width: "100%", margin: "0 auto", mt: 2,   py:{xs:0.5, md:1.5} }}
        variant={file ? "contained" : "outlined"}
        color="primary"
        type="submit"
        onClick={uploadImage}
      >
        {file ? "Continue" : "Skip"}
      </Button>
    </AuthLayout>
  );
}

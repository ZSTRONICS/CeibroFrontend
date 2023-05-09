import { CBox } from "components/material-ui";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import AuthLayout from "../AuthLayout/AuthLayout";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { t } from "i18next";
import ProfileView from "./ProfilePicView";
import DragAndDrop from "components/DropFileInput/DropFileInput";

interface FileLikeObject {
  file: File;
  name: string;
  preview?: string;
}

const fileTypes: string[] = ["JPEG", "PNG", "GIF", "JPG"];

export default function RegisterSetupProfile(): JSX.Element {
  const [file, setFile] = useState<FileLikeObject[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const history = useHistory();

  const handleChange = (file: any) => {
    setFile(file);
    setImageUrl(URL.createObjectURL(file[0]));
  };

  const HandleremoveImg =()=>{
    setImageUrl("");
  }
  return (
    <AuthLayout
      title={t("auth.add_photo")}
      subTitle={t("auth.photo_description")}
    >
      <CBox>
        {/* <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          classes="dragArea"
        /> */}
        <DragAndDrop
        />
        <p/>
        {imageUrl && (
          <ProfileView imgSrc={imageUrl} title={file ?file[0].name:""} removeImg={HandleremoveImg}/>
          // <img src={imageUrl} alt="uploaded file" width="300" height="300" />
        )}
      </CBox>
           <Button
           sx={{maxWidth:'360px', width:"100%", margin:"0 auto"}}
        variant="outlined"
        color="primary"
        type="submit"
        // onClick={() => history.push("/dashboard")}
      >
        Skip
      </Button>
   
    </AuthLayout>
  );
}

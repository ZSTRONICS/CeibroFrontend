import { CBox } from "components/material-ui";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

interface FileLikeObject {
  file: File;
  name: string;
  preview?: string;
}

const fileTypes: string[] = ["JPEG", "PNG", "GIF", "JPG"];

export default function RegisterSetupProfile(): JSX.Element {
  const [file, setFile] = useState<FileLikeObject[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleChange = (file: any) => {
    setFile(file);
    console.log(file, "file");
    setImageUrl(URL.createObjectURL(file[0]));
  };

  return (
    <CBox>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        classes=""
      />
      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
      {imageUrl ? (
        <img src={imageUrl} alt="uploaded file" width="300" height="300" />
      ) : (
        <p>no files uploaded yet</p>
      )}
    </CBox>
  );
}

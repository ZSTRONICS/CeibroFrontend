import React from "react";
import DetailsHeader from "./DetailsHeader";
import FileBox from "components/Utills/FileBox";
import DetailsBody from "./DetailsBody";

export default function TaskDetails() {
  return (
    <>
      <DetailsHeader />
      <FileBox
        title="Files"
        files={[
          { fileName: "my-new-cover.pdf", fileSize: "100kb" },
          { fileName: "my-new-cover.pdf", fileSize: "100kb" },
        ]}
        showIcon={true}
      />
      <DetailsBody />
    </>
  );
}

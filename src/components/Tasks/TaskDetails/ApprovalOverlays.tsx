import { Box } from "@mui/material";
import { CustomStack, Heading2 } from "components/CustomTags";
import { IS_IMAGE } from "components/Utills/Globals";
import ImagesToUpload from "components/Utills/ImageBox/ImagesToUpload";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { taskActions } from "redux/action";
import Footer from "../Create-Task/Footer";
import { fileType } from "../type";

interface IProps {
  title: string;
  taskId: string;
  handleClose: () => void;
}

function ApprovalOverlays(props: IProps) {
  const { title, taskId, handleClose } = props;
  const dispatch = useDispatch();
  const isApprove = title === "Approve";
  const isRejectReopen = title === "Reject-Reopen";
  const [selectedImages, setSelectedImages] = useState<ImageWithComment[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<
    ImageWithComment[]
  >([]);

  const [reason, setReason] = useState<string>("");

  const handleClearFile = (file: ImageWithComment | any, type: fileType) => {
    if (type === "image") {
      const filteredData = selectedImages.filter(
        (commentFile: ImageWithComment) => {
          return commentFile.file.name !== file.name;
        }
      );
      setSelectedImages(filteredData);
    } else {
      const filterSelectedDocs = selectedDocuments.filter(
        (commentFile: ImageWithComment) => {
          return commentFile.file.name !== file.file.name;
        }
      );
      setSelectedDocuments(filterSelectedDocs);
    }
  };
  const handleDisableSubmit = () => {
    let valid = true;
    valid = reason.length !== 0 && reason.length !== 0 ? false : true;
    return valid;
  };
  const handleAttachImageValue = (files: ImageWithComment[]) => {
    const newFiles = files.filter(
      (file) =>
        !selectedImages.some((item) => item.file.name === file.file.name)
    );
    if (newFiles.length < files.length) {
      toast.error("Some images are already added in the list");
    }
    setSelectedImages([...selectedImages, ...newFiles]);
  };
  const handleSelectDocumentValue = (files: ImageWithComment[]) => {
    const newFiles = files.filter(
      (file) =>
        !selectedDocuments.some((item) => item.file.name === file.file.name)
    );
    if (newFiles.length < files.length) {
      toast.error("Some Document already added in the list");
    }
    setSelectedDocuments([...selectedDocuments, ...newFiles]);
  };

  const handleApproval = () => {
    const formData = new FormData();
    const filesToUpload = [...selectedImages, ...selectedDocuments];
    formData.append("comment", reason);
    if (selectedImages.length > 0 || selectedDocuments.length > 0) {
      try {
        if (!filesToUpload || filesToUpload.length === 0) {
          console.error("No files to upload.");
          return;
        }
        const metadataObjects: any = [];
        filesToUpload.forEach((file: ImageWithComment | any) => {
          const { file: localFile, comment } = file;
          formData.append("files", localFile);
          let metadata: any = {
            fileName: localFile.name,
            orignalFileName: localFile.name,
            tag: IS_IMAGE(localFile.name)
              ? comment.length > 0
                ? "image+comment"
                : "image"
              : "file",
          };
          if (metadata.tag !== "file") {
            metadata["comment"] = comment;
          }
          metadataObjects.push(JSON.stringify(metadata));
        });
        const finalMetadata = JSON.stringify(metadataObjects);
        formData.append("metadata", finalMetadata);
      } catch (error) {
        console.error("Error occurred while uploading files:", error);
      }
    }
    const payload = {
      other: {
        hasFiles: filesToUpload.length > 0,
        taskId: taskId,
      },
      body: formData,
      success: (res: any) => {
        if (res) {
          handleClose();
        }
      },
    };
    if (isApprove) {
      dispatch(taskActions.taskApprove(payload));
    } else if (isRejectReopen) {
      dispatch(taskActions.taskRejectReopen(payload));
    } else {
      dispatch(taskActions.taskRejectClose(payload));
    }
  };

  return (
    <CustomStack
      sx={{
        width: "auto",
        height: "450px",
        m: 1,
        px: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Heading2 sx={{ color: isApprove ? "#1A8718" : "#D9000D" }}>
          {title}{" "}
        </Heading2>
        <Heading2
          sx={{ fontWeight: 400, py: 1, color: "#818181", fontSize: "14px" }}
        >
          Please provide reason or attach image/file as prove for {title} of
          this task.
        </Heading2>
        <CustomMuiTextField
          inputVariant="standard"
          multiline={true}
          required={true}
          typeName="counterText-field"
          name="reason"
          label="Reason"
          placeholder={"Enter reason"}
          inputValue={reason}
          onChange={(e: any) => setReason(e.target.value)}
          maxLength={1500}
          maxRows={5}
          inputProps={{ style: { background: "white" } }}
        />
        {selectedImages.length > 0 && (
          <>
            <ImagesToUpload
              taskApproveModal={true}
              showLabel={true}
              imgwithcomment={true}
              updateImageWithComment={(updatedImage: ImageWithComment) => {
                const updatedImagesLocal = selectedImages.map(
                  (img: ImageWithComment) => {
                    if (img.file.name === updatedImage.file.name) {
                      return updatedImage;
                    }
                    return img;
                  }
                );
                setSelectedImages(updatedImagesLocal);
              }}
              selectedImages={selectedImages}
              onClearFile={(file: any, type: fileType) => {
                handleClearFile(file, type);
              }}
            />
          </>
        )}

        {selectedDocuments.length > 0 && (
          <Box>
            <ReadMoreWrapper
              count={0}
              title="Files"
              type="file"
              data={selectedDocuments}
              callback={handleClearFile}
              allowExpandedView={false}
            />
          </Box>
        )}
      </Box>

      <Footer
        FooterPosition="sticky"
        handleClose={() => {}}
        isImgWithComment={true}
        isFilesWithComment={true}
        acceptImgOnly={false}
        isSubmitted={false}
        disabled={handleDisableSubmit()}
        showHeader={false}
        handleSubmitForm={handleApproval}
        handleAttachImageValue={handleAttachImageValue}
        handleGetLocationValue={() => {}}
        handleSelectDocumentValue={handleSelectDocumentValue}
      />
    </CustomStack>
  );
}

export default ApprovalOverlays;

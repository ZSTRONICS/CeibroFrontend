import { Box, Divider, FormControl, Input } from "@mui/material";
import { CustomDivider, MUIInputLabel } from "components/CustomTags";
import FileBox from "components/Utills/FileBox";
import { IS_IMAGE, hasOnlySpaces } from "components/Utills/Globals";
import ImagesToUpload from "components/Utills/ImageBox/ImagesToUpload";
import { TASK_CONFIG } from "config";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { taskActions } from "redux/action";
import { removeItem } from "utills/common";
import Footer from "../Create-Task/Footer";
import TaskHeader from "../TaskHeader";
import { fileType } from "../type";

interface CommentProps {
  title: string;
  showHeader: boolean;
  taskId: string;
  doneImageRequired: boolean;
  doneCommentsRequired: boolean;
  closeModal: () => void;
}

const Comment = ({
  title,
  showHeader,
  taskId,
  closeModal,
  doneCommentsRequired,
  doneImageRequired,
}: CommentProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch();
  const [doOne, setDoOne] = useState(false);
  const handleClearFile = (file: File, type: fileType) => {
    if (type === "image") {
      const filterSelectedImages = removeItem(selectedImages, file);
      setSelectedImages(filterSelectedImages);
    } else {
      const filterSelectedDocs = removeItem(selectedDocuments, file);
      setSelectedDocuments(filterSelectedDocs);
    }
  };

  const handleAttachImageValue = (files: File[]) => {
    const newFiles = files.filter(
      (file) => !selectedImages.some((item) => item.name === file.name)
    );
    if (newFiles.length < files.length) {
      toast.error("Some images are already added in the list");
    }
    setSelectedImages([...selectedImages, ...newFiles]);
  };

  const handleSelectDocumentValue = (files: File[]) => {
    const newFiles = files.filter(
      (file) => !selectedDocuments.some((item) => item.name === file.name)
    );
    if (newFiles.length < files.length) {
      toast.error("Some Document already added in the list");
    }
    setSelectedDocuments([...selectedDocuments, ...newFiles]);
  };

  const handleFileUpload = (files: any, formData: FormData | any) => {
    try {
      if (!files || files.length === 0) {
        console.error("No files to upload.");
        return;
      }

      const metadataObjects: any = [];
      if (doOne === false) {
        files.forEach((file: any) => {
          formData.append("files", file, file.name);
          // formData.append("files", file);
          metadataObjects.push(
            JSON.stringify({
              fileName: file.name,
              orignalFileName: file.name,
              tag: IS_IMAGE(file.name) ? "image" : "file",
            })
          );
        });
        const finalMetadata = JSON.stringify(metadataObjects);
        formData.append("metadata", finalMetadata);
        setDoOne(true);
      }
    } catch (error) {
      console.error("Error occurred while uploading files:", error);
    }
  };
  const handleCloseModal = () => {
    closeModal();
    setDescription("");
  };
  const handleSubmit = () => {
    const formdata = new FormData();
    setIsSubmit(true);
    const filesToUpload = [...selectedImages, ...selectedDocuments];
    formdata.append("message", description);
    if (filesToUpload.length > 0) {
      handleFileUpload(filesToUpload, formdata);
    }
    const taskEvent = {
      other: {
        eventName: title === "Task Done" ? "doneTask" : "comment",
        taskId: taskId,
        hasFiles: filesToUpload.length > 0,
      },
      body: formdata,
      success: (res: any) => {
        if (res) {
          dispatch({
            type: TASK_CONFIG.UPDATE_TASK_WITH_EVENTS,
            payload: res.data.data,
          });
          dispatch({
            type: TASK_CONFIG.TASK_DRAGABLE_CONTAINER_HEIGHT,
            payload: 0,
          });
          setIsSubmit(false);
          handleCloseModal();
          setSelectedImages([]);
          setSelectedDocuments([]);
        }
      },
      onFailAction: () => {
        setIsSubmit(false);
      },
    };
    dispatch(taskActions.taskEventsWithFiles(taskEvent));
  };

  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (hasOnlySpaces(e.target.value)) {
        setDescription("");
      } else {
        setDescription(e.target.value);
      }
    },
    [setDescription]
  );

  return (
    <>
      <Box sx={{ width: "100%", pt: "8px" }}>
        {showHeader !== true && <TaskHeader title={title} />}
        {selectedImages.length > 0 && (
          <ImagesToUpload
            isComment={true}
            selectedImages={selectedImages}
            onClearFile={(file: any, type: any) => handleClearFile(file, type)}
          />
        )}
        {selectedDocuments.length > 0 && (
          <>
            <FileBox
              title="Files"
              showFullHeight={false}
              files={selectedDocuments}
              handleClearFile={handleClearFile}
            />
            <Divider
              key="bottom-divider"
              sx={{
                my: 1.25,
                borderColor: "#9e9e9e",
                borderRadius: "4px",
                opacity: "0.9",
                background: "#F4F4F4",
                filter: "blur(2px)",
              }}
            />
          </>
        )}
        <Box
          sx={{
            height: "auto",
            padding: "2px 2px",
            mt: 0.5,
          }}
        >
          <FormControl
            variant="standard"
            sx={{ width: "100%", fontFamily: "Inter" }}
          >
            <MUIInputLabel htmlFor="comment">Comment</MUIInputLabel>
            <Input
              name="comment"
              id="comment"
              required
              autoFocus
              multiline
              value={description}
              sx={{
                width: "100%",
                "&:hover:not(.Mui-disabled, .Mui-error):before": {
                  borderBottom: "none !important",
                },
                "&::before, &::after": {
                  borderBottom: "none",
                },
              }}
              onChange={handleDescriptionChange}
            />
          </FormControl>
          <CustomDivider key="bottom-divider3" sx={{ mt: "3px", mb: 1 }} />
        </Box>
      </Box>
      <Footer
        isCommentUi={true}
        isSubmitted={isSubmit}
        disabled={
          isSubmit ||
          (title === "Task Done"
            ? (doneImageRequired && selectedImages.length === 0) ||
              (doneCommentsRequired && description.length === 0)
            : selectedImages.length > 0 ||
              selectedDocuments.length > 0 ||
              description.length > 0
            ? false
            : true)
        }
        handleClose={handleCloseModal}
        showHeader={showHeader}
        handleSubmitForm={handleSubmit}
        handleAttachImageValue={handleAttachImageValue}
        handleSelectDocumentValue={handleSelectDocumentValue}
      />
    </>
  );
};

export default Comment;

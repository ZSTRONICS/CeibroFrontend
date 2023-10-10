import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box, IconButton, TextField } from "@mui/material";
import FileBox from "components/Utills/FileBox";
import ImageBox from "components/Utills/ImageBox";
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
              tag: "file",
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
        eventName: title === "Task Comment" ? "comment" : "doneTask",
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
          setIsSubmit(false);
          setDescription("");
          closeModal();
          setSelectedImages([]);
          setSelectedDocuments([]);
          setDescription("");
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
      setDescription(e.target.value);
    },
    [setDescription]
  );

  return (
    <Box sx={{ width: "100%", padding: "8px" }}>
      {showHeader !== true && <TaskHeader title={title} />}
      <Box sx={{ padding: "4px", width: "100%" }}>
        <TextField
          name="description"
          id="description-multiline"
          label="Description"
          multiline
          maxRows={4}
          variant="standard"
          sx={{ width: "100%" }}
          onChange={handleDescriptionChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "16px 0",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            height: "0.4rem",
          },
          "&::-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            borderRadius: "0.2rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
          },
        }}
      >
        {selectedImages.map((file) => {
          return (
            <Box
              sx={{
                width: "80px",
                height: "80px",
                display: "flex",
                marginRight: "16px",
              }}
            >
              <ImageBox src={URL.createObjectURL(file)} />
              <IconButton
                aria-label="delete"
                onClick={() => {
                  handleClearFile(file, "image");
                }}
                sx={{
                  top: "-6px",
                  right: "4px",
                  backgroundColor: "#0076C8",
                  color: "#fff",
                  width: "16px",
                  height: "16px",
                }}
                disableRipple
              >
                <ClearOutlinedIcon sx={{ width: "16px", height: "16px" }} />
              </IconButton>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          height: "auto",
          padding: "16px 0",
        }}
      >
        <FileBox
          title="Files"
          files={selectedDocuments}
          handleClearFile={handleClearFile}
        />
      </Box>
      <Footer
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
        showHeader={showHeader}
        handleSubmitForm={handleSubmit}
        handleAttachImageValue={handleAttachImageValue}
        handleSelectDocumentValue={handleSelectDocumentValue}
      />
    </Box>
  );
};

export default Comment;

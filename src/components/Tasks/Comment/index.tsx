import { Box, Button, IconButton, TextField } from "@mui/material";
import TaskHeader from "../TaskHeader";
import ImageBox from "components/Utills/ImageBox";
import FileBox from "components/Utills/FileBox";
import Footer from "../Create-Task/Footer";
import { ChangeEvent, useState } from "react";
import _ from "lodash";
import { removeItem } from "utills/common";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { toast } from "react-toastify";
import { fileType } from "../type";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";
import { useParams } from "react-router-dom";

interface CommentProps {
  title: string;
  showHeader: boolean;
  taskId: string;
  closeModal: () => void;
}

const Comment = ({ title, showHeader, taskId, closeModal }: CommentProps) => {
  // const { taskId } = useParams<RouteParams>();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
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

  const handleAttachImageValue = (file: File) => {
    const found = selectedImages.find((item: File) => {
      return item.name === file.name;
    });
    if (!found) {
      setSelectedImages([...selectedImages, file]);
    } else {
      toast.error("Image already added in the list");
    }
  };
  const handleSelectDocumentValue = (file: File) => {
    const found = selectedDocuments.find((item: File) => {
      return item.name === file.name;
    });
    if (!found) {
      setSelectedDocuments([...selectedDocuments, file]);
    } else {
      toast.error("Document already added in the list");
    }
  };

  const handleFileUpload = (files: any, formData: FormData) => {
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
    const filesToUpload = [...selectedImages, ...selectedDocuments];
    formdata.append("message", description);
    if (filesToUpload.length > 0) {
      handleFileUpload(filesToUpload, formdata);
    }
    if (title === "Task Comment") {
      dispatch(
        taskActions.taskEventsWithFiles({
          other: {
            eventName: "comment",
            taskId: taskId,
            hasFiles: filesToUpload.length > 0 ? true : false,
          },
          body: formdata,
          success: (res) => {
            closeModal();
          },
        })
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
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
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
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
        disabled={
          selectedImages.length > 0 ||
          selectedDocuments.length > 0 ||
          description.length > 0
            ? false
            : true
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

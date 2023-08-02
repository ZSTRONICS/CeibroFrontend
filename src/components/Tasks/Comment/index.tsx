import { Box, IconButton, TextField } from "@mui/material";
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

interface CommentProps {
  title: string;
}

const Comment = ({ title }: CommentProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");

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

  const handleSubmit = () => {};

  return (
    <Box>
      <TaskHeader title={title} />
      <Box sx={{ padding: "16px", width: "100%" }}>
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
          padding: "16px",
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
        }}
      >
        <FileBox
          title="Files"
          files={selectedDocuments}
          handleClearFile={handleClearFile}
        />
      </Box>
      <Footer
        handleSubmitForm={handleSubmit}
        handleAttachImageValue={handleAttachImageValue}
        handleSelectDocumentValue={handleSelectDocumentValue}
      />
    </Box>
  );
};

export default Comment;

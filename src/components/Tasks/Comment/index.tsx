import { Box, TextField } from "@mui/material";
import TaskHeader from "../TaskHeader";
import ImageBox from "components/Utills/ImageBox";
import FileBox from "components/Utills/FileBox";
import Footer from "../Create-Task/Footer";
import { useState } from "react";

const NewComment = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);

  const handleAttachImageValue = (file: File) => {
    setSelectedImages([...selectedImages, file]);
  };
  const handleSelectDocumentValue = (file: File) => {
    setSelectedDocuments([...selectedDocuments, file]);
  };
  return (
    <Box>
      <TaskHeader title="New comment" />
      <Box sx={{ padding: "16px", width: "100%" }}>
        <TextField
          name="description"
          id="description-multiline"
          label="Description"
          multiline
          maxRows={4}
          variant="standard"
          sx={{ width: "100%" }}
          //   onChange={handleDescriptionChange}
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
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          padding: "16px",
        }}
      >
        <FileBox title="Files" files={selectedDocuments} />
      </Box>
      <Footer
        handleSubmitForm={function (): void {
          console.log("submit button");
        }}
        handleAttachImageValue={handleAttachImageValue}
        handleSelectDocumentValue={handleSelectDocumentValue}
      />
    </Box>
  );
};

export default NewComment;

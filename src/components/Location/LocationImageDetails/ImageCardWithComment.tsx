import { Box } from "@mui/material";
import ImgCard from "components/Auth/Register/ImgCard";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { useEffect, useState } from "react";

interface IProps {
  img?: any;
  setDescription: (description: string) => void;
  fileComment: string;
  taskApproveModal?: boolean;
  selectedImages: ImageWithComment[];
}

const ImageCardWithComment = ({
  taskApproveModal,
  img,
  setDescription,
  fileComment,
  selectedImages,
}: IProps) => {
  const [value, setValue] = useState(fileComment);

  useEffect(() => {
    setValue(fileComment);
  }, [selectedImages.length]);

  const handleImgComment = () => {
    setDescription(value);
  };

  return (
    <>
      <Box
        sx={{
          marginBottom: "20px",
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          display: "flex",
          gap: 1,
        }}
      >
        <ImgCard
          taskApproveModal={taskApproveModal}
          imgSrc={img}
          title={""}
          ImageWithComments={true}
          showCancelBtn={false}
        />
        <Box
          sx={{
            width: "100%",
            paddingBottom: "0px",
          }}
        >
          <CustomMuiTextField
            inputVariant="standard"
            multiline={true}
            required={true}
            typeName="counterText-field"
            name="description"
            label="Enter Description"
            placeholder={"Description"}
            inputValue={value}
            onBlur={handleImgComment}
            onChange={(e: any) => {
              setValue(e.target.value);
              handleImgComment();
            }}
            maxLength={1500}
            maxRows={3}
            inputProps={{ style: { background: "white" } }}
          />
        </Box>
      </Box>
    </>
  );
};

export default ImageCardWithComment;

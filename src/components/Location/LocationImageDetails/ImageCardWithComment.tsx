import { Box } from "@mui/material";
import ImgCard from "components/Auth/Register/ImgCard";
import { CustomMuiTextField } from "components/material-ui/customMuiTextField";
import { useState } from "react";

interface IProps {
  img?: any;
}

const ImageCardWithComment = ({ img }: IProps) => {
  const obj = {
    url: "https://images.pexels.com/photos/20088077/pexels-photo-20088077/free-photo-of-black-and-white-photo-of-birds-on-a-ledge.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    fileName: "Pexal_Pic_Name",
    inputtile: "Enter Comments",
    inputlabel: "Enter Comments",
    inputvalue: "inputvalue",
  };

  const [description, setDescription] = useState("");

  return (
    <Box
      sx={{
        width: 250,
        marginBottom: "20px",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <ImgCard
        imgSrc={img}
        title={""}
        // ImageWithComments={true}
        showCancelBtn={false}
      />
      <Box
        sx={{
          width: "82%",
          marginLeft: "9%",
          paddingBottom: "15px",
        }}
      >
        <CustomMuiTextField
          inputVariant="standard"
          multiline={true}
          required={true}
          typeName="counterText-field"
          name="description"
          label="Enter Descriptoin"
          placeholder={"Description"}
          inputValue={description}
          onChange={(e: any) => setDescription(e.target.value)}
          maxLength={1500}
          maxRows={3}
          inputProps={{ style: { background: "white" } }}
        />
      </Box>
    </Box>
  );
};

export default ImageCardWithComment;

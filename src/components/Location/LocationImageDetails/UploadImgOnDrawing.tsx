import { Backdrop, Box, CircularProgress, Theme } from "@mui/material";
import MuiAutocomplete from "components/CustomAutocomplete/MuiAutocomplete";
import { CustomStack } from "components/CustomTags";
import Footer from "components/Tasks/Create-Task/Footer";
import { OptionType, fileType } from "components/Tasks/type";
import { getDropdownOptions } from "components/Utills/Globals";
import ImagesToUpload from "components/Utills/ImageBox/ImagesToUpload";
import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PROJECT_APIS, taskActions } from "redux/action";
import { RootState } from "redux/reducers";
interface IProps {
  pdfPageDimension: { width: number; height: number };
  closeModal: () => void;
  drawingId: string | null;
}

function UploadImgOnDrawing(props: IProps) {
  const { pdfPageDimension, closeModal, drawingId } = props;
  const isRenderEffect = useRef<any>(false);
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImageWithComment[]>([]);
  const [options, setOptions] = useState<OptionType[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<OptionType[]>([]);
  const { user } = useSelector((store: RootState) => store.auth);
  const Topics = useSelector((state: RootState) => state.task.Topics);
  const userId = user && String(user._id);

  useEffect(() => {
    if (!isRenderEffect.current && Topics.allTopics.length === 0) {
      dispatch(taskActions.getAllTopic());
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  useEffect(() => {
    if (Topics && !isEmpty(Topics)) {
      const getAllTopicOptions: OptionType[] | null = getDropdownOptions(
        Topics.allTopics.filter(Boolean),
        "topic",
        "_id"
      );
      setOptions(getAllTopicOptions);
    }
  }, [Topics, Topics.allTopics.length]);

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

  const handleClearFile = (file: File, type: fileType) => {
    if (type === "image") {
      const filteredData = selectedImages.filter(
        (commentFile: ImageWithComment) => {
          return commentFile.file.name !== file.name;
        }
      );
      setSelectedImages(filteredData);
    }
  };
  const handleDisableSubmit = () => {
    let valid = true;
    valid =
      selectedImages.length !== 0 && selectedTags.length !== 0 ? false : true;
    return valid || isSubmit;
  };

  const handleUploadImgOnDrawing = () => {
    const formData = new FormData();
    const x_coord = Math.random() * pdfPageDimension.width;
    const y_coord = Math.random() * pdfPageDimension.height;
    const pinData = {
      page_width: pdfPageDimension.width,
      page_height: pdfPageDimension.height,
      x_coord,
      y_coord,
      creator: userId,
    };

    const metadataString = JSON.stringify(pinData).replace(/"/g, '\\"');
    const finalMetadata = `"${metadataString}"`;
    formData.append("pinData", finalMetadata);
    if (selectedImages.length > 0) {
      try {
        if (!selectedImages || selectedImages.length === 0) {
          console.error("No files to upload.");
          return;
        }
        const metadataObjects: any = [];
        const userSelectedTags = selectedTags.map((tag) => String(tag.label));
        selectedImages.forEach((imageWithComment: ImageWithComment) => {
          const { file, comment } = imageWithComment;
          formData.append("files", file);
          metadataObjects.push(
            JSON.stringify({
              fileName: file.name,
              orignalFileName: file.name,
              tag: "drawingImage",
              userFileTags: userSelectedTags,
              comment: comment,
            })
          );
        });
        const finalMetadata = JSON.stringify(metadataObjects);
        formData.append("metadata", finalMetadata);
        if (drawingId) {
          dispatch(
            PROJECT_APIS.uploadImageOnDrawing({
              other: {
                drawingId: drawingId,
              },
              body: formData,
              success: (res) => {
                if (res) {
                  setSelectedImages([]);
                  setSelectedTags([]);
                  closeModal();
                }
              },
            })
          );
        }
      } catch (error) {
        console.error("Error occurred while uploading files:", error);
      }
    }
  };

  return (
    <CustomStack
      sx={{
        width: "auto",
        height: "450px",
        m: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <MuiAutocomplete
          placeholder="Start typing name"
          inputLabel="Select Tags"
          options={options}
          onChangeValues={setSelectedTags}
        />
        {selectedImages.length > 0 && (
          <ImagesToUpload
            showLabel={false}
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
        )}
      </Box>

      <Footer
        FooterPosition="sticky"
        handleClose={() => {}}
        isImgWithComment={true}
        acceptImgOnly={true}
        isSubmitted={isSubmit}
        disabled={handleDisableSubmit()}
        showHeader={false}
        handleSubmitForm={handleUploadImgOnDrawing}
        handleAttachImageValue={handleAttachImageValue}
        handleGetLocationValue={() => {}}
        handleSelectDocumentValue={() => {}}
      />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        }}
        open={isSubmit}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </CustomStack>
  );
}

export default UploadImgOnDrawing;

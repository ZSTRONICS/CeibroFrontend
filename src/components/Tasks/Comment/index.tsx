import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { Box, FormControl, Input, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomButton from "components/Utills/CustomButton";
import FileBox from "components/Utills/FileBox";
import {
  IS_IMAGE,
  hasOnlySpaces,
  isValidDocumentType,
  validTypes,
} from "components/Utills/Globals";
import ImagesToUpload from "components/Utills/ImageBox/ImagesToUpload";
import { SendIcon } from "components/material-ui/icons";
import Emoji from "components/material-ui/icons/emoji/Emoji";
import { TASK_CONFIG } from "config";
import _ from "lodash";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { taskActions } from "redux/action";
import { removeItem } from "utills/common";
import { fileType } from "../type";

interface CommentProps {
  showHeader: boolean;
  taskId: string;
  isCommentView?: boolean;
}

const Comment = ({ taskId, isCommentView }: CommentProps) => {
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
        eventName: "comment",
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
      if (hasOnlySpaces(e.target.value)) {
        setDescription("");
      } else {
        setDescription(e.target.value);
      }
    },
    [setDescription]
  );

  const handleSelectDocument = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = validTypes.join(", ");
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && !_.isEmpty(files)) {
        let attachments = [];
        attachments = Array.from(files).filter((file) =>
          file.type.startsWith("image/")
        );
        const validFiles = Array.from(files).filter((file) =>
          isValidDocumentType(file.type)
        );
        if (attachments.length > 0) {
          handleAttachImageValue(attachments);
        }
        if (!_.isEmpty(validFiles)) {
          handleSelectDocumentValue(validFiles);
        }
      }
    };
    input.click();
  };
  const disableBtn =
    description.length === 0 &&
    selectedDocuments.length === 0 &&
    selectedImages.length === 0;

  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down(1300));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        borderTop: "1px solid #E2E4E5",
        paddingTop: "6px",
      }}
    >
      <Box
        sx={{
          width: isCommentView ? "85%" : "95%",
          backgroundColor: "#E2E4E5",
          borderRadius: "22px",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "8px",
          marginLeft: "4px",
        }}
      >
        <Box
          sx={{
            width: "5%",
            marginBottom: "3px",
            marginLeft: isCommentView ? "16px" : isMdScreen ? "7px" : "0px",
            display: "flex",
            justifyContent: isMdScreen ? "flex-end" : "center",
          }}
        >
          <Emoji />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: isCommentView
              ? isMdScreen
                ? "80%"
                : "85%"
              : isMdScreen
              ? "85%"
              : "90%",
          }}
        >
          <FormControl
            variant="standard"
            sx={{
              width: "100%",
              height: "100%",
              fontFamily: "Inter",
              background: "#E2E4E5",
              padding: "3px 2px 3px 12px",
              display: "flex",
              flexDirection: "row",
              transform: "translateY(5px)",
              alignItems: "flex-end",
            }}
          >
            <Input
              placeholder="Start typing here"
              name="comment"
              id="comment"
              required
              inputProps={{ maxLength: 1500 }}
              autoFocus
              multiline
              value={description}
              sx={{
                width: isMdScreen ? "80%" : "80%",
                "&:hover:not(.Mui-disabled, .Mui-error):before": {
                  borderBottom: "none !important",
                },
                "&::before, &::after": {
                  borderBottom: "none",
                },
              }}
              onChange={handleDescriptionChange}
              maxRows={3}
            />
            <span
              style={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: "12px",
                fontWeight: 500,
                color: "#757575",
                paddingBottom: "3px",
                paddingRight: "2px",
                width: isMdScreen ? "20%" : "20%",
              }}
            >
              {`${description.length}/ 1500`}
            </span>
          </FormControl>
          <Box sx={{ width: "100%", marginLeft: "5px" }}>
            {selectedImages.length > 0 && (
              <ImagesToUpload
                imgwithcomment={false}
                showDivder={false}
                showLabel={true}
                updateImageWithComment={() => {}}
                isComment={true}
                selectedImages={selectedImages}
                onClearFile={(file: any, type: any) =>
                  handleClearFile(file, type)
                }
              />
            )}
            {selectedDocuments.length > 0 && (
              <>
                <Box
                  sx={{
                    width: "100%",
                    overflow: "auto",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#605C5C",
                      pt: 1,
                    }}
                  >
                    Files
                  </Typography>
                  <FileBox
                    iscomment={true}
                    isnoWrap={true}
                    files={selectedDocuments}
                    handleClearFile={handleClearFile}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            transform: "translateY(5px)",
            width: isCommentView
              ? isMdScreen
                ? "10%"
                : "10%"
              : isMdScreen
              ? "10%"
              : "5%",
          }}
          onClick={handleSelectDocument}
        >
          <AttachFileOutlinedIcon
            sx={{
              color: "#818181",
              transform: "rotate(40deg)",
              marginLeft: "5px",
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: isCommentView ? "15%" : "10%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CustomButton
          onClick={handleSubmit}
          variant="outlined"
          disableRipple
          icon={<SendIcon />}
          disabled={disableBtn}
          loading={isSubmit}
          sx={{
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#0076C8",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "scale(0.8) translateY(8px) ",
            "&:hover": {
              backgroundColor: "#0076C8",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Comment;

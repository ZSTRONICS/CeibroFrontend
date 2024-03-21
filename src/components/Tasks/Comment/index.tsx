import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { Box, FormControl, Input, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { taskActions } from "redux/action";
import { removeItem } from "utills/common";
import { fileType } from "../type";

interface CommentProps {
  title: string;
  showHeader: boolean;
  taskId: string;
  doneImageRequired: boolean;
  doneCommentsRequired: boolean;
  isCommentView?: boolean;
}

const Comment = ({
  title,
  showHeader,
  taskId,
  doneCommentsRequired,
  doneImageRequired,
  isCommentView,
}: CommentProps) => {
  ////
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch();
  const commentRef = useRef<HTMLDivElement | null>(null);
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
        // border: "solid 1px red",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        borderTop: "1px solid #E2E4E5",
        paddingTop: "6px",
      }}
    >
      {/* startInputmain */}
      {/* <CustomStack
        sx={{ gap: 0.8, alignItems: "center", border: "solid 2px green" }}
      > */}
      {/* input */}
      {/* <Box sx={{ width: "90%", border: "solid 1px red" }}>
          <FormControl
            variant="standard"
            sx={{
              width: "100%",
              height: "100%",
              fontFamily: "Inter",
              background: "#E2E4E5",
              borderRadius: "22px",
              padding: "3px 2px 3px 12px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Input
              name="comment"
              id="comment"
              required
              inputProps={{ maxLength: 1500 }}
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
              maxRows={3}
            />
          </FormControl>
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "12px",
              fontWeight: 500,
              color: "#757575",
              paddingBottom: "3px",
              paddingRight: "5px",
            }}
          >
            {`${description.length}/ 1500`}
          </span>
        </Box> */}
      {/* end input //// */}
      {/* getfile */}
      {/* <CustomButton
          sx={{
            "&:hover": {
              border: "0px solid transparent",
            },
            span: {
              marginRight: "0px",
            },
          }}
          icon={<AttachFileOutlinedIcon sx={{ color: "#818181" }} />}
          onClick={handleSelectDocument}
        /> */}
      {/* // endgetfile */}
      {/* sendbutton */}
      {/* <CustomButton
          sx={{
            "&:hover": {
              border: "0px solid transparent",
              backgroundColor: "#0076C8",
            },
            padding: "10px 8px",
            backgroundColor: "#0076C8",
            span: {
              marginRight: "0px",
            },
          }}
          disabled={disableBtn || isSubmit}
          icon={<SendIcon />}
          onClick={handleSubmit}
        /> */}
      {/* endsendbutton */}
      {/* </CustomStack> */}
      {/* endInputmain */}

      {/* start file and media attachment */}
      {/* <Box sx={{ border: "solid 2px yellow" }}>
        {selectedImages.length > 0 && (
          <ImagesToUpload
            showLabel={true}
            updateImageWithComment={() => {}}
            isComment={true}
            selectedImages={selectedImages}
            onClearFile={(file: any, type: any) => handleClearFile(file, type)}
          />
        )}
        {selectedDocuments.length > 0 && (
          <>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#605C5C",
                }}
              >
                Files
              </Typography>
              <FileBox
                isnoWrap={true}
                title={title}
                files={selectedDocuments}
                handleClearFile={handleClearFile}
              />
            </Box>
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
      </Box> */}
      {/* end file and media attachment */}

      {/* new Design  */}

      <Box
        sx={{
          width: isCommentView ? "85%" : "95%",
          // border: "solid 1px green",
          backgroundColor: "#E2E4E5",
          borderRadius: "22px",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "8px",
        }}
      >
        <Box
          sx={{
            width: "5%",
            marginBottom: "3px",
            marginLeft: isCommentView ? "16px" : isMdScreen ? "7px" : "0px",
            // border: "solid 1px green",
            display: "flex",
            justifyContent: isMdScreen ? "flex-end" : "center",
          }}
        >
          <Emoji />
        </Box>
        <Box
          // className="custom-scrollbar"
          sx={{
            // border: "solid 2px green",
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
            }}
          >
            <Input
              name="comment"
              id="comment"
              required
              inputProps={{ maxLength: 1500 }}
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
              maxRows={3}
            />
          </FormControl>
          {/* /// */}
          <Box sx={{ width: "100%", marginLeft: "5px" }}>
            {selectedImages.length > 0 && (
              <ImagesToUpload
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
                    }}
                  >
                    Files
                  </Typography>
                  <FileBox
                    isnoWrap={true}
                    title={title}
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
          <AttachFileOutlinedIcon sx={{ color: "#818181" }} />
        </Box>
      </Box>

      <Box
        sx={{
          width: isCommentView ? "15%" : "10%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          onClick={handleSubmit}
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#0076C8",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <SendIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;

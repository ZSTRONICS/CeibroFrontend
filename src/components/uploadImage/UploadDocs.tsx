import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import CButton from "components/Button/Button";
import { CloudUploadIcon } from "components/material-ui/icons/cloudUpload/CloudUpload";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { DOCS_CONFIG } from "config/docs.config";
import { FileInterface } from "constants/interfaces/docs.interface";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadDocs } from "redux/action/task.action";
import { RootState } from "redux/reducers";
import "./upload.css";

interface Props {
  showUploadButton: boolean;
  moduleType: string;
  moduleId: string;
  handleClose: () => void
}



const UploadDocs = (props: Props) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedfile, setSelectedFile] = useState<any>([]);
  const { selectedFilesToBeUploaded } = useSelector((state: RootState) => state.docs);
  const [filesToUpload, setFilesToUpload] = useState<any>([]);

  const [doOnce, setDoOnce] = useState<boolean>(true);


  const setSelectedFilesToUpload = (files: any) => {
    if (files.length === 0) {
      return;
    }
    setFilesToUpload(files);
    Array.from(files).forEach((file: any) => {
      setSelectedFile((prev: any) => {
        return [
          ...prev,
          {
            access: [],
            version: 0,
            _id: "",
            progress: 0,
            uploadedBy: "",
            fileUrl: "",
            fileType: file.type,
            fileName: file.name,
            uploadStatus: "uploading",
            moduleType: props.moduleType,
            moduleId: props.moduleId,
            createdAt: "",
            updatedAt: "",
          },
        ];
      });
    });
  };

  const uploadFiles = () => {
    let formData = new FormData();
    let filesPlaceholderData: any[] = [];

    Array.from(filesToUpload).forEach((file: any) => {
      const chunkSize = 1024 * 1024; // 1MB chunks
      let offset = 0;
      // Create an array of chunks
      const chunks = [];
      while (offset < file.size) {
        const chunk = file.slice(offset, offset + chunkSize);
        chunks.push(chunk);
        offset += chunkSize;
      }
      // Create a new Blob object from the array
      const blob = new Blob(chunks);
      formData.append("files", blob, file.name);

      filesPlaceholderData.push({
        access: [],
        version: 1,
        _id: "",
        uploadedBy: "",
        fileUrl: "",
        fileSize: file.size,
        fileType: "",
        progress: 1,
        fileName: file.name,
        uploadStatus: "",
        moduleType: props.moduleType,
        moduleId: props.moduleId,
        createdAt: "",
        updatedAt: "",
      });
    });
    formData.append("moduleName", props.moduleType);
    formData.append("_id", props.moduleId);

    dispatch({
      type: DOCS_CONFIG.PUSH_FILE_UPLAOD_RESPONSE,
      payload: filesPlaceholderData,
    });

    const payload = {
      body: formData,
      success: (res: any) => {
        if (res.status === 200) {
          //toast.success("file(s) uploaded");
          if (res.data.results.files.length > 0) {
            let allFiles = res.data.results.files;
            const files = allFiles.map((file: any) => {
              file.progress = 100;
              return file;
            });
            dispatch({
              type: DOCS_CONFIG.UPDATE_FILE_UPLAOD_RESPONSE,
              payload: files,
            });
          }
        }
      },
    };

    dispatch(uploadDocs(payload));

    dispatch({
      type: DOCS_CONFIG.CLEAR_SELECTED_FILES_TO_BE_UPLOADED
    });

    setSelectedFile([]);
    setFilesToUpload([]);
    handleCancel();
  }

  if (doOnce) {
    setDoOnce(false)
    if (selectedFilesToBeUploaded.files.length > 0) {
      setSelectedFilesToUpload(selectedFilesToBeUploaded.files)
    }
  }

  const onUploadFiles = (e: any) => {
    setSelectedFilesToUpload(e.target.files)
  };

  const handleUploadDocs = (e: any) => {
    e.preventDefault();
    uploadFiles();
  };

  const updateFilesToBeUploadedInStore = () => {

    if (Array.from(filesToUpload).length > 0) {
      const payload = {
        files: filesToUpload,
        moduleName: props.moduleType,
        moduleId: props.moduleId
      }

      dispatch({
        type: DOCS_CONFIG.SET_SELECTED_FILES_TO_BE_UPLOADED,
        payload: payload,
      });

    }
      return props.handleClose();
    
  }

  const handleDelteFile = (name: string) => {
    const files = Array.from(filesToUpload).filter((file: any) => file.name !== name);
    setFilesToUpload(files);    
    if(files.length === 0){
      dispatch({
        type: DOCS_CONFIG.CLEAR_SELECTED_FILES_TO_BE_UPLOADED
      });
    }
    const result = selectedfile.filter((data: FileInterface) => data.fileName !== name);
    setSelectedFile(result);
  };

  const handleCancel = () => {
    return props.handleClose();
  };
  const shortFileName = (str: string) => {
    return str.substring(0, 16) + "... " + str.substr(-4, str.length);
  };

  return (
    <>
      <div className="mr5">
        <label htmlFor="btn-upload">
          <CustomBox>
            <Box
              className="file-upload-box"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "relative",
                width: "100%",
                height: "8rem",
                borderRadius: "20px",
              }}
              ref={wrapperRef}
            >
              <CustomStack
                sx={{
                  p: 1,
                  textAlign: "center",
                  flexDirection: "column !important",
                  rowGap: "8px",
                }}
              >
                <Box
                  sx={{
                    background: "rgba(25, 118, 210, 0.12)",
                    padding: "12px 17px",
                    borderRadius: "64px",
                  }}
                >
                  <CloudUploadIcon />
                </Box>
                <input
                  id="btn-upload"
                  name="btn-upload"
                  hidden
                  multiple={true}
                  type="file"
                  accept="*"
                  onChange={(e: any) => onUploadFiles(e)}
                />
                <Button
                  LinkComponent="a"
                  className="btn-choose"
                  component="span"
                  sx={{ textTransform: "unset" }}
                >
                  Select file(s) to upload
                </Button>
                {/*  <Button LinkComponent='a' disableRipple>Click to upload </Button>
            <span style={{fontSize:'16px', fontWeight:'400', color:'#1976D2'}}> Click to upload &nbsp;
              <span style={{color:'#000000'}}>or drag and drop</span> 
            </span>*/}
              </CustomStack>
            </Box>
          </CustomBox>
        </label>
        <Box width="100%" sx={{ margin: "28px 0" }}>
          {selectedfile.length > 0 && (
            <List
              sx={{
                width: "100%",
                maxWidth: 600,
                bgcolor: "background.paper",
                maxHeight: "460px",
                height: "100%",
                overflow: "auto",
              }}
            >
              {selectedfile?.map((item: FileInterface, index: any) => {
                const { fileName, progress } = item;
                const itemName: string =
                  fileName?.length > 25 ? shortFileName(fileName) : fileName;
                return (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    secondaryAction={
                      <CButton
                        label="X"
                        size="small"
                        sx={{
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent",
                          },
                        }}
                        variant="raised"
                        aria-label="comment"
                        onClick={() => handleDelteFile(item.fileName)}
                      />
                    }
                  >
                    {/* <ListItemAvatar>
                      <Avatar alt="img" src={item.blobUrl} />
                    </ListItemAvatar> */}
                    <ListItemText
                      primary={`${itemName}`}
                      primaryTypographyProps={{
                        fontSize: 16,
                        fontWeight: "400",
                      }}
                      secondary={
                        <>
                          {/* <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                          >
                            {"Uploading"}
                          </Typography> */}
                          {/* <Box width="100%" pt={1.5} mr={1}>
                            <LinearProgress variant="determinate" value={progress} />
                          </Box> */}
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
        {selectedfile.length > 0 && (
          <CustomStack justifyContent="flex-end" columnGap={1}>
            {props.showUploadButton ?
              <CButton
                label={"Upload"}
                onClick={handleUploadDocs}
                color="primary"
                variant="contained"
              /> :
              <CButton
                label={"Ok"}
                onClick={updateFilesToBeUploadedInStore}
                color="primary"
                variant="contained"
              />
            }
            <CButton
              label={"Cancel"}
              variant="contained"
              onClick={handleCancel}
              styles={{
                color: "#605C5C",
                backgroundColor: "#ECF0F1",
              }}
            />
          </CustomStack>
        )}
      </div>
      {/* {selectedfile.length>0&&<Box sx={{mb:1, pb:3}}> <Button
        
        className="btn-upload"
        color="primary"
        variant="contained"
        disabled={selectedfile.length<0?false:true}
        onClick={upload}
      >
        Upload
      </Button>
      </Box>} */}
    </>
  );
};

export default UploadDocs;

const CustomBox = styled(Box)({
  "&.MuiBox-root": {
    cursor: "pointer",
    backgroundColor: " #F5F7F8",
    border: "1px dashed rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
    // boxShadow: "rgba(149, 157, 165, 0.2) 0px 3px 12px",
    padding: "1rem",
  },
  // "&.MuiBox-root:hover, &.MuiBox-root.dragover": {
  //   opacity: 0.6,
  // },
});

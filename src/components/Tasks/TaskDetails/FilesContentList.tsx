import { Avatar } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { GenericMenu } from "components/GenericComponents";
import { getFileIconThumbnail } from "components/Utills/FileBox";
import { MEDIA_EXT, momentdeDateFormat } from "components/Utills/Globals";
import { TaskFile } from "constants/interfaces";
import React, { useEffect, useRef, useState } from "react";

interface IFilesContentList {
  allFiles: TaskFile[];
}

function FilesContentList(props: IFilesContentList) {
  const containerRef: any = useRef(null);
  const [heightOffset, setHeightOffset] = useState<number>(0);
  useEffect(() => {
    if (containerRef.current) {
      const newTop = containerRef.current.getBoundingClientRect().top;
      setHeightOffset(newTop + 30);
    }
  }, [containerRef]);
  const { allFiles } = props;
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
        // maxHeight: "600px", //calc dynamic height
        height: `calc(100vh - ${heightOffset}px)`,
        overflowY: "auto",
        bgcolor: "background.paper",
        paddingBottom: "70px",
      }}
      ref={containerRef}
    >
      {allFiles.length > 0 ? (
        allFiles.map((file, index) => {
          const fileCreatedAt = momentdeDateFormat(file.createdAt);
          const fullName = `${file.initiator.firstName || ""} ${
            file.initiator.surName || ""
          }`;
          const isImgType = MEDIA_EXT.includes(file.fileType);
          return (
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{
                borderBottom: "1px solid #E2E4E5",
                "& .MuiListItemSecondaryAction-root": {
                  right: "0",
                },
              }}
              secondaryAction={
                <CustomStack>
                  <LabelTag>{fileCreatedAt}</LabelTag>
                  <GenericMenu
                    data={file}
                    isProjectGroup={true}
                    options={[
                      {
                        menuName: "Download",
                        callBackHandler: () => {},
                      },
                    ]}
                    key={1}
                    paddingTop={0}
                    disableMenu={false}
                  />
                </CustomStack>
              }
              disablePadding
            >
              <ListItemAvatar>
                {isImgType && file.fileUrl ? (
                  <Avatar
                    sx={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid #E2E4E5",
                    }}
                    alt={file.fileName}
                    variant="rounded"
                    srcSet={file.fileUrl}
                  />
                ) : (
                  getFileIconThumbnail(file.fileType, 35, 40)
                )}
              </ListItemAvatar>
              <ListItemText
                sx={{
                  "& span.MuiTypography-body1": {
                    fontSize: "14px",
                    fontWeight: 500,
                    maxWidth: "74%",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
                primary={file.fileName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{
                        display: "inline",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                      component="span"
                      variant="body2"
                      color="#605C5C"
                    >
                      {fullName}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })
      ) : (
        <Heading2
          sx={{
            textAlign: "center",
            fontWeight: 500,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No files attached
        </Heading2>
      )}
    </List>
  );
}

export default FilesContentList;

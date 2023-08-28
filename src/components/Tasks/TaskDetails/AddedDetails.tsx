import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Divider, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import assets from "assets/assets";
import {
  AddStatusTag,
  CustomStack,
  DocName,
  Span,
  SubHeadingTag,
} from "components/CustomTags";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
  momentdeDateFormatWithDay,
} from "components/Utills/Globals";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import { IFile, TaskEvent, TaskEventType } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import * as React from "react";

interface IProps {
  events: TaskEvent[];
}
export default function AddedDetails(props: IProps) {
  const { events } = props;
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const [isPdf, setIsPdf] = React.useState<boolean>(false);
  const [fileToView, setFileToView] = React.useState<any | null>(null);
  const handleClick = (file: any, isPdf: boolean = false) => {
    setFileToView(file);
    setIsPdf(isPdf);
    openModal();
  };
  console.log("isPdf", isPdf);

  return (
    <>
      <div>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <SubHeadingTag sx={{ color: "black" }}>Added Detail</SubHeadingTag>
          </AccordionSummary>
          <AccordionDetails>
            {events.length > 0
              ? events.map((event: TaskEvent) => {
                  const {
                    initiator,
                    createdAt,
                    eventType,
                    eventData,
                    commentData,
                    invitedMembers,
                  } = event;

                  switch (eventType) {
                    // case TaskEventType.InvitedUser:
                    //   const phoneNumbers =
                    //     eventData?.map((data) => data.phoneNumber)?.join(", ") ||
                    //     "";
                    //   const hasMultiplePhoneNumbers =
                    //     eventData && eventData?.length > 1;
                    //   const phoneNumberText = hasMultiplePhoneNumbers
                    //     ? `${phoneNumbers};`
                    //     : phoneNumbers;

                    //   return (
                    //     <>
                    //       <CustomStack gap={1.2} py={0.8}>
                    //         <Span sx={{ fontSize: "12px" }}>invited by</Span>
                    //         <DocName>{`${initiator.firstName} ${
                    //           initiator.surName
                    //         } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                    //       </CustomStack>

                    //       <CustomStack gap={1.2} py={0.8}>
                    //         <DocName>{phoneNumberText}</DocName>
                    //       </CustomStack>
                    //       <Divider />
                    //     </>
                    //   );

                    case TaskEventType.ForwardTask:
                      const userInfo =
                        eventData && eventData.length > 0
                          ? eventData
                              .map((user) => {
                                const { firstName, surName } = user;
                                if (firstName && surName) {
                                  return `${firstName} ${surName}`;
                                } else if (firstName) {
                                  return firstName;
                                } else if (surName) {
                                  return surName;
                                }
                              })
                              .join(", ")
                          : "N/A";

                      const invitedMembersLocal =
                        invitedMembers && invitedMembers.length > 0
                          ? invitedMembers
                              .map((user) => {
                                const { firstName, surName, phoneNumber } =
                                  user;
                                if (firstName && surName) {
                                  return `${firstName} ${surName}`;
                                } else if (firstName) {
                                  return firstName;
                                } else if (surName) {
                                  return surName;
                                } else {
                                  return phoneNumber;
                                }
                              })
                              .join(", ")
                          : "N/A";
                      return (
                        <React.Fragment key={event._id}>
                          {eventData && eventData.length > 0 && (
                            <CustomStack gap={1.2} py={0.8}>
                              <DocName>{` ${momentdeDateFormatWithDay(
                                createdAt
                              )}`}</DocName>
                              <Span
                                sx={{ fontSize: "12px" }}
                              >{`${initiator.firstName} ${initiator.surName} forwarded task to:`}</Span>
                              <DocName>{userInfo}</DocName>
                            </CustomStack>
                          )}
                          {invitedMembers.length > 0 && (
                            <>
                              <CustomStack gap={1.2} py={0.8}>
                                <Span sx={{ fontSize: "12px" }}>
                                  invited by
                                </Span>
                                <DocName>{`${initiator.firstName} ${
                                  initiator.surName
                                } ${momentdeDateFormatWithDay(
                                  createdAt
                                )}`}</DocName>
                              </CustomStack>
                              <DocName>{`${invitedMembersLocal}`}</DocName>
                            </>
                          )}
                          <Divider />
                        </React.Fragment>
                      );
                    case TaskEventType.CancelTask:
                      return (
                        <React.Fragment key={event._id}>
                          <CustomStack gap={1.2} py={0.8}>
                            <Span sx={{ fontSize: "12px" }}>Canceled by</Span>
                            <DocName>{`${initiator.firstName} ${
                              initiator.surName
                            } ${momentdeDateFormatWithDay(
                              createdAt
                            )}`}</DocName>
                          </CustomStack>
                          <Span sx={{ fontSize: "12px" }}>
                            Task has been Canceled
                          </Span>
                          <Divider />
                        </React.Fragment>
                      );
                    case TaskEventType.DoneTask:
                      return (
                        <React.Fragment key={event._id}>
                          <CustomStack gap={1.2} py={0.8}>
                            <Span sx={{ fontSize: "12px" }}>Done by</Span>
                            <DocName>{`${initiator.firstName} ${
                              initiator.surName
                            } ${momentdeDateFormatWithDay(
                              createdAt
                            )}`}</DocName>
                          </CustomStack>
                          {commentData?.message && (
                            <>
                              <AddStatusTag sx={{ color: "black" }}>
                                {commentData.message}
                              </AddStatusTag>
                              <Divider />
                            </>
                          )}
                          <Divider />
                        </React.Fragment>
                      );
                    case TaskEventType.Comment:
                      let media: any = [];
                      let docs: any = [];
                      if (commentData && commentData?.files.length > 0) {
                        docs = FILTER_DATA_BY_EXT(DOC_EXT, commentData.files);
                        media = FILTER_DATA_BY_EXT(
                          MEDIA_EXT,
                          commentData.files
                        );
                      }
                      console.log("docs", docs);
                      return (
                        <React.Fragment key={event._id}>
                          <CustomStack gap={1.2} py={0.8}>
                            <Span sx={{ fontSize: "12px" }}>Comment by</Span>
                            <DocName>{`${initiator.firstName} ${
                              initiator.surName
                            } ${momentdeDateFormatWithDay(
                              createdAt
                            )}`}</DocName>
                          </CustomStack>
                          {commentData?.message && (
                            <>
                              <AddStatusTag sx={{ color: "black" }}>
                                {commentData.message}
                              </AddStatusTag>
                            </>
                          )}
                          <CustomStack py={0.7}>
                            {media.map((file: IFile) => (
                              <Box
                                key={file._id} // Add a unique key to help React identify elements
                                sx={{
                                  marginRight: "16px",
                                  marginBottom:
                                    file.comment.length === 0 ? "0px" : "16px",
                                  "&:hover": { cursor: "pointer" },
                                }}
                                onClick={() => handleClick(file)}
                              >
                                {file.comment.length === 0 && (
                                  <ImageBox src={file.fileUrl} />
                                )}
                              </Box>
                            ))}
                          </CustomStack>

                          {media.map((file: IFile) => {
                            const hasFileComment = file.comment.length > 0;
                            return (
                              <>
                                {hasFileComment && (
                                  <Box
                                    key={file._id}
                                    sx={{
                                      marginBottom: "16px",
                                      "&:hover": { cursor: "pointer" },
                                    }}
                                    onClick={() => handleClick(file)}
                                  >
                                    <ImageBoxWithDesp
                                      src={file.fileUrl}
                                      comment={file.comment}
                                    />
                                  </Box>
                                )}
                              </>
                            );
                          })}
                          {docs.map((file: IFile) => {
                            return (
                              <Box
                                key={file._id}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginRight: 2,
                                  mb: 1.2,
                                  "&:hover": {
                                    cursor: "pointer",
                                  },
                                }}
                                onClick={() => handleClick(file, true)}
                              >
                                <img
                                  width={20}
                                  height={20}
                                  src={assets.FileIcon}
                                  alt="File Icon"
                                />
                                <Typography
                                  sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    marginLeft: "8px",
                                    marginRight: "16px",
                                  }}
                                >
                                  {file.fileName}
                                </Typography>
                              </Box>
                            );
                          })}
                          {/* {docs&&docs.} */}
                          <Divider />
                        </React.Fragment>
                      );
                    default:
                      return null; // Handle any other event types as needed
                  }
                })
              : "No task details added"}
          </AccordionDetails>
        </Accordion>
      </div>
      {isOpen && (
        <ImagePreviewModal
          isOpen={isOpen}
          isPdfFile={isPdf}
          closeModal={closeModal}
          title={isPdf ? "File Preview" : "Image Preview"}
          fileToView={fileToView}
        />
      )}
    </>
  );
}

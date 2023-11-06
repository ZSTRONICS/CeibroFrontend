import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
  AddStatusTag,
  CustomStack,
  DocName,
  ImageStack,
  Span,
  SubHeadingTag,
} from "components/CustomTags";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import FileBox from "components/Utills/FileBox";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
  momentdeDateFormatWithDay,
} from "components/Utills/Globals";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { IFile, TaskEvent, TaskEventType } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import React, { useEffect, useRef, useState } from "react";
interface IProps {
  events: TaskEvent[];
  hasFile: boolean;
}

function AddedDetails(props: IProps) {
  const { events, hasFile } = props;
  const listRef: any = useRef(null);
  const [heightOffset, setHeightOffset] = useState();
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const [isPdf, setIsPdf] = React.useState<boolean>(false);
  const [fileToView, setFileToView] = React.useState<any | null>(null);
  const [images, setImages] = useState<any>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClose = () => {
    setImages([]);
    setCurrentImageIndex(0);
    closeModal();
  };

  const handleClick = (data: any, isImage: boolean, index: number) => {
    if (isImage) {
      setImages(data);
      setCurrentImageIndex(index);
    } else {
      setFileToView(data);
      setIsPdf(true);
    }
    openModal();
  };

  useEffect(() => {
    if (listRef.current) {
      const newTop = listRef.current.getBoundingClientRect().top;
      const newHeightOffset = hasFile ? newTop + 16 : newTop;
      if (newHeightOffset !== heightOffset) {
        setHeightOffset(newHeightOffset);
      }
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [events?.length, listRef]);

  return (
    <>
      <div>
        <Accordion
          defaultExpanded={true}
          sx={{ borderBottom: "1px solid #ccc" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ paddingLeft: "7px", paddingRight: "7px" }}
          >
            <SubHeadingTag sx={{ color: "black" }}>Added Detail</SubHeadingTag>
          </AccordionSummary>
          <Divider />
          <AccordionDetails
            ref={listRef}
            className="custom-scrollbar"
            sx={{
              // maxHeight: `calc(100vh - ${heightOffset}px)`,
              // overflow: "auto",
              pb: 5,
              paddingLeft: "7px",
              paddingRight: "7px",
            }}
          >
            {events?.length > 0 ? (
              events.map((event: TaskEvent) => {
                const {
                  initiator,
                  createdAt,
                  eventType,
                  eventData,
                  commentData,
                  invitedMembers,
                } = event;
                const invitedMembersData =
                  eventData &&
                  eventData.length > 0 &&
                  eventData
                    .map((user) => {
                      const { firstName, surName, phoneNumber } = user;
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
                    .join(", ");
                switch (eventType) {
                  case TaskEventType.InvitedUser:
                    return (
                      <React.Fragment key={event._id}>
                        <CustomStack gap={1.2} py={0.8}>
                          <Span sx={{ fontSize: "12px" }}>invited by</Span>
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>
                        <DocName>{`${invitedMembersData}`}</DocName>
                      </React.Fragment>
                    );

                  case TaskEventType.ForwardTask:
                    const userInfo =
                      eventData && eventData.length > 0
                        ? eventData
                            .map((user) => {
                              const { firstName, surName, phoneNumber } = user;
                              if (firstName && surName) {
                                return `${firstName} ${surName}`;
                              } else if (firstName) {
                                return firstName;
                              } else if (surName) {
                                return surName;
                              }
                              return phoneNumber;
                            })
                            .join(", ")
                        : "N/A";

                    const invitedMembersLocal =
                      invitedMembers && invitedMembers.length > 0
                        ? invitedMembers
                            .map((user) => {
                              const { firstName, surName, phoneNumber } = user;
                              if (firstName && surName) {
                                return `${firstName} ${surName}`;
                              } else if (firstName) {
                                return firstName;
                              } else if (surName) {
                                return surName;
                              }
                              return phoneNumber;
                            })
                            .join(", ")
                        : "N/A";
                    return (
                      <React.Fragment key={event._id + "invitedMembersLocal"}>
                        {eventData && eventData.length > 0 && (
                          <>
                            <CustomStack gap={1.2} py={0.8}>
                              <DocName>{` ${momentdeDateFormatWithDay(
                                createdAt
                              )}`}</DocName>
                              <Span
                                sx={{ fontSize: "12px" }}
                              >{`${initiator.firstName} ${initiator.surName} forwarded task to:`}</Span>
                              <DocName>{userInfo}</DocName>
                            </CustomStack>
                            <AddStatusTag
                              sx={{
                                color: "black",
                                wordWrap: "break-word",
                              }}
                            >
                              {commentData?.message || ""}
                            </AddStatusTag>
                          </>
                        )}
                        {invitedMembers.length > 0 && (
                          <React.Fragment key={event._id + "invitedMembers"}>
                            <CustomStack gap={1.2} py={0.8}>
                              <Span sx={{ fontSize: "12px" }}>invited by</Span>
                              <DocName>{`${initiator.firstName} ${
                                initiator.surName
                              } ${momentdeDateFormatWithDay(
                                createdAt
                              )}`}</DocName>
                            </CustomStack>
                            <DocName>{`${invitedMembersLocal}`}</DocName>
                          </React.Fragment>
                        )}
                        <Divider />
                      </React.Fragment>
                    );
                  case TaskEventType.CancelTask:
                    return (
                      <React.Fragment key={event._id + "CancelTask"}>
                        <CustomStack gap={1.2} py={0.8}>
                          <Span sx={{ fontSize: "12px" }}>Canceled by</Span>
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>
                        <Span sx={{ fontSize: "12px" }}>
                          Task has been Canceled
                        </Span>
                        <Divider />
                      </React.Fragment>
                    );
                  case TaskEventType.UnCancelTask:
                    return (
                      <React.Fragment key={event._id + "CancelTask"}>
                        <CustomStack gap={1.2} py={0.8}>
                          <Span sx={{ fontSize: "12px" }}>Un-canceled by</Span>
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>
                        <Span sx={{ fontSize: "12px" }}>
                          Task has been Un-canceled
                        </Span>
                        <Divider />
                      </React.Fragment>
                    );
                  case TaskEventType.DoneTask:
                    let mediaLocal: any = [];
                    let docsLocal: any = [];
                    if (commentData && commentData?.files.length > 0) {
                      docsLocal = FILTER_DATA_BY_EXT(
                        DOC_EXT,
                        commentData.files
                      );
                      mediaLocal = FILTER_DATA_BY_EXT(
                        MEDIA_EXT,
                        commentData.files
                      );
                    }

                    return (
                      <React.Fragment key={event._id + "DoneTask"}>
                        <CustomStack gap={1.2} py={0.8}>
                          <Span sx={{ fontSize: "12px" }}>Done by</Span>
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>
                        {commentData?.message && (
                          <>
                            <AddStatusTag
                              sx={{
                                color: "black",
                                wordWrap: "break-word",
                              }}
                            >
                              {commentData.message}
                            </AddStatusTag>
                            <Divider />
                          </>
                        )}
                        <ImageStack py={0.7}>
                          {mediaLocal.map((file: IFile, i: any) => (
                            <Box
                              key={file._id + i}
                              sx={{
                                marginRight: "16px",
                                marginBottom:
                                  file.comment.length === 0 ? "0px" : "16px",
                                "&:hover": { cursor: "pointer" },
                              }}
                              onClick={() => handleClick(mediaLocal, true, i)}
                            >
                              {file.comment.length === 0 && (
                                <ImageBox src={file.fileUrl} />
                              )}
                            </Box>
                          ))}
                        </ImageStack>

                        {mediaLocal.map((file: IFile, index: any) => {
                          const hasFileComment = file.comment.length > 0;
                          return (
                            hasFileComment && (
                              <Box
                                key={file._id + "mediaLocal"}
                                sx={{
                                  marginBottom: "16px",
                                  "&:hover": { cursor: "pointer" },
                                }}
                                onClick={() =>
                                  handleClick(mediaLocal, true, index)
                                }
                              >
                                <ImageBoxWithDesp
                                  src={file.fileUrl}
                                  comment={file.comment}
                                />
                              </Box>
                            )
                          );
                        })}
                        {docsLocal.length > 0 && <FileBox files={docsLocal} />}

                        <Divider />
                      </React.Fragment>
                    );
                  case TaskEventType.Comment:
                    let media: any = [];
                    let docs: any = [];
                    if (commentData && commentData?.files.length > 0) {
                      docs = FILTER_DATA_BY_EXT(DOC_EXT, commentData.files);
                      media = FILTER_DATA_BY_EXT(MEDIA_EXT, commentData.files);
                    }
                    return (
                      <React.Fragment key={event._id + "Comment"}>
                        <CustomStack gap={1.2} py={0.8}>
                          {/* <Span sx={{ fontSize: "12px" }}>Comment by</Span> */}
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>
                        {commentData?.message && (
                          <>
                            <AddStatusTag
                              sx={{
                                color: "black",
                                wordWrap: "break-word",
                              }}
                            >
                              {commentData.message}
                            </AddStatusTag>
                          </>
                        )}
                        {media.length > 0 && (
                          <ReadMoreWrapper title="Images">
                            <ImageStack py={0.7}>
                              {media.map((file: IFile, i: any) => (
                                <Box
                                  key={file._id + i}
                                  sx={{
                                    marginRight: "16px",
                                    marginBottom:
                                      file.comment.length === 0
                                        ? "0px"
                                        : "16px",
                                    "&:hover": { cursor: "pointer" },
                                  }}
                                  onClick={() => handleClick(media, true, i)}
                                >
                                  {file.comment.length === 0 && (
                                    <ImageBox src={file.fileUrl} />
                                  )}
                                </Box>
                              ))}
                            </ImageStack>
                          </ReadMoreWrapper>
                        )}
                        {media.filter((file: IFile) => file.comment.length > 0)
                          .length > 0 && (
                          <ReadMoreWrapper title="Images with comments">
                            {media
                              .filter((file: IFile) => file.comment.length > 0)
                              .map((file: IFile, index: any) => {
                                const hasFileComment = file.comment.length > 0;
                                return (
                                  hasFileComment && (
                                    <Box
                                      key={file._id}
                                      sx={{
                                        marginBottom: "16px",
                                        "&:hover": { cursor: "pointer" },
                                      }}
                                      onClick={() =>
                                        handleClick(media, true, index)
                                      }
                                    >
                                      <ImageBoxWithDesp
                                        src={file.fileUrl}
                                        comment={file.comment}
                                      />
                                    </Box>
                                  )
                                );
                              })}
                          </ReadMoreWrapper>
                        )}
                        {docs.length > 0 && (
                          <FileBox files={docs} title="Files" />
                        )}
                        <Divider />
                      </React.Fragment>
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <AddStatusTag sx={{ color: "black" }}>
                No task details added
              </AddStatusTag>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
      {isOpen && isPdf && (
        <ImagePreviewModal
          isOpen={isOpen}
          isPdfFile={isPdf}
          closeModal={closeModal}
          title={isPdf ? "File Preview" : "Image Preview"}
          fileToView={fileToView}
        />
      )}
      {isOpen && !isPdf && images.length > 0 && (
        <ImgsViewerSlider
          imgs={images.map((image: any) => ({
            src: image.fileUrl,
            caption: image.fileName,
            srcSet: [`${image.fileUrl} auto`],
          }))}
          currImg={currentImageIndex}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </>
  );
}

export default AddedDetails;

import { Box, Typography } from "@mui/material";
import {
  AddStatusTag,
  CustomStack,
  DocName,
  Span,
} from "components/CustomTags";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import CustomDivider from "components/Utills/CustomDivider";
import FileBox from "components/Utills/FileBox";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  MEDIA_EXT,
  momentdeDateFormatWithDay,
} from "components/Utills/Globals";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { IFile, TaskEvent, TaskEventType } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import EventWrap from "./EventWrap";
interface IProps {
  events: TaskEvent[];
  hasFile: boolean;
}

function AddedDetails(props: IProps) {
  const { user } = useSelector((state: RootState) => state.auth);
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

  // const handleClick = (data: any, isImage: boolean, index: number) => {
  //   if (isImage) {
  //     setImages(data);
  //     setCurrentImageIndex(index);
  //   } else {
  //     setFileToView(data);
  //     setIsPdf(true);
  //   }
  //   openModal();
  // };

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
      <Box sx={{ mb: 1 }}>
        <Typography
          sx={{
            fontFamily: "Inter",
            color: "black",
            fontSize: "14px",
            fontWeight: "700",
            pl: 0.1,
          }}
        >
          Added Details
        </Typography>
      </Box>
      <Box ref={listRef} className="custom-scrollbar">
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
                  <EventWrap
                    key={event._id + "InvitedUser"}
                    creator={initiator._id === user._id}
                  >
                    <CustomStack gap={1.2}>
                      <Span sx={{ fontSize: "12px" }}>invited by</Span>
                      <DocName>{`${initiator.firstName} ${
                        initiator.surName
                      } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                    </CustomStack>
                    <DocName>{`${invitedMembersData}`}</DocName>
                  </EventWrap>
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
                  <EventWrap
                    key={event._id + "invitedMembersLocal"}
                    creator={initiator._id === user._id}
                  >
                    {eventData && eventData.length > 0 && (
                      <>
                        <CustomStack gap={1.2}>
                          <DocName>{` ${momentdeDateFormatWithDay(
                            createdAt
                          )}`}</DocName>
                          <Span
                            sx={{ fontSize: "12px" }}
                          >{`${initiator.firstName} ${initiator.surName} forwarded task to:`}</Span>
                          <DocName>{userInfo}</DocName>
                          <CustomDivider />
                        </CustomStack>
                        <>
                          {commentData?.message && (
                            <ReadMoreWrapper
                              title="Comment"
                              type="text"
                              data={commentData?.message}
                            />
                          )}
                          <CustomDivider />
                        </>
                      </>
                    )}
                    {invitedMembers.length > 0 && (
                      <React.Fragment key={event._id + "invitedMembers"}>
                        <CustomStack gap={1.2}>
                          <Span sx={{ fontSize: "12px" }}>invited by</Span>
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>
                        <CustomDivider />
                        <DocName>{`${invitedMembersLocal}`}</DocName>
                      </React.Fragment>
                    )}
                  </EventWrap>
                );
              case TaskEventType.CancelTask:
                return (
                  <EventWrap
                    key={event._id + "CancelTask"}
                    creator={initiator._id === user._id}
                  >
                    <CustomStack gap={1.2}>
                      <Span sx={{ fontSize: "12px" }}>Canceled by</Span>
                      <DocName>{`${initiator.firstName} ${
                        initiator.surName
                      } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                    </CustomStack>
                    <CustomDivider />
                    <Span sx={{ fontSize: "12px" }}>
                      Task has been Canceled
                    </Span>
                  </EventWrap>
                );
              case TaskEventType.UnCancelTask:
                return (
                  <EventWrap
                    key={event._id + "UnCancelTask"}
                    creator={initiator._id === user._id}
                  >
                    <CustomStack gap={1.2}>
                      <Span sx={{ fontSize: "12px" }}>Un-canceled by</Span>
                      <DocName>{`${initiator.firstName} ${
                        initiator.surName
                      } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                    </CustomStack>
                    <CustomDivider />
                    <Span sx={{ fontSize: "12px" }}>
                      Task has been Un-canceled
                    </Span>
                  </EventWrap>
                );
              case TaskEventType.DoneTask:
                let mediaLocal: any = [];
                let docsLocal: any = [];
                if (commentData && commentData?.files.length > 0) {
                  docsLocal = FILTER_DATA_BY_EXT(DOC_EXT, commentData.files);
                  mediaLocal = FILTER_DATA_BY_EXT(MEDIA_EXT, commentData.files);
                }
                let mediaLocalWithComment: any = mediaLocal.filter(
                  (file: IFile) => file.comment.length > 0
                );
                let mediaLocalWithoutComment: any = mediaLocal.filter(
                  (file: IFile) => !(file.comment.length > 0)
                );

                return (
                  <Box
                    key={event._id + "DoneTask"}
                    sx={{
                      backgroundColor: "#55bcb3",
                      width: "100%",
                      padding: "8px 10px 8px 16px",
                      marginBottom: "11px",
                    }}
                  >
                    <CustomStack gap={1.2}>
                      <Span sx={{ fontSize: "12px" }}>Done by</Span>
                      <DocName>{`${initiator.firstName} ${
                        initiator.surName
                      } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                    </CustomStack>
                    {/* <CustomDivider /> */}

                    {commentData?.message && (
                      <>
                        <ReadMoreWrapper
                          title={"Comment"}
                          type="text"
                          data={commentData.message}
                        />
                        <CustomDivider />
                      </>
                    )}
                    {mediaLocalWithoutComment.length > 0 && (
                      <>
                        <ReadMoreWrapper
                          title="Images"
                          type="image"
                          count={mediaLocalWithoutComment.length}
                          data={mediaLocalWithoutComment}
                        />
                        <CustomDivider />
                      </>
                    )}
                    {mediaLocalWithComment.length > 0 && (
                      <>
                        <ReadMoreWrapper
                          count={mediaLocalWithComment.length}
                          title="Images with comments"
                          type="imageWithDesp"
                          data={mediaLocalWithComment}
                        />
                        <CustomDivider />
                      </>
                    )}
                    {docsLocal.length > 0 && (
                      <>
                        <FileBox files={docsLocal} />
                        <CustomDivider />
                      </>
                    )}
                  </Box>
                );
              case TaskEventType.Comment:
                let media: any = [];
                let docs: any = [];
                if (commentData && commentData?.files.length > 0) {
                  docs = FILTER_DATA_BY_EXT(DOC_EXT, commentData.files);
                  media = FILTER_DATA_BY_EXT(MEDIA_EXT, commentData.files);
                }
                let mediaWithComment: any = media.filter(
                  (file: IFile) => file.comment.length > 0
                );
                let mediaWithoutComment: any = media.filter(
                  (file: IFile) => !(file.comment.length > 0)
                );
                return (
                  <EventWrap
                    key={event._id + "Comment"}
                    creator={initiator._id === user._id}
                  >
                    <CustomStack gap={1.2}>
                      <DocName>{`${initiator.firstName} ${
                        initiator.surName
                      } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                    </CustomStack>
                    <CustomDivider />
                    {commentData?.message && (
                      <>
                        <ReadMoreWrapper
                          title="Comment"
                          type="text"
                          data={commentData.message}
                        />
                        <CustomDivider />
                      </>
                    )}
                    {docs.length > 0 && (
                      <>
                        <FileBox files={docs} title="Files" /> <CustomDivider />
                      </>
                    )}
                    {mediaWithoutComment.length > 0 && (
                      <>
                        <ReadMoreWrapper
                          title="Images"
                          type="image"
                          count={mediaWithoutComment.length}
                          data={mediaWithoutComment}
                        />
                        <CustomDivider />
                      </>
                    )}
                    {mediaWithComment.filter(
                      (file: IFile) => file.comment.length > 0
                    ).length > 0 && (
                      <>
                        <ReadMoreWrapper
                          title="Images with comments"
                          type="imageWithDesp"
                          count={mediaWithComment.length}
                          data={mediaWithComment}
                        />
                        <CustomDivider />
                      </>
                    )}
                  </EventWrap>
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
      </Box>
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
          imgs={images.map((image: any) => image.fileUrl)}
          currImg={currentImageIndex}
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </>
  );
}

export default AddedDetails;

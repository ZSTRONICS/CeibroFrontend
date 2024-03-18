import { Box } from "@mui/material";
import { AddStatusTag } from "components/CustomTags";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import { TaskEvent, TaskEventType } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import Comment from "../Comment";
import CommentCard from "./CommentCard";
import MessageBot from "./MessageBot";
interface IProps {
  events: TaskEvent[];
  hasFile: boolean;
  isCommentView: boolean;
  contHeight: number;
  selectedTab: string;
  parentheight?: number;
  taskId: string;
}

function AddedDetails(props: IProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user && String(user._id);
  const {
    events,
    isCommentView,
    selectedTab,
    contHeight,
    hasFile,
    parentheight,
    taskId,
  } = props;
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const [isPdf, setIsPdf] = React.useState<boolean>(false);
  const [fileToView, setFileToView] = React.useState<any | null>(null);
  const [images, setImages] = useState<any>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComment, setShowComment] = useState(false);

  setTimeout(() => {
    if (selectedTab === "Comments" || isCommentView) {
      setShowComment(true);
    } else {
      setShowComment(false);
    }
  }, 500);
  const handleClose = () => {
    setImages([]);
    setCurrentImageIndex(0);
    closeModal();
  };

  // useEffect(() => {
  //   if (listRef.current) {
  //     const newTop = listRef.current.getBoundingClientRect().top;
  //     const newHeightOffset = hasFile ? newTop + 16 : newTop;
  //     if (!isInitialRender.current) {
  //       if (newHeightOffset !== heightOffset) {
  //         setHeightOffset(newHeightOffset);
  //       }
  //       listRef.current.scrollTo(0, listRef.current.scrollHeight);
  //     } else {
  //       isInitialRender.current = false;
  //     }
  //   }
  // }, [events?.length, hasFile]);

  var IsMessageBot: boolean;

  return (
    <>
      <Box
        sx={{
          height: `${parentheight && parentheight - 60}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          className="custom-scrollbar"
          sx={{
            overflowY: "auto",
            flex: "1",
          }}
        >
          {events?.length > 0 ? (
            events.map((event: TaskEvent, index: number) => {
              const {
                initiator,
                createdAt,
                eventType,
                eventData,
                commentData,
                invitedMembers,
                isPinned,
                _id,
                taskId,
              } = event;
              const isCommentInitiator = initiator && initiator._id === userId;
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
                case TaskEventType.Comment:
                  return (
                    <>
                      {commentData && (
                        <CommentCard
                          createdAt={createdAt}
                          taskId={taskId}
                          eventId={_id}
                          initiator={initiator}
                          commentData={commentData}
                          isPinned={isPinned}
                          isCommentInitiator={isCommentInitiator}
                        />
                      )}
                    </>
                  );
                case TaskEventType.DoneTask:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData.files.length === 0;
                  return (
                    <>
                      {IsMessageBot ? (
                        <MessageBot
                          type="DoneTask"
                          initiator={initiator}
                          eventData={eventData}
                          isCommentInitiator={isCommentInitiator}
                        />
                      ) : (
                        <>
                          <MessageBot
                            type="DoneTask"
                            initiator={initiator}
                            eventData={eventData}
                            isCommentInitiator={isCommentInitiator}
                          />
                          {commentData && (
                            <CommentCard
                              createdAt={createdAt}
                              taskId={taskId}
                              eventId={_id}
                              initiator={initiator}
                              commentData={commentData}
                              isPinned={isPinned}
                              isCommentInitiator={isCommentInitiator}
                            />
                          )}
                        </>
                      )}
                    </>
                  );
                case TaskEventType.ForwardTask:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData?.files?.length === 0;
                  return (
                    <>
                      {IsMessageBot ? (
                        <>
                          <MessageBot
                            type={"ForwardTask"}
                            initiator={initiator}
                            eventData={eventData}
                            isCommentInitiator={isCommentInitiator}
                          />
                        </>
                      ) : (
                        <>
                          <MessageBot
                            type={"ForwardTask"}
                            initiator={initiator}
                            eventData={eventData}
                            isCommentInitiator={isCommentInitiator}
                          />
                          {commentData && (
                            <CommentCard
                              createdAt={createdAt}
                              taskId={taskId}
                              eventId={_id}
                              initiator={initiator}
                              commentData={commentData}
                              isPinned={isPinned}
                              isCommentInitiator={isCommentInitiator}
                            />
                          )}
                        </>
                      )}
                    </>
                  );
                case TaskEventType.InvitedUser:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData?.files?.length === 0;
                  return (
                    <>
                      {IsMessageBot ? (
                        <>
                          <MessageBot
                            type={"InvitedUser"}
                            initiator={initiator}
                            invitedMembers={invitedMembers}
                            isCommentInitiator={isCommentInitiator}
                          />
                        </>
                      ) : (
                        <>
                          <MessageBot
                            type={"InvitedUser"}
                            initiator={initiator}
                            invitedMembers={invitedMembers}
                            isCommentInitiator={isCommentInitiator}
                          />
                          {commentData && (
                            <CommentCard
                              createdAt={createdAt}
                              taskId={taskId}
                              eventId={_id}
                              initiator={initiator}
                              commentData={commentData}
                              isPinned={isPinned}
                              isCommentInitiator={isCommentInitiator}
                            />
                          )}
                        </>
                      )}
                    </>
                  );
                case TaskEventType.CancelTask:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData?.files?.length === 0;
                  return (
                    <>
                      {IsMessageBot ? (
                        <>
                          <MessageBot
                            type={"CancelTask"}
                            initiator={initiator}
                            eventData={eventData}
                            isCommentInitiator={isCommentInitiator}
                          />
                        </>
                      ) : (
                        <>
                          <MessageBot
                            type={"CancelTask"}
                            initiator={initiator}
                            eventData={eventData}
                            isCommentInitiator={isCommentInitiator}
                          />
                          {commentData && (
                            <Box>
                              <CommentCard
                                createdAt={createdAt}
                                taskId={taskId}
                                eventId={_id}
                                initiator={initiator}
                                commentData={commentData}
                                isPinned={isPinned}
                                isCommentInitiator={isCommentInitiator}
                              />
                            </Box>
                          )}
                        </>
                      )}
                    </>
                  );
                case TaskEventType.UnCancelTask:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData?.files?.length === 0;
                  return (
                    <>
                      {IsMessageBot ? (
                        <>
                          <MessageBot
                            type={"UnCancelTask"}
                            initiator={initiator}
                            eventData={eventData}
                            isCommentInitiator={isCommentInitiator}
                          />
                        </>
                      ) : (
                        <>
                          <MessageBot
                            type={"UnCancelTask"}
                            initiator={initiator}
                            eventData={eventData}
                            isCommentInitiator={isCommentInitiator}
                          />
                          {commentData && (
                            <CommentCard
                              createdAt={createdAt}
                              taskId={taskId}
                              eventId={_id}
                              initiator={initiator}
                              commentData={commentData}
                              isPinned={isPinned}
                              isCommentInitiator={isCommentInitiator}
                            />
                          )}
                        </>
                      )}
                    </>
                  );
              }
            })
          ) : (
            <AddStatusTag sx={{ color: "black", textAlign: "center", mt: 2 }}>
              No comment has been done in this task yet!
            </AddStatusTag>
          )}
        </Box>
        {showComment && (
          <Box
            sx={{
              maxHeight: "50%",
              minHeight: "15%",
              height: "max-content",
              marginTop: "5px",
              overflow: "visible",
            }}
          >
            <Comment
              doneCommentsRequired={false}
              doneImageRequired={false}
              title={""}
              showHeader={true}
              taskId={taskId}
            />
          </Box>
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

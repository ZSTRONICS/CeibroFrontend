import { Box } from "@mui/material";
import { AddStatusTag } from "components/CustomTags";
import ImagePreviewModal from "components/ImgLazyLoad/ImagePreviewModal";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import { TaskEvent, TaskEventType } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import Comment from "../Comment";
import CommentCard from "./CommentCard";
import MessageBot from "./MessageBot";
interface IProps {
  events: TaskEvent[];

  isCommentView: boolean;
  selectedTab: string;
  taskId: string;
}

function AddedDetails(props: IProps) {
  const containerRef: any = useRef(null);
  const commentScrollRef: any = useRef(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user && String(user._id);
  const { events, isCommentView, selectedTab, taskId } = props;
  const { closeModal, isOpen, openModal } = useOpenCloseModal();
  const [isPdf, setIsPdf] = React.useState<boolean>(false);
  const [fileToView, setFileToView] = React.useState<any | null>(null);
  const [images, setImages] = useState<any>([]);
  const [heightOffset, setHeightOffset] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    if (selectedTab === "Comments" || isCommentView) {
      setShowComment(true);
    } else {
      setShowComment(false);
    }
  }, [selectedTab, isCommentView]);

  useEffect(() => {
    if (containerRef.current) {
      const newTop = containerRef.current.getBoundingClientRect().top;
      if (showComment) {
        setHeightOffset(newTop + 25);
      } else {
        setHeightOffset(newTop + 30);
      }
    }
  }, [containerRef, showComment]);

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

  useEffect(() => {
    // Function to scroll to the bottom
    const scrollToBottom = () => {
      if (commentScrollRef.current) {
        // Set the scrollTop property to the maximum value
        commentScrollRef.current.scrollTop =
          commentScrollRef.current.clientHeight;
      }
    };

    // Scroll to the bottom when the component mounts or the content changes
    scrollToBottom();
  }, [commentScrollRef, events?.length]); // Only run once after component mounts

  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          height: `calc(100vh - ${heightOffset}px)`,
          gap: 1.25,
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
            display: events?.length <= 0 ? "flex" : null,
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={commentScrollRef}
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
              // const invitedMembersData =
              //   eventData &&
              //   eventData.length > 0 &&
              //   eventData
              //     .map((user) => {
              //       const { firstName, surName, phoneNumber } = user;
              //       if (firstName && surName) {
              //         return `${firstName} ${surName}`;
              //       } else if (firstName) {
              //         return firstName;
              //       } else if (surName) {
              //         return surName;
              //       } else {
              //         return phoneNumber;
              //       }
              //     })
              //     .join(", ");
              switch (eventType) {
                case TaskEventType.Comment:
                  return (
                    <React.Fragment key={index + "comment"}>
                      {commentData && (
                        <CommentCard
                          isPinnedView={false}
                          createdAt={createdAt}
                          taskId={taskId}
                          eventId={_id}
                          initiator={initiator}
                          commentData={commentData}
                          isPinned={isPinned}
                          isCommentInitiator={isCommentInitiator}
                        />
                      )}
                    </React.Fragment>
                  );
                case TaskEventType.DoneTask:
                case TaskEventType.RejectClosed:
                case TaskEventType.RejectReopen:
                case TaskEventType.Reopen:
                case TaskEventType.Approved:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData.files.length === 0;
                  return (
                    <React.Fragment key={index + eventType}>
                      {IsMessageBot ? (
                        <MessageBot
                          type={eventType}
                          initiator={initiator}
                          eventData={eventData}
                          isCommentInitiator={isCommentInitiator}
                        />
                      ) : (
                        <>
                          <MessageBot
                            type={eventType}
                            initiator={initiator}
                            eventData={eventData}
                            isCommentInitiator={isCommentInitiator}
                          />
                          {commentData && (
                            <CommentCard
                              isPinnedView={false}
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
                    </React.Fragment>
                  );
                case TaskEventType.ForwardTask:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData?.files?.length === 0;
                  return (
                    <React.Fragment key={index + eventType}>
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
                              isPinnedView={false}
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
                    </React.Fragment>
                  );
                case TaskEventType.InvitedUser:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData?.files?.length === 0;
                  return (
                    <React.Fragment key={index + "invitedUser"}>
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
                              isPinnedView={false}
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
                    </React.Fragment>
                  );
                case TaskEventType.CancelTask:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData?.files?.length === 0;
                  return (
                    <React.Fragment key={index + "cancelTask"}>
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
                                isPinnedView={false}
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
                    </React.Fragment>
                  );
                case TaskEventType.UnCancelTask:
                  IsMessageBot =
                    commentData?.message === "" &&
                    commentData?.files?.length === 0;
                  return (
                    <React.Fragment key={index + "unCancelTask"}>
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
                              isPinnedView={false}
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
                    </React.Fragment>
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
          <Comment
            doneCommentsRequired={false}
            doneImageRequired={false}
            title={""}
            showHeader={true}
            taskId={taskId}
          />
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

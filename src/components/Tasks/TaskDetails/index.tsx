import { Box } from "@mui/material";
import { CustomDivider, SubLabelTag } from "components/CustomTags";
import ImagePhotoViewer from "components/ImgLazyLoad/ImagePhotoViewer";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  IS_IMAGE,
  MEDIA_EXT,
  convertDateFormat,
} from "components/Utills/Globals";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { ITask } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import _ from "lodash";
import { useEffect, useRef, useState, useTransition } from "react";
import CommentCard from "./CommentCard";
import DetailsBody from "./DetailsBody";
import DetailsHeader from "./DetailsHeader";

interface IProps {
  task: ITask;
  TASK_UPDATED_TIME_STAMP: string;
  userSubStateLocal: string;
  handleClick?: (task: ITask) => void;
  isLocationTaskDetail?: boolean;
  isSmallView?: boolean;
  splitView: boolean;
}
function TaskDetails(props: IProps) {
  const { task, splitView } = props;
  const {
    dueDate,
    taskUID,
    assignedToState,
    project,
    creator,
    createdAt,
    description,
    events,
    invitedNumbers,
    files,
    _id,
    title,
    confirmer,
    viewer,
  } = task;

  const showFullView = localStorage.getItem("showFullView");
  const [isShowFullView, setIsShowFullView] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { openModal, isOpen, closeModal } = useOpenCloseModal();
  const dueDateLocal = convertDateFormat(dueDate);
  const pinnedComments = _.filter(events, (event) => event.isPinned);
  useEffect(() => {
    let getShowValue = showFullView && JSON.parse(showFullView);
    const isTaskFind = getShowValue && taskUID in getShowValue;
    if (isTaskFind) {
      startTransition(() => {
        setIsShowFullView(getShowValue[taskUID]);
      });
    } else {
      setIsShowFullView(true);
    }
  }, [taskUID]);

  const docs = FILTER_DATA_BY_EXT(DOC_EXT, files);
  const media = FILTER_DATA_BY_EXT(MEDIA_EXT, files);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isImageFile = (file: any) => IS_IMAGE(file.fileName);
  const eventsFiles =
    events && events.length > 0
      ? events.flatMap((data) =>
          (data?.commentData?.files || []).filter(isImageFile)
        )
      : [];
  const filteredFiles = (files || []).filter(isImageFile);
  const allFiles = [...filteredFiles, ...eventsFiles];
  const uniqueImageFiles = Array.from(new Set(allFiles));
  const containerRef: any = useRef(null);
  const [heightOffset, setHeightOffset] = useState<number>(0);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      const newTop = containerRef.current.getBoundingClientRect().top;
      setHeightOffset(newTop + 30);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current && !initialRender) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
    return () => {
      setInitialRender(false);
    };
  }, [props.TASK_UPDATED_TIME_STAMP]);

  const handleFiles = (files: any, selectedFileId: string) => {
    const currentIndex = allFiles.findIndex(
      (file: any) => file._id === selectedFileId
    );
    if (currentIndex > -1) {
      setCurrentImageIndex(currentIndex);
    }
    openModal();
  };

  return (
    <Box
      key={_id}
      sx={{
        paddingTop: 1.25,
        pl: 2,
        pr: "10px",
      }}
    >
      <Box
        ref={containerRef}
        pr={1.25}
        mr={-1}
        sx={{
          maxHeight: `calc(100vh - ${heightOffset}px)`,
          overflow: "auto",
        }}
      >
        <DetailsHeader
          splitView={splitView}
          assignedToState={assignedToState}
          title={title}
          creator={creator}
          project={project}
          invitedNumbers={invitedNumbers}
          taskUID={taskUID}
          confirmer={confirmer}
          viewer={viewer}
          dueDate={dueDateLocal}
          createdDate={createdAt}
        />
        {isShowFullView && (
          <>
            {docs.length > 0 && (
              <>
                <ReadMoreWrapper
                  count={docs.length}
                  title="Files"
                  type="file"
                  data={docs}
                  download={true}
                />
                <CustomDivider />
              </>
            )}
            <DetailsBody
              media={media}
              description={description}
              handleFiles={handleFiles}
            />
          </>
        )}
        {pinnedComments.length > 0 ? (
          <>
            <SubLabelTag>Pinned comments</SubLabelTag>
            {pinnedComments.map((comment, index) => (
              <CommentCard
                key={index}
                isPinnedView={true}
                commentData={comment.commentData}
                initiator={comment.initiator}
                isCommentInitiator={false}
                isPinned={comment.isPinned}
                eventId={comment._id}
                taskId={comment.taskId}
                createdAt={comment.createdAt}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </Box>
      {uniqueImageFiles.length > 0 && (
        <ImagePhotoViewer
          imgs={uniqueImageFiles.map((image: any) => image.fileUrl)}
          currImg={currentImageIndex}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </Box>
  );
}

export default TaskDetails;

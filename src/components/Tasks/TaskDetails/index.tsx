import { Box } from "@mui/material";
import { CustomDivider } from "components/CustomTags";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  IS_IMAGE,
  MEDIA_EXT,
  convertDateFormat,
  momentLocalDateTime,
} from "components/Utills/Globals";
import ReadMoreWrapper from "components/Utills/ReadMoreWrapper";
import { ITask } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useEffect, useRef, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import AddedDetails from "./AddedDetails";
import DetailActions from "./DetailActions";
import DetailsBody from "./DetailsBody";
import DetailsHeader from "./DetailsHeader";

interface IProps {
  task: ITask;
  TASK_UPDATED_TIME_STAMP: string;
  userSubStateLocal: string;
  handleClick?: (task: ITask) => void;
  taskDetailContHeight?: number;
}
function TaskDetails(props: IProps) {
  const { taskDetailContHeight } = props;
  const {
    dueDate,
    taskUID,
    assignedToState,
    // userSubState,
    topic,
    project,
    creator,
    createdAt,
    description,
    events,
    invitedNumbers,
    files,
    _id,
    doneCommentsRequired,
    doneImageRequired,
  } = props.task;
  const showFullView = localStorage.getItem("showFullView");
  const [isShowFullView, setIsShowFullView] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { openModal, isOpen, closeModal } = useOpenCloseModal();

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

  const taskDragContHeight = useSelector(
    (store: RootState) => store.task.taskDragContHeight
  );
  const docs = FILTER_DATA_BY_EXT(DOC_EXT, files);
  const media = FILTER_DATA_BY_EXT(MEDIA_EXT, files);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isImageFile = (file: any) => IS_IMAGE(file.fileName);
  const eventsFiles =
    events.length > 0
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
      if (taskDragContHeight > 120) {
        setHeightOffset(newTop + 30 + taskDragContHeight);
      } else {
        setHeightOffset(newTop + 25);
      }
    }
  }, [taskDragContHeight]);

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
        px: 2,
      }}
    >
      <DetailActions
        doneImageRequired={doneImageRequired}
        doneCommentsRequired={doneCommentsRequired}
        taskId={_id}
        userSubState={props.userSubStateLocal}
        dueDate={convertDateFormat(dueDate)}
        taskUid={taskUID}
        createdOn={momentLocalDateTime(createdAt)}
        assignedToState={assignedToState}
        invitedNumbers={invitedNumbers}
        isExpanded={isShowFullView}
        setIsExpanded={setIsShowFullView}
      />
      <CustomDivider sx={{ my: 1.3 }} />
      <Box
        ref={containerRef}
        pr={1.25}
        mr={-1}
        sx={{
          maxHeight: taskDetailContHeight
            ? `${taskDetailContHeight}px`
            : `calc(100vh - ${heightOffset}px)`,
          overflow: "auto",
        }}
      >
        <DetailsHeader
          assignedToState={assignedToState}
          topic={topic}
          creator={creator}
          project={project}
          invitedNumbers={invitedNumbers}
        />
        {isShowFullView && (
          <>
            <ReadMoreWrapper
              count={docs.length}
              title="Files"
              type="file"
              data={docs}
            />
            <CustomDivider />
            <DetailsBody
              media={media}
              description={description}
              handleFiles={handleFiles}
            />
          </>
        )}
        {events && <AddedDetails events={events} hasFile={media.length > 0} />}
      </Box>
      {uniqueImageFiles.length > 0 && (
        <ImgsViewerSlider
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

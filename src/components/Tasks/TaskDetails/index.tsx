import { Box } from "@mui/material";
import { CustomDivider } from "components/CustomTags";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import FileBox from "components/Utills/FileBox";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  IS_IMAGE,
  MEDIA_EXT,
  convertDateFormat,
  momentLocalDate,
} from "components/Utills/Globals";
import { ITask } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import AddedDetails from "./AddedDetails";
import DetailActions from "./DetailActions";
import DetailsBody from "./DetailsBody";
import DetailsHeader from "./DetailsHeader";

interface IProps {
  task: ITask;
  handleClick?: (task: ITask) => void;
}
function TaskDetails(props: IProps) {
  const {
    dueDate,
    taskUID,
    assignedToState,
    userSubState,
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
  const [isShowFullView, setIsShowFullView] = useState(false);
  const { openModal, isOpen, closeModal } = useOpenCloseModal();
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
  const [heightOffset, setHeightOffset] = useState();

  useEffect(() => {
    if (containerRef.current) {
      const newTop = containerRef.current.getBoundingClientRect().top;
      if (taskDragContHeight > 120) {
        setHeightOffset(newTop + 22 + taskDragContHeight);
      } else {
        setHeightOffset(newTop + 22);
      }
    }
  }, [containerRef, taskDragContHeight]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [events?.length, containerRef]);

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
        marginLeft: "16px",
        marginRight: "16px",
      }}
      className="custom-scrollbar"
    >
      <DetailActions
        doneImageRequired={doneImageRequired}
        doneCommentsRequired={doneCommentsRequired}
        taskId={_id}
        userSubState={userSubState}
        dueDate={convertDateFormat(dueDate)}
        taskUid={taskUID}
        createdOn={momentLocalDate(createdAt)}
        assignedToState={assignedToState}
        invitedNumbers={invitedNumbers}
        isExpanded={isShowFullView}
        setIsExpanded={setIsShowFullView}
      />
      <CustomDivider sx={{ my: 1.3 }} />
      <Box
        ref={containerRef}
        className="custom-scrollbar"
        sx={{
          overflow: "scroll",
          maxHeight: `calc(100vh - ${heightOffset}px)`,
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
            <FileBox
              media={media}
              title="Files"
              bt={true}
              bb={true}
              files={docs}
            />
            <CustomDivider />
            {events ? (
              <>
                <DetailsBody
                  media={media}
                  description={description}
                  events={events}
                  handleFiles={handleFiles}
                />
                <CustomDivider />
              </>
            ) : (
              <></>
            )}
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

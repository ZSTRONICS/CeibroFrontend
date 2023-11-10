import { Box } from "@mui/material";
import ImgsViewerSlider from "components/ImgLazyLoad/ImgsViewerSlider";
import FileBox from "components/Utills/FileBox";
import {
  DOC_EXT,
  FILTER_DATA_BY_EXT,
  IS_IMAGE,
  MEDIA_EXT,
  momentdeDateFormatWithDay,
} from "components/Utills/Globals";
import { ITask } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import { useState } from "react";
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
  const { openModal, isOpen, closeModal } = useOpenCloseModal();
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
        overflowY: "hidden",
        marginLeft: "10px",
        marginRight: "10px",
      }}
      className="custom-scrollbar"
    >
      <DetailsHeader
        doneCommentsRequired={doneCommentsRequired}
        doneImageRequired={doneImageRequired}
        assignedToState={assignedToState}
        userSubState={userSubState}
        dueDate={dueDate || ""}
        taskUid={taskUID}
        topic={topic}
        creator={creator}
        project={project}
        invitedNumbers={invitedNumbers}
        taskId={_id}
        createdOn={momentdeDateFormatWithDay(createdAt)}
      />
      <FileBox media={media} title="Files" bt={true} bb={true} files={docs} />
      {events ? (
        <DetailsBody
          media={media}
          description={description}
          events={events}
          handleFiles={handleFiles}
        />
      ) : (
        <></>
      )}
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

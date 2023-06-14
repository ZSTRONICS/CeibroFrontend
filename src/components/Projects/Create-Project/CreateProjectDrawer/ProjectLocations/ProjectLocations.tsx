import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CustomModal from "components/Modal";
import { useApiCallOnce, useOpenCloseModal } from "hooks";
import { useSelector } from "react-redux";
import { PROJECT_APIS } from "redux/action";
import { RootState } from "redux/reducers";
import AddDrawingFloor from "./AddDrawingFloor";
import { FloorContent, FloorTabs } from "./LocationTabs";
import { RouteComponentProps } from "react-router-dom";
import { socket } from "services/socket.services";
import NoData from "components/Chat/NoData";
import CardSkeleton from "components/material-ui/skeleton/CardSkeleton";
import { CustomStack } from "components/CustomTags";

interface RouteParams {
  projectId: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

function ProjectLocations(props: IProps) {
  const { isOpen, closeModal, openModal } = useOpenCloseModal();
  const { isDocUploaded } = useSelector((files: RootState) => files.docs);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { projectId } = props.match.params;

  const handleChange = (newValue: number) => {
    setSelectedTab(newValue);
  };

  const { allFloors, selectedProject, isFloorLoading } = useSelector(
    (state: RootState) => state.project
  );

  const floorId = allFloors.length > 0 && allFloors[selectedTab]._id;
  if (projectId) {
    socket.setSelectedProjId(projectId);
  }

  const action = PROJECT_APIS.getFloorsByProjectId({
    other: {
      projectId: String(projectId),
    },
  });

  useApiCallOnce(action, [projectId]);

  if (isDocUploaded) {
    setTimeout(() => {
      closeModal();
    }, 500);
  }

  return (
    <>
      {isFloorLoading && (
        <CustomStack gap={3} flexWrap="wrap" justifyContent="center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item: any) => (
            <CardSkeleton key={item} />
          ))}
        </CustomStack>
      )}

      {!isFloorLoading && allFloors.length > 0 ? (
        <>
          <TabsListMain>
            <FloorTabs
              floors={allFloors}
              selectedTab={selectedTab}
              onChange={handleChange}
              handleModal={openModal}
            />
          </TabsListMain>
          <FloorContent floors={allFloors} selectedTab={selectedTab} />
        </>
      ) : (
        <>{!isFloorLoading && <NoData title="No results found!" />}</>
      )}
      {isOpen && (
        <CustomModal
          maxWidth="sm"
          isOpen={isOpen}
          handleClose={closeModal}
          title="Add New Drawing"
          children={
            <AddDrawingFloor
              floorId={floorId}
              isDrawing={true}
              showTextField={false}
              showImgDragDrop={true}
            />
          }
          showCloseBtn={true}
        />
      )}
    </>
  );
}

export default ProjectLocations;

export const TabsListMain = styled(Box)(
  ({ theme }) => `
  width: 100%;
  position:fixed;
  background:white;
  z-index:10;
  padding-top: 10px;
  `
);

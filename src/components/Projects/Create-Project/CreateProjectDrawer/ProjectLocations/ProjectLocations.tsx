import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CustomStack } from "components/CustomTags";
import CustomModal from "components/Modal";
import NoData from "components/NotFound/NoData";
import CardSkeleton from "components/material-ui/skeleton/CardSkeleton";
import { useApiCallOnce, useOpenCloseModal } from "hooks";
import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { PROJECT_APIS } from "redux/action";
import { RootState } from "redux/reducers";
import { socket } from "services/socket.services";
import AddDrawingFloor from "./AddDrawingFloor";
import { FloorContent, FloorTabs } from "./LocationTabs";

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

  const { allFloors, isFloorLoading } = useSelector(
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

  const container = document.getElementById("container");
  if (container) {
    container.scrollTop = 0;
  }

  return (
    <>
      {isFloorLoading ? (
        <CustomStack gap={3} flexWrap="wrap" justifyContent="center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item: any) => (
            <CardSkeleton key={item} />
          ))}
        </CustomStack>
      ) : allFloors.length > 0 ? (
        <>
          <TabsListMain>
            <FloorTabs
              floors={allFloors}
              selectedTab={selectedTab}
              onChange={handleChange}
              handleModal={openModal}
            />
          </TabsListMain>
          <Box
            id="container"
            sx={{ height: "calc(100vh - 84px)", overflow: "auto" }}
          >
            <FloorContent floors={allFloors} selectedTab={selectedTab} />
          </Box>
        </>
      ) : (
        <NoData title="No results found!" />
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

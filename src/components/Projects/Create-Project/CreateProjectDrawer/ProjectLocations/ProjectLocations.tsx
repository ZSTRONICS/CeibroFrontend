import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CButton from "components/Button/Button";
import { CustomStack } from "components/CustomTags";
import CustomModal from "components/Modal";
import { useHistory } from "react-router-dom";
import AddDrawingFloor from "./AddDrawingFloor";
import LocationCard from "./LocationCard";
import LocationTabs, { TabItem } from "./LocationTabs";
import { useOpenCloseModal } from "hooks";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

function ProjectLocations() {
  const history = useHistory();
  const { isOpen, closeModal, openModal } = useOpenCloseModal();
  const { isDocUploaded } = useSelector((files: RootState) => files.docs);
  const handleLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newRoutePath = `/drawingDetail`;
    history.push(newRoutePath);
  };
  const viewBtn = () => {
    return (
      <CButton
        onClick={(e: React.MouseEvent) => handleLocation(e)}
        label="View"
        variant="contained"
        sx={{
          padding: "5px 8px",
          fontWeight: "700",
          minWidth: { xs: "70px", sm: "80px" },
          fontSize: { xs: 12, sm: 13 },
        }}
      />
    );
  };

  const tabsData: TabItem[] = [
    {
      label: "Floor One",
      content: (
        <CustomStack
          sx={{ flexWrap: "wrap", gap: "20px", mt: 4, position: "sticky" }}
        >
          <LocationCard
            locationTitle="Floor 1"
            cardContent={viewBtn()}
            url=""
          />

          <LocationCard
            locationTitle="Floor 1"
            cardContent={viewBtn()}
            url=""
          />
          <LocationCard
            locationTitle="Floor 1"
            cardContent={viewBtn()}
            url=""
          />

          <LocationCard
            locationTitle="Floor 1"
            cardContent={viewBtn()}
            url=""
          />
          <LocationCard
            locationTitle="Floor 1"
            cardContent={viewBtn()}
            url=""
          />

          <LocationCard
            locationTitle="Floor 1"
            cardContent={viewBtn()}
            url=""
          />
          <LocationCard
            locationTitle="Floor 1"
            cardContent={viewBtn()}
            url=""
          />
        </CustomStack>
      ),
    },
    {
      label: "Floor two",
      content: (
        <CustomStack sx={{ flexWrap: "wrap", gap: "20px", mt: 4 }}>
          <LocationCard
            locationTitle="Floor 1"
            cardContent={viewBtn()}
            url=""
          />
          <LocationCard
            locationTitle="Floor 1"
            cardContent={viewBtn()}
            url=""
          />
        </CustomStack>
      ),
    },
  ];

  return (
    <>
      <LocationTabs tabs={tabsData} handleModal={openModal} />
      {isOpen && (
        <CustomModal
          maxWidth="sm"
          isOpen={isOpen}
          handleClose={closeModal}
          title="Add New Drawing"
          children={
            <AddDrawingFloor
              isDocUploaded={isDocUploaded}
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

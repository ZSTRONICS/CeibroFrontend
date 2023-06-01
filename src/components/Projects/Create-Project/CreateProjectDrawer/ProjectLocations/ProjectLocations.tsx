import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CButton from "components/Button/Button";
import { CustomStack } from "components/CustomTags";
import CustomModal from "components/Modal";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddFloor from "./AddFloor";
import LocationCard from "./LocationCard";
import LocationTabs, { TabItem } from "./LocationTabs";

function ProjectLocations() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(true);
  };

  const handleLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    let _id: string = "asld43345498sdlkj";
    const newRoutePath = `/drawingDetail/${_id}`;
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
      <LocationTabs tabs={tabsData} handleModal={handleModal}/>

      <CustomModal
        maxWidth="xs"
        isOpen={isOpen}
        handleClose={function (e: any): void {
          setIsOpen(false);
        }}
        title="Add New Drawing"
        children={<AddFloor />}
        showCloseBtn={true}
      />
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

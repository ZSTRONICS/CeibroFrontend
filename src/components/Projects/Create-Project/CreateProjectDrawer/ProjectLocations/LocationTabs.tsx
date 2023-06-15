import React from "react";
// library
import { Box, Tab, Tabs } from "@mui/material";
import { useHistory } from "react-router-dom";
// types
import { Drawing, Floor } from "constants/interfaces";
// components
import { CButton } from "components/Button";
import assets from "assets/assets";
import LocationCard from "./LocationCard";
import { CustomStack } from "components/CustomTags";
import { useDispatch } from "react-redux";
import projectActions from "redux/action/project.action";

interface FloorTabsProps {
  floors: Floor[];
  selectedTab: number;
  onChange: (newValue: number) => void;
  handleModal: () => void;
}

interface FloorContentProps {
  floors: Floor[];
  selectedTab: number;
}

const FloorTabs: React.FC<FloorTabsProps> = ({
  floors,
  selectedTab,
  onChange,
  handleModal,
}) => {
  return (
    <Box>
      <Tabs value={selectedTab} onChange={(_, newValue) => onChange(newValue)}>
        {floors.map((floor: Floor) => (
          <Tab key={floor._id} label={floor.floorName} />
        ))}
        <Box sx={{ flex: 1, textAlign: "center", mt: 1 }}>
          <CButton
            startIcon={<assets.AddIcon />}
            onClick={handleModal}
            label="Drawing"
            variant="contained"
            sx={{
              padding: "5px 8px",
              fontWeight: "700",
              minWidth: { xs: "70px", sm: "80px" },
              fontSize: { xs: 12, sm: 13 },
            }}
          />
        </Box>
      </Tabs>
    </Box>
  );
};

const FloorContent: React.FC<FloorContentProps> = ({ floors, selectedTab }) => {
  const selectedFloor = floors[selectedTab];
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLocation = (e: React.MouseEvent, drawing: Drawing) => {
    e.stopPropagation();
    if (drawing) {
      dispatch(projectActions.setSelectedDrawing(drawing));
    }

    const newRoutePath = `/drawingDetail`;
    history.push(newRoutePath);
  };

  const viewBtn = (drawing: Drawing) => {
    return (
      <CButton
        onClick={(e: React.MouseEvent) => handleLocation(e, drawing)}
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
  return (
    <CustomStack
      sx={{ flexWrap: "wrap", gap: "20px", mt: 8, position: "sticky" }}
    >
      {selectedFloor.drawings.length > 0 ? (
        selectedFloor.drawings.map((drawing: Drawing, index: any) => {
          return (
            <LocationCard
              key={drawing._id}
              locationTitle={drawing.drawingName}
              cardContent={viewBtn(drawing)}
              url={drawing.thumbnail}
            />
          );
        })
      ) : (
        <p>No drawings available.</p>
      )}
    </CustomStack>
  );
};

export { FloorTabs, FloorContent };

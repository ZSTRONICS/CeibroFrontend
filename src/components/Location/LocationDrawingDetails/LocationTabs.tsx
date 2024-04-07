import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const CustomTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-flexContainer": {
    borderBottom: "1px solid #ddd", // Add a border to create an outline effect
  },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  minWidth: "unset", // Set to 'unset' to allow small size
  padding: theme.spacing(1), // Adjust padding as needed
  textTransform: "none", // Prevent text transformation
  "&.Mui-selected": {
    backgroundColor: "#e0e0e0", // Grey background for the selected tab
  },
}));

interface LocationTabsProps {
  activeTab: number;
  setSelectedTab: (newValue: number) => void;
}

function LocationTabs({ activeTab = 0, setSelectedTab }: LocationTabsProps) {
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <CustomTabs value={activeTab} onChange={handleTabChange}>
      <CustomTab label="Task" />
      <CustomTab label="Image" />
    </CustomTabs>
  );
}

export default LocationTabs;

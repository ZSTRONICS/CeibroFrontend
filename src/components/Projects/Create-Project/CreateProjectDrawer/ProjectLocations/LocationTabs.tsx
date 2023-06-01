import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { tabsIndexProps } from "components/Utills/Globals/Common";
import { TabPanelContainer } from "components/TaskComponent/Tabs/Tabs";
import CButton from "components/Button/Button";
import assets from "assets/assets";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  handleModal:()=>void
}

const LocationTabs: React.FC<TabsProps> = ({ tabs, handleModal }) => {
  const [tabValue, setTabValue] = useState(0);
  
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  //   const activeTabStyle = {
  //     backgroundColor: activeTabBackgroundColor,
  //     color: activeTabTextColor,
  //   };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              {...tabsIndexProps(index)}
              //  sx={tabValue === index ? activeTabStyle : ''}
            />
          ))}
          <Box sx={{ flex: 1, textAlign: "center", mt:1 }}>
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
      {tabs.map((tab, index) => (
        <TabPanelContainer key={index} value={tabValue} index={index}>
          {tab.content}
        </TabPanelContainer>
      ))}
    </Box>
  );
};

export default LocationTabs;

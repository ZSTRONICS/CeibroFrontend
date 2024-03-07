import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

interface TabData {
  label: string;
  content: React.ReactNode;
}

interface BasicTabsProps {
  tabsData: TabData[];
  tabsBgColor: string;
}

export default function BasicTabs({ tabsData, tabsBgColor }: BasicTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs"
        sx={{
          backgroundColor: tabsBgColor || "transparent",
          "& .Mui-selected": { color: "black !important" },
          "& .MuiTabs-indicator": {
            backgroundColor: "black",
          },
        }}
      >
        {tabsData.map((tab, index) => (
          <Tab
            sx={{
              textTransform: "capitalize",
              color: "#0076C8",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: "14px",
            }}
            key={index}
            label={tab.label}
          />
        ))}
      </Tabs>
      {tabsData.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={value !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
        >
          {value === index && <Box sx={{ p: 1 }}>{tab.content}</Box>}
        </div>
      ))}
    </Box>
  );
}

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
  isFileTabs?: boolean;
}

export default function BasicTabs({
  tabsData,
  tabsBgColor,
  isFileTabs,
}: BasicTabsProps) {
  const [value, setValue] = React.useState(0);
  // const location = useLocation();
  // const history = useHistory();
  // const searchParams = new URLSearchParams(location.search);
  // const initialValue = parseInt(searchParams.get('tab') || '0', 10);
  const filesTabStyle = {
    backgroundColor: "#F4F4F4",
    borderRadius: "4px",
    color: "#818181",
  };
  const filesTabSActivetyle = {
    backgroundColor: "#0076C8",
    borderRadius: "4px",
    color: "white",
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(tabsData[newValue].label);
    setValue(newValue);
    // searchParams.set('tab', newValue.toString());
    // history.push({ search: searchParams.toString() });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs"
        sx={{
          backgroundColor: tabsBgColor || "transparent",
          "& .Mui-selected": {
            color: `${isFileTabs ? "white !important" : "black !important"}`,
          },
          "& .MuiTabs-indicator": {
            ...(isFileTabs
              ? filesTabSActivetyle
              : { backgroundColor: "black" }),
          },
          "& .MuiTabs-flexContainer": {
            gap: 1,
          },
        }}
      >
        {tabsData.map((tab, index) => (
          <Tab
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: "14px",
              ...(isFileTabs && value === index
                ? filesTabSActivetyle
                : isFileTabs
                ? filesTabStyle
                : { color: "#0076C8" }),
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

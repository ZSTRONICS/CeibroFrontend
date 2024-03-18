import { Badge } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { AddStatusTag, CustomStack } from "components/CustomTags";
import * as React from "react";

interface TabData {
  label: string;
  icon?: any;
  count?: number;
  content: React.ReactNode;
}

interface BasicTabsProps {
  tabsData: TabData[];
  tabsBgColor: string;
  isFileTabs?: boolean;
  selectedTabIndex?: number;
  setSelectedTab?: (label: string) => void;
  onChangeTab?: (label: string) => void;
}

export default function BasicTabs({
  tabsData,
  tabsBgColor,
  isFileTabs,
  setSelectedTab,
  selectedTabIndex,
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
    setSelectedTab && setSelectedTab(tabsData[newValue].label);
    setValue(newValue);

    // searchParams.set('tab', newValue.toString());
    // history.push({ search: searchParams.toString() });
  };
  // console.log("selectedTab", selectedTab);
  React.useEffect(() => {
    if (selectedTabIndex) {
      setSelectedTab && setSelectedTab(tabsData[selectedTabIndex].label);
      setValue(selectedTabIndex);
    }
  }, [selectedTabIndex]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: tabsBgColor || "transparent",
          "& .Mui-selected": {
            color: `${isFileTabs ? "white !important" : "black !important"}`,
            borderBottom: "2px solid",
          },
          "& .MuiTabs-indicator": {
            ...(isFileTabs ? filesTabSActivetyle : { display: "none" }),
          },
          "& .MuiTabs-flexContainer": {
            gap: 0.5,
            overflow: "auto",
          },
        }}
      >
        {tabsData.map((tab, index) => (
          <Tab
            key={index + tab.label}
            sx={{
              // border: "solid 1px red",
              gap: 0.5,
              textTransform: "capitalize",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: "14px",
              minHeight: "50px",
              ...(isFileTabs && value === index
                ? filesTabSActivetyle
                : isFileTabs
                ? filesTabStyle
                : { color: "#0076C8" }),
            }}
            icon={tab.icon || ""}
            iconPosition="start"
            label={
              <CustomStack sx={{ gap: 2 }}>
                <AddStatusTag sx={{ color: "unset" }}>{tab.label}</AddStatusTag>
                {tab.count && tab.count > 0 ? (
                  <Badge
                    color="primary"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: `${
                          value === index ? "black" : "#0076C8"
                        }`,
                      },
                    }}
                    variant="standard"
                    badgeContent={tab.count}
                  />
                ) : (
                  <></>
                )}
              </CustomStack>
            }
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
          {value === index && <Box>{tab.content}</Box>}
        </div>
      ))}
    </Box>
  );
}

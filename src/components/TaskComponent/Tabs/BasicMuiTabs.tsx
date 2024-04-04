import { Badge, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  selectedTabIndex: number;
  showHiddenTasks?: boolean;
  setSelectedTab?: (label: string) => void;
  onChangeTab?: (label: string) => void;
}

export default function BasicTabs({
  tabsData,
  tabsBgColor,
  isFileTabs,
  showHiddenTasks,
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
  };

  const findIndex = tabsData.findIndex((tab, i) => i === value);

  React.useEffect(() => {
    if (findIndex === -1) {
      setValue(0);
      setSelectedTab && setSelectedTab(tabsData[0].label);
    } else if (selectedTabIndex && tabsData) {
      const tabLabel = tabsData.find((item, i) => i === selectedTabIndex);
      const findIndex = tabsData.findIndex((tab, i) => {
        if (tabLabel) {
          return tab.label === tabLabel.label;
        }
        return i === value;
      });
      if (tabLabel) {
        setValue(findIndex);
        setSelectedTab && setSelectedTab(tabLabel.label);
      }
    }
  }, [selectedTabIndex, tabsData.length]);

  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.between(1450, 1600));
  const isMdScreen = useMediaQuery(theme.breakpoints.between(1150, 1450));
  const isSmScreen = useMediaQuery(theme.breakpoints.between(900, 1150));

  const TabsLeft = isLgScreen
    ? "19%"
    : isMdScreen
    ? "15%"
    : isSmScreen
    ? "14%"
    : "21%";

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs"
        sx={{
          alignItems: "center",
          width: "100%",
          span: {
            display: isFileTabs ? "none" : "",
          },
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
            gap: isFileTabs ? 0.1 : 0.15,
            overflow: "auto",
          },
        }}
      >
        {tabsData.map((tab, index) => (
          <Tab
            key={index + tab.label}
            sx={{
              marginLeft: isFileTabs ? "0%" : showHiddenTasks ? TabsLeft : "2%",
              marginRight: isFileTabs ? "10px" : "",
              marginTop: isFileTabs ? "10px" : "0px",
              textTransform: "capitalize",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: "14px",
              padding: "0px",
              pr: 2,
              pl: 1,
              maxHeight: isFileTabs ? "32px" : null,
              minHeight: isFileTabs ? "32px" : "50px",
              ...(isFileTabs && value === index
                ? filesTabSActivetyle
                : isFileTabs
                ? filesTabStyle
                : { color: "#0076C8" }),
            }}
            icon={tab.icon || ""}
            iconPosition="start"
            label={
              <CustomStack sx={{ gap: 1 }}>
                <AddStatusTag sx={{ color: "unset" }}>{tab.label}</AddStatusTag>
                {tab.count && tab.count > 0 ? (
                  <Badge
                    color="primary"
                    sx={{
                      pl: 1,
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
      {/* {isFileTabs && ( */}
      <Divider sx={{ border: "solid 1px white", backgroundColor: "white" }} />
      {/* )} */}
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

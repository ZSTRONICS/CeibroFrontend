import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import { InputSearch } from "components/GenericComponents";
import { useState } from "react";
import { HeadStyles, tabStyles } from "./MiniCardTaskStyle";
import TaskFilters from "./TaskFilters";

interface MiniTaskImageNaviProps {
  isSmallView: boolean;
}

const MiniTaskImageNavi = ({ isSmallView }: MiniTaskImageNaviProps) => {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Box style={HeadStyles.head_container}>
        <Box style={HeadStyles.head_navigation}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box style={tabStyles.head_navi_btn}>
                  <TabList
                    TabIndicatorProps={{
                      children: <span className="MuiTabs-indicatorSpan" />,
                    }}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab sx={{ ...tabStyles }} label="Task" value="1" />
                    <Tab sx={{ ...tabStyles }} label="Image" value="2" />
                  </TabList>
                </Box>
                {/* //// */}
                <Box style={HeadStyles.head_filterization}>
                  <TaskFilters isSmallView={isSmallView} />
                </Box>
                {/* //// */}
                <Box style={HeadStyles.head_search}>
                  <Box sx={{ width: "88%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                        marginLeft: "16px",
                      }}
                    >
                      <InputSearch
                        placeholder="Start typing for search"
                        value=""
                        onChange={(e: any) => console.log(e.target.value)}
                      />
                    </Box>
                  </Box>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M14.9993 17.5L11.666 14.1667H14.166V5.83333H11.666L14.9993 2.5L18.3327 5.83333H15.8327V14.1667H18.3327M1.66602 15.8333V14.1667H9.99935V15.8333M1.66602 10.8333V9.16667H7.49935V10.8333M1.66602 5.83333V4.16667H4.99935V5.83333H1.66602Z"
                      fill="#0076C8"
                    />
                  </svg>
                </Box>
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MiniTaskImageNavi;

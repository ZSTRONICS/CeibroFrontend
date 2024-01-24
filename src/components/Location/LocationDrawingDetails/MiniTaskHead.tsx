import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import { InputSearch } from "components/GenericComponents";
import { useEffect, useRef, useState } from "react";
import { HeadStyles, tabStyles } from "./MiniCardTaskStyle";
import TaskFilters from "./TaskFilters";

interface IProps {
  isSmallView: boolean;
  setTaskHeaderHeiht: (value: number) => void;
}

const MiniTaskImageNavi = ({ isSmallView, setTaskHeaderHeiht }: IProps) => {
  const [value, setValue] = useState("1");
  const headerRef: any = useRef(null);
  useEffect(() => {
    if (headerRef.current && headerRef.current.clientHeight) {
      setTaskHeaderHeiht(headerRef.current.clientHeight);
    }
  }, [headerRef]);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Box style={HeadStyles.head_container} ref={headerRef}>
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
                <Box style={HeadStyles.head_filterization}>
                  <TaskFilters isSmallView={isSmallView} />
                </Box>
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

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, IconButton } from "@mui/material";
import Tab from "@mui/material/Tab";
import { InputSearch } from "components/GenericComponents";
import { SortIcon } from "components/material-ui/icons/sort/sort";
import { useEffect, useRef, useState } from "react";
import { HeadStyles, tabStyles } from "./MiniCardTaskStyle";
import TaskFilters from "./TaskFilters";

interface IProps {
  isSmallView: boolean;
  setTaskHeaderHeiht: (value: number) => void;
}

const LocationTaskHead = ({ isSmallView, setTaskHeaderHeiht }: IProps) => {
  const [value, setValue] = useState("1");
  const headerRef: any = useRef(null);
  useEffect(() => {
    if (headerRef.current && headerRef.current.clientHeight) {
      // console.log("headerRef clientHeight", headerRef.current.clientHeight);
      setTaskHeaderHeiht(headerRef.current.clientHeight);
    }
  }, [headerRef, isSmallView]);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box style={HeadStyles.head_container} ref={headerRef}>
      <TabContext value={value}>
        <TabList
          sx={{
            width: "100%",
            borderBottom: "1px solid #818181",
            padding: "10px 10px 16px",
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
            span: {
              display: "none",
            },
          }}
          TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
          }}
          onChange={handleChange}
          aria-label="lab API tabs example"
        >
          <Tab sx={{ ...tabStyles }} label="Task" value="1" />
          <Tab sx={{ ...tabStyles }} label="Image" value="2" />
        </TabList>

        <Box style={HeadStyles.head_filterization}>
          <TaskFilters isSmallView={isSmallView} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "5px 10px",
          }}
        >
          <InputSearch
            placeholder="Start typing for search"
            value=""
            onChange={(e: any) => console.log(e.target.value)}
          />
          <IconButton
            style={{ color: "#0076C8", padding: "0px" }}
            onClick={() => {}}
          >
            <SortIcon />
          </IconButton>
        </Box>
      </TabContext>
    </Box>
  );
};

export default LocationTaskHead;

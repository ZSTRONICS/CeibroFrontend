import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, IconButton } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useTheme } from '@mui/material/styles';
import { InputSearch } from "components/GenericComponents";
import { SortIcon } from "components/material-ui/icons/sort/sort";
import { useDynamicDimensions } from "hooks";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HeadStyles, tabStyles } from "./MiniCardTaskStyle";
import TaskFilters from "./TaskFilters";

interface IProps {
  isSmallView: boolean;
  setTaskHeaderHeiht: (value: number) => void;
  handleSearch: (value: string) => void;
  searchText: string;
  Taskbtn: boolean;
}
interface RouteParams {
  projectId: string;
  groupId: string;
  drawingId: string;
}
const LocationTaskHead = ({
  isSmallView,
  setTaskHeaderHeiht,
  handleSearch,
  searchText,
  Taskbtn,
}: IProps) => {
  const history = useHistory();
  const { projectId, groupId, drawingId } = useParams<RouteParams>();
  const [value, setValue] = useState("1");
  const {
    containerRef: headerRef,
    dimensions,
    updateDimensions,
  } = useDynamicDimensions();

  const theme = useTheme();
  // const isXLScreen = useMediaQuery(theme.breakpoints.down('700px'));


  useEffect(() => {
    updateDimensions();
    setTaskHeaderHeiht(dimensions.height);
  }, [headerRef, dimensions.height, isSmallView]);

  const handleChange = (event: any, newValue: any) => {
    if (newValue == 1) {
    } else if (newValue == 2) {
      history.push(
        `/location/project/${projectId}/group/${groupId}/drawing/${drawingId}/image`
      );
    }
    setValue(newValue);
  };


  return (
    <Box style={HeadStyles.head_container} ref={headerRef}>
      <TabContext value={value}>
        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
           
          }}
        > */}
        <TabList
          sx={{
            width: "100%",
            padding: "0 6px 6px",
            borderBottom: "solid 1px #818181",
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
              alignItems: "center",
              display: "flex",
              justifyContent: isSmallView?"center":'flex-start',
              gap: isSmallView?0.4:1,
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
          <Tab
            sx={{
              ...tabStyles,
              //  marginRight: '10px',
              minWidth: "60px",
              maxWidth: "60px",
            }}
            label="Task"
            value="1"
          />
          <Tab
            sx={{
              ...tabStyles,
              marginLeft: Taskbtn ? "16px" : "",
              minWidth: "60px",
              maxWidth: "60px",
              transition: "all linear 0.30s",

              "@media screen and (max-width: 900px)": {
                marginLeft: "0px",
              },
            }}
            label="Image"
            value="2"
          />
        </TabList>
        {/* </Box> */}
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
            placeholder={Taskbtn ? "Start typing for search" : ""}
            value={searchText}
            onChange={handleSearch}
          />
          <IconButton
            style={{ color: "#0076C8", padding: "0px" }}
            onClick={() => { }}
          >
            <SortIcon />
          </IconButton>
        </Box>
      </TabContext>
    </Box>
  );
};

export default LocationTaskHead;

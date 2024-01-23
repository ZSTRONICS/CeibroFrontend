import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import SortIcon from "components/material-ui/icons/LocationIcons/SortIcon";

import useSearchText from "hooks/useSearchText";
import { useEffect, useRef, useState } from "react";
import SearchField from "./Components/SearchField";

interface DrawingFilesProps {
  windowActualHeight: number;
}

const DrawingFiles = (props: DrawingFilesProps) => {
  const { windowActualHeight } = props;
  const [contHeight, setContHeight] = useState<number>(50);

  const searchContainer: any = useRef(null);
  const { searchText, handleSearchTextChange, clearSearchText } =
    useSearchText();
  useEffect(() => {
    if (searchContainer.current) {
      setContHeight(searchContainer.current.clientHeight + 25);
    }
  }, [windowActualHeight]);
  const handleAddDrawingFile = () => {
    console.log("added drawing logic");
  };

  const handleSortingDrawingFile = () => {
    console.log("added sorting logic");
  };

  return (
    <Box sx={{ paddingLeft: "16px", paddingRight: "16px" }}>
      <Box ref={searchContainer}>
        <SearchField
          handleSearch={handleSearchTextChange}
          searchText={searchText}
        />
        <Grid
          container
          alignItems={"center"}
          marginBottom={"8px"}
          marginTop={"8px"}
        >
          <Grid item xs={10}>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: 700,
              }}
            >
              Drawing Files
            </Typography>
          </Grid>
          <Grid item xs={2} container justifyContent="flex-end">
            <IconButton
              style={{ color: "#0076C8", padding: "0px" }}
              onClick={handleSortingDrawingFile}
            >
              <SortIcon />
            </IconButton>
            <IconButton
              style={{ color: "#0076C8", padding: "0px" }}
              onClick={handleAddDrawingFile}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DrawingFiles;
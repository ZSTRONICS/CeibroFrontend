import { Box, Grid, IconButton } from "@mui/material";
import assets from "assets";
import { Heading2 } from "components/CustomTags";
import { InputSearch } from "components/GenericComponents";
import { SortIcon } from "components/material-ui/icons/sort/sort";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import DrawingFileCard from "./DrawingFileCard";

interface Props {
  windowActualHeight: number;
}
function LocationDrawingFiles({ windowActualHeight }: Props) {
  const [searchText, setSearchText] = useState("");
  const searchContainer: any = useRef(null);
  const [contHeight, setContHeight] = useState<number>(50);
  const { selectedDrawingFiles } = useSelector(
    (state: RootState) => state.project
  );
  useEffect(() => {
    if (searchContainer.current) {
      setContHeight(searchContainer.current.clientHeight + 25);
    }
  }, [windowActualHeight]);

  const handleSearchTextChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };
  const handleAddDrawingFile = () => {
    console.log("added drawing logic");
  };

  const handleSortingDrawingFile = () => {
    console.log("added sorting logic");
  };

  return (
    <>
      <Box>
        <Box
          ref={searchContainer}
          sx={{
            pt: 1.25,
          }}
        >
          <InputSearch value={searchText} onChange={handleSearchTextChange} />

          <Grid
            container
            alignItems={"center"}
            marginBottom={"8px"}
            marginTop={"8px"}
          >
            <Grid item xs={10}>
              <Heading2 sx={{ py: 2 }}>Drawing Files</Heading2>
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
                <assets.AddIcon sx={{ color: "#0076C8" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            height: `${windowActualHeight - contHeight}px`,
            overflow: "auto",
          }}
        >
          {selectedDrawingFiles.length > 0 ? (
            selectedDrawingFiles.map((drawing: any) => {
              return <DrawingFileCard drawing={drawing} />;
            })
          ) : (
            <>No Drawing file Found!</>
          )}
        </Box>
      </Box>
    </>
  );
}

export default LocationDrawingFiles;

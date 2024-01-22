import { Box, Grid, IconButton } from "@mui/material";
import assets from "assets";
import { Heading2 } from "components/CustomTags";
import { InputSearch } from "components/GenericComponents";
import CustomModal from "components/Modal";
import { SortIcon } from "components/material-ui/icons/sort/sort";
import { useOpenCloseModal } from "hooks";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import CreateDrawing from "../ProjectComponents/CreateDrawing";
import DrawingFileCard from "./DrawingFileCard";
interface Props {
  windowActualHeight: number;
}
function LocationDrawingFiles({ windowActualHeight }: Props) {
  const [searchText, setSearchText] = useState("");
  const searchContainer: any = useRef(null);
  const { isOpen, closeModal, openModal } = useOpenCloseModal();

  const [contHeight, setContHeight] = useState<number>(50);
  const { selectedDrawingFiles, selectedGroupName, selectedProjectName } = useSelector(
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
    openModal();
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
          {selectedProjectName ?
            <Heading2 sx={{ pt: 2, pb: 0, mb: 0, fontSize: 16, color: "grey", textTransform: "capitalize", }} > {selectedProjectName} </Heading2>
            : <div > <br />  </div>
          }
          <Grid
            container
            alignItems={"center"}
            marginBottom={"8px"}
            marginTop={"-5px"}
          >
            <Box sx={{ py: 2, display: 'flex', flexWrap: 'nowrap', width: "80%", maxWidth: "80%", transform: 'translateY(8px)' }}>
              <Heading2 >Drawing Files</Heading2>
              <Heading2 sx={{ px: 1, fontSize: 16, color: "grey", }}>{selectedGroupName ? `>` : ''}</Heading2>
              <Heading2 sx={{ textTransform: "capitalize", color: "grey" }}> {selectedGroupName} </Heading2>
            </Box>
            <Grid item xs={2} gap={1} container justifyContent="flex-end">
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
        </Box >
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
      {isOpen === true && (
        <CustomModal
          maxWidth={"sm"}
          showFullWidth={true}
          showDivider={true}
          showCloseBtn={false}
          showTitleWithLogo={true}
          title={"Project Name"}
          isOpen={isOpen}
          handleClose={closeModal}
          children={
            <CreateDrawing projectId={"adaf"} closeModal={closeModal} />
          }
        />
      )}
    </>
  );
}

export default LocationDrawingFiles;

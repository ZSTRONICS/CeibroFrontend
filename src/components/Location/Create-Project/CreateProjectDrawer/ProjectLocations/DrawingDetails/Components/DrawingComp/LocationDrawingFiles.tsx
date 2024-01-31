import { Box, Grid, IconButton } from "@mui/material";
import assets from "assets";
import { Heading2 } from "components/CustomTags";
import { GenericMenu, InputSearch } from "components/GenericComponents";
import CustomModal from "components/Modal";
import { SortIcon } from "components/material-ui/icons/sort/sort";
import { PROJECT_CONFIG } from "config";
import { ITask } from "constants/interfaces";
import { useOpenCloseModal } from "hooks";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PROJECT_APIS } from "redux/action";
import { RootState } from "redux/reducers";
import { filterTasksByCondition } from "utills/common";
import CreateDrawing from "../ProjectComponents/CreateDrawing";
import DrawingFileCard from "./DrawingFileCard";
interface Props {
  windowActualHeight: number;
}
function LocationDrawingFiles({ windowActualHeight }: Props) {
  const [searchText, setSearchText] = useState("");
  const [selectedGroupDrawings, setSelectedGroupDrawings] = useState([]);
  const searchContainer: any = useRef(null);
  const { isOpen, closeModal, openModal } = useOpenCloseModal();
  const [drawingFile, setDrawingFile] = useState<any>([]);
  const [contHeight, setContHeight] = useState<number>(50);
  const {
    selectedDrawingFiles,
    selectedGroupName,
    selectedProjectName,
    projectFloors,
  } = useSelector((state: RootState) => state.project);
  const { allTasksAllEvents } = useSelector((state: RootState) => state.task);
  const { projectId, groupId } = useParams<any>();
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    selectedDrawingFiles && setSelectedGroupDrawings(selectedDrawingFiles);
  }, [selectedDrawingFiles]);

  useEffect(() => {
    if (searchContainer.current) {
      setContHeight(searchContainer.current.clientHeight + 25);
    }
  }, [windowActualHeight]);

  const handleSearchTextChange = (newSearchText: string) => {
    const lowerSearchString = newSearchText.toLowerCase();
    const filteredDrawingFiles = selectedDrawingFiles.filter(
      (file: any) =>
        file.fileName.toLowerCase().includes(lowerSearchString) ||
        file.floor.floorName.includes(lowerSearchString)
    );
    setSelectedGroupDrawings(filteredDrawingFiles);
    setSearchText(newSearchText);
  };
  const findSelectedFloor = (selectedMenu: any) => {
    // console.log("selectedMenu", selectedMenu);
    if (selectedMenu) {
      const findFloor = projectFloors.find(
        (floor: any) => floor.floorName === selectedMenu.value
      );
      setSelectedFloor(findFloor);
    } else {
      setSelectedFloor(null);
    }
  };

  const handleSortingDrawingFile = () => {
    console.log("handleSortingDrawingFile");
  };
  const handleSelectDocument = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = false;
    input.accept = "application/pdf";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files;
      if (file && !_.isEmpty(file)) {
        setDrawingFile(file);
        openModal();
        setSelectedFloor(null);
      }
    };
    input.click();
  };
  const handleCreateDrawing = () => {
    try {
      const formData = new FormData();
      const metadataObject = [
        {
          fileName: drawingFile[0].name,
          orignalFileName: drawingFile[0].name,
          tag: "drawing",
          uploaderlocalFilePath: "",
          uploaderLocalId: new Date().getTime(),
        },
      ];
      const metadataString = JSON.stringify(metadataObject).replace(
        /"/g,
        '\\"'
      );
      const finalMetadata = `"${metadataString}"`;
      if (drawingFile && selectedFloor && groupId) {
        formData.append("projectId", selectedFloor.projectId);
        formData.append("floorId", selectedFloor._id);
        formData.append("groupId", groupId);
        formData.append("metadata", finalMetadata);
        formData.append("files", drawingFile[0]);
        const payload = {
          body: formData,
          success: (res: any) => {
            if (res.data) {
              dispatch({
                type: PROJECT_CONFIG.GROUP_DRAWING_FILE_UPLOADED,
                payload: res.data,
              });
              setSelectedFloor(null);
              closeModal();
            }
          },
        };
        dispatch(PROJECT_APIS.addNewDrawing(payload));
      }
    } catch (error) {
      console.error("Error occurred while uploading file:", error);
    }
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
          {selectedProjectName ? (
            <Heading2
              sx={{
                pt: 2,
                pb: 0,
                mb: 0,
                fontSize: 16,
                color: "#605C5C",
                textTransform: "capitalize",
              }}
            >
              {" "}
              {selectedProjectName}{" "}
            </Heading2>
          ) : (
            <div>
              {" "}
              <br />{" "}
            </div>
          )}
          <Grid
            container
            alignItems={"center"}
            marginBottom={"8px"}
            marginTop={"-5px"}
          >
            <Box
              sx={{
                py: 2,
                display: "flex",
                flexWrap: "nowrap",
                width: "80%",
                maxWidth: "80%",
                transform: "translateY(8px)",
              }}
            >
              <Heading2>Drawing Files</Heading2>
              <Heading2 sx={{ px: 1, fontSize: 16, color: "#605C5C" }}>
                {selectedGroupName ? `>` : ""}
              </Heading2>
              <Heading2 sx={{ textTransform: "capitalize", color: "#605C5C" }}>
                {selectedGroupName}
              </Heading2>
            </Box>
            <Grid
              item
              xs={2}
              gap={1}
              container
              flexWrap={"nowrap"}
              sx={{
                marginLeft: "12px",
                marginTop: "10px",
                "@media (min-width: 1200px) and (max-width: 1229px)": {
                  marginLeft: "6px",
                },
                "@media (min-width: 0px) and (max-width: 1019px)": {
                  marginLeft: "6px",
                },
              }}
            >
              <IconButton
                style={{ color: "#0076C8", padding: "0px" }}
                onClick={handleSortingDrawingFile}
              >
                <Box sx={{ marginLeft: "12px", transform: "translateX(5px)" }}>
                  <SortIcon />
                </Box>
              </IconButton>
              <GenericMenu
                icon={<assets.AddIcon sx={{ color: "#0076C8" }} />}
                isProjectGroup={true}
                options={[
                  {
                    menuName: "From local device",
                    callBackHandler: () => {
                      handleSelectDocument();
                    },
                  },
                  {
                    menuName: "From Ceibro files",
                    callBackHandler: () => {},
                  },
                ]}
                key={1}
                paddingTop={0}
                disableMenu={false}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            height: `${windowActualHeight - contHeight}px`,
            overflow: "auto",
          }}
        >
          {selectedGroupDrawings.length > 0 ? (
            selectedGroupDrawings.map((drawing: any, index: any) => {
              if (!drawing) return <></>;
              let allDrawingTaskList: ITask[] = [];
              const selectedDrawingPins = allTasksAllEvents.allPins.filter(
                (pin: any) => pin.drawingId === drawing._id
              );
              allDrawingTaskList = filterTasksByCondition(
                allTasksAllEvents.allTasks,
                (task: ITask) =>
                  selectedDrawingPins.some(
                    (pin: any) => pin.taskData._id === task._id
                  )
              );
              return (
                <React.Fragment key={index}>
                  <DrawingFileCard
                    drawing={drawing}
                    taskCount={allDrawingTaskList.length}
                  />
                </React.Fragment>
              );
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
          title={selectedProjectName}
          isOpen={isOpen}
          handleClose={closeModal}
          children={
            <CreateDrawing
              projectId={projectId}
              isFloorSelected={selectedFloor ? true : false}
              findSelectedFloor={findSelectedFloor}
              projectFloors={projectFloors}
              selectedGroupName={selectedGroupName}
              drawingFile={drawingFile}
              handleCreateDrawing={handleCreateDrawing}
            />
          }
        />
      )}
    </>
  );
}

export default LocationDrawingFiles;

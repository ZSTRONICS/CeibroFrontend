import { Box } from "@mui/material";
// import { Locationarrow } from 'components/material-ui/icons/arrow/Locationarrow';

import DocumentReader from "components/pdfviewer/index.js";
import useWindowSize from "hooks/useWindowSize";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { HEADER_HEIGHT } from "utills/common";
// import { DrawingMenu, StickyHeader } from "./Components";
import { Locationarrow } from "components/material-ui/icons/arrow/Locationarrow";
import { AllTasksAllEvents, ITaskFilterInterace } from "constants/interfaces";
import { styles } from "./DrawingDetailsStyle";
import MiniTaskCardList from "./MiniTaskCardList";
import MiniTaskHead from "./MiniTaskHead";

interface LocationDrawingListProps {
  headersize: boolean;
  setHeadersize: (value: boolean) => void;
  allTasksAllEvents: AllTasksAllEvents;
  loadingAllTasksAllEvents: boolean;
}

const LocatoinDrawingList = ({
  headersize,
  setHeadersize,
  allTasksAllEvents,
  loadingAllTasksAllEvents,
}: LocationDrawingListProps) => {
  const dispatch = useDispatch();
  const [size, ratio] = useWindowSize();
  const [windowWidth, windowHeight] = size;
  const windowActualHeight = windowHeight - (HEADER_HEIGHT + 16);
  console.log("allTasksAllEvents", allTasksAllEvents);
  const taskFilers: ITaskFilterInterace = {
    fromMe: {
      unread: true,
      ongoing: true,
      done: true,
    },
    toMe: {
      new: true,
      ongoing: true,
      done: true,
    },
    hidden: {
      ongoing: true,
      done: true,
      cancelled: true,
    },
    isAllSelectied: true,
  };

  const arrowoneRef = useRef<any>();
  const arrowtwoRef = useRef<any>();

  const [s1, setS1] = useState<boolean>(true);
  const [s2, setS2] = useState<boolean>(false);
  const [s3, setS3] = useState<boolean>(false);

  const collapseDiv1 = () => {
    if (s1 === false && s2 === true) {
      setS1(true);
      setS2(false);
    } else if (s1 === false && s2 === false && s3 === true) {
      setS1(true);
      setS2(false);
      setS3(false);
      setHeadersize(true);
    } else {
      setS1(false);
      setS2(true);
      setS3(false);
    }
  };

  const collapseDiv2 = () => {
    if (s1 === false && s2 === false) {
      setS1(false);
      setS2(true);
      setS3(false);
      setHeadersize(true);
    } else {
      setS1(false);
      setS2(false);
      setS3(true);
      setHeadersize(false);
    }
  };

  return (
    <>
      <Box style={styles.locatoin_main}>
        <Box style={styles.location_Parent}>
          <Box style={!s1 ? styles.location_task_min : styles.location_task}>
            <Box style={styles.location_all_taks}>
              <Box style={styles.locatoin_task_header}>
                <MiniTaskHead />
              </Box>
              <Box style={styles.location_task_bottom}>
                {!s1 ? (
                  <MiniTaskCardList
                    allTask={allTasksAllEvents.allTasks}
                    taskListFilter={taskFilers}
                  />
                ) : (
                  <> {"Location Task Card"}</>
                )}
              </Box>
            </Box>
            <Box>
              <button
                onClick={collapseDiv1}
                style={!s1 ? styles.location_btn_change : styles.location_btn}
              >
                <Locationarrow />
              </button>
            </Box>
          </Box>
          <Box
            style={
              !s2
                ? styles.location_description
                : styles.location_description_max
            }
          >
            <Box style={styles.location_all_taks}>
              <>Task detail</>
            </Box>
            <Box>
              <button
                onClick={collapseDiv2}
                style={!s3 ? styles.location_btn : styles.location_btn_change}
              >
                <Locationarrow />
              </button>
            </Box>
          </Box>
          <Box
            style={!s3 ? styles.location_drawing : styles.location_drawing_max}
          >
            <DocumentReader />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LocatoinDrawingList;

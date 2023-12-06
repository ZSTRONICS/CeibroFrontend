import { Box, Typography, styled } from "@mui/material";
import { TASK_CONFIG } from "config";
import { useResponsive } from "hooks";
import { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
interface Props {
  isOpen: boolean;
  openModal: any;
  closeModal: any;
  children: any;
  title: string;
}

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const DragableLines = styled(Box)(({ theme }: any) => ({
  width: 70,
  height: 2,
  borderRadius: "4px 4px 0px 0px",
  background: "#000",
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));
const DragableLines2 = styled(Box)(({ theme }: any) => ({
  width: 70,
  height: 2,
  borderRadius: "0px 0px 4px 4px",
  background: "#000",
  position: "absolute",
  top: 12,
  left: "calc(50% - 15px)",
}));

function DragableDrawer({ isOpen, title, children, closeModal }: Props) {
  const dispatch = useDispatch();
  const isLargeScreen = useResponsive("down", "xl", "");
  const taskDragContHeight = useSelector(
    (store: RootState) => store.task.taskDragContHeight
  );
  const taskDetailContainer = document.getElementById("taskDetailContainer");
  let taskDetailContHeight = 200;
  let containerWidth: number = 200;
  if (taskDetailContainer) {
    const { clientWidth, clientHeight } = taskDetailContainer;
    containerWidth = clientWidth - 6;
    taskDetailContHeight = clientHeight;
  }
  const largeScreenCalc = isLargeScreen ? 2 / 3.66 : 2 / 3.53;
  const defaultHeight = taskDetailContHeight * largeScreenCalc;
  const defaultContainerHeight = taskDetailContHeight / 3.61;
  const [drawerHeight, setDrawerHeight] = useState(defaultContainerHeight);
  const [drawwerWidth, setDrawerWidth] = useState(containerWidth);
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: { x: -13, y: drawerHeight },
  });

  useEffect(() => {
    const handleResize = () => {
      if (taskDetailContainer) {
        setDrawerWidth(taskDetailContainer.clientWidth - 6);
        setDrawerHeight(defaultContainerHeight);
        setState({
          ...state,
          deltaPosition: {
            x: -13,
            y: taskDetailContainer.clientHeight * largeScreenCalc - 20,
          },
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [taskDetailContHeight, containerWidth]);

  const containerStyle: any = {
    background: "white",
    position: "absolute",
    zIndex: "10",
    width: `${drawwerWidth}px`,
  };

  useEffect(() => {
    if (!isOpen) {
      setDrawerHeight(defaultContainerHeight);
      setDrawerWidth(containerWidth);
      setState({
        ...state,
        deltaPosition: { x: -12, y: defaultHeight },
      });
      dispatch({
        type: TASK_CONFIG.TASK_DRAGABLE_CONTAINER_HEIGHT,
        payload: 0,
      });
    }
  }, [isOpen]);

  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    const { x, y } = state.deltaPosition;
    if (data.lastY > 15) {
      setState({
        ...state,
        deltaPosition: {
          x: -12,
          y: y + data.deltaY,
        },
      });
      const newHeight = taskDetailContHeight - y - data.deltaY - 130;
      setDrawerHeight(newHeight);
    }
  };

  const onStart = () => {
    setState({ ...state, activeDrags: state.activeDrags + 1 });
  };

  const onStop = () => {
    setState({ ...state, activeDrags: state.activeDrags - 1 });
    dispatch({
      type: TASK_CONFIG.TASK_DRAGABLE_CONTAINER_HEIGHT,
      payload: drawerHeight,
    });
    if (drawerHeight < 120) {
      closeModal();
    }
  };
  return (
    <>
      {isOpen && (
        <>
          <Draggable
            allowAnyClick={true}
            axis="y"
            position={state.deltaPosition}
            handle={".handle"}
            onStart={onStart}
            onStop={onStop}
            onDrag={handleDrag}
            bounds={{
              top: 150,
              bottom: taskDetailContHeight - 200,
            }}
          >
            <StyledBox id="dragableContainer" style={containerStyle}>
              <StyledBox
                className={"handle"}
                sx={{
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: "visible",
                  cursor: "row-resize",
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="split-element"
                >
                  <DragableLines />
                  <DragableLines2 />
                </div>
              </StyledBox>
              <StyledBox>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    pt: 1,
                    pl: 2.5,
                    pb: 1,
                    color: "text.primary",
                  }}
                >
                  {title}
                </Typography>
              </StyledBox>
              <StyledBox
                sx={{
                  pl: 2,
                  pr: 0.5,
                  // overflow: "auto",
                  height: `${drawerHeight}px`,
                  pb: "3.5rem",
                }}
              >
                {children}
              </StyledBox>
            </StyledBox>
          </Draggable>
        </>
      )}
    </>
  );
}

export default DragableDrawer;

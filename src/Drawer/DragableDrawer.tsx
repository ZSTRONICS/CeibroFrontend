import { Box, Typography, styled } from "@mui/material";
import { TASK_CONFIG } from "config";
import { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useDispatch } from "react-redux";
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
  const containerHeight = window.innerHeight - 730;
  const [drawerHeight, setDrawerHeight] = useState(containerHeight);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: { x: -16, y: 490 },
  });

  useEffect(() => {
    if (!isOpen) {
      setDrawerHeight(containerHeight);
      setState({
        ...state,
        deltaPosition: {
          x: -16,
          y: 490,
        },
      });
      dispatch({
        type: TASK_CONFIG.TASK_DRAGABLE_CONTAINER_HEIGHT,
        payload: 0,
      });
    }
  }, [isOpen]);

  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    const { x, y } = state.deltaPosition;
    setState({
      ...state,
      deltaPosition: {
        x: -16,
        y: y + data.deltaY,
      },
    });
    const newHeight = window.innerHeight - y - data.deltaY - 237;
    setDrawerHeight(newHeight);
  };

  let containerWidth: number = 500;
  const taskDetailContainer = document.getElementById("taskDetailContainer");
  if (taskDetailContainer) {
    containerWidth = taskDetailContainer.clientWidth;
  }
  const onStart = () => {
    setState({ ...state, activeDrags: state.activeDrags + 1 });
  };

  const onStop = () => {
    setState({ ...state, activeDrags: state.activeDrags - 1 });
    dispatch({
      type: TASK_CONFIG.TASK_DRAGABLE_CONTAINER_HEIGHT,
      payload: drawerHeight,
    });
    if (drawerHeight < 140) {
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
            defaultPosition={state.deltaPosition}
            handle={".handle"}
            onStart={onStart}
            onStop={onStop}
            onDrag={handleDrag}
            bounds={{ top: 150, bottom: 610 }}
          >
            <StyledBox
              id="dragableContainer"
              style={{
                background: "white",
                position: "absolute",
                width: `${containerWidth}px`,
                zIndex: "10",
              }}
            >
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
                    color: "text.primary",
                  }}
                >
                  {title}
                </Typography>
              </StyledBox>
              <StyledBox
                sx={{
                  px: 2,
                  // overflow: "auto",
                  height: `${drawerHeight}px`,
                  pb: "3rem",
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

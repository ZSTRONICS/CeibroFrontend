import { Box, Typography, styled } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useEffect, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
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

function DragableDrawer({
  isOpen,
  closeModal,
  title,
  openModal,
  children,
}: Props) {
  const containerHeight = window.innerHeight - 710;
  const [drawerHeight, setDrawerHeight] = useState(containerHeight);
  useEffect(() => {
    if (!isOpen) {
      setDrawerHeight(containerHeight);
    }
  }, [isOpen]);

  const handleStart = (e: any) => {
    e.stopPropagation();
  };

  const handleDrag = (e: any, data: DraggableData) => {
    const newHeight = drawerHeight - data.y;
    setDrawerHeight(newHeight);
    if (newHeight < 90) {
      closeModal();
    }
  };
  return (
    <div style={{ height: "100%" }}>
      <SwipeableDrawer
        variant="persistent"
        anchor="bottom"
        open={isOpen}
        onClose={() => closeModal()}
        onOpen={() => openModal()}
        swipeAreaWidth={20}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "&.MuiDrawer-root > .MuiPaper-root": {
            width: `calc(100vw - 29rem)`,
            overflow: "visible",
            left: "unset",
            right: "1%",
            bottom: "2%",
            overflowY: "hidden",
          },
        }}
      >
        {isOpen && (
          <Draggable
            axis="y"
            handle={".handle"}
            onStart={handleStart}
            onDrag={handleDrag}
            bounds={{ bottom: 350 }}
            scale={2}
          >
            <StyledBox>
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
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    pt: 1,
                    pl: 2,
                    color: "text.primary",
                  }}
                >
                  {title}
                </Typography>
              </StyledBox>
              <StyledBox
                id="draggableContainer"
                sx={{
                  px: 2,
                  overflow: "auto",
                  // border: "1px solid",
                  height: `${drawerHeight}px`,
                  pb: "3rem",
                }}
              >
                {children}
              </StyledBox>
            </StyledBox>
          </Draggable>
        )}
      </SwipeableDrawer>
    </div>
  );
}

export default DragableDrawer;

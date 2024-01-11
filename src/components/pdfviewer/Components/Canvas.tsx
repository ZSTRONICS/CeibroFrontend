import { styled } from "@mui/material/styles";
import * as React from "react";
import { useLayoutEffect } from "react";
import CanvasControls from "./CanvasControls";
import usePanZoomCanvas from "./hooks/usePanZoomCanvas";
import { Point, roundToNearestHundredth } from "./pointUtils";

const StyledCanvasWrapper = styled("div")`
  display: block;
  overflow: auto;
  position: relative;
`;

const StyledCanvasState = styled("div")`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.5em;
  font-size: 0.75em;
`;

export type CanvasViewState = {
  offset: Point;
  scale: number;
};

export type CanvasState = {
  context: CanvasRenderingContext2D | null;
  canvasViewState: CanvasViewState;
  canvasWidth: number;
  canvasHeight: number;
};

export type CanvasProps = {
  canvasRef: any;
  canvasWidth: number;
  canvasHeight: number;
  devicePixelRatio: number;
  draw: (context: CanvasRenderingContext2D) => void;
  onMouseDown: (
    event: React.MouseEvent | MouseEvent,
    canvasState: CanvasState,
    defaultBehavior: (event: React.MouseEvent | MouseEvent) => void
  ) => void;
  handleDoubleClick: (
    event: React.MouseEvent,
    canvasState: CanvasState
  ) => void;
  canvasViewState: CanvasViewState;
  setCanvasViewState: (newCanvasState: CanvasViewState) => void;
  savedCanvasViewState: CanvasViewState;
  setSavedCanvasViewState: (newSavedCanvasState: CanvasViewState) => void;
  setKeyboardActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMouseMove: (isMove: boolean) => void;
};

export default function Canvas(props: CanvasProps): React.ReactElement {
  const {
    canvasRef,
    canvasWidth,
    canvasHeight,
    devicePixelRatio,
    draw,
    onMouseDown,
    handleDoubleClick,
    canvasViewState,
    setCanvasViewState,
    savedCanvasViewState,
    setSavedCanvasViewState,
    setIsMouseMove,
    setKeyboardActive,
  } = props;

  // hooks
  // useOnClickCanvas(canvasRef, setKeyboardActive);

  const [context, setContext, startPan] = usePanZoomCanvas(
    canvasRef,
    canvasViewState,
    setCanvasViewState,
    setIsMouseMove
  );
  // setup canvas and set context
  useLayoutEffect(() => {
    if (canvasRef.current) {
      // get new drawing context
      const renderCtx = canvasRef.current.getContext("2d");
      setContext(renderCtx);
    }
  }, [setContext]);

  // draw
  useLayoutEffect(() => {
    if (context) {
      // clear canvas
      context.canvas.width = canvasWidth * devicePixelRatio;
      context.canvas.height = canvasHeight * devicePixelRatio;

      context.scale(
        canvasViewState.scale * devicePixelRatio,
        canvasViewState.scale * devicePixelRatio
      );
      context.translate(canvasViewState.offset.x, canvasViewState.offset.y);
      draw(context);
    }
  }, [
    canvasHeight,
    canvasWidth,
    context,
    devicePixelRatio,
    draw,
    canvasViewState.offset.x,
    canvasViewState.offset.y,
    canvasViewState.scale,
  ]);

  return (
    <StyledCanvasWrapper>
      <StyledCanvasState>
        <div>{`x: ${Math.round(canvasViewState.offset.x)}`}</div>
        <div>{`y: ${Math.round(canvasViewState.offset.y)}`}</div>
        <div>{`scale: ${roundToNearestHundredth(canvasViewState.scale)}`}</div>
      </StyledCanvasState>
      <CanvasControls
        setCanvasViewState={setCanvasViewState}
        canvasState={{
          context,
          canvasViewState,
          canvasWidth,
          canvasHeight,
        }}
        savedCanvasState={savedCanvasViewState}
        setSavedCanvasState={setSavedCanvasViewState}
      />
      <canvas
        style={{
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          border: "1px solid black",
        }}
        id="pdfCanvas"
        ref={canvasRef}
        width={canvasWidth * devicePixelRatio}
        height={canvasHeight * devicePixelRatio}
        onMouseDown={(event: React.MouseEvent | MouseEvent) =>
          onMouseDown(
            event,
            { context, canvasViewState, canvasWidth, canvasHeight },
            () => startPan(event)
          )
        }
        onDoubleClick={(event: React.MouseEvent) =>
          handleDoubleClick(event, {
            context,
            canvasViewState,
            canvasWidth,
            canvasHeight,
          })
        }
      />
    </StyledCanvasWrapper>
  );
}

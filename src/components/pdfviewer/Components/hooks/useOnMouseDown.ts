import * as React from "react";
import { useCallback } from "react";

import { CanvasState } from "../Canvas";
import { mouseToNodeCoords } from "../canvasUtils";
import { DrawingPinInterface } from "./useDraw";

export default function useOnMouseDown(
  drawingPins: DrawingPinInterface[],
  // clearAndRedraw: (canvasState: CanvasState) => void,
  addNodeOnCanvas: (nodes: any) => void
): (
  event: React.MouseEvent | MouseEvent,
  canvasState: CanvasState,
  defaultBehavior: (event: React.MouseEvent | MouseEvent) => void
) => void {
  return useCallback(
    (
      mouseDownEvent: React.MouseEvent | MouseEvent,
      canvasState: CanvasState,
      defaultBehavior: (event: React.MouseEvent | MouseEvent) => void
    ) => {

      const onMouseUp = (mouseUpEvent: React.MouseEvent | MouseEvent) => {
        document.removeEventListener("mouseup", onMouseUp);
        if (
          mouseUpEvent.clientX === mouseDownEvent.clientX &&
          mouseUpEvent.clientY === mouseDownEvent.clientY
        ) {
          // console.log("mouseUpEvent start")
          const pinCoordsOfMouse = mouseToNodeCoords(mouseDownEvent, canvasState);
          console.log("pinCoordsOfMouse", pinCoordsOfMouse);
          addNodeOnCanvas(pinCoordsOfMouse)
          // clearAndRedraw(canvasState);
        }
      };
      document.addEventListener("mouseup", onMouseUp);
      defaultBehavior(mouseDownEvent);
      // console.log("mouseUpEvent leave")

    },
    [drawingPins.length]
  );
}

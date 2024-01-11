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
      const pinCoordsOfMouse = mouseToNodeCoords(mouseDownEvent, canvasState);
      addNodeOnCanvas(pinCoordsOfMouse)
      console.log("pinCoordsOfMouse", pinCoordsOfMouse);

      const onMouseUp = (mouseUpEvent: React.MouseEvent | MouseEvent) => {
        document.removeEventListener("mouseup", onMouseUp);
        if (
          mouseUpEvent.clientX === mouseDownEvent.clientX &&
          mouseUpEvent.clientY === mouseDownEvent.clientY
        ) {
          // clearAndRedraw(canvasState);
        }
      };
      document.addEventListener("mouseup", onMouseUp);
      defaultBehavior(mouseDownEvent);
    },
    [drawingPins.length]
  );
}

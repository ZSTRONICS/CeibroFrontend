import React, { useCallback } from "react";
import { CanvasState } from "../Canvas";
import { mouseToNodeCoords } from "../canvasUtils";
import { Point } from "../pointUtils";
import { DrawingPinInterface } from "./useDraw";

export function getNewAppNode(pinCoord: Point): any {
  return {
    points: pinCoord,
    isActive: false,
  };
}
export default function useDoubleClick(
  drawingPins: DrawingPinInterface[],
  addNewPin: (node: any) => void,
): (event: React.MouseEvent | MouseEvent, canvasState: CanvasState) => void {
  return useCallback(
    (event: React.MouseEvent | MouseEvent, canvasState: CanvasState) => {
      event.preventDefault();
      const nodeCoordsOfMouse = mouseToNodeCoords(event, canvasState);
      const newAppNode = getNewAppNode(nodeCoordsOfMouse);
      console.log("useDoubleClick nodeCoordsOfMouse", nodeCoordsOfMouse)
      addNewPin(newAppNode);
    },
    [addNewPin, drawingPins.length]
  );
}

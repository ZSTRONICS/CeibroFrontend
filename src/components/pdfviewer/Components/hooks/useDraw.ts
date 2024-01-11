import { useCallback } from "react";
import { drawPins } from "../canvasUtils";

export type DrawingPinInterface = {
  _id: string;
  pinUID: number;
  type: string;
  page_width: number;
  page_height: number;
  x_coord: number;
  y_coord: number;
  pinPhotoUrl: string;
  isActive?: boolean;
  creator: string;
  taskData: {
    _id: string;
    taskUID: string;
    rootState: string;
    userSubState: string;
    isCreator: boolean;
    isAssignedToMe: boolean;
    isHiddenByMe: boolean;
    isSeenByMe: boolean;
    fromMeState: string;
    toMeState: string;
    hiddenState: string;
    creatorState: string;
  };
  tags: string[];
  drawingId: string;
  thumbnailId: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
};

export default function useDraw(
  drawingPins: DrawingPinInterface[]
): [
    (context: CanvasRenderingContext2D) => void,
    // (canvasState: CanvasState) => void
  ] {
  const draw = useCallback(
    (context: CanvasRenderingContext2D) => {
      console.log("draw Pins", drawingPins)
      drawPins(context, drawingPins);
    },
    [drawingPins.length]
  );

  // const clearAndRedraw = useCallback(
  //   (canvasState: CanvasState) => {
  //     if (canvasState.context) {
  //       canvasState.context.clearRect(
  //         -canvasState.canvasViewState.offset.x,
  //         -canvasState.canvasViewState.offset.y,
  //         canvasState.canvasWidth / canvasState.canvasViewState.scale,
  //         canvasState.canvasHeight / canvasState.canvasViewState.scale
  //       );
  //       draw(canvasState.context);
  //     }
  //   },
  //   [draw]
  // );

  return [draw];
}

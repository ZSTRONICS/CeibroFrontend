import * as React from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  ORIGIN,
  Point,
  addPoints,
  diffPoints,
  scalePoint,
} from "../pointUtils";

import { CanvasViewState } from "../Canvas";
import { calculateMousePositionOnElement } from "../canvasUtils";

const zoomSensitivity = 1500; // bigger = less zoom per click
const minZoom = 1;
const maxZoom = 3;
const maxZoomDelta = 2;

export default function usePanZoomCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  canvasViewState: CanvasViewState,
  setCanvasViewState: (newCanvasViewState: CanvasViewState) => void,
  setIsMouseMove: (isMove: boolean) => void,
): [
    CanvasRenderingContext2D | null,
    React.Dispatch<React.SetStateAction<CanvasRenderingContext2D | null>>,
    (event: React.MouseEvent | MouseEvent) => void
  ] {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const mousePosRef = useRef<Point>(ORIGIN);
  const lastMousePosRef = useRef<Point>(ORIGIN);
  const lastCanvasViewState = useRef<CanvasViewState>(canvasViewState);

  // functions for panning
  const mouseMove = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (context) {
        // update mouse position
        // console.log("mouseMove")
        setIsMouseMove(true)
        const newMousePos = calculateMousePositionOnElement(
          event,
          context.canvas
        );
        lastMousePosRef.current = mousePosRef.current;
        mousePosRef.current = newMousePos;

        const mouseDiff = scalePoint(
          diffPoints(mousePosRef.current, lastMousePosRef.current),
          canvasViewState.scale
        );
        const newCanvasViewState = {
          scale: canvasViewState.scale,
          offset: addPoints(lastCanvasViewState.current.offset, mouseDiff),
        };
        setCanvasViewState(newCanvasViewState);
        lastCanvasViewState.current = newCanvasViewState;
      }
    },
    [context, canvasViewState.scale, setCanvasViewState]
  );

  const mouseUp = useCallback(() => {
    // console.log("mouseUp")
    setIsMouseMove(false)
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }, [mouseMove]);

  const startPan = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (context) {
        // console.log("startPan")
        setIsMouseMove(true)
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
        mousePosRef.current = calculateMousePositionOnElement(
          event,
          context.canvas
        );
      }
    },
    [context, mouseMove, mouseUp]
  );

  // add event listener on canvas for zoom
  useLayoutEffect(() => {
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      if (context) {
        // update mouse position
        const newMousePos = calculateMousePositionOnElement(
          event,
          context.canvas
        );
        lastMousePosRef.current = mousePosRef.current;
        mousePosRef.current = newMousePos;

        // calculate new scale/zoom
        const zoomDelta = event.deltaY / zoomSensitivity;
        const zoom = 1 - (Math.abs(zoomDelta) > maxZoomDelta
          ? (zoomDelta / Math.abs(zoomDelta)) * maxZoomDelta
          : zoomDelta);
        const newScale = canvasViewState.scale * zoom;
        if (newScale > maxZoom || newScale < minZoom) {
          return;
        }

        // offset the canvas such that the point under the mouse doesn't move
        const lastMouse = scalePoint(
          mousePosRef.current,
          canvasViewState.scale
        );
        const newMouse = scalePoint(mousePosRef.current, newScale);
        const mouseOffset = diffPoints(lastMouse, newMouse);

        const newCanvasViewState = {
          offset: diffPoints(lastCanvasViewState.current.offset, mouseOffset),
          scale: newScale,
        };
        setCanvasViewState(newCanvasViewState);
        lastCanvasViewState.current = newCanvasViewState;
      }
    }

    const canvasElem = canvasRef.current;
    if (canvasElem) {
      lastCanvasViewState.current = canvasViewState;
      canvasElem.addEventListener("wheel", handleWheel);
      return () => canvasElem.removeEventListener("wheel", handleWheel);
    }
  }, [canvasRef, canvasViewState, context, setCanvasViewState]);

  return [context, setContext, startPan];
}

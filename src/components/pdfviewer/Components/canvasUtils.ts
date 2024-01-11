import * as React from "react";
import { CanvasState } from "./Canvas";
import { DrawingPinInterface } from "./hooks/useDraw";
import { diffPoints, ORIGIN, Point, scalePoint } from "./pointUtils";
export type Direction = "L" | "R" | "U" | "D";

const minRadiusPx = 20;
const maxRadiusPx = 24;
export const DEFAULT_RADIUS = Math.floor((minRadiusPx + maxRadiusPx) / 2);

function scientificNotation(num: number, precision: number): string {
  return num.toExponential(precision).replace("+", "");
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) {
    r = w / 2;
  }
  if (h < 2 * r) {
    r = h / 2;
  }
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

function drawCircle(
  context: CanvasRenderingContext2D,
  pinCoord: DrawingPinInterface,
  radius: number,
): void {
  context.save();
  console.log("draw pinCircle", pinCoord)
  // draw node itself
  context.beginPath();
  context.arc(pinCoord.x_coord, pinCoord.y_coord, radius, 0, 2 * Math.PI);
  context.fillStyle = "red";
  context.fill();
  context.closePath();
  context.restore();
}

export function drawPin(
  context: CanvasRenderingContext2D,
  pin: DrawingPinInterface,
): void {
  drawCircle(context, pin, 24);
}

export function drawPins(
  context: CanvasRenderingContext2D,
  drawingPins: DrawingPinInterface[]
): void {
  drawingPins.forEach((pin) => {
    drawPin(context, pin);
  });
}

export function isInsideBox(
  startBox: Point,
  endBox: Point,
  point: Point
): boolean {
  const [topLeft, bottomRight] =
    startBox.x < endBox.x && startBox.y < endBox.y
      ? [startBox, endBox]
      : [endBox, startBox];

  const [bottomLeft, topRight] =
    startBox.x < endBox.x && startBox.y > endBox.y
      ? [startBox, endBox]
      : [endBox, startBox];

  return (
    (topLeft.x <= point.x &&
      point.x <= bottomRight.x &&
      topLeft.y <= point.y &&
      point.y <= bottomRight.y) ||
    (bottomLeft.x <= point.x &&
      point.x <= topRight.x &&
      topRight.y <= point.y &&
      point.y <= bottomLeft.y)
  );
}

export function calculateMousePositionOnElement(
  event: React.MouseEvent | MouseEvent,
  element: HTMLElement
): Point {
  const viewportMousePos = { x: event.pageX, y: event.pageY };
  const boundingRect = element.getBoundingClientRect();
  const topLeftCanvasPos = { x: boundingRect.left, y: boundingRect.top };
  return diffPoints(viewportMousePos, topLeftCanvasPos);
}

function canvasMouseToNodeCoords(
  mouse: Point,
  offset: Point,
  scale: number
): Point {
  return diffPoints(scalePoint(mouse, scale), offset);
}

export function mouseToNodeCoords(
  event: React.MouseEvent | MouseEvent,
  canvasState: CanvasState
): Point {
  if (canvasState.context) {
    const canvasMouse = calculateMousePositionOnElement(
      event,
      canvasState.context.canvas
    );
    return canvasMouseToNodeCoords(
      canvasMouse,
      canvasState.canvasViewState.offset,
      canvasState.canvasViewState.scale
    );
  } else {
    return ORIGIN;
  }
}


export function getCanvasCenter(
  canvasWidth: number,
  canvasHeight: number,
  offset: Point,
  scale: number
): Point {
  const topLeftPoint = offset;
  const distanceToCenter = scalePoint(
    { x: canvasWidth, y: canvasHeight },
    2 * scale
  );
  return diffPoints(distanceToCenter, topLeftPoint);
}

export function determineRadius(
  capacitance: number,
  allCapacitances: number[]
): number {
  const min = Math.min(...allCapacitances);
  const max = Math.max(...allCapacitances);
  if (min === max) {
    return DEFAULT_RADIUS;
  }
  // linear interpolation
  return (
    ((capacitance - min) / (max - min)) * (maxRadiusPx - minRadiusPx) +
    minRadiusPx
  );
}

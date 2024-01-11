import { useCallback } from "react";
import { DrawingPinInterface } from "./useDraw";

export default function useNodeConnectionUtils(
  drawingPins: DrawingPinInterface[],
  setDrawingPins: (drawingPins: DrawingPinInterface[]) => void,
): [
    (pin: DrawingPinInterface) => void,
    (activeNodeIds: string[]) => void,
    () => void
  ] {
  const addNewPin = useCallback(
    (pin: DrawingPinInterface) => {
      const newPins = drawingPins.map((node) => ({
        ...node,
        isActive: false,
      }));
      newPins.push({ ...pin, isActive: true });
      setDrawingPins(newPins);
      console.log("newPins", newPins);
    },
    [drawingPins.length]
  );

  const setActiveNodes = useCallback(
    (activeNodeIds: string[]) => {
      setDrawingPins(
        drawingPins.map((node) => ({
          ...node,
          isActive: activeNodeIds.includes(node._id),
        }))
      );
    },
    [drawingPins, setDrawingPins]
  );

  const clearActiveNodes = useCallback(() => {
    const anyActiveNodes = drawingPins.find((node) => node.isActive) !== undefined;
    if (anyActiveNodes) {
      setDrawingPins(
        drawingPins.map((node) => ({
          ...node,
          isActive: false,
        }))
      );
    }
  }, [drawingPins, setDrawingPins]);

  return [
    addNewPin,
    setActiveNodes,
    clearActiveNodes,
  ];
}

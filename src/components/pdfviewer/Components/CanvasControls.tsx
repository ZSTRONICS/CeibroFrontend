import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { CanvasState, CanvasViewState } from "./Canvas";
import { ORIGIN } from "./pointUtils";
// import { StyledButton } from "../../style";

const StyledCanvasControlButtons = styled("div")`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

type CanvasControlsProps = {
  setCanvasViewState: (canvasViewState: CanvasViewState) => void;
  canvasState: CanvasState;
  savedCanvasState: CanvasViewState;
  setSavedCanvasState: (newSavedCanvasState: CanvasViewState) => void;
};

export default function CanvasControls(
  props: CanvasControlsProps
): React.ReactElement {
  return (
    <StyledCanvasControlButtons>
      {/* <Button
        onClick={() =>
          props.canvasState.context &&
          props.setCanvasViewState({
            offset: props.savedCanvasState.offset,
            scale: props.savedCanvasState.scale,
          })
        }
      >
        Saved View
      </Button> */}
      <Button
        onClick={() =>
          props.canvasState.context &&
          props.setCanvasViewState({ offset: ORIGIN, scale: 1 })
        }
      >
        Reset View
      </Button>
      {/* <Button
        onClick={() => {
          props.setSavedCanvasState({
            offset: props.canvasState.canvasViewState.offset,
            scale: props.canvasState.canvasViewState.scale,
          });
        }}
      >
        Overwrite Saved View
      </Button> */}
    </StyledCanvasControlButtons>
  );
}

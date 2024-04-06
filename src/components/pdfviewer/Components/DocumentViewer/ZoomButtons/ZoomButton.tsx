import { CustomStack } from "components/CustomTags";
import { AddIcon, HomeIcon, SubtractIcon } from "components/material-ui/icons";
import "./zoomBtn.css";
export default function ZoomButton({
  idZoomIn,
  idZoomOut,
  homeBtnId,
}: {
  idZoomIn: string;
  idZoomOut: string;
  homeBtnId: string;
}) {
  return (
    <CustomStack gap={0.75} sx={{ pt: 1, pl: 1 }}>
      <button id={homeBtnId} className={"zoomButton"}>
        <HomeIcon />
      </button>
      <button id={idZoomIn} className={"zoomButton"}>
        <AddIcon />
      </button>
      <button id={idZoomOut} className={"zoomButton"}>
        <SubtractIcon />
      </button>
      {/* <button id={"addTask"} className={"zoomButton"} style={{ width: "10%" }}>
        Add Task
      </button> */}
    </CustomStack>
  );
}

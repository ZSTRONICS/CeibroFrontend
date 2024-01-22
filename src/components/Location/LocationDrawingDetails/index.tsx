import { useHistory, useParams } from "react-router-dom";

interface RouteParams {
  projectId: string;
  groupId: string;
  drawingId: string;
}

function LocationDrawingDetails() {
  const history = useHistory();
  const { projectId, groupId, drawingId } = useParams<RouteParams>();
  console.log(projectId, "projectId");
  console.log(groupId, "groupId");
  console.log(drawingId, "drawingId");

  return <div>LocationDrawingDetails</div>;
}

export default LocationDrawingDetails;

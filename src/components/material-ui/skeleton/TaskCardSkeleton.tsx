import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { CSkeleton } from "./Skeleton";

interface Props {
  ProjectScreen?: Boolean;
}

function TaskCardSkeleton({ ProjectScreen }: Props) {
  return (
    <Card
      sx={{
        width: "98%",
        minWidth: 240,
        marginTop: "10px",
        cursor: "pointer",
        border: "1px solid #e3e3e3",
        borderRadius: 1,
        padding: "3px 4px",
        borderTop: "none",
      }}
    >
      <>
        <CardHeader
          sx={{
            pt: 0,
            pl: 0,
            pb: 1,
            pr: 0.1,
          }}
          avatar={<CSkeleton variant="text" width={40} />}
          title={<CSkeleton variant="text" width={100} />}
          action={<CSkeleton variant="text" width={40} />}
        />
        <CardContent
          sx={{
            pt: 0,
            "&:last-child": { pb: 0 },
          }}
        >
          {ProjectScreen ? (
            <CSkeleton variant="text" width={200} height={20} />
          ) : (
            <>
              <CSkeleton variant="text" width={300} height={20} />
              <CSkeleton variant="text" width={200} height={20} />
              <CSkeleton variant="text" width={350} height={20} />
            </>
          )}
        </CardContent>
      </>
    </Card>
  );
}

export default TaskCardSkeleton;

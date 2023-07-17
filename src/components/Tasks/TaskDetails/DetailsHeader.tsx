import { Box } from "@mui/system";
import DetailActions from "./DetailActions";
import { Grid, Typography } from "@mui/material";

const data = [
  { label: "From", value: "Kristo Vunukainen" },
  {
    label: "Sent To",
    value:
      "Kristo Vunukainen, Martin Lust, Margus Jaaniste, Margus Murakas, +372 56470496",
  },
  { label: "Project", value: "Kloostri eramu" },
];

interface IProps {
  subTask: string;
  dueDate: string;
  taskUid: string;
}
const GridRow = ({ children }: any) => {
  return <Grid container>{children}</Grid>;
};

export default function DetailsHeader(props: IProps) {
  const { subTask, dueDate, taskUid } = props;
  return (
    <Box sx={{ padding: "0px 16px" }}>
      <DetailActions subTask={subTask} dueDate={dueDate} taskUid={taskUid} />
      <Box sx={{ height: "30px", width: "100%", padding: "5px 0px" }}>
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "20px",
          }}
        >
          Magnis dis parturient montes, nascetur ridiculus mus.
        </Typography>
      </Box>
      <Grid container sx={{ padding: "0px 0px 8px 0px" }}>
        {data.map((item) => {
          return (
            <GridRow>
              <Grid item xs={1}>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#605c5c",
                  }}
                >
                  {item.label}
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#131516",
                  }}
                >
                  {item.value}
                </Typography>
              </Grid>
            </GridRow>
          );
        })}
      </Grid>
    </Box>
  );
}

import { Box } from "@mui/system";
import React from "react";
import DetailActions from "./DetailActions";
import { Grid } from "@mui/material";

const data = [
  { label: "From", value: "Kristo Vunukainen" },
  {
    label: "Sent To",
    value:
      "Kristo Vunukainen, Martin Lust, Margus Jaaniste, Margus Murakas, +372 56470496",
  },
  { label: "Project", value: "Kloostri eramu" },
];

const GridRow = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
};

export default function DetailsHeader() {
  return (
    <Box sx={{ padding: "0px 16px" }}>
      <DetailActions />
      <Grid container>
        {data.map((item) => {
          return (
            <GridRow>
              <Grid item xs={2}>
                {item.label}
              </Grid>
              <Grid item xs={8}>
                {item.value}
              </Grid>
            </GridRow>
          );
        })}
      </Grid>
    </Box>
  );
}

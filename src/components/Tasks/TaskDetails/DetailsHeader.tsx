import { Box } from "@mui/system";
import React from "react";
import DetailActions from "./DetailActions";
import { Grid, Typography } from "@mui/material";
import assets from "assets/assets";
import FileBox from "components/Utills/FileBox";

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
      <Grid container>
        {data.map((item) => {
          return (
            <GridRow>
              <Grid item xs={1.5}>
                {item.label}
              </Grid>
              <Grid item xs={10.5}>
                {item.value}
              </Grid>
            </GridRow>
          );
        })}
      </Grid>
    </Box>
  );
}

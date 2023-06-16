import * as React from "react";
import Connections from "./Connections";
import { Grid } from "@mui/material";

const Requests = () => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        "@media (max-width:960px)": {
          padding: "10px 20px",
        },
      }}
    >
      <Connections />
    </Grid>
  );
};

export default Requests;

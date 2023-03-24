import React, { useState } from "react";
import {
  Box,
  Divider,
  Grid,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import CDatePicker from "components/DatePicker/CDatePicker";

function AdminHeader() {
  const [findUser, setFindUser] = useState<any>("");

  return (
    <>
      {/* <Box sx={{ flexGrow: 1 }}> */}
        <Grid
          container
          alignItems="center"
          gap={2}
        flexWrap='nowrap'
          // className={classes.TaskWraper}
          // ref={headerRef}
        >
          <Grid item sx={{ width: "100%", maxWidth: "550px" }}>
            <Paper
              elevation={0}
              component="form"
              sx={{
                p: "1px 10px",
                display: "flex",
                alignItems: "center",
                maxWidth: 550,
                width: "100%",
                border: "1px solid #DBDBE5",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              Users
              <Divider
                sx={{ height: 28, m: 0.5, pl: 0.5 }}
                orientation="vertical"
              />
              <InputBase
                // value={findUser||""}
                // onChange={(e: any) => setFindUser(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by name and email"
                inputProps={{ "aria-label": "Search by name and email" }}
              />
            </Paper>
          </Grid>
          <Grid
            item
            // xs={xsPoint} md={mdPoint} sm={4} lg={lgPoint}
            // sx={{
            //   height: "38px",
            //   width: "260px",
            // }}
          >
            <CDatePicker
              showLabel={true}
              required
              // value={showDate}
              id="date1"
              name="dueDate"
              // onChange={(e: any) => {
              //   setShowDate(e);
              //   projectOverview.dueDate = moment(e).format("DD-MM-YYYY");
              // }}
            />
          </Grid>
        </Grid>
      {/* </Box> */}
    </>
  );
}

export default AdminHeader;

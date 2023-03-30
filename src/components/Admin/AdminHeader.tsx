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
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";

function AdminHeader() {
  const [findUser, setFindUser] = useState<any>("");
  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");
  const [isHide, setIsHide] = React.useState(true);

  const handleFromDateChange = (value: any) => {
    setFromDate(value);
    setIsHide(false);
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        gap={2}
        flexWrap="nowrap"
        sx={{
          "@media(max-width:900px)": {
            width: "100%",
            overflowX: "auto",
          },
        }}
      >
        <Grid item md={3} sm={4}>
          <Paper
            elevation={0}
            component="form"
            sx={{
              p: "1px 10px",
              display: "flex",
              alignItems: "center",
              // width: 450,
              // width: "100%",
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
              sx={{
                ml: 1,
                // flex: 1
              }}
              placeholder="Search by name and email"
              inputProps={{ "aria-label": "Search by name and email" }}
            />
          </Paper>
        </Grid>
        <Grid
          item
          md={6}
          sm={8}
          sx={
            {
              // // width: "100%",
              // width: "500px",
            }
          }
        >
          <CustomStack>
            <CDatePicker
              showLabel={true}
              dueDateLabel={"From"}
              value={fromDate}
              id="date1"
              name="dueDate"
              onChange={handleFromDateChange}
            />
            <CDatePicker
              showLabel={true}
              disabled={isHide}
              value={toDate}
              dueDateLabel={"Due Date"}
              id="date1"
              name="dueDate"
              minDate={fromDate}
              onChange={(e: any) => {
                setToDate(e);
                // moment(e).format("DD-MM-YYYY");
              }}
            />
          </CustomStack>
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
}

export default AdminHeader;

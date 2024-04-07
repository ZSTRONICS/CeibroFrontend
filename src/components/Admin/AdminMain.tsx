import { Tabs } from "@mui/base";
import { Box, Divider, Grid, InputBase, Paper } from "@mui/material";
import CDatePicker from "components/DatePicker/CDatePicker";
import { Tab, TabPanel, TabsList } from "components/TaskComponent/Tabs/Tabs";
import { UserInterface } from "constants/interfaces/user.interface";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userApiAction } from "redux/action/user.action";
// import AdminHeader from "./AdminHeader";
import AdminUserTables from "./AdminUserTables";

function AdminMain() {
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");
  const [isHide, setIsHide] = useState(true);
  const [users, setUsers] = useState<UserInterface[]>([]);

  const [filterUsersLocal, setFilterUsersLocal] = useState<UserInterface[]>([]);
  const [filterParams, setFilterParams] = useState({
    searchWithNameEmail: "",
    startDate: "",
    endDate: "",
  });

  const getUsers = (role: string) => {
    setToDate(null);
    setFromDate(null);
    const payload = {
      success: (res: any) => {
        setUsers(res.data.result);
        setFilterUsersLocal(res.data.result);
      },
      other: { role: role },
    };
    dispatch(userApiAction.getUsersByRole(payload));
  };

  useEffect(() => {
    getUsers("admin");
  }, []);

  const filterDataOnParams = (params: any) => {
    let filtereLocal: any = [...users];
    if (String(params.searchWithNameEmail).length > 0) {
      filtereLocal = filtereLocal.filter((user: any) => {
        const fullName = `${user?.firstName} ${user?.surName}`
          .toLocaleLowerCase()
          .includes(params.searchWithNameEmail.toLowerCase());
        const searchEmail = String(user?.email)
          .toLocaleLowerCase()
          .includes(params.searchWithNameEmail.toLowerCase());
        const finalResult = fullName || searchEmail;
        return finalResult;
      });
    }
    if (params.startDate !== "" || params.endDate !== "") {
      filtereLocal = filtereLocal.filter((item: any) => {
        const itemDate = new Date(item.createdAt);
        const start = params.startDate ? new Date(params.startDate) : null;
        const end = params.endDate ? new Date(params.endDate) : null;
        return (!start || itemDate >= start) && (!end || itemDate <= end);
      });
    }

    setFilterParams({ ...params });
    if (
      params.searchWithNameEmail === "" &&
      params.startDate === "" &&
      params.endDate === "" &&
      toDate === null &&
      fromDate === null
    ) {
      setFilterUsersLocal(users);
    } else {
      setFilterUsersLocal(filtereLocal);
    }
  };

  const handleUsersSearch = (e: any) => {
    if (e.target.value === "") {
      filterDataOnParams({
        ...filterParams,
        searchWithNameEmail: "",
      });
    } else {
      filterDataOnParams({
        ...filterParams,
        searchWithNameEmail: e.target.value,
      });
    }
  };

  const handleFromDateChange = (value: any) => {
    setFromDate(value);
    setIsHide(false);
    if (value === null) {
      setIsHide(true);
      setToDate(null);
      filterDataOnParams({
        ...filterParams,
        startDate: "",
      });
    } else {
      filterDataOnParams({
        ...filterParams,
        startDate: value,
      });
    }
  };

  const handleToDateChange = (value: any) => {
    setToDate(value);
    setIsHide(false);
    if (value === null) {
      filterDataOnParams({
        ...filterParams,
        endDate: "",
      });
    } else {
      filterDataOnParams({
        ...filterParams,
        endDate: value,
      });
    }
  };

  return (
    <>
      <Box pt={2} pl={2}>
        <Tabs defaultValue={0}>
          <TabsList
            sx={{ maxWidth: "180px", width: "100%", minWidth: "120px" }}
          >
            <Tab onClick={() => getUsers("admin")} sx={{ fontSize: 16 }}>
              Admins
            </Tab>
            <Tab onClick={() => getUsers("user")} sx={{ fontSize: 16 }}>
              Users{" "}
            </Tab>
          </TabsList>

          <Grid container alignItems="center" gap={2} pt={1.4}>
            <Grid item md={3} sm={4} xs={11}>
              <Paper
                elevation={0}
                component="form"
                sx={{
                  p: "1px 10px",
                  display: "flex",
                  alignItems: "center",
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
                  value={filterParams.searchWithNameEmail}
                  onChange={(e: any) => handleUsersSearch(e)}
                  sx={{
                    ml: 1,
                    width: "100%",
                  }}
                  placeholder="Search by name and email"
                  inputProps={{ "aria-label": "Search by name and email" }}
                />
              </Paper>
            </Grid>

            <Grid item md={3} sm={3.5} xs={11}>
              <CDatePicker
                IsdisablePast={false}
                showLabel={true}
                dueDateLabel={"From"}
                componentsProps={{
                  actionBar: {
                    actions: ["clear"],
                  },
                }}
                value={fromDate}
                id="date1"
                name="dueDate"
                onChange={handleFromDateChange}
              />
            </Grid>

            <Grid item md={3} sm={3.5} xs={11}>
              <CDatePicker
                IsdisablePast={false}
                showLabel={true}
                disabled={isHide}
                value={toDate}
                componentsProps={{
                  actionBar: {
                    actions: ["clear"],
                  },
                }}
                dueDateLabel={"To"}
                id="date1"
                name="dueDate"
                minDate={fromDate}
                onChange={handleToDateChange}
              />
            </Grid>
          </Grid>
          <TabPanel value={0} index={0}>
            <AdminUserTables users={filterUsersLocal} />
          </TabPanel>
          <TabPanel value={1} index={1}>
            <AdminUserTables users={filterUsersLocal} />
          </TabPanel>
        </Tabs>
      </Box>
    </>
  );
}

export default AdminMain;

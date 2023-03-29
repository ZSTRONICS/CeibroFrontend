import TabsUnstyled from "@mui/base/TabsUnstyled";
import { Box, Grid } from "@mui/material";
import { Tab, TabPanel, TabsList } from "components/TaskComponent/Tabs/Tabs";
import { UserInterface } from "constants/interfaces/user.interface";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "redux/action/user.action";
import AdminHeader from "./AdminHeader";
import AdminUserTables from "./AdminUserTables";

function AdminMain() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState<UserInterface[]>([]);
  const getUsers = (role: string) => {
    const payload = {
      success: (res: any) => {
        setUsers(res.data.result);
      },
      other: { role: role },
    };
    dispatch(userAction.getUsersByRole(payload));
  };

  useEffect(() => {
    getUsers("admin");
  }, []);

  return (
    <>
      <Box pt={2} pl={2}>
        <TabsUnstyled defaultValue={0}>
          <Grid container gap={1}>
            <Grid item md={2}>
              <TabsList sx={{ maxWidth: "180px", width: "100%", minWidth: "120px" }}>
                <Tab onClick={() => getUsers("admin")} sx={{ fontSize: 16 }}>
                  Admins
                </Tab>
                <Tab onClick={() => getUsers("user")} sx={{ fontSize: 16 }}>
                  Users{" "}
                </Tab>
              </TabsList>
            </Grid>
            <Grid item md={8}>
              <AdminHeader />
            </Grid>
          </Grid>
          <TabPanel value={0}>
            <AdminUserTables users={users} />
          </TabPanel>
          <TabPanel value={1}>
            <AdminUserTables users={users} />
          </TabPanel>
        </TabsUnstyled>
      </Box>
    </>
  );
}

export default AdminMain;

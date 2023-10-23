import { Badge, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import colors from "../../assets/colors";
import { SingleConfig } from "../../navigation/SidebarConfig";
import appActions from "../../redux/action/app.action";
import { RootState } from "../../redux/reducers/appReducer";

const Main = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "10px",
}));

const topMenu = {
  display: "flex",
  minWidth:"135px",
  height:"50px",
  alignItems: "center",
  padding: "0px 10px",
  paddingLeft: "3px",
  borderBottom: `1px solid white`,
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "Inter",
  color: colors.primary,
  cursor: "pointer",
  gap: 10,
  borderRadius: "8px",
  "&:hover": {
    background: "white",
    color: `${colors.black} !important`,
  },
};

function Topbar() {
  const dispatch = useDispatch();
  const configs = useSelector(
    (store: RootState) => store.navigation.sidebarRoutes
  );
  const { user } = useSelector((store: RootState) => store.auth);
  const history = useHistory();

  useEffect(() => {
    dispatch(appActions.setSelectedTab("tasks"));
  }, []);

  const handleRouteClick = (config: SingleConfig) => {
    dispatch(appActions.setSelectedTab(config.key));
    let path = config.getPath();
    if (path[0] === "/") {
      path = path.slice(1);
    }
    if (path[path.length - 1] === "/") {
      path = path.slice(0, path.length - 1);
    }

    if (window.location.pathname.includes(path)) {
      return;
    }

    if (window.location.pathname.includes("/tasks") && path.includes("tasks/")) {
      const lastPath = path.split("/")[1];
      window.location.pathname = '/tasks/' + lastPath;
      return;
    }

    history.push(`/${path}`);
  };

  return (
    <Main>
      {configs &&
        Object.values(configs).map((config: any) => {
          if (user && config.title === "Admin" && user.role !== "admin") {
            return null;
          }
          return (
            <Box
              key={config.title}
              sx={topMenu}
              style={{
                background: window.location.pathname.includes(
                  config.getPath("")
                )
                  ? "#F4F4F4"
                  : "",
              }}
              onClick={() => handleRouteClick(config)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0.5,
                  gap: 1,
                }}
              >
                <config.icon />
                <p style={{ flex: 4, fontSize: 16, fontWeight: 500 }}>
                  {config.title}
                </p>
              </Box>
              {config?.notification > 0 && (
                <Badge
                  overlap="circular"
                  badgeContent={config.notification}
                  color="error"
                ></Badge>
              )}
            </Box>
          );
        })}
    </Main>
  );
}

export default Topbar;

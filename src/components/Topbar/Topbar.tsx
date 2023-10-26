import { Badge, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MainLogo } from "components/material-ui/icons";
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
  padding: "0px 2px",

  fontSize: 12,
  background:
    "linear-gradient(0deg,  0%,  100%), linear-gradient(0deg, white 0%, white 100%)",
  color: colors.textGrey,
  cursor: "pointer",
  "&:hover": {
    background: "white",
    color: `#131516 !important`,
    fontWeight: 700,
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

    if (
      window.location.pathname.includes("/tasks") &&
      path.includes("tasks/")
    ) {
      const lastPath = path.split("/")[1];
      window.location.pathname = "/tasks/" + lastPath;
      return;
    }

    history.push(`/${path}`);
  };
  return (
    <Main>
      <Box
        sx={{
          display: "flex",
          width: "72px",
          maxWidth: "90px",
          padding: "6px 20px 5px 20px",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <MainLogo />
      </Box>

      <Box />
      <Box sx={{ display: "flex", alignItems: "center", ml: { xs: 1, md: 4 } }}>
        {configs &&
          Object.values(configs).map((config: any) => {
            const havePath = window.location.pathname.includes(
              config.getPath("")
            );
            console.log(`havePath: ${havePath}`);
            if (user && config.title === "Admin" && user.role !== "admin") {
              return null;
            }
            return (
              <Box
                key={config.title}
                sx={topMenu}
                style={{
                  color: havePath ? "#131516" : colors.textGrey,
                  boxShadow: havePath
                    ? "0px 4px 4px rgba(0, 0, 0, 0.25) inset"
                    : "",

                  borderBottom: havePath ? "1px black solid" : "",
                }}
                onClick={() => handleRouteClick(config)}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "90px",
                    padding: "9px 33px 4px 33px",
                    gap: "4px",
                    flex: " 1 0 0",
                    alignSelf: "stretch",
                  }}
                >
                  <config.icon />
                  <p
                    style={{
                      flex: 4,
                      fontSize: 12,
                      fontWeight: havePath ? 700 : 500,
                    }}
                  >
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
      </Box>
    </Main>
  );
}

export default Topbar;

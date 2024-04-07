import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MainLogo } from "components/material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#E2E4E5",
  },
  backButton: {
    marginRight: "16px",
  },
  container: {
    height: "52px",
    width: "800px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "16px",
    paddingRight: "16px",
    borderBottom: "1px solid #ccc",
  },
}));

interface TaskHeaderProps {
  title: string;
}

const TaskHeader = ({ title }: TaskHeaderProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        height: "52px",
        backgroundColor: "white",
        zIndex: "10",
      }}
    >
      <Box className={classes.container}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "#131516",
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          {title}
        </Typography>
      </Box>
      <MainLogo />
    </Box>
  );
};

export default TaskHeader;

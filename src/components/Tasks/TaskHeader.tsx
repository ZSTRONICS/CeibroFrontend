import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import assets from "assets/assets";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#E2E4E5",
  },
  backButton: {
    marginRight: "16px",
  },
  logo: {
    width: "72px",
    height: "54px",
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
        position: "static",
        alignItems: "center",
        justifyContent: "space-between",
        height: "52px",
      }}
    >
      <Box className={classes.container}>
        {/* <IconButton
          edge="start"
          sx={{ color: "#0076C8" }}
          aria-label="back"
          className={classes.backButton}
          onClick={handleBackButtonClick}
        >
          <ArrowBackIcon />
        </IconButton> */}
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
      <Box>
        <img src={assets.logo} alt="Logo" className={classes.logo} />
      </Box>
    </Box>
  );
};

export default TaskHeader;

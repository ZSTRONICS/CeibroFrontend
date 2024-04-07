import { Button } from "@mui/material";
import { CustomStack } from "components/CustomTags";

const NotFound = () => {
  const handleGoToHomePage = () => {
    window.location.href = "/tasks";
  };
  return (
    <CustomStack
      sx={{ height: "50vh", justifyContent: "center", flexDirection: "column" }}
    >
      <h2>Page Not Found 404!</h2>
      <p>The requested page was not found.</p>
      <Button onClick={handleGoToHomePage}>Go to Home Page</Button>
    </CustomStack>
  );
};

export default NotFound;

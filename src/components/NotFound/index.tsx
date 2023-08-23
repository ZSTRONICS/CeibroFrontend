import { CustomStack } from "components/CustomTags";

const NotFound = () => {
  return (
    <CustomStack
      sx={{ height: "50vh", justifyContent: "center", flexDirection: "column" }}
    >
      <h2>Page Not Found!</h2>
      <p>The requested page was not found.</p>
    </CustomStack>
  );
};

export default NotFound;

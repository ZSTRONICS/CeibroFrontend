import { Box, Button } from "@mui/material";
import assets from "assets";
import { CustomStack, Heading2 } from "components/CustomTags";
import { openFormInNewWindow } from "utills/common";

interface Props {
  showHiddenTasks: boolean;
  setShowHiddenTasks: (value: boolean) => void;
}
function MainTaskHeader(props: Props) {
  const { showHiddenTasks, setShowHiddenTasks } = props;
  return (
    <>
      {showHiddenTasks ? (
        <CustomStack sx={{ justifyContent: "space-between", width: "100%" }}>
          <Heading2 sx={{ py: 2, marginLeft: "15px" }}>Hidden Tasks</Heading2>
          <Button
            disableRipple
            component="label"
            sx={{
              padding: "5px 8px",
              textTransform: "unset",
              marginRight: "15px",
            }}
            onClick={() => setShowHiddenTasks(false)}
            variant="contained"
          >
            Go Back
          </Button>
        </CustomStack>
      ) : (
        <CustomStack
          sx={{
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Heading2 sx={{ py: 2, marginLeft: "15px" }}>Tasks</Heading2>
          <Box>
            <Button
              disableRipple
              component="label"
              sx={{
                padding: "5px 8px",
                textTransform: "unset",
                color: "#818181",
              }}
              onClick={() => setShowHiddenTasks(true)}
              variant="text"
            >
              Show hidden tasks
            </Button>
            <Button
              disableRipple
              component="label"
              sx={{
                padding: "5px 8px",
                textTransform: "unset",
                marginRight: "15px",
              }}
              onClick={() =>
                openFormInNewWindow("/create-new-task", "Create New Task")
              }
              variant="contained"
            >
              <assets.AddIcon sx={{ color: "white", marginRight: "10px" }} />
              New
            </Button>
          </Box>
        </CustomStack>
      )}
    </>
  );
}

export default MainTaskHeader;
import { Box, Button } from "@mui/material";
import assets from "assets";
import { CustomStack, Heading2 } from "components/CustomTags";
import { useTranslation } from "react-i18next";
import { openFormInNewWindow } from "utills/common";

interface Props {
  showHiddenTasks: boolean;
  setShowHiddenTasks: (value: boolean) => void;
  isTasksLoading: boolean;
}
function MainTaskHeader(props: Props) {
  const { t }: any = useTranslation<any>();
  const { showHiddenTasks, isTasksLoading, setShowHiddenTasks } = props;
  const btnStyle = {
    textTransform: "unset",
    marginRight: "15px",
    width: "86px",
    height: "36px",
    backgroundColor: "#0076C8",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#0076C8",
    },
  };

  return (
    <>
      {showHiddenTasks ? (
        <CustomStack sx={{ justifyContent: "space-between", width: "100%" }}>
          <Heading2 sx={{ py: 2, marginLeft: "15px" }}>Hidden Tasks</Heading2>
          <Button
            disableRipple
            sx={{
              padding: "5px 6px",
              ...btnStyle,
            }}
            onClick={() => setShowHiddenTasks(false)}
            variant="contained"
          >
            {t("task.tasks_heading")}
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
                fontSize: "12px",
              }}
              onClick={() => setShowHiddenTasks(true)}
              variant="text"
              disabled={isTasksLoading}
            >
              Show hidden tasks
            </Button>
            <Button
              disableRipple
              sx={{
                padding: "8px 16px 8px 12px",
                gap: "4px",
                ...btnStyle,
              }}
              variant="contained"
              onClick={() =>
                openFormInNewWindow("/create-new-task", "Create New Task")
              }
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

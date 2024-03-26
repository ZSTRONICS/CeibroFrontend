import { Box } from "@mui/material";
import assets from "assets";
import { CustomStack, DescriptionTag, SubHeading } from "components/CustomTags";

function TaskNotFound() {
  return (
    <>
      <Box
        sx={{
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ marginBottom: "20px" }}
          src={assets.NotFound}
          alt="not found"
        />
        <CustomStack
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "5px",
          }}
        >
          <CustomStack
            sx={{
              flexDirection: "column",
              maxWidth: "70%",
              width: "100%",
              alignItems: "center",
            }}
          >
            <SubHeading
              sx={{ color: "#131516", fontSize: "16px", fontWeight: "600" }}
            >
              No result found!
            </SubHeading>
            <DescriptionTag
              sx={{
                textAlign: "center",
                color: "#818181",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "22px",
                marginTop: "10px",
              }}
            >
              We cannot find the task you are searching
              {/* for, may be a little spelling mistake? */}
            </DescriptionTag>
          </CustomStack>
        </CustomStack>
      </Box>
    </>
  );
}

export default TaskNotFound;

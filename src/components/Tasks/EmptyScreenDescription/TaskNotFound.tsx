import { Box } from "@mui/material";
import assets from "assets";
import { CustomStack, DescriptionTag, SubHeading } from "components/CustomTags";

function TaskNotFound() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: " column",
          justifyContent: "center",
          background: `url(${assets.CeibroWaterMark}) no-repeat`,
          backgroundPosition: "center",
          backgroundSize: "auto auto",
          backgroundOrigin: "content-box, padding-box",
        }}
      >
        <CustomStack
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            margin: "0 auto",
            p: 0.57,
            gap: "0.6rem",
          }}
        >
          <CustomStack
            sx={{
              flexDirection: "column",
              maxWidth: "58%",
              width: "100%",
              alignItems: "center",
            }}
          >
            <SubHeading>No result found!</SubHeading>
            <DescriptionTag sx={{ textAlign: "justify" }}>
              We cannot find the task you are searching for, may be a little
              spelling mistake?
            </DescriptionTag>
          </CustomStack>
        </CustomStack>
      </Box>
    </>
  );
}

export default TaskNotFound;

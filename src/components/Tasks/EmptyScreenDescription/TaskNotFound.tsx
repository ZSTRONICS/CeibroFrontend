import { Box } from "@mui/material";
import assets from "assets";
import { CustomStack, DescriptionTag, SubHeading } from "components/CustomTags";

function TaskNotFound() {
  return (
    <>
      {/* <Box
        sx={{
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: " column",
          justifyContent: "center",
          alignItems: "center",
          background: `url(${assets.NotFound}) no-repeat`,
          backgroundPosition: "center",
          backgroundSize: "auto auto",
          backgroundOrigin: "content-box, padding-box",
          border: "solid 1px red",
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
              We cannot find the task you are searching for, may be a little
              spelling mistake?
            </DescriptionTag>
          </CustomStack>
        </CustomStack>
      </Box> */}
      <Box
        sx={{
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img style={{ marginBottom: "20px" }} src={assets.NotFound} />
        <CustomStack
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "50px",
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

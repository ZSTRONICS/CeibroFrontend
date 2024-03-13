import { Box, Typography } from "@mui/material";

const MessageBot = () => {
  const array = [
    { label: "jaanus Kutson", value: "Task Title Will Go Here" },
    // { label: "jaanus Kutson", value: "Task Title Will Go Here" },
    // { label: "jaanus Kutson", value: "Task Title Will Go Here" },
    // { label: "jaanus Kutson", value: "Task Title Will Go Here" },
  ];

  const renderedArray = array.map((items, index) => {
    const { label, value } = items;
    return (
      <Box
        key={index}
        sx={{
          padding: " 6px 16px 6px 16px",
          backgroundColor: "#D4D4D4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
          {value}
        </Typography>
      </Box>
    );
  });

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {renderedArray}
      </Box>
    </>
  );
};

export default MessageBot;

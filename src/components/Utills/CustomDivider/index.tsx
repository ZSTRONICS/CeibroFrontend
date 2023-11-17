import { Divider } from "@mui/material";

interface CustomDividerProps {
  color?: string;
}

function CustomDivider({ color = "#F4F4F4" }: CustomDividerProps) {
  return (
    <Divider
      sx={{
        height: "4px",
        backgroundColor: color,
        opacity: "90%",
        border: "none",
        my: 1.25,
        filter: "blur(1.5px)",
      }}
    />
  );
}

export default CustomDivider;

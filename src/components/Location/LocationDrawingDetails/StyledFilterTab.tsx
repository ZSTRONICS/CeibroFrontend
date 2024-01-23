import { Chip } from "@mui/material";
import { MouseEventHandler } from "react"; // Import MouseEventHandler

interface StyledChipProps {
  label: string;
  active?: boolean;
  bgColor: string;
  callback: MouseEventHandler<HTMLDivElement>;
}

const StyledFilterTab = ({
  label,
  active,
  bgColor,
  callback,
}: StyledChipProps) => {
  return (
    <Chip
      sx={{
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: "11.2px",
        height: "26px",
        maxWidth: "85px",
        minWidth: "80px",
        width: "100%",
        borderRadius: "5px",
        padding: "4px 6px",
        border: `1.2px solid ${bgColor}`,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        backgroundColor: `${active ? bgColor : "white"}`,
        lineHeight: "16px",
        cursor: "pointer",
        "&:hover, &:focus": {
          backgroundColor: `${active ? bgColor : "white"}`,
        },
        span: { p: 0 },
      }}
      label={label}
      onClick={callback}
    />
  );
};

export default StyledFilterTab;

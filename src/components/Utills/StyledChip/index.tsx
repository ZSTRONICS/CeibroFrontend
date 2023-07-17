import { Chip, Badge } from "@mui/material";
import { styled } from "@mui/system";
import { MouseEventHandler } from "react"; // Import MouseEventHandler

interface StyledChipProps {
  label: string;
  notfiyCount: string;
  active?: boolean;
  bgColor: string;
  callback: MouseEventHandler<HTMLDivElement>;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 4,
    top: 4,
  },
}));

const StyledChip = ({
  label,
  notfiyCount,
  active,
  bgColor,
  callback,
}: StyledChipProps) => {
  return (
    <Chip
      sx={{
        height: "24px",
        width: "100px",
        borderRadius: "8px",
        padding: "4px 12px",
        borderWidth: "1px",
        borderColor: bgColor,
        borderStyle: "solid",
        backgroundColor: `${active ? bgColor : "white"}`,
        fontFamily: "Inter",
        fontSize: "10px",
        fontWeight: 500,
        lineHeight: "16px",
        cursor: "pointer",
        "&:hover, &:focus": {
          backgroundColor: `${active ? bgColor : "white"}`,
        },
      }}
      label={label}
      avatar={
        <Badge
          sx={{
            position: "absolute",
            "& .MuiBadge-badge": {
              color: "#000 !important",
              backgroundColor: bgColor,
              right: "-35px",
              top: "1px",
            },
          }}
          badgeContent={notfiyCount}
        />
      }
      onClick={callback}
    />
  );
};

export default StyledChip;
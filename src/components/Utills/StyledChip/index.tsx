import { Badge, Chip } from "@mui/material";
import { MouseEventHandler } from "react"; // Import MouseEventHandler

interface StyledChipProps {
  label: string;
  notifyCount: number | string;
  active?: boolean;
  bgColor: string;
  isDisabled: boolean;
  callback: MouseEventHandler<HTMLDivElement>;
}

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: 4,
//     top: 4,
//   },
// }));

const StyledChip = ({
  label,
  notifyCount,
  active,
  bgColor,
  callback,
  isDisabled,
}: StyledChipProps) => {
  return (
    <Chip
      disabled={isDisabled}
      sx={{
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: "11px",
        height: "24px",
        width: "80px",
        borderRadius: "8px",
        padding: "4px 3px",
        borderWidth: "1.5px",
        borderColor: bgColor,
        borderStyle: "solid",
        backgroundColor: `${!isDisabled && active ? bgColor : "white"}`,
        lineHeight: "16px",
        cursor: "pointer",
        "&:hover, &:focus": {
          backgroundColor: `${active ? bgColor : "white"}`,
        },
        // Responsive styles
        "@media (max-width: 600px)": {
          width: "80px",
          fontSize: "8px",
          padding: "2px 8px",
        },
        "@media (max-width: 400px)": {
          width: "60px",
          fontSize: "6px",
          padding: "2px 6px",
        },
      }}
      label={label}
      avatar={
        notifyCount === 0 ? (
          <></>
        ) : (
          <Badge
            showZero={false}
            sx={{
              position: "absolute",
              "& .MuiBadge-badge": {
                color: "#000 !important",
                backgroundColor: bgColor,
                right: "-20px",
                top: "2px",
                border: "2px solid white",
                padding: "10px 4px",
              },
              "@media (max-width: 700px)": {
                "& .MuiBadge-badge": {
                  right: "-8px ",
                },
              },
            }}
            badgeContent={notifyCount >= "99" ? `+${99}` : `+${notifyCount}`}
          />
        )
      }
      onClick={callback}
    />
  );
};

export default StyledChip;

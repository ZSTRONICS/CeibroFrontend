import { Badge, Chip } from "@mui/material";
import { MouseEventHandler } from "react"; // Import MouseEventHandler

interface StyledChipProps {
  label: string;
  notifyCount: number | string | any;
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
        fontSize: "11.2px",
        height: "26px",
        maxWidth: "85px",
        minWidth: "80px",
        width: "100%",
        borderRadius: "5px",
        padding: "4px 6px",
        border: `1.2px solid ${bgColor}`,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        backgroundColor: `${!isDisabled && active ? bgColor : "white"}`,
        lineHeight: "16px",
        cursor: "pointer",
        "&:hover, &:focus": {
          backgroundColor: `${active ? bgColor : "white"}`,
        },
        span: { p: 0 },
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
                right: "-24px",
                top: "0px",
                border: "2px solid white",
                padding: "10px 4px",
                borderRadius: "60%",
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

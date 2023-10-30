import { Box, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { OptionType } from "components/Tasks/type";

interface IProps {
  open: boolean;
  item: OptionType;
  handleDeleteItem: (item: OptionType) => void;
  handleDialogState: () => void;
}

function ConfirmationDialog({
  item,
  handleDeleteItem,
  open,
  handleDialogState,
}: IProps) {
  const handleDeleteConfirmed = () => {
    handleDialogState();
    handleDeleteItem(item);
  };
  return (
    <Dialog
      open={open}
      onClose={handleDialogState}
      sx={{ minWidth: "280px", minHeight: "147px" }}
    >
      <Box sx={{ borderRadius: "8px", pb: 0.5 }}>
        <Box sx={{ width: "280px", height: "83px", padding: "22px 24px" }}>
          <Typography
            sx={{
              width: "232px",
              height: "30px",
              textAlign: "center",
              lineHeight: "20px",
              color: "#0E0E0E",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "Inter",
            }}
          >
            Do you want to delete?
          </Typography>
          <Typography
            className="ellipsis"
            sx={{
              WebkitLineClamp: 2,
              width: "232px",
              textAlign: "center",
              lineHeight: "20px",
              color: "#0E0E0E",
              fontSize: "12px",
              fontWeight: 500,
              fontFamily: "Inter",
            }}
          >
            {item.label}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            borderTop: "1px solid #818181",
            pt: 1.25,
          }}
        >
          <Box sx={{ display: "flex", gap: "8px", pb: 1, width: "100%" }}>
            <Button
              onClick={handleDialogState}
              color="primary"
              sx={{
                fontWeight: 500,
                fontFamily: "Inter",
                width: "100%",
                fontSize: "14px",
                color: "#0076C8",
              }}
            >
              No
            </Button>
            <Divider orientation="vertical" sx={{ borderColor: "#818181" }} />
            <Button
              onClick={handleDeleteConfirmed}
              color="primary"
              sx={{
                fontWeight: 500,
                fontFamily: "Inter",
                width: "100%",
                fontSize: "14px",
                color: "#0076C8",
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}

export default ConfirmationDialog;

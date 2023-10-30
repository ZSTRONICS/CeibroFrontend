import { Box, Typography } from "@mui/material";
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
      sx={{ minWidth: "280px", minHeight: "147px", }}
    >
      <Box sx={{ width: "280px", height: "83px", padding: "22px 24px" }}>
        <Typography
          sx={{
            width: "232px",
            height: "30px",
            textAlign: "center",
            lineHeight: "20px",
            color: '#0E0E0E',
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "Inter",
          }}
        >
          Do you want to delete?
        </Typography>
        <Typography
          sx={{
            width: "232px",
            height: "30px",
            textAlign: "center",
            lineHeight: "20px",
            color: '#0E0E0E',
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
          height: "40px",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Button onClick={handleDialogState}
            color="primary"
            sx={{
              fontWeight: 500,
              fontFamily: "Inter",
              width: "140px",
              fontSize: "14px",
              borderRight: "1px solid #818181",
            }}>
            No
          </Button>

          <Button onClick={handleDeleteConfirmed}
            color="primary"
            sx={{
              fontWeight: 500,
              fontFamily: "Inter",
              width: "120px",
              fontSize: "14px",
            }}>
            Yes
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default ConfirmationDialog;

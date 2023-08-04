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
      sx={{ minWidth: "280px", minHeight: "147px",}}
    >
      <Box sx={{ width: "280px", height: "83px",padding:"22px 24px"  }}>
        <Typography
          sx={{ width: "232px", height: "30px", textAlign: "center",lineHeight:"20px" }}
        >
          Do you want to delete?
        </Typography>
        <Typography
          sx={{ width: "232px", height: "30px", textAlign: "center",lineHeight:"20px" }}
        >
          {item.label}
        </Typography>
      </Box>
      <Box
        sx={{
          display:"flex",
          width: "100%",
          borderTop: "1px solid #818181",
          height: "52px",
          padding: "8px",
        }}
      >
        <Box sx={{display:"flex",gap:"8px"}}>
          <Button onClick={handleDialogState} color="primary" sx={{padding:"10px 8px",width:"140px",borderRight: "1px solid #818181",}}>
            No
          </Button>
          <Button onClick={handleDeleteConfirmed} color="primary" autoFocus sx={{padding:"10px 8px",width:"140px"}}>
            Yes
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default ConfirmationDialog;

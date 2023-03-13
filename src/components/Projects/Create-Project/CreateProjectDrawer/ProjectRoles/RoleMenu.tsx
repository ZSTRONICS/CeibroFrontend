import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import colors from "../../../../../assets/colors";
import assets from "../../../../../assets/assets";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { ConfirmDescriptionTag } from "components/CustomTags";
import CButton from "components/Button/Button";

const RoleMenu = (props: any) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const confirm = useConfirm();
  const handleToggle = (e: any) => {
    e.stopPropagation();
    setShow(!show);
  };

  const handleEdit = () => {
    props.onEdit();
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    confirm({
      title: (
        <CustomStack gap={1}>
          <assets.ErrorOutlineOutlinedIcon /> Confirmation
        </CustomStack>
      ),
      description: (
        <ConfirmDescriptionTag sx={{ pt: 2 }}>
          Are you confirm want to delete this role?
        </ConfirmDescriptionTag>
      ),
      titleProps: { color: "red", borderBottom: "1px solid #D3D4D9" },
      confirmationText: "Remove",
      confirmationButtonProps: {
        sx: {
          textTransform: "capitalize",
          padding: "4px 15px",
          color: "#FA0808",
          borderColor: "#FA0808",
          marginRight: "10px",
        },
        variant: "outlined",
      },
      cancellationText: (
        <CButton
          variant="contained"
          elevation={1}
          styles={{
            color: "#605C5C",
            backgroundColor: "#ECF0F1",
            fontSize: 12,
            fontWeight: "bold",
          }}
          label={"Cancel"}
        />
      ),
    }).then(() => {
      props.onDelete();
    });
  };

  return (
    <div className="dropdown">
      <IconButton onClick={handleToggle}>
        <img src={assets.moreIcon} className={classes.moreIcon} alt="" />
      </IconButton>
      {show && (
        <OutsideClickHandler onOutsideClick={handleToggle}>
          <div className={`dropdown-content ${classes.dropdownContent}`}>
            <div onClick={handleEdit} style={{ cursor: "pointer" }}>
              <Button
                variant="text"
                // startIcon={<EditIcon />}
                // disabled={props.permissoin}
              >
                Edit
              </Button>
            </div>
            <hr className={classes.break} />
            <div onClick={handleDelete} style={{ cursor: "pointer" }}>
              <Button
                //  disabled={props.permissoin}
                sx={{ color: "#FA0808", borderColor: "#FA0808" }}
                variant="text"
                // startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default RoleMenu;

const useStyles = makeStyles({
  moreIcon: {
    cursor: "pointer",
  },
  dropdownContent: {
    minWidth: "100px",
    display: "block",
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.grey}`,
  },
});

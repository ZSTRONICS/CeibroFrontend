import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import colors from "../../../../../assets/colors";
import assets from "../../../../../assets/assets";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

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
    e?.preventDefault?.();
    e?.stopPropagation?.();
    confirm({
      title: "Please confirm",
      description: `Are you confirm want to delete ${props.name} role?`,
    }).then(() => {
      props.onDelete();
    });
  };

  return (
    <div className="dropdown">
      <IconButton onClick={handleToggle}>
        <img src={assets.moreIcon} className={classes.moreIcon} />
      </IconButton>
      {show && (
        <OutsideClickHandler onOutsideClick={handleToggle}>
          <div className={`dropdown-content ${classes.dropdownContent}`}>
            <div>
               <Button
                variant="outlined"
                onClick={handleEdit}
                startIcon={<EditIcon />}
                // disabled={props.permissoin}
              >
                Edit Role
              </Button>
            </div>
            <hr className={classes.break} />
            <div>
              <Button
              //  disabled={props.permissoin}
                variant="outlined"
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
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
    minWidth: 157,
    display: "block",
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.grey}`,
  },
});

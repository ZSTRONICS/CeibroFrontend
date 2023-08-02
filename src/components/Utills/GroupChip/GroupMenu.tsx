import { IconButton, makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";
import { CButton } from "components/Button";
import { ConfirmDescriptionTag } from "components/CustomTags";
import { CustomStack } from "components/TaskComponent/Tabs/TaskCard";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "react-redux";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import { RootState } from "../../../redux/reducers/appReducer";

interface GroupMenueInt {
  onEdit: () => void;
  onDelete: () => void;
  groupId: string;
  name: string;
}

const GroupMenu: React.FC<GroupMenueInt> = (props) => {
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
      title: (
        <CustomStack gap={1}>
          <assets.ErrorOutlineOutlinedIcon /> Confirmation
        </CustomStack>
      ),
      description: (
        <ConfirmDescriptionTag sx={{ pt: 2 }}>
          Are you confirm want to delete this group?
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
          sx={{
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
            <div
              onClick={handleEdit}
              className={`${classes.menuWrapper} dropdown-menu pointer`}
            >
              {/* <img src={assets.blackPencil} className="width-16" alt=""/> */}
              <Typography className={`${classes.menuText} align-center`}>
                Edit
              </Typography>
            </div>

            {/*<hr className={classes.break} />
             <div className={`${classes.menuWrapper} dropdown-menu pointer`}>
             <img src={assets.addUser} className="width-16" alt=""/> 
              <Typography className={`${classes.menuText} align-center`}>
                Add member
              </Typography>
            </div>*/}
            <hr className={classes.break} />
            <div
              onClick={handleDelete}
              className={`${classes.menuWrapper} dropdown-menu pointer`}
            >
              {/* <img src={assets.DeleteIcon} className="width-16" alt=""/> */}
              <Typography
                sx={{ color: "#FA0808" }}
                className={`${classes.menuText} align-center`}
              >
                Delete
              </Typography>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default GroupMenu;

const useStyles = makeStyles({
  moreIcon: {
    cursor: "pointer",
  },
  dropdownContent: {
    "&.dropdown-content .dropdown-menu:hover": {
      backgroundColor: "unset",
    },
    minWidth: 80,
    display: "block",
  },
  menuWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    fontSize: 14,
  },
  star: {
    color: colors.darkYellow,
    fontSize: 20,
  },
  starText: {
    marginLeft: "4px !important",
  },
  starMenu: {
    display: "flex",
    alignItems: "",
  },
  menuText: {
    '&.MuiTypography-root':{
      fontWeight: '500 !important',
    fontSize: 15,

    },
    fontSize: 15,
    fontWeight: 500 ,
    marginLeft: 10,
   
    color: colors.textPrimary,
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.grey}`,
  },
  deleteConversation: {
    color: colors.btnRed,
  },
  deleteText: {
    color: colors.btnRed,
    
  },
});

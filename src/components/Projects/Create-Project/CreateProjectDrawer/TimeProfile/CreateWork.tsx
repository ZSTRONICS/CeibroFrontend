import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListIcon from "@material-ui/icons/List";
import { Grid, ListItemIcon, makeStyles, Typography } from "@material-ui/core";
import InputText from "../../../../Utills/Inputs/InputText";
import SelectDropdown from "../../../../Utills/Inputs/SelectDropdown";
import { Close } from "@material-ui/icons";
import colors from "../../../../../assets/colors";
import InputSwitch from "../../../../Utills/Inputs/InputSwitch";
import InputCheckbox from "components/Utills/Inputs/InputCheckbox";

const CreateWork = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isDiabled = !loading ? false : true;

  const [data, setData] = useState({
    time: true,
    timeRequired: false,
    quantity: true,
    quantityRequired: false,
    comment: true,
    commentRequired: false,
    photo: false,
    photoRequired: false
  })
  const handleChange = (name: string, value: boolean) => {
    setData({
      ...data,
      [name]: value
    })
  }


  const classes = useStyle();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    handleClose();
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.btn}
        onClick={handleClickOpen}
      >
        Add new work
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="customized-dialog-title" className="customized-title">
          <Typography className={classes.headerTitle}>Add work</Typography>
          <div className={classes.headerAction} onClick={handleClose}>
            <Close />
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container className={classes.body}>
            <Grid item xs={12}>
              <InputText placeholder="Select/Add work" />
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <SelectDropdown title="Role" />
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <InputSwitch
                value={data.time}
                onChange={(e: any) => handleChange("time", e.target?.checked)}
                label="Add time"
              />
              {data.time && (
                <div>
                  <InputCheckbox
                    label={"Obligatory field"}
                    checked={data.timeRequired}
                    onChange={(checked: boolean) =>
                      handleChange("timeRequired", checked)
                    }
                  />
                </div>
              )}
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <InputSwitch
                value={data.quantity}
                onChange={(e: any) =>
                  handleChange("quantity", e.target?.checked)
                }
                label="Quantity"
              />

              {data.quantity && (
                <div>
                  <InputCheckbox
                    label={"Obligatory field"}
                    checked={data.quantityRequired}
                    onChange={(checked: boolean) =>
                      handleChange("quantityRequired", checked)
                    }
                  />
                </div>
              )}
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <InputSwitch
                value={data.comment}
                onChange={(e: any) =>
                  handleChange("comment", e.target?.checked)
                }
                label="Comment"
              />

              {data.comment && (
                <div>
                  <InputCheckbox
                    label={"Obligatory field"}
                    checked={data.commentRequired}
                    onChange={(checked: boolean) =>
                      handleChange("commentRequired", checked)
                    }
                  />
                </div>
              )}
            </Grid>

            <Grid item xs={12} className={classes.rolesWrapper}>
              <InputSwitch
                value={data.photo}
                onChange={(e: any) => handleChange("photo", e.target?.checked)}
                label="Photo"
              />
              {data.photo && (
                <div>
                  <InputCheckbox
                    label={"Obligatory field"}
                    checked={data.photoRequired}
                    onChange={(checked: boolean) =>
                      handleChange("photoRequired", checked)
                    }
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateWork;

const useStyle = makeStyles({
  btn: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  body: {
    maxWidth: 300
  },
  meta: {
    marginTop: 10,
  },
  titleWrapper: {},
  headerTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  headerAction: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontWeight: 500,
    color: colors.primary,
  },
  actionButton: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  rolesWrapper: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

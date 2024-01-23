import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  Box,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import assets from "assets/assets";
import { CButton } from "components/Button";
import { AddStatusTag, CustomStack } from "components/CustomTags";
import InputHOC from "components/Utills/Inputs/InputHOC";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "redux/action/project.action";
import { RootState } from "redux/reducers/appReducer";
import PopoverMenu from "./PopoverMenu";
import StatusModal from "./StatusModal";

function CreateProjectStatus() {
  const dispatch = useDispatch();

  const [openCloseStatusModal, setOpenCloseStatusModal] = useState(false);
  const [openStatusMenu, setOpenStatusMenu] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [openPopupMenu, setOpenPopupMenu] = React.useState(false);
  const [anchorElemStatus, setAnchorElemStatus] =
    React.useState<null | HTMLElement>(null);
  const [editStatusValue, setEditStatusValue] = useState(" ");
  const projectOverview = useSelector(
    (state: RootState) => state.project.projectOverview
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const updateRights = projectOverview.owner.some(
    (item: any) => String(item._id) === String(user._id)
  );

  const options = projectOverview.extraStatus;
  let index = projectOverview.extraStatus.findIndex(
    (item: any) => item === projectOverview.publishStatus
  );
  const [selectedIndex, setSelectedIndex] = React.useState<any>(index);
  useEffect(() => {
    if (options.length > 0) {
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          publishStatus: options[selectedIndex],
        })
      );
    } else {
      if (projectOverview.publishStatus !== "") {
        dispatch(
          projectActions.setProjectOverview({
            ...projectOverview,
            extraStatus: [projectOverview.publishStatus],
          })
        );
      }
    }
  }, [selectedIndex]);

  const handleOpenCloseStatusModal = () => {
    setOpenCloseStatusModal((prev: boolean) => !prev);
  };

  const handleToggle = () => {
    if (updateRights === true) {
      setOpenStatusMenu((prevOpen) => !prevOpen);
    }
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpenStatusMenu(false);
    setOpenPopupMenu(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenStatusMenu(false);
    } else if (event.key === "Escape") {
      setOpenStatusMenu(false);
    }
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.stopPropagation();
    setSelectedIndex(index);
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        publishStatus: projectOverview.extraStatus[selectedIndex],
      })
    );
    handleClose(event);
  };

  // const options: string[] = [...projectOverview.extraStatus].filter((item: string) => item !== "" && item !== undefined);

  const openPopup = (e: any, statusValue: string) => {
    e.stopPropagation();
    setAnchorElemStatus(e.currentTarget);
    setOpenPopupMenu(true);
    setEditStatusValue(statusValue);
  };

  const closePopup = () => {
    // e.stopPropagation();
    setOpenPopupMenu(false);
    setAnchorElemStatus(null);
  };

  return (
    <>
      <div
        onClick={handleToggle}
        style={{ maxWidth: "280px", width: "100%", cursor: "pointer" }}
      >
        <InputHOC title="Status">
          <Box
            ref={anchorRef}
            // onClick={handleToggle}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              padding: "10px 10px",
            }}
          >
            {projectOverview.publishStatus ? (
              projectOverview.publishStatus
            ) : projectOverview.extraStatus.length > 0 &&
              selectedIndex !== null ? (
              options[selectedIndex]
            ) : (
              <AddStatusTag>Select a status</AddStatusTag>
            )}
          </Box>
        </InputHOC>
        <Popper
          open={openStatusMenu}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          transition
          disablePortal
          onResize={undefined}
          onResizeCapture={undefined}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper
                sx={{
                  maxWidth: "300px",
                  width: "100%",
                  maxHeight: "250px",
                  height: "100%",
                  overflow: "auto",
                  marginTop: "8px",
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    sx={{
                      "& .MuiButtonBase-root-MuiMenuItem-root:hover": {
                        backgroundColor: "#0076c81f",
                      },
                      "& .MuiButtonBase-root-MuiButton-root:hover": {
                        backgroundColor: "#0076c81f",
                      },
                    }}
                    subheader={
                      <MenuItem
                        disableTouchRipple
                        disableRipple
                        onClick={handleOpenCloseStatusModal}
                        sx={{
                          // border:"2px solid",
                          background: "#0076c81f",
                          "& .MuiButtonBase-root-MuiMenuItem-root:hover": {
                            backgroundColor: "#0076c81f !important",
                          },
                        }}
                      >
                        <CButton
                          sx={{
                            "& .MuiButtonBase-root-MuiButton-root:hover": {
                              background: "#0076c81f",
                            },
                          }}
                          label="Add new status"
                          startIcon={<AddOutlinedIcon />}
                        />
                      </MenuItem>
                    }
                    autoFocusItem={openStatusMenu}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {options.map((item: any, index: any) => {
                      return (
                        <CustomStack justifyContent="space-between">
                          <MenuItem
                            disableRipple
                            disableTouchRipple
                            onClick={(e: any) => handleMenuItemClick(e, index)}
                          >
                            {item}
                          </MenuItem>
                          <Box>
                            <IconButton
                              aria-controls="simple-menu"
                              aria-haspopup="true"
                              // aria-describedby={id}
                              disableRipple={true}
                              onClick={(e: any) => openPopup(e, item)}
                            >
                              <assets.MoreVertOutlinedIcon color="primary" />
                            </IconButton>
                          </Box>
                        </CustomStack>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      {openCloseStatusModal === true && (
        <StatusModal
          btnLabel="Add"
          title="Add Status"
          openCloseStatusModal={openCloseStatusModal}
          handleOpenCloseStatusModal={handleOpenCloseStatusModal}
        />
      )}
      {openPopupMenu === true && (
        <PopoverMenu
          openStatusPopup={openPopupMenu}
          anchorElemStatus={anchorElemStatus}
          closePopup={closePopup}
          editStatusValue={editStatusValue}
        />
      )}
    </>
  );
}

export default CreateProjectStatus;
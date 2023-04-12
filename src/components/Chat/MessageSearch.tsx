
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import * as React from "react";
import colors from "../../assets/colors";
// @ts-ignore
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { getRoomMessages } from "../../redux/action/chat.action";
import { SET_PAGINATION_BLOCK } from "../../config/chat.config";
import assets from "assets/assets";
import RollOver from "components/RollOver/RollOver";
import Input from "components/Utills/Inputs/Input";
import DatePicker from "components/Utills/Inputs/DatePicker";

interface IAppProps {}

const MessageSearch: React.FC<IAppProps> = (props) => {
  const classes = useStyles();
  const { selectedChatId } = useSelector((state: RootState) => state.chat);
  const [search, setSearch] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);
  const dispatch = useDispatch();

  const handleSearchChange = _.debounce((e: any) => {
    const value = e?.target?.value;
    setSearch(value);
    dispatch({
      type: SET_PAGINATION_BLOCK,
      payload: true,
    });
    dispatch(
      getRoomMessages({
        other: {
          roomId: selectedChatId,
          search: value,
        },
        success: () => {
          setTimeout(() => {
            dispatch({
              type: SET_PAGINATION_BLOCK,
              payload: false,
            });
          }, 1000);
        },
      })
    );
  }, 300);

  const showHandleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const showHandler = () => {
    setShow((prev) => !prev);
  };
  const handleCancel = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.searchIconContainer} onClick={showHandler}>
        <assets.SearchOutlinedIcon className={classes.searchIcon} />
      </div>
      {show && (
        <>
          <div className={classes.iconWrapper}></div>
          <div className={classes.inputWrapper}>
            <input
              type="text"
              className={`emptyBorder ${classes.input}`}
              placeholder="Enter Chat search"
              onChange={handleSearchChange}
            />
          </div>
          <Grid container className={classes.btnWrapper}>
            <Grid item className={classes.filterWrapper}>
              <img
                  src={assets.filterIcon}
                className={classes.filterIco}
                onClick={showHandleFilter}
              />
              <>
                {showFilter && (
                  <RollOver
                    handleToggle={showHandleFilter}
                    customStyle={"Custompopover"}
                  >
                    <Grid  container className={classes.filters}>
                      <Grid item className={classes.filtersItems}>
                        <div>
                          <Input
                            placeholder="Enter @username"
                            title="Username"
                          />
                        </div>
                        <div className={classes.inputs}>
                          <Input placeholder="Enter company" title="Company" />
                        </div>
                        <div className={classes.inputs}>
                          <Input placeholder="Enter group" title="Group" />
                        </div>
                        <div
                          className={`${classes.inputs} ${classes.datePicker}`}
                        >
                          <DatePicker Datetitle="By date" />
                          <DatePicker Datetitle="To" />
                        </div>
                        <div className={`${classes.inputs} ${classes.btns}`}>
                          <Button
                            color="primary"
                            variant="contained"
                            // onClick={toggle}
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            className={classes.searchBtn}
                          >
                            Search
                          </Button>
                          <Button
                            variant="contained"
                            className={classes.clearBtn}
                          >
                            Clear all
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </RollOver>
                )}
              </>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default MessageSearch;
const useStyles = makeStyles({
  btns: {
    display: "flex",
    justifyContent: "flex-end",
  },
  searchBtn: {
    marginRight: "20px",
  },
  clearBtn: {},
  datePicker: {
    display: "flex",
  },
  inputs: {
    marginTop: "15px",
  },
  filtersItems: {
    width: "100%",
  },
  filters: {
    width: "800px",
    maxWidth: "700px",
  },
  filterIco: {
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },

  searchIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    fontSize: "30px !important",
    color: colors.textPrimary,
    "&:hover": {
      cursor: "pointer",
    },
  },
  wrapper: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    background: colors.white,
  },
  iconWrapper: {
    // flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingRight: 7,
    marginRight: 10,
    borderRight: "1px solid #ecf0f1",
  },
  horizontalBreak: {
    color: colors.mediumGrey,
  },
  inputWrapper: {
    flex: 4,
    borderRight: "none",
    borderLeft: "none",
    paddingRight: 5,
  },
  input: {
    height: 35,
    flex: 1,
    width: "100%",
  },
  btnWrapper: {
    flex: 1,
    alignItems: "center",
    borderLeft: "1px solid #ecf0f1",
    padding: "2px 2px",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  filterWrapper: {
    padding: "0 10px",
    display: "flex",
    width: "42px",
  },
  btn: {
    flex: 1,
    background: colors.primary,
    color: colors.white,
    borderColor: colors.primary,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    cursor: "pointer",
  },
  btnText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

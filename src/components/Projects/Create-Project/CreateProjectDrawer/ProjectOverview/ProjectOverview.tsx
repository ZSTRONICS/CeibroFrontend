import { CircularProgress, makeStyles } from "@material-ui/core";
import { Checkbox, Grid } from "@mui/material";
import { borderRadius } from "@material-ui/system";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CDatePicker from "components/DatePicker/CDatePicker";
import { getStatusDropdown } from "config/project.config";
import { UserInfo } from "constants/interfaces/subtask.interface";
import moment from "moment-timezone";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "redux/action/project.action";
import { getAvailableUsers } from "redux/action/user.action";
import { RootState } from "redux/reducers";
import colors from "../../../../../assets/colors";
import ImagePicker from "../../../../Utills/Inputs/ImagePicker";
import { dataInterface } from "../../../../Utills/Inputs/SelectDropdown";
import HorizontalBreak from "../../../../Utills/Others/HorizontalBreak";
import CreateProjectStatus from "./CreateProjectStatus";
import ProjectOverViewForm from "./ProjectOverViewForm";
import InputHOC from "components/Utills/Inputs/InputHOC";
import { ProjectOwners } from "constants/interfaces/project.interface";
import { getUniqueObjectsFromArr } from "components/Utills/Globals/Common";

const ProjectOverview = () => {
  const classes = useStyles();
  const isRenderEffect = useRef<any>(false);
  const projectOverview = useSelector(
    (state: RootState) => state.project.projectOverview
  );
  // const selectedProject = useSelector(
  //   (state: RootState) => state.project.selectedProject
  // );
  const { user } = useSelector((state: RootState) => state.auth);

  // const [selectedOwners, setSelectedOwners] = useState<dataInterface[]>([]);

  const [showDate, setShowDate] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [doOnce, setDoOnce] = useState(true);
  const MemoizedAutocomplete = memo(Autocomplete);
  const dispatch = useDispatch();

  // let fixuser = [
  //   {
  //     _id: user._id,
  //     firstName: user.firstName,
  //     surName: user.surName,
  //   },
  // ];

  if (doOnce) {
    const localized = moment(projectOverview.dueDate, "DD-MM-YYYY").format(
      "ddd MM DD YYYY"
    );
    setShowDate(localized);
    // fixuser &&
    //   dispatch(
    //     projectActions.setProjectOverview({
    //       ...projectOverview,
    //       owner: fixuser,
    //     })
    //   );
    setDoOnce(false);
  }

  let ownersTemp = useMemo(
    () =>
      projectOverview.owner.map((owner: ProjectOwners) => ({
        label: `${owner.firstName} ${owner.surName}`,
        value: owner._id,
      })),
    [projectOverview.owner]
  );

  let fixedOwner = [
    {
      label: user.firstName + " " + user.surName,
      value: user._id,
    },
  ];

  if (projectOverview?.creator?._id) {
    const { _id, firstName, surName } = projectOverview?.creator;
    fixedOwner[0].value = _id;
    fixedOwner[0].label = `${firstName} ${surName}`;
  }
  if (projectOverview.owner.length === 0) {
    ownersTemp = fixedOwner;

    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        owner: ownersTemp.map((item: any) => {
          return {
            _id: item.value,
            firstName: item.label.split(" ")[0],
            surName: item.label.split(" ")[1],
          };
        }),
      })
    );
  }

  const [ownersList, setOwnersList] = useState<any>([...ownersTemp]);
  const [data, setData] = useState<dataInterface[]>([]);

  const handleOwnerChange = (users: dataInterface[]) => {
    setOwnersList(users);

    const newOwners: ProjectOwners[] = users.reduce(
      (acc: ProjectOwners[], user: dataInterface) => {
        const ownerIndex = projectOverview.owner.findIndex(
          (owner: ProjectOwners) => owner._id === user.value
        );
        if (ownerIndex !== -1) {
          acc.push(projectOverview.owner[ownerIndex]);
        } else {
          acc.push({
            _id: user.value,
            firstName: user.label.split(" ")[0],
            surName: user.label.split(" ")[1],
          });
        }
        return acc;
      },
      []
    );
    if (newOwners.length > 0) {
      dispatch(
        projectActions.setProjectOverview({
          ...projectOverview,
          owner: newOwners,
        })
      );
    }
  };

  useEffect(() => {
    if (isRenderEffect.current === false) {
      const payload = {
        success: (res: any) => {
          //get the difference of two arrays
          const uniqueMembers = res.data.filter(
            (x: any) => !ownersList.some((y: any) => y.value === x.value)
          );
          setData([...uniqueMembers]);
        },
      };
      dispatch(getAvailableUsers(payload));
    }
    return () => {
      isRenderEffect.current = true;
    };
  }, []);

  useEffect(() => {
    dispatch(
      projectActions.setProjectOverview({
        ...projectOverview,
        dueDate: showDate === null ? "" : moment(showDate).format("DD-MM-YYYY"),
      })
    );
  }, [showDate]);

  useEffect(() => {
    if (projectOverview._id === "") {
      return;
    }

    const selectedOwnersList = projectOverview.owner.map(
      (member: ProjectOwners) => {
        return {
          label: `${member.firstName} ${member.surName}`,
          value: member._id,
        };
      }
    );
    handleOwnerChange(selectedOwnersList);
  }, [projectOverview._id]);

  return (
    <div style={{ width: "100%" }}>
      <Grid container gap={2.5}>
        {loading && <CircularProgress size={20} className={classes.progress} />}

        <Grid
          className={classes.firstForm}
          item
          sx={{
            maxWidth: "280px",
            width: "100%",
          }}
          // xs={12}
          // sm={2}
          // md={2}
          // lg={2.4}
        >
          <CDatePicker
            showLabel={true}
            required
            value={showDate}
            id="date1"
            name="dueDate"
            onChange={(e: any) => {
              setShowDate(e);
              // projectOverview.dueDate = moment(e).format("DD-MM-YYYY");
            }}
          />
        </Grid>

        <Grid
          item
          sx={{
            width: "100%",
            height: "40px",
            maxWidth: "460px",
          }}
          className={classes.datePickerWrapper}
        >
          <InputHOC title="Owners">
            <MemoizedAutocomplete
              sx={{
                backgroundColor: "white",
                maxWidth: "100%",
                width: "100%",
              }}
              multiple
              // disableClearable
              id="project_owners1"
              disablePortal
              filterSelectedOptions={true}
              disableCloseOnSelect
              limitTags={1}
              value={ownersList}
              options={data}
              size="small"
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option: any, index: any) => {
                  return (
                    <Chip
                      sx={{
                        height: "25px",
                        backgroundColor: "#F1B740",
                        color: colors.black,
                        borderRadius: "4px",
                      }}
                      label={option?.label}
                      {...getTagProps({ index })}
                      disabled={
                        String(fixedOwner[0].value) === String(option.value)
                      }
                    />
                  );
                })
              }
              onChange={(event, value: any) => {
                let newValue: any = [
                  ...fixedOwner,
                  ...value.filter(
                    (option: any) => fixedOwner[0].value !== option.value
                  ),
                ];
                handleOwnerChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      padding: "0px",
                    },
                    // border: "1px solid #DBDBE5",
                    // borderRadius: "4px",
                  }}
                  {...params}
                  name="owners"
                  // label="Owners"
                  // placeholder="Select owner(s)"
                />
              )}
            />
          </InputHOC>
        </Grid>

        <Grid
          item
          // xs={12}
          // sm={7}
          // md={3}
          sx={{
            width: "100%",
            maxWidth: "280px",
          }}
          className={classes.datePickerWrapper}
        >
          {/* <SelectDropdown
            handleChange={handleStatusChange}
            data={statusData}
            value={statusValue}
            title="Status"
          /> */}
          <CreateProjectStatus />
        </Grid>

        <Grid item xs={12} md={12} style={{ padding: "0px 20px 0px" }}>
          <HorizontalBreak color={colors.grey} />
        </Grid>
      </Grid>

      <Grid container className={classes.secondForm}>
        <Grid
          item
          // xs={2}
          // sm={3}
          // md={2.5}
          // xs={12}
          // md={2}
          className={classes.imagePicker}
        >
          <ImagePicker />
        </Grid>

        <Grid
          item
          // sm={10} md={8}
        >
          <ProjectOverViewForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectOverview;

const useStyles = makeStyles({
  firstForm: {
    height: "40px",
    "@media (max-width:520px)": {
      width: "100%",
      maxWidth: "100%",
    },
  },
  datePickerWrapper: {
    // paddingLeft: "25px",

    "@media (max-width:900px)": {
      paddingLeft: 0,
      // paddingTop: 20,
    },
    // "@media (max-width:600px)": {
    //   paddingLeft: 0,
    //   paddingTop: 10,
    // },
  },
  secondForm: {
    paddingTop: 0,
    display: "flex",
    "@media (max-width:1183px)": {
      paddingLeft: 0,
    },
  },
  imagePicker: {
    width: "275px",
    padding: "0",
    "@media (max-width:1183px)": {
      paddingBottom: "10px",
    },
    "@media (max-width:900px)": {
      paddingBottom: 10,
    },
    "@media (max-width:600px)": {
      paddingBottom: 10,
    },
  },

  progress: {
    color: colors.primary,
    position: "absolute",
    zIndex: 1,
    margin: "auto",
    marginTop: "300px",
    left: 0,
    right: 0,
    top: 10,
    textAlign: "center",
  },
});

import { useState } from 'react';

// material
import { makeStyles } from "@material-ui/core";
import {
    Button,
    Grid, Typography
} from "@mui/material";

import { Cancel } from "@material-ui/icons";


// redux
import { useDispatch, useSelector } from "react-redux";
import {
    getAllProjectMembers
} from "../../redux/action/project.action";
import { RootState } from "../../redux/reducers";

// components
import TextField from "components/Utills/Inputs/TextField";
import colors from "../../assets/colors";
import CustomCheckbox from "../Utills/Inputs/Checkbox";
import SelectDropdown from "../Utills/Inputs/SelectDropdown";
import Loading from "../Utills/Loader/Loading";
import NameAvatar from "../Utills/Others/NameAvatar";

export default function CreateGroup() {
    const { allProjects, projectMembers } = useSelector((store: RootState) => store.project);
    const classes = useStyles();
    const dispatch = useDispatch();

    const [project, setProject] = useState<any>();
    const [user, setUser] = useState<any>();
    const [users, setUsers] = useState<any>([]);
    const [name, setName] = useState("");

    const createChatLoading = useSelector((state: RootState) => state.chat.createChatLoading);

    const handleProjectChange = (e: any) => {
        setProject(e);
        setUsers([]);
        dispatch(
            getAllProjectMembers({
                other: {
                    projectId: e.value,
                },
            })
        );
    };

    const handleUserChange = (e: any) => {
        if (!users?.includes?.(e?.target?.value)) {

            setUsers([...users, e.target.value]);
        } else {
            removeSelectedUser(e?.target?.value);
        }
    };

    const removeSelectedUser = (userId: any) => {
        setUsers(users?.filter?.((user: any) => String(user) !== String(userId)));
    };


    return (
        <div>
            <div
                className={`dropdown-content ${classes.outerMenu}`}
                id="dropdownContent"
            >
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                            className={`${classes.searchInput} emptyBorder`}
                            placeholder="Enter chat name"
                        />
                    </Grid>

                    <Grid item xs={12} style={{ zIndex: 3, paddingTop: 10 }}>
                        <SelectDropdown
                            title="Project"
                            placeholder="Please select a project"
                            data={allProjects}
                            value={project}
                            handleChange={handleProjectChange}
                        />
                    </Grid>
                    {projectMembers?.length > 0 && (
                        <Grid
                            item
                            xs={12}
                            style={{ paddingTop: 10 }}
                            className={classes.suggestUser}
                        >
                            <Grid container>
                                {projectMembers?.map((member: any) => {
                                    if (!users?.includes?.(String(member?.user?._id)))
                                        return null;

                                    return (
                                        <Grid
                                            item
                                            xs={4}
                                            md={2}
                                            className={classes.selectedUser}
                                        >
                                            <NameAvatar
                                                firstname={member?.user?.firstName}
                                                surname={member?.user?.surName}
                                                url={member?.user?.profilePic}
                                            />
                                            <Cancel
                                                onClick={() => removeSelectedUser(member._id)}
                                                className={classes.cancelIcon}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>

                            <Typography className={classes.suggestedUsersTitle}>
                                Suggested users/groups
                            </Typography>

                            <Grid container>
                                {projectMembers?.map((member: any, index: number) => {
                                    return (
                                        <Grid container className={classes.wrapper}>
                                            <Grid item xs={2}>
                                                <NameAvatar
                                                    firstname={member?.user?.firstName}
                                                    surname={member?.user?.surName}
                                                    url={member?.user?.profilePic}
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <div>
                                                    <Typography className={classes.titleText}>
                                                        {member?.user?.firstName}{" "}
                                                        {member?.user?.surName}
                                                    </Typography>
                                                    <Typography className={classes.subTitleText}>
                                                        {member?.role?.name} . {member?.group?.name}
                                                    </Typography>
                                                </div>
                                            </Grid>

                                            <Grid item xs={2}>
                                                <CustomCheckbox
                                                    onClick={handleUserChange}
                                                    value={member?.user?._id}
                                                    name={"s"}
                                                    checked={users?.includes?.(member?.user?._id)}
                                                />
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    )}

                    <Grid item xs={12} style={{ paddingTop: 20 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            // onClick={handleSubmit}
                            disabled={!project || user?.length < 1}
                        >
                            {createChatLoading ? (
                                <Loading type="spin" color="white" height={24} width={24} />
                            ) : (
                                "Message"
                            )}
                        </Button>
                        <Button>Cancel</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme: any) => ({
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    outerMenu: {
        left: 300,
        width: '100%',
        maxWidth: 370,
    },
    searchInput: {
        width: 340,
        height: 30,
        border: `1px solid ${colors.borderGrey}`,
    },
    smallRadioButton: {
        fontSize: "14px !important",
        "& svg": {
            width: "0.8em",
            height: "0.8em",
        },
        "&$checked": {
            color: "green",
        },
    },
    suggestedUsersTitle: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey,
        marginBottom: 10,
    },
    wrapper: {
        // borderBottom: `1px solid ${colors.grey}`,
        marginBottom: 5,
    },
    titleText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    subTitleText: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey,
    },
    actionWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        gap: 25,
        paddingTop: 10,
        paddingBottom: 15,
    },
    actionBtn: {
        fontSize: 12,
        fontWeight: "bold",
    },
    time: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.textGrey,
    },
    suggestUser: {
        maxHeight: 300,
        overflow: "auto",
    },
    selectedUser: {
        height: 50,
        width: 50,
        position: "relative",
    },
    cancelIcon: {
        fontSize: 14,
        position: "absolute",
        color: colors.textGrey,
        top: -5,
        right: 5,
    },
}));
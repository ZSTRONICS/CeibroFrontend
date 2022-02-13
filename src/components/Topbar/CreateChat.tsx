import { Avatar, Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../assets/colors";
import { removeCurrentUser } from "../../helpers/chat.helpers";
import { createChatRoom } from "../../redux/action/auth.action";
import { getAllChats } from "../../redux/action/chat.action";
import { RootState } from "../../redux/reducers";
import SelectDropdown from "../Utills/Inputs/SelectDropdown";
export let dbUsers = [
  {
    label: "Test 1",
    value: "61ec20bb778f854909aec4d2",
    color: "green",
  },
  {
    label: "Test 2",
    value: "61ec2121778f854909aec4d7",
    color: "green",
  },
  {
    label: "Test 3",
    value: "61ec2139778f854909aec4dc",
    color: "green",
  },
  {
    label: "Test 4",
    value: "61ec220d778f854909aec4fa",
    color: "green",
  },
];
const CreateChat = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<any>([]);
  const [project, setProject] = useState<any>();
  const [user, setUser] = useState<any>();
  const [users, setUsers] = useState<any>();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth?.user);
  const values = removeCurrentUser(dbUsers, userInfo?.id);

  const toggle = () => {
    setOpen(!open);
  };

  const handleOutsideClick = () => {
    setOpen(false);
  };

  const handleProjectChange = (e: any) => {
    setProject(e);
  };

  const handleUserChange = (e: any) => {
    setUser(e);
  };

  useEffect(() => {
    setProjects([
      {
        label: "First project",
        value: "61ec230ab738171d327c1316",
      },
    ]);
    setUsers(values);
  }, []);

  const handleSubmit = () => {
    const userIds = user.map((x: any) => x.value);
    const payload = {
      body: {
        name,
        members: userIds,
        projectId: project.value,
      },
      success: () => {
        setName("");
        setProject(null);
        setUser(null);
        handleOutsideClick();
        dispatch(getAllChats());
      },
    };
    dispatch(createChatRoom(payload));
  };

  return (
    <div className="dropdown">
      <Button
        color="primary"
        variant="contained"
        onClick={toggle}
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        New chat
      </Button>
      {open && (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <div
            className={`dropdown-content ${classes.outerMenu}`}
            id="dropdownContent"
          >
            <Grid container>
              <Grid item xs={12}>
                <input
                  type="text"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  className={classes.searchInput}
                  placeholder="Enter chat name"
                />
              </Grid>

              <Grid item xs={12} style={{ zIndex: 3, paddingTop: 10 }}>
                <SelectDropdown
                  title="Project"
                  placeholder="Please select a project"
                  data={projects}
                  value={project}
                  handleChange={handleProjectChange}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: 10 }}>
                <SelectDropdown
                  title="Chat"
                  placeholder="Type the name of a person or a group"
                  data={users}
                  value={user}
                  handleChange={handleUserChange}
                  isMulti={true}
                />
              </Grid>

              <Grid item xs={12} style={{ paddingTop: 20 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!project || user?.length < 1}
                >
                  Start conversation
                </Button>
                <Button onClick={handleOutsideClick}>cancel</Button>
              </Grid>
            </Grid>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default CreateChat;

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  outerMenu: {
    width: 350,
    left: 0,
  },
  searchInput: {
    width: 340,
    height: 30,
  },
}));

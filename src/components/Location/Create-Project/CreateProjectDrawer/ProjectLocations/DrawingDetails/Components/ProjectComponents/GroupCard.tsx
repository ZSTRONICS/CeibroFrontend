import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { Box } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { GenericMenu } from "components/GenericComponents";
import { FavIcon, UnFavIcon } from "components/material-ui/icons";
import { PROJECT_CONFIG } from "config";
import { Drawing } from "constants/interfaces";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { PROJECT_APIS } from "redux/action";

interface Props {
  groups: Group[];
}

interface RouteParams {
  projectId: string;
  groupId: string;
}

function GroupCard({ groups }: Props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId, groupId } = useParams<RouteParams>();
  const handleSetDrawingFiles = (drawings: Drawing[], group: Group) => {
    dispatch({
      type: PROJECT_CONFIG.SET_SELECTED_DRAWING_FILES,
      payload: drawings,
    });
    const path = `/location/${projectId}/${group._id}`;
    history.push(path);
  };
  const handleGroupUpdated = (groupId: string, ispublicGroup: boolean) => {
    dispatch(
      PROJECT_APIS.markGroupPrivateOrPublic({
        other: {
          groupId: groupId,
          ispublicGroup: ispublicGroup,
        },
        success: (res: any) => {
          dispatch({
            type: PROJECT_CONFIG.PROJECT_GROUP_UPDATED,
            payload: res.data.group,
          });
        },
      })
    );
  };

  return (
    <>
      {groups.map((group: Group) => {
        const {
          _id,
          isFavoriteByMe,
          groupName,
          creator,
          drawings,
          publicGroup,
          isCreator,
        } = group;
        const isSelectedGroup = _id === groupId;
        return (
          <Box sx={{ padding: "8px 4px" }} key={_id}>
            <CustomStack
              onClick={() => handleSetDrawingFiles(drawings, group)}
              sx={{
                gap: 0.5,
                justifyContent: "space-between",
                alignItems: "center",
                WebkitBoxShadow: `${
                  isSelectedGroup
                    ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                    : "none"
                }`,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Box sx={{ width: "24px", pr: 1 }}>
                {isFavoriteByMe ? <FavIcon /> : <UnFavIcon />}
              </Box>
              <Box>
                <Box sx={{ display: "flex" }}>
                  <Heading2
                    sx={{
                      fontWeight: 600,
                      width: "120px",
                    }}
                    className="textOverflowRow"
                  >
                    {groupName}
                  </Heading2>
                  <LabelTag>{`(${drawings.length || 0})`}</LabelTag>
                </Box>

                <LabelTag className="textOverflowRow">
                  {`From: ${creator.firstName} ${creator.surName}`}
                </LabelTag>
              </Box>
              <CustomStack
                sx={{ gap: 0.5, borderLeft: "1px solid #818181", pl: 1.25 }}
              >
                <Box sx={{ width: "24px", pt: 0.4 }}>
                  {publicGroup ? (
                    <PublicOutlinedIcon sx={{ color: "#0076C8" }} />
                  ) : (
                    <LockOutlinedIcon sx={{ color: "#0076C8" }} />
                  )}
                </Box>
                <Box>
                  <GenericMenu
                    isTaskSelected={!isSelectedGroup}
                    isProjectGroup={true}
                    options={[
                      {
                        menuName: "Mark as private",
                        callBackHandler: () => {
                          handleGroupUpdated(_id, false);
                        },
                      },
                      {
                        menuName: "Mark as public",
                        callBackHandler: () => {
                          handleGroupUpdated(_id, true);
                        },
                      },
                    ].filter(
                      (menu) =>
                        menu.menuName !==
                        (!publicGroup ? "Mark as private" : "Mark as public")
                    )}
                    key={1}
                    disableMenu={!isCreator}
                    paddingTop={0}
                  />
                </Box>
              </CustomStack>
            </CustomStack>
          </Box>
        );
      })}
    </>
  );
}

export default GroupCard;

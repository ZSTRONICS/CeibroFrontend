import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { Box } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { GenericMenu } from "components/GenericComponents";
import { FavIcon, UnFavIcon } from "components/material-ui/icons";
import { PROJECT_CONFIG } from "config";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { PROJECT_APIS } from "redux/action";

interface Props {
  group: Group;
  projectName: String;
}

interface RouteParams {
  projectId: string;
  groupId: string;
}

function DrawingGroupCard({ group, projectName }: Props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId, groupId } = useParams<RouteParams>();

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

  const handleGroupFavUnFav = (group: Group) => {
    dispatch(
      PROJECT_APIS.groupFavUnFav({
        other: {
          groupId: group._id,
          isGroupFav: !group.isFavoriteByMe,
        },
        success: (res: any) => {
          // dispatch({
          //   type: PROJECT_CONFIG.PROJECT_GROUP_FAV_UNFAV,
          //   payload: res.data.group,
          // })
        },
      })
    );
  };

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
    <Box sx={{ py: 0.5 }} key={_id}>
      <Box style={{ width: "100%" }}>
        <CustomStack
          onClick={() => {}}
          sx={{
            gap: 0.5,
            justifyContent: "start",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {/* icon */}
          <Box sx={{ display: "flex", width: "80%" }}>
            <Box
              sx={{
                width: "17%",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleGroupFavUnFav(group);
              }}
            >
              {isFavoriteByMe ? <FavIcon /> : <UnFavIcon />}
            </Box>
            {/* /// */}
            <Box sx={{ width: "82%" }}>
              <Box sx={{ display: "flex" }}>
                <Heading2
                  sx={{
                    fontWeight: 600,
                    width: "max-width",
                    maxWidth: "150px",
                  }}
                  className="textOverflowRow"
                >
                  {groupName}
                </Heading2>
                {drawings.length > 0 ? (
                  <LabelTag sx={{ fontSize: "14px", marginLeft: "3px" }}>{`(${
                    drawings.length || 0
                  })`}</LabelTag>
                ) : (
                  <></>
                )}
              </Box>
              {/*  Add this when we will add recently-used and favourite
                    {isCreator === false ? <LabelTag className="textOverflowRow">
                      {`From: ${creator.firstName} ${creator.surName}`}
                    </LabelTag> : <></>} */}
            </Box>
            {/* //// */}
          </Box>
          <CustomStack
            sx={{
              width: "20%",
              gap: 0.5,
              borderLeft: "1px solid #818181",
              pl: 1.25,
              py: 0.4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justify: "content",
                cursor: "default",
              }}
            >
              {publicGroup ? (
                <PublicOutlinedIcon sx={{ p: 0.3, color: "#0076C8" }} />
              ) : (
                <LockOutlinedIcon sx={{ p: 0.3, color: "#0076C8" }} />
              )}
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GenericMenu
                isTaskSelected={!isSelectedGroup}
                isProjectGroup={true}
                options={[
                  {
                    menuName: "Mark as private",
                    callBackHandler: () => handleGroupUpdated(_id, false),
                  },
                  {
                    menuName: "Mark as public",
                    callBackHandler: () => handleGroupUpdated(_id, true),
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
    </Box>
  );
}

export default DrawingGroupCard;

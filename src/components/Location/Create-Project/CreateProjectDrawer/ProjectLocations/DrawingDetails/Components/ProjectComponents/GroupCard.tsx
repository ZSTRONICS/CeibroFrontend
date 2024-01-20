import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { Box } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { GenericMenu } from "components/GenericComponents";
import { FavIcon, UnFavIcon } from "components/material-ui/icons";
import { PROJECT_CONFIG } from "config";
import { Drawing } from "constants/interfaces";
import { useDispatch } from "react-redux";
import { PROJECT_APIS } from "redux/action";

interface Props {
  groups: Group[];
  projectName: String;
}
function GroupCard({ groups, projectName }: Props) {
  const dispatch = useDispatch();
  const handleSetDrawingFiles = (groupName: String, projectTitle: String, drawings: Drawing[]) => () => {
    console.log("projectTitle", projectTitle)
    dispatch({
      type: PROJECT_CONFIG.SET_SELECTED_DRAWING_FILES,
      payload: { drawings, groupName, projectTitle },
    });
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
          isCreator
        } = group;
        return (
          <Box sx={{ py: 0.5 }} key={_id}>
            <Box style={{ width: '100%' }} >
              <CustomStack
                onClick={handleSetDrawingFiles(groupName, projectName, drawings)}
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
                <Box sx={{ display: 'flex', width: '80%' }} >
                  <Box sx={{ width: "17%", alignItems: 'center', display: 'flex', justifyContent: 'center', }}  >
                    {isFavoriteByMe ? <FavIcon /> : <UnFavIcon />}
                  </Box>
                  {/* /// */}
                  <Box sx={{ width: '82%' }} >
                    <Box sx={{ display: "flex" }}>
                      <Heading2
                        sx={{
                          fontWeight: 600,
                          width: "max-width",
                          maxWidth: '150px',
                        }}
                        className="textOverflowRow"
                      >
                        {groupName}
                      </Heading2>
                      {drawings.length > 0 ? <LabelTag sx={{ fontSize: '14px', marginLeft: '3px' }} >{`(${drawings.length || 0})`}</LabelTag> : <></>}
                    </Box>
                    {/*  Add this when we will add recently-used and favourite
                    {isCreator === false ? <LabelTag className="textOverflowRow">
                      {`From: ${creator.firstName} ${creator.surName}`}
                    </LabelTag> : <></>} */}
                  </Box>
                  {/* //// */}
                </Box>
                {/* ?///// */}
                <CustomStack
                  sx={{
                    width: '20%', gap: 0.5, borderLeft: "1px solid #818181", pl: 1.25, py: 0.4, display: 'flex', justifyContent: 'center',
                  }}
                >
                  <Box sx={{ width: "50%", display: 'flex', justify: 'content', }}>
                    {publicGroup ? (
                      <PublicOutlinedIcon sx={{ p: 0.3, color: "#0076C8" }} />
                    ) : (
                      <LockOutlinedIcon sx={{ p: 0.3, color: "#0076C8" }} />
                    )}
                  </Box>
                  <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', }} >
                    <GenericMenu
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
            </Box >
          </Box >
        );
      })}
    </>
  );
}

export default GroupCard;

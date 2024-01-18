import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { Box } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import { GenericMenu } from "components/GenericComponents";
import { FavIcon, UnFavIcon } from "components/material-ui/icons";
import { PROJECT_CONFIG } from "config";
import { Drawing } from "constants/interfaces";
import { useDispatch } from "react-redux";

interface Props {
  groups: Group[];
  menuOption: MenuOption[];
}
function GroupCard({ groups, menuOption }: Props) {
  const dispatch = useDispatch();
  const handleSetDrawingFiles = (drawings: Drawing[]) => () => {
    dispatch({
      type: PROJECT_CONFIG.SET_SELECTED_DRAWING_FILES,
      payload: drawings,
    });
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
        } = group;
        return (
          <Box sx={{ padding: "8px 4px" }} key={_id}>
            <CustomStack
              onClick={handleSetDrawingFiles(drawings)}
              sx={{
                gap: 0.5,
                justifyContent: "space-between",
                alignItems: "center",
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
                    isProjectGroup={true}
                    options={menuOption}
                    key={1}
                    disableMenu={false}
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

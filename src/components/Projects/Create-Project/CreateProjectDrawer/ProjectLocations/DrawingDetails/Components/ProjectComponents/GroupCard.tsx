import { Box } from "@mui/material";
import { CustomStack, Heading2, LabelTag } from "components/CustomTags";
import GenericMenu from "components/GenericMenu/GenericMenu";
import { FavIcon, PublicIcon } from "components/material-ui/icons";
interface Props {
  groups: Group[] | any;
  menuOption: MenuOption[];
}
function GroupCard({ groups, menuOption }: Props) {
  // const { _id, isFavoriteByMe, groupName, creator } = group;

  return (
    <>
      {" "}
      {[1, 2].map((value) => {
        return (
          <Box sx={{ padding: "8px 4px" }}>
            <CustomStack
              sx={{
                gap: 0.5,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "24px", pr: 1 }}>
                <FavIcon />
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
                    Group Name Group Name
                  </Heading2>
                  <LabelTag>(110)</LabelTag>
                </Box>

                <LabelTag className="textOverflowRow">
                  From: Jaanus Kütson
                </LabelTag>
              </Box>
              <CustomStack
                sx={{ gap: 0.5, borderLeft: "1px solid #818181", pl: 1.25 }}
              >
                <Box sx={{ width: "24px" }}>
                  <PublicIcon />
                </Box>
                <Box>
                  <GenericMenu
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

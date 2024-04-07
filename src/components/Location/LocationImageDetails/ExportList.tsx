import { ArrowBackSharp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { PinImage } from "constants/interfaces";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import ExportedListDropdown from "./ExportedListDropdown";
interface IProps {
  handleClose: () => void;
}
const ExportList = (props: IProps) => {
  const exportList = useSelector(
    (store: RootState) => store.project.exportList
  );
  const { handleClose } = props;
  const [selectedListItem, setSelectedListItem] = useState<PinImage[]>([]);

  const handleSelectChange = (item: PinImage, checked: boolean) => {
    if (checked) {
      let tempList = [...selectedListItem];
      tempList.push(item);
      setSelectedListItem(tempList);
    } else {
      const filteredSelectedList = selectedListItem.filter(
        (selectedItem) => selectedItem._id != item._id
      );
      setSelectedListItem(filteredSelectedList);
    }
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                p: 2,
                width: "52px",
                height: "52px",
                cursor: "pointer",
              }}
            >
              <ArrowBackSharp
                sx={{
                  color: "#0076C8",
                }}
                onClick={handleClose}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "24px",
                color: "#131516",
              }}
            >
              Export list
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              paddingRight: "34px",
            }}
          >
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "16px",
                color: "#fff",
                width: "114px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0076C8 !important",
                borderRadius: "4px",
                textTransform: "capitalize",
                padding: "0",
              }}
            >
              Exported list
            </Button>
            <Box>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M13.6673 15.5L10.334 12.1667H12.834V3.83333H10.334L13.6673 0.5L17.0007 3.83333H14.5007V12.1667H17.0007M0.333984 13.8333V12.1667H8.66732V13.8333M0.333984 8.83333V7.16667H6.16732V8.83333M0.333984 3.83333V2.16667H3.66732V3.83333H0.333984Z"
                  fill="#0076C8"
                />
              </svg>
            </Box>
          </Box>
          <Divider
            sx={{
              width: "calc(100% - 200px)",
              position: "absolute",
              left: "0",
              bottom: "0",
            }}
          />
        </Box>
        <Box
          sx={{
            maxHeight: "calc(100vh - 350px)",
            overflowY: "auto",
          }}
        >
          <List
            dense
            sx={{
              width: "100%",
              paddingLeft: "8px",
              paddingRight: "8px",
              bgcolor: "background.paper",
            }}
          >
            {exportList.map((item: PinImage) => {
              const labelId = `checkbox-list-secondary-label-${item._id}`;
              const isCheck = selectedListItem.some(
                (selectedItem: PinImage) => selectedItem._id == item._id
              );
              return (
                <ListItem
                  key={item._id}
                  disablePadding
                  onClick={() => handleSelectChange(item, !isCheck)}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                    "&:hover": {
                      bgcolor: "grey.200",
                    },
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      edge="start"
                      tabIndex={-1}
                      disableRipple
                      checked={isCheck}
                      onChange={(e, checked) =>
                        handleSelectChange(item, checked)
                      }
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${item.fileName + 1}`}
                        src={item.fileUrl}
                        sx={{ width: 48, height: 48, borderRadius: "4px" }}
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={item.fileName} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ margin: "8px" }}
                    />
                    <ListItemText
                      sx={{
                        textAlign: "center",
                        flexBasis: "20%",
                        flexShrink: 0,
                        padding: "10px",
                        fontSize: "10px",
                      }}
                      primary={"Floor"}
                    />
                  </div>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 49px",
            backgroundColor: "#fff",
          }}
        >
          <Box>
            <Button
              sx={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "175%",
                color: "#0076C8",
                letterSpacing: "0.15px",
                textTransform: "capitalize",
              }}
              onClick={() => setSelectedListItem(exportList)}
            >
              Select all
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "16px",
                color: "#D9000D !important",
                backgroundColor: "#fff !important",
                width: "100px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                textTransform: "capitalize",
                border: "1px solid #FA0808",
                padding: "0",
              }}
            >
              Remove
            </Button>
            <ExportedListDropdown />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ExportList;

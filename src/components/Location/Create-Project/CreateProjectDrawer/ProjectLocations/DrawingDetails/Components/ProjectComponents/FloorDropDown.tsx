import { Box } from "@mui/material";
import CustomDropDown from "components/Utills/CustomDropDown";
import { useState } from "react";
import { ALL_FLOOR_NAMES } from "utills/common";
interface Props {
  projectFloors: Floor[];
  findSelectedFloor: (selectedFloor: any) => void;
}
function FloorDropDown(props: Props) {
  const { projectFloors, findSelectedFloor } = props;
  const getFloorDropdownOptions = () => {
    const projectFloorsArr = projectFloors.map((floor) => floor.floorName);
    return ALL_FLOOR_NAMES.map((item: any) => {
      const isShown = projectFloorsArr.includes(item);
      return {
        label: "*",
        value: item,
        _id: "",
        isShown,
        isPermanenetOption: isShown,
      };
    });
  };

  const [getAllFloorOptions, setAllFloorOptions] = useState(
    getFloorDropdownOptions()
  );

  return (
    <>
      <Box>
        <CustomDropDown
          name="floor"
          label={"Floor"}
          options={{
            allOptions: [...getAllFloorOptions],
            recentOptions: [],
          }}
          handleSelectedMenuList={(selected: any) =>
            findSelectedFloor(selected)
          }
          createCallback={() => {}}
          handleChangeValues={(e) => {
            const newValue = getAllFloorOptions.map((item) => {
              if (item.value === e && !item.isPermanenetOption) {
                item.isShown = !item.isShown;
                // Run mutlitple APIs here to add floors.
              }
              return item;
            });
            setAllFloorOptions(newValue);
          }}
        />
      </Box>
    </>
  );
}

export default FloorDropDown;

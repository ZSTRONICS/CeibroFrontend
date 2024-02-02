import { Box } from "@mui/material";
import CustomDropDown from "components/Utills/CustomDropDown";
import { PROJECT_CONFIG } from "config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PROJECT_APIS } from "redux/action";
import { ALL_FLOOR_NAMES, createFloorDropdownOption } from "utills/common";
interface Props {
  projectFloors: Floor[];
  findSelectedFloor: (selectedFloor: any) => void;
  projectId: string;
}
function FloorDropDown(props: Props) {
  const { projectFloors, findSelectedFloor, projectId } = props;
  const dispatch = useDispatch();
  const [newFloors, setNewFloors] = useState<any[]>([]);

  const floorDropdownOptions = createFloorDropdownOption(
    projectFloors,
    ALL_FLOOR_NAMES
  );

  const [getAllFloorOptions, setAllFloorOptions] =
    useState(floorDropdownOptions);

  const handleCreateFloor = (floorNames: string[]) => {
    const payload = {
      body: {
        floorName: floorNames,
      },
      other: projectId,
      success: (res: any) => {
        const updatedFloorDropdown = createFloorDropdownOption(
          [...projectFloors, ...res.data.floor],
          ALL_FLOOR_NAMES
        );
        setAllFloorOptions(updatedFloorDropdown);
        setNewFloors([]);
        dispatch({
          type: PROJECT_CONFIG.PROJECT_FLOOR_CREATED,
          payload: res.data.floor,
        });
      },
    };
    dispatch(PROJECT_APIS.createFloor(payload));
  };

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
          handleCreateAllFloors={() => {
            if (newFloors.length > 0) {
              const floorNames = newFloors.map((floor) => floor.value);
              handleCreateFloor(floorNames);
            }
          }}
          handleSelectedMenuList={(selected: any) => {
            findSelectedFloor(selected);
            if (!selected.isPermanenetOption) {
              setNewFloors((prev: any) => [...prev, selected]);
            }
          }}
          createCallback={() => {}}
          handleChangeValues={(e) => {
            const newValue = getAllFloorOptions.map((item) => {
              if (item.value === e && !item.isPermanenetOption) {
                item.isShown = !item.isShown;
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

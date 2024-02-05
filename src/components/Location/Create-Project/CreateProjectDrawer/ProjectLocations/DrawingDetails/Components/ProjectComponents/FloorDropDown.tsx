import { Box } from "@mui/material";
import CustomDropDown from "components/Utills/CustomDropDown";
import { PROJECT_CONFIG } from "config";
import _ from "lodash";
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
  const handleCreateFloor = (floorNames: string[]): void => {
    const payload = {
      body: {
        floorName: floorNames,
      },
      other: projectId,
      success: (res: any) => {
        const allFloorNames = [...projectFloors, ...res.data.floor].map(
          (floor) => floor.floorName
        );
        const newFloorOption = getAllFloorOptions
          .filter((floor) => allFloorNames.includes(floor.value))
          .map((floor) => ({
            label: "*",
            value: floor.value,
            _id: "",
            isShown: true,
            isPermanenetOption: true,
          }));

        const uniqueOption = _.uniqBy(
          [...newFloorOption, ...getAllFloorOptions],
          "value"
        );
        const sortedOption = uniqueOption.sort((a, b) => {
          const aValue = parseInt(a.value, 10);
          const bValue = parseInt(b.value, 10);
          return aValue - bValue;
        });
        setAllFloorOptions(sortedOption);
        setNewFloors([]);
        dispatch({
          type: PROJECT_CONFIG.PROJECT_FLOOR_CREATED,
          payload: res.data.floor,
        });
      },
    };
    dispatch(PROJECT_APIS.createFloor(payload));
  };
  const extractValues = (array: any[], condition: any) => {
    return array.filter(condition).map((item) => item.value);
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
          isDropDownOpen={(isOpen: boolean) => {
            if (!isOpen && newFloors.length > 0) {
              const floorNames = extractValues(
                newFloors,
                (floor: any) => !floor.isPermanenetOption
              );
              const uniqueFloorNames = [...new Set(floorNames)];
              handleCreateFloor(uniqueFloorNames);
            }
          }}
          handleCreateAllFloors={() => {
            if (newFloors.length > 0) {
              const floorNames = extractValues(
                newFloors,
                (floor: any) => !floor.isPermanenetOption
              );
              const uniqueFloorNames = [...new Set(floorNames)];
              handleCreateFloor(uniqueFloorNames);
            }
          }}
          handleSelectedMenuList={(selected: any) => {
            if (!selected.isPermanenetOption && selected.isShown) {
              setNewFloors((prev: any) => [...prev, selected]);
            } else if (!selected.isShown) {
              setNewFloors((prev: any) =>
                prev.filter((floor: any) => floor.value !== selected.value)
              );
            }
            findSelectedFloor(selected);
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

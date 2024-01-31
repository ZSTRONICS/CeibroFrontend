import { Box } from "@mui/material";
import CustomDropDown from "components/Utills/CustomDropDown";
import { PROJECT_CONFIG } from "config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PROJECT_APIS } from "redux/action";
import { ALL_FLOOR_NAMES } from "utills/common";
interface Props {
  projectFloors: Floor[];
  findSelectedFloor: (selectedFloor: any) => void;
  projectId: string;
}
function FloorDropDown(props: Props) {
  const { projectFloors, findSelectedFloor, projectId } = props;
  const dispatch = useDispatch();
  const [newFloors, setNewFloors] = useState<any[]>([]);
  const [allFloorsRes, setAllFloorsRes] = useState<any[]>([]);

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

  const handleCreateFloor = (drwingFloorName: string) => {
    const payload = {
      body: {
        floorName: drwingFloorName,
      },
      other: projectId,
      success: (res: any) => {
        setAllFloorsRes((prev) => [...prev, res.data.floor]);
        dispatch({
          type: PROJECT_CONFIG.UPDATE_PROJECT_FLOORS,
          payload: res.data.floor,
        });
      },
    };
    dispatch(PROJECT_APIS.createFloor(payload));
  };

  // console.log("allFloorsRes", allFloorsRes);

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
          isDropDownOpen={(isDropDownOPen: boolean) => {}}
          handleCreateAllFloors={() => {
            if (newFloors.length > 0) {
              const updatedFloorOptions = getAllFloorOptions.map((item) => {
                const matchingFloor = newFloors.find(
                  (floor) => floor.value === item.value
                );

                if (matchingFloor && !matchingFloor.isPermanenetOption) {
                  handleCreateFloor(matchingFloor.value);
                  return {
                    ...item,
                    _id: "",
                    label: "*",
                    value: matchingFloor.value,
                    isShown: true,
                    isPermanenetOption: true,
                  };
                }

                return item;
              });
              setAllFloorOptions(updatedFloorOptions);
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
            console.log("e", e);
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

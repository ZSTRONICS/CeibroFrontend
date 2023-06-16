import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers/appReducer";
import permissionContext from "./PermissionContext";

const PermissionState = (props: any) => {
  const [permissions, setPermissions] = useState<any>({});

  // const permissionContext = createContext(permissions);
  const { selectedProject } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const payload = {
  //     success: (res: any) => {
  //       setPermissions(res?.data);
  //     },
  //     other: selectedProject,
  //   };
  // }, []);
  return (
    <permissionContext.Provider value={permissions}>
      {props.children}
    </permissionContext.Provider>
  );
};
export default PermissionState;

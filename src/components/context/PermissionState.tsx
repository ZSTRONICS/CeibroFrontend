import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPermissions } from "redux/action/project.action";
import { RootState } from "redux/reducers";
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
  //   dispatch(getPermissions(payload));
  // }, []);
  return (
    <permissionContext.Provider value={permissions}>
      {props.children}
    </permissionContext.Provider>
  );
};
export default PermissionState;

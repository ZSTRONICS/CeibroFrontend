import { ActionInterface } from "./appReducer";
import {
  TOGGLE_NAVBAR,
  SET_NAVBAR_OPEN,
  SET_COLLAPSE,
  SET_SIDEBAR_CONFIG,
  SET_SELECTED_TAB,
  SET_SELECTED_SUB_TAB,
} from "../../config/app.config";
import SidebarConfig from "../../navigation/SidebarConfig";

const intialStatue = {
  navbar: false,
  collapse: false,
  sidebarRoutes: SidebarConfig,
  selectedTab: "tasks",
  selectedSubTab: "",
};

const NavigationReducer = (state = intialStatue, action: ActionInterface) => {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        navbar: !state.navbar,
      };
    case SET_NAVBAR_OPEN:
      return {
        ...state,
        navbar: action.payload,
      };
    case SET_COLLAPSE:
      return {
        ...state,
        collapse: action.payload,
      };

    case SET_SIDEBAR_CONFIG:
      return {
        ...state,
        sidebarRoutes: action.payload,
      };
    case SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };
    case SET_SELECTED_SUB_TAB:
      // const active = state.sidebarRoutes[state.selectedTab].childTab[state.]
      return {
        ...state,
        selectedSubTab: action.payload,
      };
    default:
      return state;
  }
};

export default NavigationReducer;

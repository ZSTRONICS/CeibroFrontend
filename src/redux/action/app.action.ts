import {
  SET_COLLAPSE,
  SET_NAVBAR_OPEN,
  TOGGLE_NAVBAR,
  SET_SELECTED_TAB,
  SET_SELECTED_SUB_TAB,
} from "../../config/app.config";

const appActions = {
  toggleNavbar: () => {
    return {
      type: TOGGLE_NAVBAR,
    };
  },
  setNavbarOpen: (open: boolean) => {
    return {
      type: SET_NAVBAR_OPEN,
      payload: open,
    };
  },
  setCollapse: (open: boolean) => {
    return {
      type: SET_COLLAPSE,
      payload: open,
    };
  },
  setSelectedTab: (tab: string) => {
    return {
      type: SET_SELECTED_TAB,
      payload: tab,
    };
  },
  setSelectedSubTab: (subTab: string) => {
    return {
      type: SET_SELECTED_SUB_TAB,
      payload: subTab,
    };
  },
};

export default appActions;

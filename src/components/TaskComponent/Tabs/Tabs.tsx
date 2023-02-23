import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { styled } from "@mui/system";

export const Tab = styled(TabUnstyled)`
  font-family: Inter;
  color: #0076c8;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 500;
  background-color: transparent;
  margin: 1px 2px;
  border: none;

  &.${tabUnstyledClasses.selected} {
    color: #000000;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabPanel = styled(TabPanelUnstyled)(
  ({ theme }) => `
  width: 100%;
  font-family: Inter;
  font-size: 0.875rem;
  padding: 20px 4px 5px;
  `
);

export const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap:10px;
  border-bottom: 1px solid #DBDBE5;
  padding:5px 0px 5px 0px;
  `
);

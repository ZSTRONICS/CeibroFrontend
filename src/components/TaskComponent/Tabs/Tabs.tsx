import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import useResponsive from "hooks/useResponsive";
import React, { useRef, useState, useEffect } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanelContainer: React.FC<TabPanelProps> = ({
  children,
  index,
  value,
  ...other
}) => {
  const tabPanelRef = useRef<HTMLDivElement>(null);
  const isTabOrMobile = useResponsive("down", "md", "");
  const headerHeight = isTabOrMobile ? 116 : 110;
  const [windowHeight, setWindowHeight] = useState<number>(
    window.innerHeight - headerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight - headerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [headerHeight,value, index]);

  useEffect(() => {
    const tabPanelElement = tabPanelRef.current;
    if (tabPanelElement && (value === index || value === -1)) {
      tabPanelElement.scrollTop = 0;
    }
  }, [value, index]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      ref={tabPanelRef}
      style={{ maxHeight: `${windowHeight-20}px`, overflow: "auto" }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

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

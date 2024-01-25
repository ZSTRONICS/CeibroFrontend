import { styled } from "@mui/system";

interface Styles {
  [key: string]: React.CSSProperties;
}

// minicard
export const MinicardTypography = styled("p")({
  color: "#131516",
  backgroundColor: "aliceblue",
  borderRadius: 4,
  fontSize: "10px",
  background: "transparent",
  paddingTop: "0px",
  marginTop: "4px",
  fontWeight: "500",
});
export const Minicardheading = styled("div")({
  color: "#131516",
  paddingLeft: "8px",
  paddingRight: "8px",
  borderRadius: "6px",
  fontSize: "12px",
  background: "transparent",
  paddingTop: "0px",
  border: "solid 1px #818181",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "25px",
  backgroundColor: "white",
  fontWeight: "500",
  marginTop: "3px",
});

// minicardhead

export const HeadStyles: Styles = {
  head_container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "8px",
  },
  head_navigation: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "max-content",
    borderBottom: "solid 1px #818181",
    width: "100%",
  },
  head_filterization: {
    display: "flex",
    justifyContent: "space-arroud",
    alignItems: "center",
    width: "100%",
    marginTop: "5px",
  },
  head_search: {
    display: "flex",
    justifyContent: "space-arroud",
    alignItems: "center",
    width: "100%",
  },
  task_btn: {
    // width: '56px',
    // height: '20px',
    height: "25px",
    width: "60px",
    // padding: '2px, 8px, 2px, 8px',
    backgroundColor: "#818181",
    color: "white",
    fontSize: "12px",
  },
  img_btn: {
    width: "63px",
    height: "25px",
    padding: "2px, 8px, 2px, 8px",
    backgroundColor: "#818181",
    color: "white",
    fontSize: "12px",
  },
  tab_item: {
    width: "60px",
    height: "25px",
    color: "white",
    backgroundColor: "white",
    marginTop: "60px",
    marginLeft: "60px",
  },
  tab_item_active: {
    width: "60px",
    height: "25px",
    color: "white",
    backgroundColor: "#818181",
    marginTop: "60px",
    marginLeft: "60px",
  },
};

export const tabStyles = {
  color: "#818181",
  border: "solid 1px #818181",
  borderRadius: "7px",
  fontSize: "11px",
  marginLeft: "16px",
  marginTop: "16px",
  minHeight: "25px",
  maxHeight: "25px",
  width: "55px",
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "#818181",
    maxHeight: "25px",
    width: "55px",
    border: "solid 1px #818181 ",
    fontSize: "11px",
    marginLeft: "16px",
    marginTop: "16px",
    minHeight: "25px",
    borderRadius: "7px",
  },
  "&:hover": {
    backgroundColor: "#818181",
    color: "white",
    fontSize: "11px",
  },
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "red",
  },
  head_navi_btn: {
    borderBottom: "1px solid #818181",
    paddingBottom: "7px",
  },
};

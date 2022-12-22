import { makeStyles } from "@material-ui/core";
import colors from "assets/colors";

const useStyles = makeStyles({
  iconBtn: {
    padding: '6px 42px 2px 8px',
    alignItems: 'end',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  memberContainer: {
    marginBottom: "10px",
    fontSize: '12px',
    fontWeight: 700
  },
  memberMain: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberActions: {
    display: 'flex',
    flexDirection: "column",
    color: '#0076C8',
    fontSize: '12px',
    fontWeight: 700
  },
  memberAction: {
    padding: '5px 0'
  },
  memberMenue: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ecf0f1",
  },
  memberText: {
    color: "#0076C8",
    borderRight: "1px solid #ecf0f1",
    padding: "0 10px 0 10px",
    '&:hover': {
      cursor: 'pointer'
    }
  },
  memberTextAdmin: {
    color: "#0076C8",
    paddingRight: "7px",
    '&:hover': {
      cursor: 'pointer'
    }
  },
  downArrow: {
    padding: "4px 4px 0px 2px",
    '&:hover': {
      cursor: 'pointer'
    }
  },
  memberAdmin: {
    paddingRight: "10px",
  },
  moreIcon: {
    cursor: "pointer",
  },
  break: {
    border: 0,
    borderTop: `1px solid ${colors.grey}`,
  },
  memberPreview: {
    padding: "2px 0 0 10px",
    display: "flex",
    flexDirection: "column",
  },
  menuWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menuText: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 10,
    height: 30,
    color: colors.textPrimary,
  },

  deleteConversation: {
    color: colors.btnRed,
  },
  deleteText: {
    color: colors.btnRed,
  },
  memberName: {
    fontSize: 14,
    fontWeight: 700,
    textOverflow: "ellipsis",
    width: "110px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    color: "#0076C8",
  },
  memberCompany: {
    fontSize: 12,
    fontWeight: 500,
    textOverflow: "ellipsis",
    width: "110px",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  iconBtn: {
    '& svg': {
      height: '18px !important',
      width: '18px !important',
    },
    '& .MuiTypography-root': {
      color: '#0076C8 !important'
    }
  }

})

export default useStyles
import { Box } from "@mui/material";
import { Locationarrow } from "components/material-ui/icons/arrow/Locationarrow";

interface CollapsesBtnProps {
  collapseDiv: () => void;
  btnRightRotate: boolean;
}

const CollapsesRightBtn: React.FC<CollapsesBtnProps> = ({
  collapseDiv,
  btnRightRotate,
}) => {
  return (
    <button
      style={{
        // padding: '16px 4px 16px 4px',
        height: "35px",
        width: "35px",
        border: "none",
        position: "absolute",
        left: "97%",
        top: "48%",
        backgroundColor: "#EBF5FB",
        zIndex: "20",
        borderRadius: "50%",
        cursor: "pointer",
      }}
      onClick={collapseDiv}
    >
      <Box
        sx={{
          transform: `${!btnRightRotate ? "rotate(180deg)" : ""}`,
          transition: "all linear 0.30s",
        }}
      >
        <Locationarrow />
      </Box>
    </button>
  );
};

export default CollapsesRightBtn;

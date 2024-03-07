import { Box } from "@mui/material";
import { Locationarrow } from "components/material-ui/icons/arrow/Locationarrow";

interface CollapsesBtnProps {
  collapseDiv: () => void;
  btnRotate: boolean;
}

const CollapsesBtn: React.FC<CollapsesBtnProps> = ({
  collapseDiv,
  btnRotate,
}) => {
  return (
    <button
      style={{
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
          transform: `${!btnRotate ? "rotate(180deg)" : ""}`,
          transition: "all linear 0.30s",
        }}
      >
        <Locationarrow />
      </Box>
    </button>
  );
};

export default CollapsesBtn;

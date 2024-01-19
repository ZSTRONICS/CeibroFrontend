import { ArrowBack } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Heading2 } from "components/CustomTags";
import { MainLogo } from "components/material-ui/icons";
interface Props {
  title: string;
  handleClose: (e: any) => void;
}
function ModalHeader({ title, handleClose }: Props) {
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        flexWrap={"nowrap"}
      >
        <Grid
          item
          container
          gap={1}
          pl={1.5}
          pb={1.25}
          sx={{ borderBottom: "1px solid #E2E4E5" }}
        >
          <ArrowBack
            color="primary"
            style={{ cursor: "pointer", width: "30px" }}
            onClick={handleClose}
          />
          <Heading2 sx={{ fontSize: "16px" }}>{title}</Heading2>
        </Grid>
        <Grid item>
          <MainLogo />
        </Grid>
      </Grid>
    </>
  );
}

export default ModalHeader;

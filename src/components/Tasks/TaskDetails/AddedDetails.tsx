import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import assets from "assets/assets";

const urls = [assets.visual, assets.visual];
export default function AddedDetails() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Added Detail</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {urls.map((url) => {
            return (
              <Box
                sx={{
                  marginRight: "16px",
                }}
              >
                <ImageBox src={url} />
              </Box>
            );
          })}
          {urls.map((url) => {
            return (
              <Box
                sx={{
                  marginBottom: "16px",
                }}
              >
                <ImageBoxWithDesp src={url} />
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

import { Box, Grid } from "@mui/material";
import { CustomStack } from "components/CustomTags";
import SvgIcon from "../icons/CustomSvgIcon/SvgIcon";
import { CSkeleton } from "./Skeleton";

function ConnectionCardSkeleton() {
  return (
    <div className="listCard">
      <Grid
        container
        justifyContent="space-between"
        sx={{ borderBottom: "1px solid #E2E4E5", py: 1, px: 1, rowGap: 2.4 }}
      >
        <Grid item xs={12} md={7}>
          <CustomStack gap={1} justifyContent="space-between">
            <Box sx={{ display: "flex", gap: 1.4 }}>
              <CSkeleton variant="circular" width={40} height={40} />
              <div>
                <CSkeleton width={100} height={20} />
                <CSkeleton width={150} height={16} />
              </div>
            </Box>
            <Box>
              <SvgIcon color="disabled">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.41315 18.0042L12.6792 23.9264L22.1867 18.4239L20.6897 15.8259L12.6792 20.469L5.40713 16.2722L5.40047 7.86527L12.6659 3.65513L20.6897 8.29162L22.1801 5.69359L12.6659 0.197754L2.40649 6.13325L2.41315 18.0042ZM7.29665 15.1731L12.6792 18.2774L17.2965 15.5928L15.7929 13.0081L12.6792 14.8134L10.2906 13.4411V10.6898L12.6725 9.31753L15.7929 11.1162L17.2965 8.52479L12.6659 5.85349L7.29665 8.9578V15.1731Z"
                />
              </SvgIcon>
            </Box>
          </CustomStack>
        </Grid>
        <Grid item md={5} xs={12} gap={2.4} container justifyContent="flex-end">
          <CSkeleton variant="rectangular" width={180} height="1em" />
          <CSkeleton variant="rectangular" width={180} />
          <CSkeleton variant="rectangular" width={100} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ConnectionCardSkeleton;

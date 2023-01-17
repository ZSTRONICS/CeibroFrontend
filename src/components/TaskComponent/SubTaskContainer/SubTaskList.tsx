import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import {
  AssignedTag,
  CustomStack,
  LabelTag,
  TaskStatus,
} from "../Tabs/TaskCard";
import { colorsByStatus } from "config/project.config";
import { CBox } from "components/material-ui";
import CButton from "components/Button/Button";

function SubTask() {
  const classes = useStyles()
  const dueDate = new Date().toLocaleDateString("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const SubHeader = () => {
    return (
      <>
        <CustomStack gap={1.25}>
          <TaskStatus sx={{ background: '#F1B740', fontWeight: '500', fontSize: '10px' }}>{"ongoing"}</TaskStatus>
          <Typography sx={{ fontSize: "11px", fontWeight: "500" }}>
            {dueDate}
          </Typography>
        </CustomStack>
      </>
    );
  };
  return (
    <>
      <Grid item container justifyContent={"space-between"} pt={1} rowGap={0.5}>
        <Grid item>{SubHeader()}</Grid>
        <Grid item lg={7}>
          <CustomStack columnGap={0.5}>
            <LabelTag>Assigned to</LabelTag>
            <AssignedTag>Kristo Kristo</AssignedTag>
          </CustomStack>
        </Grid>
        <Grid item>
          <Box pr={1} className={classes.cardContainer}>
            <CustomStack gap={2}>
              <CustomStack columnGap={0.8}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    d="M13.2218 7.50016L7.71047 12.9834C6.94882 13.7411 5.91581 14.1668 4.83868 14.1668C2.59566 14.1668 0.777344 12.3578 0.777344 10.1262C0.777344 9.05458 1.20523 8.02684 1.96688 7.26908L7.64244 1.62247C8.15021 1.1173 8.83888 0.833496 9.55697 0.833496C11.0523 0.833496 12.2645 2.03952 12.2645 3.52724C12.2645 4.24166 11.9793 4.92682 11.4715 5.432L5.96018 10.9152C5.7063 11.1678 5.36196 11.3097 5.00292 11.3097C4.25525 11.3097 3.64914 10.7067 3.64914 9.96282C3.64914 9.6056 3.79177 9.26302 4.04565 9.01044L9.39273 3.69064"
                    stroke="#0076C8"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <Typography>0</Typography>
              </CustomStack>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  d="M3.44401 10.9379H4.19401V10.1879H3.44401V10.9379ZM3.44401 13.6028H2.69401C2.69401 13.8868 2.85447 14.1465 3.1085 14.2736C3.36253 14.4006 3.66654 14.3733 3.89382 14.203L3.44401 13.6028ZM6.99957 10.9379V10.1879H6.7497L6.54975 10.3377L6.99957 10.9379ZM4.3329 3.96973H3.5829V5.46973H4.3329V3.96973ZM9.66623 5.46973H10.4162V3.96973H9.66623V5.46973ZM4.3329 6.63466H3.5829V8.13466H4.3329V6.63466ZM7.88845 8.13466H8.63845V6.63466H7.88845V8.13466ZM2.69401 10.9379V13.6028H4.19401V10.9379H2.69401ZM3.89382 14.203L7.44938 11.538L6.54975 10.3377L2.9942 13.0027L3.89382 14.203ZM6.99957 11.6879H12.3329V10.1879H6.99957V11.6879ZM12.3329 11.6879C13.2382 11.6879 13.9718 10.9555 13.9718 10.0496H12.4718C12.4718 10.1261 12.4107 10.1879 12.3329 10.1879V11.6879ZM13.9718 10.0496V2.0548H12.4718V10.0496H13.9718ZM13.9718 2.0548C13.9718 1.14887 13.2382 0.416504 12.3329 0.416504V1.9165C12.4107 1.9165 12.4718 1.97825 12.4718 2.0548H13.9718ZM12.3329 0.416504H1.66623V1.9165H12.3329V0.416504ZM1.66623 0.416504C0.760944 0.416504 0.0273438 1.14887 0.0273438 2.0548H1.52734C1.52734 1.97825 1.58841 1.9165 1.66623 1.9165V0.416504ZM0.0273438 2.0548V10.0496H1.52734V2.0548H0.0273438ZM0.0273438 10.0496C0.0273438 10.9555 0.760944 11.6879 1.66623 11.6879V10.1879C1.58841 10.1879 1.52734 10.1261 1.52734 10.0496H0.0273438ZM1.66623 11.6879H3.44401V10.1879H1.66623V11.6879ZM4.3329 5.46973H9.66623V3.96973H4.3329V5.46973ZM4.3329 8.13466H7.88845V6.63466H4.3329V8.13466Z"
                  fill="#FA0808"
                />
              </svg>
              <Typography>0</Typography>
            </CustomStack>
          </Box>
        </Grid>
        <Grid item>
          <TaskTitle>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</TaskTitle>
          <TaskDescription>
            Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
            vestibulum. Sed posuere consectetur est at lobortis. Fusce dapibus,
            tellus ac cursus commodo, tortor mauris condimentum.
          </TaskDescription>
        </Grid>
        <Grid item container>
          <CBox display='flex' justifyContent='flex-end' width='100%'>
            <CButton label={'Assign'} variant='outlined' styles={{ borderColor: '#0076C8', fontSize: 12, fontWeight: 'bold', borderWidth: 2, color: '#0076C8', marginRight: 15 }} />
            <CButton label={'Delete'} variant='outlined' styles={{ borderColor: '#FA0808', fontSize: 12, fontWeight: 'bold', borderWidth: 2, color: '#FA0808' }} />
          </CBox>
        </Grid>
      </Grid>
      <Divider sx={{ padding: "10px 0", width: '100%' }} />
    </>
  );
}

export default SubTask;

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    '@media (max-width:371)': {
      border: '1px solid red',
      paddingTop: '8px'
    }
  },
}));

const TaskTitle = styled(Typography)`
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  max-width: 1200px;
  width: 100%;
}
`;
const TaskDescription = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  color: #605c5c;
  max-width: 1100px;
  width: 100%;
`;

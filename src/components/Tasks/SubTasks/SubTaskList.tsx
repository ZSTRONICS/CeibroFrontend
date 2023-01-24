import React from "react";
import { Grid } from '@material-ui/core'
import SubTaskCard from 'components/TaskComponent/SubTaskContainer/SubTaskCard'
import { AllSubtasksForUserRoot } from 'constants/interfaces/AllSubTasks.interface'
import { SubtaskInterface } from 'constants/interfaces/subtask.interface'
import { Box } from "@mui/material";
import NoData from "components/Chat/NoData";

const SubTaskList = ({ results }: AllSubtasksForUserRoot) => {

  return (
    <>
      {results.length>0 ? (<Grid container item>
          {results &&
            results.map((subTaskDetail: SubtaskInterface) => {
              return (
                <>
                  <SubTaskCard subTaskDetail={subTaskDetail} />
                </>
              );
            })}
        </Grid>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <NoData
            title="There is no sub task"
          />
        </Box>
      )} 
    </>
  );
};

export default SubTaskList;

import React from "react";

import { Box, Grid } from "@mui/material";
import SubTaskCard from "components/TaskComponent/SubTaskContainer/SubTaskCard";
import { AllSubtasksForUserRoot } from "constants/interfaces/AllSubTask";
import { SubtaskInterface } from "constants/interfaces/subtask.interface";
import NoData from "components/Chat/NoData";

const SubTaskList = ({ results }: AllSubtasksForUserRoot) => {
  console.log("results", results);

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

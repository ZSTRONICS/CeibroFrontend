import React from "react";
import SubTaskCard from 'components/TaskComponent/SubTaskContainer/SubTaskCard'
import { AllSubtasksForUserRoot } from 'constants/interfaces/AllSubTasks.interface'
import { SubtaskInterface } from 'constants/interfaces/subtask.interface'
import { Box } from "@mui/material";
import NoData from "components/Chat/NoData";
import { CBox } from "components/material-ui";

const SubTaskList = ({ results }: AllSubtasksForUserRoot) => {

  return (
    <>
      {results.length > 0 ? (
        <CBox style={{ maxHeight: 'calc(100vh - 295px)', height: '100%', overflow: 'auto', width: '100%' }}>
          {results &&
            results.map((subTaskDetail: SubtaskInterface) => {
              return (
                <>
                  <SubTaskCard subTaskDetail={subTaskDetail} />
                </>
              );
            })}
        </CBox>
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

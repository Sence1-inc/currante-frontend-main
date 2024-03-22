import { Box } from "@mui/material";
import React from "react";
import JobListPage from '../JobListPage/JobListPage';

const WorkerHomePage: React.FC = () => {
    return (
      <Box sx={{marginTop: "64px"}}>
        <JobListPage />
      </Box>
    );
  };
  
  export default WorkerHomePage;
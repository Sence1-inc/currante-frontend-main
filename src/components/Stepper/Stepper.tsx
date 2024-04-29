import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";

interface StepperWithErrorProps {
  steps: string[];
  errorMessage?: string;
  stepFailed: number;
  activeStep: number;
}

const StepperWithError: React.FC<StepperWithErrorProps> = ({
  steps,
  stepFailed,
  activeStep,
}) => {
  const isStepFailed = (step: number) => {
    return step === 1;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (isStepFailed(stepFailed)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Alert message
              </Typography>
            );
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default StepperWithError;

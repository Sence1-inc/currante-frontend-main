import { Box, TextField } from "@mui/material";
import React from "react";
import authPageStyles from "../../styles/authPageStyles";
import HelperText from "../HelperText/HelperText";

interface CustomTextFieldProps {
  inputType: string;
  label: string;
  placeholder: string;
  error: string;
  handleSetUserCredentials: (value: any) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  inputType,
  label,
  placeholder,
  error,
  handleSetUserCredentials,
}) => {
  return (
    <Box>
      <TextField
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSetUserCredentials(e.target.value)
        }
        type={inputType}
        id={`${inputType}-${label}`}
        label={label}
        placeholder={placeholder}
        sx={authPageStyles.form.formInput}
        InputProps={{
          sx: authPageStyles.form.formInputProp,
        }}
        InputLabelProps={{
          sx: authPageStyles.form.formInputLabel,
          shrink: true,
        }}
      />
      <HelperText error={error ? error : ""} />
    </Box>
  );
};

export default CustomTextField;

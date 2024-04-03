import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { JobSubtypeDefault } from "../../container/ProfilePage/ProfilePage";
import { JobSubType } from "../../redux/type";

interface ProfileRatesCardProps {
  edittingSection: string;
  jobType: string;
  jobTypes: { id: number; job_type_name: string }[] | [];
  jobSubtypesDefault: JobSubtypeDefault;
  jobSubtypes: JobSubType[];
  jobTypeId: number | null;
  sectionName: string;
  handleSetEdittingSection: () => void;
  handleSave: () => void;
  handleCancelEdittingSection: () => void;
  handleSetJobSubtypes: (types: JobSubType[]) => void;
  handleSetIsSnackbarOpen: (isOpen: boolean) => void;
  handleSetInfoMessage: (message: string) => void;
  handleSetSelectedJobType: (jobType: string) => void;
}

const ProfileRatesCard: React.FC<ProfileRatesCardProps> = ({
  edittingSection,
  jobType,
  jobTypes,
  jobSubtypesDefault,
  jobSubtypes,
  jobTypeId,
  sectionName,
  handleSetEdittingSection,
  handleSave,
  handleCancelEdittingSection,
  handleSetJobSubtypes,
  handleSetIsSnackbarOpen,
  handleSetInfoMessage,
  handleSetSelectedJobType,
}) => {
  useEffect(() => {
    if (jobType) {
      const prevJobSubtypes = jobSubtypes?.filter(
        (type) => type.job_type !== jobType
      );
      const selectedJobSubtypes = jobSubtypes?.filter(
        (type) => type.job_type === jobType
      );

      const inactiveJobSubtypes = prevJobSubtypes.map((subtype) => ({
        ...subtype,
        active_flg: 0,
      }));

      const activeJobSubtypes = selectedJobSubtypes.map((subtype) => ({
        ...subtype,
        active_flg: 1,
      }));

      handleSetJobSubtypes([...inactiveJobSubtypes, ...activeJobSubtypes]);
    }
  }, [jobType]);

  return (
    <Box
      sx={{
        border: "1px solid #F58A47",
        borderRadius: "4px",
        padding: "20px",
        textAlign: "left",
        margin: "0 0 20px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "0",
          }}
          onClick={handleSetEdittingSection}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "1.7",
        }}
      >
        Rates
      </Typography>

      <Typography
        sx={{
          fontFamily: "Open Sans",
          fontWeight: "400",
          fontSize: "12px",
          margin: "0 0 15px",
        }}
      >
        Some info may be visible to other people
      </Typography>

      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <FormControl variant="standard" fullWidth>
          <Select
            sx={{ textAlign: "left" }}
            disabled={edittingSection !== sectionName}
            fullWidth
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={jobType}
            label="Job Type"
            onChange={(e: SelectChangeEvent) => {
              handleSetIsSnackbarOpen(true);
              handleSetInfoMessage(
                `Are you sure you want to set your job type to ${e.target.value}?`
              );
              handleSetSelectedJobType(e.target.value);
            }}
          >
            {jobTypes.map((type) => {
              return (
                <MenuItem key={type.id} value={type.job_type_name}>
                  {type.job_type_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {jobType &&
          jobSubtypesDefault?.job_type === jobType &&
          jobSubtypesDefault?.job_subtypes?.map((item) => {
            return (
              <TextField
                disabled={edittingSection !== sectionName}
                key={item.name}
                id="standard-start-adornment"
                sx={{ m: 1, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {item.name} ({item.unit})
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                placeholder="e.g. 50"
                value={
                  (Array.isArray(jobSubtypes) &&
                    jobSubtypes.find((type) => {
                      return (
                        type.job_name === item.name && type.job_type === jobType
                      );
                    })?.job_unit_price) ??
                  null
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const subtype =
                    Array.isArray(jobSubtypes) &&
                    jobSubtypes.find(
                      (type) =>
                        type.job_type === jobType &&
                        type.job_name === item.name &&
                        type.active_flg
                    );
                  if (subtype) {
                    const subtypeData = {
                      job_unit_price: Number(e.target.value),
                      unit: item.unit,
                    };
                    handleSetJobSubtypes([
                      ...jobSubtypes.filter(
                        (type) => type.job_name !== item.name
                      ),
                      { ...subtype, ...subtypeData },
                    ]);
                  } else {
                    const newJobSubtype = [
                      {
                        job_subtype_id: item.id,
                        job_type: jobType,
                        job_type_id: jobTypeId,
                        job_name: item.name,
                        job_unit_price: Number(e.target.value),
                        unit: item.unit,
                        active_flg: true,
                      },
                    ];

                    handleSetJobSubtypes([...jobSubtypes, ...newJobSubtype]);
                  }
                }}
              />
            );
          })}

        {edittingSection === sectionName && (
          <ButtonGroup>
            <Button
              onClick={handleCancelEdittingSection}
              sx={{ marginTop: "20px" }}
              size="small"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              sx={{ marginTop: "20px", color: "common.white" }}
              size="small"
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Box>
  );
};

export default ProfileRatesCard;

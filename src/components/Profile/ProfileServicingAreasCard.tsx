import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Area } from "../../redux/type";

interface ProfileServicingAreasCardProps {
  edittingSection: string;
  sectionName: string;
  servicingAreas: Area[];
  areas: { id: number; area_name: string }[];
  handleSetEdittingSection: () => void;
  handleSave: () => void;
  handleCancelEdittingSection: () => void;
  handleSetServicingAreas: (areas: Area[]) => void;
}

const ProfileServicingAreasCard: React.FC<ProfileServicingAreasCardProps> = ({
  edittingSection,
  servicingAreas,
  areas,
  sectionName,
  handleSetEdittingSection,
  handleSave,
  handleCancelEdittingSection,
  handleSetServicingAreas,
}) => {
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
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "1.7",
          }}
        >
          Servicing Area
        </Typography>

        {edittingSection === sectionName ? (
          <ControlPointOutlinedIcon
            onClick={() =>
              handleSetServicingAreas([
                ...servicingAreas,
                { id: null, area_name: "" },
              ])
            }
            sx={{
              color: "#F58A47",
            }}
          />
        ) : (
          <Box
            sx={{
              position: "relative",
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
        )}
      </Box>

      <Box sx={{ paddingRight: "20px", textAlign: "center" }}>
        {servicingAreas?.map((area, index) => (
          <FormControl variant="standard" fullWidth>
            <Box sx={{ width: "100%", margin: "0 8px" }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                disabled={
                  edittingSection !== sectionName || servicingAreas.length >= 16
                }
                key={index}
                sx={{
                  textAlign: "left",
                  width: edittingSection === sectionName ? "86%" : "100%",
                }}
                value={area.area_name as string}
                onChange={(e: SelectChangeEvent) => {
                  const newAreas = [...servicingAreas];
                  newAreas[index] = {
                    ...newAreas[index],
                    area_name: e.target.value as string,
                  };
                  handleSetServicingAreas(newAreas);
                }}
              >
                {areas.map((area) => (
                  <MenuItem key={area.id} value={area.area_name}>
                    {area.area_name}
                  </MenuItem>
                ))}
              </Select>
              {edittingSection === sectionName && (
                <IconButton
                  onClick={() => {
                    const newServicingAreas = servicingAreas.filter(
                      (servicingArea) =>
                        servicingArea.area_name !== area.area_name
                    );
                    handleSetServicingAreas(newServicingAreas);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </FormControl>
        ))}

        {edittingSection === sectionName && (
          <ButtonGroup>
            <Button
              onClick={() => {
                const filteredServicingAreas = servicingAreas.filter(
                  (area) => area.area_name.trim() !== ""
                );

                handleSetServicingAreas(filteredServicingAreas);
                handleCancelEdittingSection();
              }}
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
              onClick={() => {
                const filteredServicingAreas = servicingAreas.filter(
                  (area) => area.area_name.trim() !== ""
                );

                handleSetServicingAreas(filteredServicingAreas);
                handleSave();
              }}
            >
              Save
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Box>
  );
};

export default ProfileServicingAreasCard;

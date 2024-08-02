import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  ButtonGroup,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { Address } from "../../redux/type";
import { isEmptyObject } from "./ProfileBasicInfoCard";

interface ProfileAddressesCardProps {
  errorMessages: any;
  edittingSection: string;
  sectionName: string;
  addresses: Address[];
  handleSetEdittingSection: () => void;
  handleSave: () => void;
  handleCancelEdittingSection: () => void;
  handleSetAddresses: (addresses: Address[]) => void;
  cities: { id: number; city_name: string }[];
  provinces: { id: number; province_name: string }[];
  isButtonLoading: {
    save: boolean;
    cancel: boolean;
  };
}

const ProfileAddressesCard: React.FC<ProfileAddressesCardProps> = ({
  errorMessages,
  edittingSection,
  addresses,
  cities,
  provinces,
  sectionName,
  isButtonLoading,
  handleSetEdittingSection,
  handleSave,
  handleCancelEdittingSection,
  handleSetAddresses,
}) => {
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [barangay, setBarangay] = useState<string>("");
  const [houseBuildingUnit, setHouseBuildingUnit] = useState<string>("");

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (addresses.length > 0) {
      setCity(addresses[0].city);
      setStreet(addresses[0].street);
      setProvince(addresses[0].province);
      setBarangay(addresses[0].barangay);
      setHouseBuildingUnit(addresses[0].house_building_unit);
    }
  }, [addresses]);

  const handleCancel = () => {
    setCity(user.addresses[0].city);
    setStreet(user.addresses[0].street);
    setProvince(user.addresses[0].province);
    setBarangay(user.addresses[0].barangay);
    setHouseBuildingUnit(user.addresses[0].house_building_unit);
    handleSetAddresses([
      {
        ...user.addresses[0],
        province: user.addresses[0].province,
        city: user.addresses[0].city,
        street: user.addresses[0].street,
        house_building_unit: user.addresses[0].house_building_unit,
      },
      ...user.addresses.slice(1),
    ]);

    handleCancelEdittingSection();
  };

  return (
    <Box
      sx={{
        border: "1px solid #F58A47",
        borderRadius: "4px",
        padding: "20px",
        textAlign: "left",
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
          Addresses
        </Typography>

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
      </Box>

      <Box sx={{ paddingRight: "20px", textAlign: "center" }}>
        <FormControl variant="standard" fullWidth>
          <Box sx={{ width: "100%", margin: "0 8px" }}>
            <Select
              disabled={edittingSection !== sectionName}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              input={
                <Input
                  startAdornment={
                    <InputAdornment position="start">City</InputAdornment>
                  }
                />
              }
              sx={{
                textAlign: "left",
                width: "100%",
              }}
              value={city}
              onChange={(e: SelectChangeEvent) => {
                handleSetAddresses([
                  { ...addresses[0], city: e.target.value },
                  ...addresses.slice(1),
                ]);
                setCity(e.target.value);
              }}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.city_name}>
                  {city.city_name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FormControl>

        <FormControl variant="standard" fullWidth>
          <Box sx={{ width: "100%", margin: "0 8px" }}>
            <Select
              disabled={edittingSection !== sectionName}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              input={
                <Input
                  startAdornment={
                    <InputAdornment position="start">Province</InputAdornment>
                  }
                />
              }
              sx={{
                textAlign: "left",
                width: "100%",
              }}
              value={province}
              onChange={(e: SelectChangeEvent) => {
                handleSetAddresses([
                  { ...addresses[0], province: e.target.value },
                  ...addresses.slice(1),
                ]);
                setProvince(e.target.value);
              }}
            >
              {provinces.map((province) => (
                <MenuItem key={province.id} value={province.province_name}>
                  {province.province_name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FormControl>

        <TextField
          error={isEmptyObject(errorMessages, "addresses.0.street")}
          disabled={edittingSection !== sectionName}
          id="standard-start-adornment"
          sx={{ m: 1, width: "100%" }}
          variant="standard"
          value={street}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Street</InputAdornment>
            ),
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSetAddresses([
              { ...addresses[0], street: e.target.value },
              ...addresses.slice(1),
            ]);
            setStreet(e.target.value);
          }}
          helperText={errorMessages["addresses.0.street"]?.[0]}
        />

        <TextField
          error={isEmptyObject(errorMessages, "addresses.0.barangay")}
          disabled={edittingSection !== sectionName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Barangay</InputAdornment>
            ),
          }}
          id="standard-start-adornment"
          sx={{ m: 1, width: "100%" }}
          variant="standard"
          value={barangay}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSetAddresses([
              { ...addresses[0], barangay: e.target.value },
              ...addresses.slice(1),
            ]);
            setBarangay(e.target.value);
          }}
          helperText={errorMessages["addresses.0.barangay"]?.[0]}
        />

        <TextField
          error={isEmptyObject(
            errorMessages,
            "addresses.0.house_building_unit"
          )}
          disabled={edittingSection !== sectionName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">House No.</InputAdornment>
            ),
          }}
          id="standard-start-adornment"
          sx={{ m: 1, width: "100%" }}
          variant="standard"
          value={houseBuildingUnit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSetAddresses([
              { ...addresses[0], house_building_unit: e.target.value },
              ...addresses.slice(1),
            ]);
            setHouseBuildingUnit(e.target.value);
          }}
          helperText={errorMessages["addresses.0.house_building_unit"]?.[0]}
        />

        {edittingSection === sectionName && (
          <ButtonGroup>
            <LoadingButton
              disabled={isButtonLoading.save}
              loading={isButtonLoading.cancel}
              loadingPosition="center"
              onClick={handleCancel}
              sx={{ marginTop: "20px" }}
              size="small"
              variant="contained"
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              disabled={isButtonLoading.cancel}
              loading={isButtonLoading.save}
              loadingPosition="center"
              color="secondary"
              sx={{ marginTop: "20px", color: "common.white" }}
              size="small"
              variant="contained"
              onClick={handleSave}
            >
              Save
            </LoadingButton>
          </ButtonGroup>
        )}
      </Box>
    </Box>
  );
};

export default ProfileAddressesCard;

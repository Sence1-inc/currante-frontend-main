import { Box, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface TabProps {
  label: string;
}

export const TabsContainer = styled((props: TabsProps) => (
  <Tabs
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scrollable auto tabs example"
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    position: "relative",
    maxWidth: 20,
    width: "100%",
    height: 8,
    bottom: 3,
    borderRadius: "4px 4px 0 0",
    backgroundColor: "#f58a47",
  },
});

export const TabsMenu = styled((props: TabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "primary.main",
  "&.Mui-selected": {
    color: "primary.main",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

export const TabsItem = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

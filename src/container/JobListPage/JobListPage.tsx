import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import TabCard from "../../components/Tabs/TabCard";
import { TabsItem } from "../../components/Tabs/Tabs";
import { ORDER_STATUSES, Status } from "../../data/WorkerDetails";
import { useAppSelector } from "../../redux/store";

const JobListPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [value, setValue] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const showList = () => {
    return (
      <TabsItem value={value} index={value}>
        {user?.orders.map((order, index) => {
          const tabCard = <TabCard key={index} order={order} />;

          if (
            value === 0 ||
            (Number(order.status) === value && value >= 1 && value <= 7) ||
            (value === 5 && Number(order.status) === 7) ||
            (value === 6 && Number(order.status) === 7)
          ) {
            return tabCard;
          } else {
            return null;
          }
        })}
      </TabsItem>
    );
  };

  return (
    <Box
      sx={{
        marginTop: "64px",
        marginBottom: "84px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#d7e3ff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          sx={{
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
          }}
          value={value}
          onChange={handleChange}
        >
          <Tab
            key={0}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "16px",
              marginRight: "10px",
              color: "primary.main",
              "&.Mui-selected": {
                color: "primary.main",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "rgba(100, 95, 228, 0.32)",
              },
            }}
            label="All"
          />
          {ORDER_STATUSES.map((status: Status) => {
            return (
              <Tab
                key={status.id}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginRight: "10px",
                  color: "primary.main",
                  display:
                    (user.logged_in_as === "worker" && status.id === 5) ||
                    (user.logged_in_as === "employer" && status.id === 6)
                      ? "none"
                      : "flex",
                  "&.Mui-selected": {
                    color: "primary.main",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                  },
                }}
                label={
                  status.id === 6 || status.id === 5
                    ? "Reviewed"
                    : status.status_name
                }
              />
            );
          })}
        </Tabs>
      </Box>
      {user?.orders.length > 0 && <Box>{showList()}</Box>}
    </Box>
  );
};

export default JobListPage;

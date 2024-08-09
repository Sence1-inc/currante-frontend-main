import { Box, Tab, Tabs } from "@mui/material";
import React, { useCallback, useState } from "react";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import TabCard from "../../components/Tabs/TabCard";
import { TabsItem } from "../../components/Tabs/Tabs";
import { ORDER_STATUSES, Status } from "../../data/WorkerDetails";
import { useAppSelector } from "../../redux/store";
import { Order } from "../../redux/type";

const JobListPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [value, setValue] = useState<number>(0);
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const shouldDisplayOrder = (order: Order): boolean => {
    const status = Number(order.status);

    return (
      value === 0 ||
      (value === 1 && status === 1) ||
      (value === 2 && status === 2) ||
      (value === 3 && status === 3) ||
      (value === 4 && status === 4) ||
      (value === 7 && status === 7) ||
      (value === 5 && (status === 5 || status === 6 || status === 7)) ||
      (value === 6 && (status === 5 || status === 6 || status === 7))
    );
  };

  const showList = useCallback(() => {
    return (
      <TabsItem value={value} index={value}>
        {user?.orders.map((order: Order, index: number) => {
          if (shouldDisplayOrder(order)) {
            return (
              <TabCard
                setIsSnackbarOpen={setIsSnackbarOpen}
                setInfoMessage={setInfoMessage}
                key={index}
                order={order}
              />
            );
          }
          return null;
        })}
      </TabsItem>
    );
  }, [user?.orders, value, user.logged_in_as]);

  return (
    <Box
      sx={{
        marginTop: "64px",
        marginBottom: "84px",
        minHeight: "calc(100vh - 64px - 84px)",
      }}
    >
      {user.logged_in_as === "worker" && (
        <CustomSnackbar
          infoMessage={infoMessage}
          isSnackbarOpen={isSnackbarOpen}
          handleSetIsSnackbarOpen={(value) => {
            setIsSnackbarOpen(value);
            if (!value) {
              setInfoMessage("");
            }
          }}
        />
      )}
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
            const isHidden =
              (user.logged_in_as === "worker" && status.id === 6) ||
              (user.logged_in_as === "employer" && status.id === 5);

            return (
              <Tab
                key={status.id}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginRight: "10px",
                  color: "primary.main",
                  display: isHidden ? "none" : "flex",
                  "&.Mui-selected": {
                    color: "primary.main",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "rgba(100, 95, 228, 0.32)",
                  },
                }}
                label={status.status_name}
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

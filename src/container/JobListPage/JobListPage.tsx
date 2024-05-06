import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabCard from "../../components/Tabs/TabCard";
import { TabsItem } from "../../components/Tabs/Tabs";
import { useAppSelector } from "../../redux/store";
import { Order } from "../../redux/type";

const JobListPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [value, setValue] = useState<number>(0);
  const [orders, setOrders] = useState<Order[] | []>([]);

  useEffect(() => {
    if (user) {
      setOrders(user?.orders);
    }
  }, [user]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  const showList = () => {
    return (
      <TabsItem value={value} index={value}>
        {orders.map((order) => {
          const tabCard = <TabCard key={order.job_order_code} order={order} />;

          if (value === 0) {
            return tabCard;
          } else if (value === 1 && Number(order.status) === 1) {
            return tabCard;
          } else if (value === 2 && Number(order.status) === 2) {
            return tabCard;
          } else if (value === 3 && Number(order.status) === 3) {
            return tabCard;
          } else if (value === 4 && Number(order.status) === 4) {
            return tabCard;
          } else if (value === 5 && Number(order.status) === 5) {
            return tabCard;
          } else if (value === 6 && Number(order.status) === 6) {
            return tabCard;
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
          <Tab
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
            label="Requests"
          />
          <Tab
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
            label="Incoming"
          />
          <Tab
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
            label="To be Completed"
          />
          <Tab
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
            label="Completed"
          />
          <Tab
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
            label="Reviewed"
          />
          <Tab
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
            label="Payment Released"
          />
        </Tabs>
      </Box>
      <Box>{showList()}</Box>
    </Box>
  );
};

export default JobListPage;

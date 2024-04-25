import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabCard from "../../components/Tabs/TabCard";
import { TabsContainer, TabsItem, TabsMenu } from "../../components/Tabs/Tabs";
import { useAppSelector } from "../../redux/store";
import { Order } from "../../redux/type";

const JobListPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [value, setValue] = useState<number>(0);
  const [orders, setOrders] = useState<Order[] | []>([]);

  useEffect(() => {
    if (user) {
      setOrders(user.orders);
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
        <TabsContainer value={value} onChange={handleChange}>
          <TabsMenu label="All" />
          <TabsMenu label="Requests" />
          <TabsMenu label="Incoming" />
          <TabsMenu label="To be Completed" />
          <TabsMenu label="Completed" />
        </TabsContainer>
      </Box>
      <Box>{showList()}</Box>
    </Box>
  );
};

export default JobListPage;

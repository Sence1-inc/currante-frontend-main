import React, { useState } from "react";
import { Box } from "@mui/material";
import { TabsContainer, TabsItem, TabsMenu } from '../../components/Tabs/Tabs';
import TabCard from '../../components/Tabs/TabCard';

const jobListSampleData: Array<{ id: string, status: string }> = Array(
  { id: '123456', status: 'incoming', provider_name: 'Jane Smith' },
  { id: '123457', status: 'current', provider_name: 'Lara Croft' },
  { id: '123458', status: 'completed', provider_name: 'Jane Doe' },
  { id: '123459', status: 'incoming', provider_name: 'John Snow' },
  { id: '123460', status: 'incoming', provider_name: 'Christopher Nolan' },
);

const JobListPage: React.FC = () => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const showList = () => {
      return (
        <TabsItem value={value} index={value}>
          { jobListSampleData.map((jobitem) => {
            const tabCard =  <TabCard key={jobitem.id} item={jobitem} />;

            if(value === 0) {
              return tabCard;
            } else if (value === 1 && jobitem.status === 'incoming') {
              return tabCard;
            } else if (value === 2 && jobitem.status === 'current') {
              return tabCard;
            } else if (value === 3 && jobitem.status === 'completed') {
              return tabCard;
            }
          })}
        </TabsItem>
      )
    }

    return (
      <Box sx={{marginTop: "64px"}}>
        <Box sx={{ backgroundColor: '#d7e3ff', display: 'flex', justifyContent: 'center' }}> 
          <TabsContainer
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <TabsMenu label="All" />
            <TabsMenu label="Incoming" />
            <TabsMenu label="Current" />
            <TabsMenu label="Completed" />
          </TabsContainer>
        </Box>
        <Box>
          {
            showList()
          }
        </Box>
      </Box>
    );
  };
  
  export default JobListPage;
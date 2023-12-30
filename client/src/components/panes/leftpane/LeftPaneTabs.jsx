import { Tabs, Text, Box } from '@mantine/core';
import classes from '../PaneTabs.module.css';

function LeftPaneTabs({ setTab }) {
  return (
    <Tabs
      defaultValue="Planner"
      radius = {15}
      color="yellow"
      classNames={{
          tab: classes.tab,
      }}
      >
      <Tabs.List grow>
          <Tabs.Tab 
              value="Planner" 
              onClick={() => setTab('Planner')}>
          <Text size="xl" fw={600}>Degree Planner</Text>
          </Tabs.Tab>
          <Tabs.Tab 
              value="Schedule" 
              onClick={() => setTab('Schedule')}>
          <Text size="xl" fw={600}>Quarter Schedule</Text>
          </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}

export default LeftPaneTabs;
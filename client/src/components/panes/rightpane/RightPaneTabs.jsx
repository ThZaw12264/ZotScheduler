import { Tabs, Text } from '@mantine/core';
import classes from '../PaneTabs.module.css';

function RightPaneTabs({ setTab }) {
  return (
    <Tabs
      defaultValue="Upload"
      radius={15}
      color="teal"
      classNames={{
          tab: classes.tab,
      }}
    >
      <Tabs.List grow>
          <Tabs.Tab 
            value="Upload" 
            onClick={() => setTab('Upload')}>
          <Text size="xl" fw={600}>Upload</Text>
          </Tabs.Tab>
          <Tabs.Tab 
            value="Generate" 
            onClick={() => setTab('Generate')}>
          <Text size="xl" fw={600}>Generate</Text>
          </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}

export default RightPaneTabs;
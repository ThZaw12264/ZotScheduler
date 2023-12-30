import { Tabs, Text } from '@mantine/core';
import classes from './RightPaneTabs.module.css';

function RightPaneTabs({ setTab }) {
  return (
    <Tabs
      defaultValue="Upload"
      classNames={{
          tab: classes.tab,
      }}
    >
      <Tabs.List grow>
          <Tabs.Tab 
            value="Upload" 
            color = "teal"
            onClick={() => setTab('Upload')}>
          <Text size="lg" fw={500}>Upload</Text>
          </Tabs.Tab>
          <Tabs.Tab 
            value="Generate" 
            color = "blue"
            onClick={() => setTab('Generate')}>
          <Text size="lg" fw={500}>Generate</Text>
          </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}

export default RightPaneTabs;
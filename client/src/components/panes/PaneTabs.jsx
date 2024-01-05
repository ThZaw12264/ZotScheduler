import { Tabs, Text } from '@mantine/core';
import classes from './PaneTabs.module.css';

function PaneTabs({ setTab, labels, color }) {
  const renderTabs = (labels) => {
    return labels.map((label) => (
      <Tabs.Tab 
          key={label}
          value={label}
          onClick={() => setTab(label)}>
          <Text size="xl" fw="inherit">{label}</Text>
      </Tabs.Tab>
    ))
  }

  return (
    <Tabs
      defaultValue={labels[0]}
      radius={15}
      color={color}
      classNames={{
          tab: classes.tab,
      }}
      >
      <Tabs.List grow>
          {renderTabs(labels)}
      </Tabs.List>
    </Tabs>
  )
}

export default PaneTabs;
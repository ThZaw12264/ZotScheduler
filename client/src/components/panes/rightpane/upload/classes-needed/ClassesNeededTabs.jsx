import { Tabs, Text, Container } from '@mantine/core';
import classes from './ClassesNeededTabs.module.css';

const labels = ['All', 'Eligible', 'Eligible & Offered'];

function ClassesNeededTabs({ setTab }) {
  const renderTabs = (labels) => {
    return labels.map((label) => (
      <Tabs.Tab 
        key={label}
        value={label}
        onClick={() => setTab(label)}>
        <Text fz={18}>{label}</Text>
      </Tabs.Tab>
    ))
  }

  return (
    <Container>
      <Tabs
        defaultValue={labels[0]}
        variant="pills"
        classNames={{
          tab: classes.tab,
        }}
        >
        <Tabs.List grow>
          {renderTabs(labels)}
        </Tabs.List>
      </Tabs>
    </Container>
  )
}

export default ClassesNeededTabs;
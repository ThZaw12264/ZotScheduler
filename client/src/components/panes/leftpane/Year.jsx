import { Grid, Group, Title } from '@mantine/core';
import Quarter from './Quarter';
import classes from './Year.module.css';

function Year({ yearName, yearData }) {
  const renderQuarters = () => {
    if (Object.keys(yearData).length === 0) {
      return (
        <>
          <Grid.Col span={{ xs: 3 }}>
            <Quarter quarterName="Fall" quarterData={{}} />
          </Grid.Col>
          <Grid.Col span={{ xs: 3 }}>
            <Quarter quarterName="Winter" quarterData={{}} />
          </Grid.Col>
          <Grid.Col span={{ xs: 3 }}>
            <Quarter quarterName="Spring" quarterData={{}} />
          </Grid.Col>
          <Grid.Col span={{ xs: 3 }}>
            <Quarter quarterName="Summer" quarterData={{}} />
          </Grid.Col>
        </>
      );
    } else {
      return Object.keys(yearData).map((quarter) => (
        <Grid.Col key={quarter} span={{ xs: 3 }}>
          <Quarter quarterName={quarter} quarterData={yearData[quarter]} />
        </Grid.Col>
      ));
    }
  };

  return (
    <div className={classes.year}>
      <Group className="year-header">
        <Title order={4}>{yearName}</Title>
      </Group>
      <Grid mt="xs" gutter="xs">
        {renderQuarters()}
      </Grid>
    </div>
  );
}

export default Year;

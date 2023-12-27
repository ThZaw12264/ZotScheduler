import { Grid, Group, Title } from '@mantine/core';
import Quarter from './Quarter';

function Year({yearName, yearData}) {
  const quarters = (Object.keys(yearData).length === 0)
  ? <>
    <Grid.Col span={{xs: 3}}><Quarter quarterName="Fall" quarterData={{}}/></Grid.Col>
    <Grid.Col span={{xs: 3}}><Quarter quarterName="Winter" quarterData={{}}/></Grid.Col>
    <Grid.Col span={{xs: 3}}><Quarter quarterName="Spring" quarterData={{}}/></Grid.Col>
    <Grid.Col span={{xs: 3}}><Quarter quarterName="Summer" quarterData={{}}/></Grid.Col>
    </>
  :
    Object.keys(yearData).map((quarter) => (
      <Grid.Col key={quarter} span={{xs: 3}}><Quarter quarterName={quarter} quarterData={yearData[quarter]} /></Grid.Col>
    ));

  return (
    <>
      <div className="year">
        <Group className="year-header" pb="xs">
          <Title order={4}>{yearName}</Title>
        </Group>
        <Grid gutter='xs'>
          {quarters}
        </Grid>
      </div>   
    </>
  )
}

export default Year
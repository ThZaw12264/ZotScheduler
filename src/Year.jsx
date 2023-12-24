import { Grid, Group, Title } from '@mantine/core';
import Quarter from './Quarter';

function Year({year}) {
  return (
    <>
      <div className="year">
        <Group className="year-header">
          <Title order={4}>{year}</Title>
        </Group>
        <Grid gutter='xs'>
          <Grid.Col span={{xs: 3}}><Quarter quarter="Fall" /></Grid.Col>
          <Grid.Col span={{xs: 3}}><Quarter quarter="Winter" /></Grid.Col>
          <Grid.Col span={{xs: 3}}><Quarter quarter="Spring" /></Grid.Col>
          <Grid.Col span={{xs: 3}}><Quarter quarter="Summer" /></Grid.Col>
        </Grid>
      </div>   
    </>
  )
}

export default Year
import { Grid, Container, Divider } from '@mantine/core';
import Year from './Year'

function LeftPane() {
  return (
    <>
      <div className="pane">
        <Container>
          <Grid gutter='lg'>
            <Grid.Col><Year year="First Year (2021)"/></Grid.Col>
            <Grid.Col><Year year="Second Year (2022)"/></Grid.Col>
            <Grid.Col><Year year="Third Year (2023)"/></Grid.Col>
            <Grid.Col><Year year="Fourth Year (2024)"/></Grid.Col>
          </Grid>
        </Container>
      </div>    
    </>
  )
}

export default LeftPane
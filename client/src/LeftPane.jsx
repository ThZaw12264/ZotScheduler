import { Grid, Container } from '@mantine/core';
import Year from './Year'

function LeftPane({studentClassesTaken}) {
  const years = (Object.keys(studentClassesTaken).length === 0)
  ? <>
    <Grid.Col><Year yearName="First Year" yearData={{}}/></Grid.Col>
    <Grid.Col><Year yearName="Second Year" yearData={{}}/></Grid.Col>
    <Grid.Col><Year yearName="Third Year" yearData={{}}/></Grid.Col>
    <Grid.Col><Year yearName="Fourth Year" yearData={{}}/></Grid.Col>
    </>
  :
    Object.keys(studentClassesTaken).map((year) => (
      <Grid.Col key={year}><Year yearName={year} yearData={studentClassesTaken[year]}/></Grid.Col>
    ));

  return (
    <>
      <div className="pane">
        <Container>
          <Grid gutter='lg'>
            {years}
          </Grid>
        </Container>
      </div>    
    </>
  )
}

export default LeftPane
import { Grid } from '@mantine/core';
import Year from './Year';
import { useStudentContext } from '../../../../contexts/StudentContext';
import classes from '../../PaneContentLayout.module.css';

function PlannerLayout() {
  const { studentClasses } = useStudentContext();

  const renderYears = () => {
    if (Object.keys(studentClasses["taken"]).length === 0) {
      return (
        <>
          <Grid.Col>
            <Year yearName="First Year" yearData={{}} />
          </Grid.Col>
          <Grid.Col>
            <Year yearName="Second Year" yearData={{}} />
          </Grid.Col>
          <Grid.Col>
            <Year yearName="Third Year" yearData={{}} />
          </Grid.Col>
          <Grid.Col>
            <Year yearName="Fourth Year" yearData={{}} />
          </Grid.Col>
        </>
      );
    } else {
      return Object.keys(studentClasses["taken"]).map((year) => (
        <Grid.Col key={year}>
          <Year yearName={year} yearData={studentClasses["taken"][year]} />
        </Grid.Col>
      ));
    }
  };
  
  return (
    <div className={classes.layout}>
      <Grid gutter="lg">
          {renderYears()}
      </Grid>
    </div>
  );
}
  
export default PlannerLayout;  
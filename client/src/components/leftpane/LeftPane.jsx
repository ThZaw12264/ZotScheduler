import { useState } from 'react';
import LeftPaneTabs from './LeftPaneTabs';
import PlannerLayout from './PlannerLayout';
import ScheduleLayout from './ScheduleLayout';
import classes from '../Pane.module.css';

function LeftPane({ studentClassesTaken }) {
  const [tab, setTab] = useState('Planner');

  return (
    <div className={classes.pane}>
      <LeftPaneTabs setTab={setTab} />
      {tab === 'Planner' &&
        <PlannerLayout studentClassesTaken={studentClassesTaken} />
      }
      {tab === 'Schedule' &&
        <ScheduleLayout />
      }
    </div>
  );
}

export default LeftPane;

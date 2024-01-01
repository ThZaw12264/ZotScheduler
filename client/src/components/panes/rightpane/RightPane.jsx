import { useState } from 'react';
import RightPaneTabs from './RightPaneTabs';
import UploadLayout from './upload/UploadLayout';
import GenerateLayout from './generate/GenerateLayout';
import classes from '../Pane.module.css';

function RightPane() {
  const [tab, setTab] = useState('Upload');

  return (
    <>
      <div className={classes.pane}>
        <RightPaneTabs setTab={setTab}/>
        {tab === 'Upload' &&
          <UploadLayout />
        }
        {tab === 'Generate' &&
          <GenerateLayout />
        }
      </div>
    </>
  )
}

export default RightPane
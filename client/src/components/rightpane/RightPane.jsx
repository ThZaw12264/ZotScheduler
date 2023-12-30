import { useState } from 'react';
import RightPaneTabs from './RightPaneTabs';
import UploadLayout from './upload/UploadLayout';
import GenerateLayout from './generate/GenerateLayout';
import classes from '../Pane.module.css';

function RightPane({studentName, studentMajor, studentClassesNeeded, setStudentName, setStudentMajor, handleUpload}) {
  const [tab, setTab] = useState('Upload');

  return (
    <>
      <div className={classes.pane}>
        <RightPaneTabs setTab={setTab}/>
        {tab === 'Upload' &&
          <UploadLayout 
            studentName={studentName} 
            studentMajor={studentMajor} 
            studentClassesNeeded={studentClassesNeeded} 
            setStudentName={setStudentName} 
            setStudentMajor={setStudentMajor} 
            handleUpload={handleUpload}/>
        }
        {tab === 'Generate' &&
          <GenerateLayout />
        }
      </div>
    </>
  )
}

export default RightPane
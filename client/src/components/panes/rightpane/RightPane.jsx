import DegreeWorksUploader from './DegreeWorksUploader'
import Profile from './Profile'
import ClassesNeeded from './ClassesNeeded'
import classes from '../Pane.module.css';

function RightPane({studentName, studentMajor, studentClassesNeeded, setStudentName, setStudentMajor, handleUpload}) {
  return (
    <>
      <div className={classes.pane}>
        <DegreeWorksUploader handleUpload={handleUpload} />
        <Profile studentName={studentName} studentMajor={studentMajor} setStudentName={setStudentName} setStudentMajor={setStudentMajor} />
        {Object.keys(studentClassesNeeded).length !== 0 &&
          <ClassesNeeded studentClassesNeeded={studentClassesNeeded} />
        }
      </div>
    </>
  )
}

export default RightPane
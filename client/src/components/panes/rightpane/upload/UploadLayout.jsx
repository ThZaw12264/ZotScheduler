import DegreeWorksUploader from './DegreeWorksUploader'
import Profile from './Profile'
import ClassesNeeded from './ClassesNeeded'
import classes from '../../PaneContentLayout.module.css';

function UploadLayout({studentProfile, studentClasses, setStudentClasses, setStudentProfile, setParsingStatus}) {
  return (
    <>
      <div className={classes.layout}>
        <DegreeWorksUploader 
          setStudentProfile={setStudentProfile} 
          setStudentClasses={setStudentClasses}
          setParsingStatus={setParsingStatus} 
        />
        <Profile 
          studentProfile={studentProfile} 
          setStudentProfile={setStudentProfile} 
        />
        {Object.keys(studentClasses["needed"]).length !== 0 &&
            <ClassesNeeded studentClassesNeeded={studentClasses["needed"]} />
        }
      </div>
    </>
  )
}

export default UploadLayout;
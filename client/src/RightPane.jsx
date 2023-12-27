import DegreeWorksUploader from './DegreeWorksUploader'
import Profile from './Profile'

function RightPane({studentName, studentMajor, setStudentName, setStudentMajor, handleUpload}) {
  return (
    <>
      <div className="pane">
        <DegreeWorksUploader handleUpload={handleUpload} />
        <Profile studentName={studentName} studentMajor={studentMajor} setStudentName={setStudentName} setStudentMajor={setStudentMajor} />
      </div>
    </>
  )
}

export default RightPane
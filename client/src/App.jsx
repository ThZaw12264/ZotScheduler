import { useState } from 'react';
import Navbar from './Navbar';
import SplitPane from 'react-split-pane';
import LeftPane from './LeftPane';
import RightPane from './RightPane';
import ParsingNotification from './ParsingNotification';

function App() {
  const [parsingStatus, setParsingStatus] = useState();
  const [studentName, setStudentName] = useState("");
  const [studentMajor, setStudentMajor] = useState("");
  const [studentClassesTaken, setStudentClassesTaken] = useState({});
  const [studentClassesNeeded, setStudentClassesNeeded] = useState({});

  const handleUpload = async (file) => {
    setParsingStatus("parsing");

    const formData = new FormData();
    formData.append("file", file);

    try {
      fetch("/api/parse", {
        method: "POST",
        body: formData,
      }).then(
        response => response.json()
      ).then(
        data => {
          console.log(data);
          setStudentName(data["name"]);
          setStudentMajor(data["major"]);
          setStudentClassesTaken(data["classes_taken"]);
          setStudentClassesNeeded(data["classes_needed"]);
          setParsingStatus("success");
        }
      );
    } catch (error) {
      console.error(error);
      setParsingStatus("fail");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <SplitPane split="vertical">
          <LeftPane studentClassesTaken={studentClassesTaken}/>
          <RightPane studentName={studentName} studentMajor={studentMajor} studentClassesNeeded={studentClassesNeeded} setStudentName={setStudentName} setStudentMajor={setStudentMajor} handleUpload={handleUpload}/>
        </SplitPane>
      </main>
      <ParsingNotification parsingStatus={parsingStatus} />
    </>
  );
}

export default App;
import { useState } from 'react';
import Navbar from './Navbar';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane'
import LeftPane from './panes/leftpane/LeftPane';
import RightPane from './panes/rightpane/RightPane';
import ParsingNotification from './ParsingNotification';
import './App.module.css';

function App() {
  const [studentProfile, setStudentProfile] = useState({
    name: "",
    major: "",
    specialization: "",
    gpa: ""
  });
  const [studentClasses, setStudentClasses] = useState({
    taken: {},
    takenByDept: {},
    needed: {},
    neededByDept: {}
  });

  const [parsingStatus, setParsingStatus] = useState();

  return (
    <>
      <Navbar />
      <main>
        <SplitPane 
          split="vertical"
          onChange={(e) => {
            localStorage.setItem("splitPos", e[0]);
          }}
        >
          <Pane initialSize={localStorage.getItem("splitPos")}>
            <LeftPane studentClassesTaken={studentClasses["taken"]}/>
          </Pane>
          <Pane>
            <RightPane
              studentProfile={studentProfile} 
              studentClasses={studentClasses}
              setStudentProfile={setStudentProfile}
              setStudentClasses={setStudentClasses}
              setParsingStatus={setParsingStatus}
            />
          </Pane>
        </SplitPane>
      </main>
      <ParsingNotification parsingStatus={parsingStatus} />
    </>
  );
}

export default App;
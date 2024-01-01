import Navbar from './Navbar';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane'
import LeftPane from './panes/leftpane/LeftPane';
import RightPane from './panes/rightpane/RightPane';
import ParsingNotification from './ParsingNotification';
import './App.module.css';

function App() {
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
          <Pane initialSize={localStorage.getItem("splitPos") || "60%"}>
            <LeftPane />
          </Pane>
          <Pane>
            <RightPane />
          </Pane>
        </SplitPane>
      </main>
      <ParsingNotification />
    </>
  );
}

export default App;
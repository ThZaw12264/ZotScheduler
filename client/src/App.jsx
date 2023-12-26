import Navbar from './Navbar';
import SplitPane from 'react-split-pane';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <SplitPane split="vertical">
          <LeftPane />
          <RightPane />
        </SplitPane>
      </main>
    </>
  );
}

export default App;
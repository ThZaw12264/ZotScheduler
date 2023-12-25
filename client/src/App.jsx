import Navbar from './Navbar';
import SplitPane from 'react-split-pane';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

import { MantineProvider } from '@mantine/core'

function App() {
  return (
    <>
      <MantineProvider>
        <Navbar />
        <main>
          <SplitPane split="vertical">
            <LeftPane />
            <RightPane />
          </SplitPane>
        </main>
      </MantineProvider>
    </>
  );
}

export default App;
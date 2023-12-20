import { useState } from 'react'
import DegreeWorksUploader from './UploadDegreeWorks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>ZotScheduler</h1>
      <DegreeWorksUploader />
    </>
  )
}

export default App

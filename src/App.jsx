import { useState } from 'react'
import Navbar from './Navbar'
import DegreeWorksUploader from './UploadDegreeWorks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main>
        <DegreeWorksUploader />
      </main>
    </>
  )
}

export default App

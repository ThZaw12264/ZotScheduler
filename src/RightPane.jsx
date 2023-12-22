import { useState } from 'react'
import DegreeWorksUploader from './UploadDegreeWorks'

function LeftPane() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DegreeWorksUploader />
    </>
  )
}

export default LeftPane
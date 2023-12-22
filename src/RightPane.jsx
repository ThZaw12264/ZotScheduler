import { useState } from 'react'
import DegreeWorksUploader from './UploadDegreeWorks'

function LeftPane() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="pane">
        <DegreeWorksUploader />
      </div>
    </>
  )
}

export default LeftPane
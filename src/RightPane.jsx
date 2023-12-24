import { useState } from 'react'
import DegreeWorksUploader from './UploadDegreeWorks'

function RightPane() {
  const [parsingStatus, setParsingStatus] = useState();

  const handleUpload = async (file) => {
    setParsingStatus("parsing");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });

      const data = await result.json();

      console.log(data);
      setParsingStatus("success");
    } catch (error) {
      console.error(error);
      setParsingStatus("fail");
    }
  };

  const Result = ({parsingStatus}) => {
    if (parsingStatus === "success") {
      return <p>✅ File parsed successfully!</p>;
    } else if (parsingStatus === "fail") {
      return <p>❌ File parse failed!</p>;
    } else if (parsingStatus === "parsing") {
      return <p>⏳ Parsing selected file...</p>;
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="pane">
        <DegreeWorksUploader parsingStatus={parsingStatus} handleUpload={handleUpload} />
        <Result parsingStatus={parsingStatus} />
      </div>
    </>
  )
}

export default RightPane
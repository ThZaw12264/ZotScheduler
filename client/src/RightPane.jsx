import { useState } from 'react'
import DegreeWorksUploader from './UploadDegreeWorks'

function RightPane() {
  const [parsingStatus, setParsingStatus] = useState();
  const [data, setData] = useState({});

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
          setData(data);
          setParsingStatus("success");
        }
      );
    } catch (error) {
      console.error(error);
      setParsingStatus("fail");
    }
  };

  const Result = ({parsingStatus}) => {
    if (parsingStatus === "success") {
      return <p>✅ File parsed successfully! Major: {data["Major"]}</p>;
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
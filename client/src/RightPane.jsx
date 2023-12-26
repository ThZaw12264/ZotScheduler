import { useState } from 'react'
import DegreeWorksUploader from './DegreeWorksUploader'
import Profile from './Profile'
import ParsingNotification from './ParsingNotification';

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

  return (
    <>
      <div className="pane">
        <DegreeWorksUploader handleUpload={handleUpload} />
        <Profile data={data}/>
      </div>
      <ParsingNotification parsingStatus={parsingStatus} />
    </>
  )
}

export default RightPane
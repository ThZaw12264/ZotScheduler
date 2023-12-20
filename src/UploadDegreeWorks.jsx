import React, { useState } from "react";

const DegreeWorksUploader = () => {
  const [status, setStatus] = useState();

  const handleUpload = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setStatus("parsing");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const result = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  return (
    <>
      <div className="upload-group">
        <label htmlFor="file">
          Upload your DegreeWorks in PDF format: 
        </label>
        <input id="file" type="file" accept="application/pdf" onChange={handleUpload} />
      </div>

      <Result status={status} />
    </>
  );
};

const Result = ({status}) => {
  if (status === "success") {
    return <p>✅ File parsed successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File parse failed!</p>;
  } else if (status === "parsing") {
    return <p>⏳ Parsing selected file...</p>;
  } else {
    return null;
  }
};

export default DegreeWorksUploader;
import { useState, useRef } from "react";

function App() {
  // state
  const [slectedValue, setSelectedValue] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [convertedText, setConvertedText] = useState("");
  const [error, setError] = useState(null);

  const selectRef = useRef(null);
  const fileInputRef = useRef(null);

  const URL_ENDPOINT = "http://localhost:8800";

  // file upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("audio/")) {
        if (file.size <= 10 * 1024 * 1024) {
          setUploadedFile(file);
        } else {
          alert("Please upload an audio file less than 10 MB");
          event.target.value = null;
          return;
        }
      }
    } else {
      alert("Please upload an audio file only");
      event.target.value = null;
      return;
    }
  };

  // select option handler
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  // submit
  const handleButtonClick = () => {
    if (!uploadedFile) {
      alert("Please upload a file");
      return;
    }
    if (!slectedValue) {
      alert("Please select an option");
      selectRef.current.focus();
      return;
    }
    makeAPICall();
  };

  // API Call
  const makeAPICall = async () => {
    const data = new FormData();
    data.append("audio", uploadedFile);
    data.append("conversiontype", slectedValue);
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch(`${URL_ENDPOINT}/${slectedValue}`, {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      } else {
        const res = await response.json();
        console.log(res);
        setConvertedText(res.text);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setConvertedText("")
    } finally {
      setLoading(false);
      setUploadedFile(null);
      setSelectedValue("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="App">
      <main role="main" className="pt-0">
        <div className="mt-5 container text-center">
          <div>
            <h2 className="m-0 mb-4 sm-12 display-6">Speech to Text</h2>
          </div>
          <div className="input-container">
            <div className="w-50 my-3 d-block m-auto">
              <input
                className="form-control"
                accept="audio/*"
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>

            <div className="w-50 d-block m-auto">
              <select
                className="form-control w-100 d-inline my-2"
                ref={selectRef}
                value={slectedValue}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="translate">Translate</option>
                <option value="transcribe">Transcribe</option>
              </select>
            </div>

            <div className="w-50 d-block m-auto">
              <button
                className="btn btn-dark w-50 mt-2"
                onClick={handleButtonClick}
                disabled={loading}
              >
                <span className="m-2">Convert</span>
                {loading && (
                  <div
                    className="mr-2 spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                )}
              </button>
            </div>
          </div>

          <div
            className={`w-auto m-auto text-light mt-4 bg-danger badge ${
              !loading ? "" : "d-none"
            }`}
          >
            {error ? error.message : ""}
          </div>

          <div className={`w-100 d-block mt-5 ${!loading ? "" : "d-none"}`}>
            <div className="w-70 lh-lg m-auto my-2 text-start new-line">
              {convertedText}
            </div>
          </div>

          <br />
        </div>
      </main>
    </div>
  );
}

export default App;

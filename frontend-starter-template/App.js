function App() {
  return (
    <div className="App">
      <main role="main" className="pt-0">
        <div className="mt-5 container text-center">
          <div>
            <h2 className="m-0 mb-4 sm-12 display-6">Speech to Text</h2>
          </div>
          <div className="input-container">
            
            <div className="w-50 my-3 d-block m-auto">
              <input className="form-control" accept="audio/*" type="file" />
            </div>

            <div className="w-50 d-block m-auto">
              <select className="form-control w-100 d-inline my-2">
                <option value="" disabled>
                  Select an option
                </option>
                <option value="translate">Translate</option>
                <option value="transcribe">Transcribe</option>
              </select>
            </div>

            <div className="w-50 d-block m-auto">
              <button className="btn btn-dark w-50 mt-2">
                <span className="m-2">Convert</span>
              </button>
            </div>
          </div>

          <div className="w-auto m-auto text-light mt-4 bg-danger badge d-none"></div>

          <div className="w-100 d-block mt-5 d-none">
            <div className="w-70 lh-lg m-auto my-2 text-start new-line"></div>
          </div>

          <br />
        </div>
      </main>
    </div>
  );
}

export default App;

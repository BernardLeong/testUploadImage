import { useState } from "react";
import "./style.css";
import axios from "axios";
export const FileUploader = ({}) => {
  const [file, setFile] = useState(null);
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);

    let fileType = e.target.files[0].type;

    if (fileType !== "text/csv") {
      e.target.value = null;
      e.target.files = [];
      setFile(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // axios.
    const data = new FormData();
    data.append("file", file);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8080/upload", data, config)
      .then((e) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onReset = (e) => {
    // e.preventDefault();
    // axios.
    let allFiles = e.target.files;
    if (allFiles.length > 0) {
      e.target.value = null;
      e.target.files = [];
      setFile(null);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <form>
          <div className="form-group files">
            <label>{"Upload Your File (CSV only)"}</label>
            <input
              type="file"
              onChange={onInputChange}
              class="form-control"
              accept=".csv"
            />
          </div>
          <button onClick={onSubmit}>Submit</button>
          <button onClick={onReset}>Reset</button>
        </form>
      </div>
    </div>
  );
};

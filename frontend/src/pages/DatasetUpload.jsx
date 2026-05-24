import { useState } from "react";
import axios from "axios";

import MainLayout from "../layouts/MainLayout";

import { MdCloudUpload } from "react-icons/md";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Choose a CSV file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/dataset/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Dataset Uploaded");
    } catch (error) {
      console.log(error);

      alert("Upload Failed");
    }
  };

  return (
    <MainLayout>
      <div className="upload-page">
        <div className="upload-card">
          <div className="upload-header">
            <h1>Upload Dataset</h1>

            <p>
              Upload your sales CSV dataset for
              AI forecasting
            </p>
          </div>

          <div className="upload-box">
            <div className="upload-icon">
              
            </div>

            <h2>Select CSV File</h2>

            <p>
              Drag and drop your dataset here
              or browse files
            </p>

            <label className="custom-file-upload">
              Choose File

              <input
                type="file"
                accept=".csv"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />
            </label>

            {file && (
              <div className="selected-file">
                {file.name}
              </div>
            )}

            <button
              onClick={handleUpload}
              className="upload-btn"
            >
              Upload Dataset
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Upload;
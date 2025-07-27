import React, { useState, useRef } from "react";
import axios from "axios";




const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const xhrRef = useRef(null);
  const API_UPLOAD_URL = "http://localhost:8000/predict"; // Update this as needed

  // 📌 Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  // 📌 Handle Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleFile = (file) => {
    console.log("File selected:", file.name);
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setFile(file);
    setUploadStatus("selected");
  };

  // 📌 Upload File Function (Fixed the duplicate function issue)
  const uploadFile = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    try {
      setError(null);
      setUploadStatus("uploading");
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_UPLOAD_URL, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      setProcessedImage(`http://localhost:8000${response.data.processed_image_url}`);
      setUploadStatus("success");
    } catch (err) {
      setError("Upload failed. Please try again.");
      setUploadStatus("error");
    }
  };

  // 📌 Reset State
  const resetState = () => {
    if (xhrRef.current) xhrRef.current.abort();
    setFile(null);
    setUploadProgress(0);
    setUploadStatus(null);
    setProcessedImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-start   bg-stone-400 w-full p-6 " id="Enhance">
        <h2 class="text-center text-4xl text-black mb-30 mx-auto">Enhance</h2>
        <p class="text-start  text-2xl text-black mb-4 ml-40 ">Choose the Image you want to De-Noise</p>
      <div className="w-full max-w-4xl px-4 flex space-x-8 ml-30">
        
        <div
          className={`relative border-3 transition-all duration-300 hover:scale-110 rounded-xl h-124 p-12 text-center bg-white shadow-lg ml-8 w-150 max-w-[600px] mr-30${
            uploadStatus === "uploading" ? "pointer-events-none" : ""
          }`}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            class="hidden"
          />

          {!file ? (
            <div className="space-y-6">
              <p className="text-2xl font-medium mb-4">Select the image</p>
              <p className="text-lg text-gray-500 mb-4">or</p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-8 py-4 transition all duration-300 hover:scale-105  hover:border-2  hover:border-black bg-gradient-to-r from-stone-600 via-stone-400 to-stone-500  text-white text-lg rounded-lg hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-black  hover:text-white  shadow-md"
              >
                Select Image
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50  rounded-lg">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full max-w-[300px] h-auto rounded-lg"
                />
                <span className="mt-2 text-xs font-medium tracking-tighter">{file.name}</span>
                <button onClick={resetState} className="text-gray-500 hover:text-gray-700 mt-2">
                  Cancel
                </button>
              </div>

              <button
                onClick={uploadFile}
                disabled={uploadStatus === "uploading"}
                className=" px-12 py-4  duration-300 hover:scale-105  hover:border-2  hover:border-black bg-gradient-to-r from-stone-600 via-stone-400 to-stone-500   hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-black  hover:text-white  shadow-md text-white text-lg rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
              >
                {uploadStatus === "uploading" ? "Uploading..." : "Submit"}
              </button>
            </div>
          )}

          {uploadStatus === "uploading" && (
            <div className="mt-6 space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-lg text-gray-600">Uploading... {uploadProgress}%</p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}
        </div>

        {uploadStatus === "success" && processedImage && (
          <div className="  space-y-6">
            <div className="p-6 bg-stone-100 border-3 items-center  border-black rounded-lg shadow-md w-[600px] ">
              <h3 className="text-xl text-center font-medium mb-4">Processed Image:</h3>
              <img
                src={processedImage}
                alt="Processed"
                className="w-full max-w-[400px] h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
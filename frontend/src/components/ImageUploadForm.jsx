import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-image");
        setImageSrc(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("http://localhost:5000/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <img src={imageSrc} alt="Uploaded Image" />
      {/* "http://127.0.0.1:8000" */}
      {imageSrc ? (
        <img height={"50px"} src="http://5000/home/hp/ReactProjects/crudreact&node.js/backend/uploads/image-1687091848713-644837018.jpeg" alt="Uploaded Image" />
      ) : (
        <p>No image available</p>
      )}
    </>
  );
};

export default ImageUploadForm;

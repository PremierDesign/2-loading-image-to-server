import React, { useState } from "react";
import "./RoomPhotoUpload.css";

function RoomPhotoUpload({
  imageLoaded,
  setImagesLoaded,
  resetAnalysis,
  isLoading,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setImagesLoaded(true); // Set the imageLoaded state to true
      resetAnalysis(); // Reset the analysis results when a new image is uploaded
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <h2>Upload a photo of your room</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h3>Uploaded Photo:</h3>
          <div className="image-container">
            <img
              src={selectedImage}
              alt="Uploaded Room"
              style={{ width: "100%", maxWidth: "600px", marginTop: "20px" }}
            />
          </div>
          {isLoading && <div className="spinner"></div>}
        </div>
      )}
    </div>
  );
}

export default RoomPhotoUpload;

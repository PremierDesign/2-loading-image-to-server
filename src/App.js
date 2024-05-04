import "./App.css";
import RoomPhotoUpload from "./RoomPhotoUpload";
import AnalyzePhoto from "./AnalyzePhoto";
import { useState } from "react";

function App() {
  const [imageLoaded, setImagesLoaded] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const resetAnalysis = () => {
    setAnalysisResults(null);
    setImagesLoaded(false);
  };

  return (
    <>
      <RoomPhotoUpload
        imageLoaded={imageLoaded}
        isLoading={isLoading}
        setImagesLoaded={setImagesLoaded}
        resetAnalysis={resetAnalysis} // Pass the resetAnalysis function as a prop
      />
      <AnalyzePhoto
        analysisResults={analysisResults}
        setAnalysisResults={setAnalysisResults}
        isLoading={isLoading}
        setIsloading={setIsloading}
      />
    </>
  );
}

export default App;

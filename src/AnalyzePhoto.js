import React from "react";
import "./AnalyzePhoto.css";

function AnalyzePhoto({
  analysisResults,
  setAnalysisResults,
  isLoading,
  setIsloading,
}) {
  const analyzePhoto = async () => {
    setIsloading(true);
    const file = document.querySelector('input[type="file"]').files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3001/analyze-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const results = await response.json();
        if (
          results &&
          results.choices &&
          results.choices.length > 0 &&
          results.choices[0].message
        ) {
          setAnalysisResults(results.choices[0].message.content);
        } else {
          throw new Error("Unexpected response structure");
        }
      } else {
        console.error("Failed to analyze the photo.");
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAnalysisResults("Error processing your image. Please try again.");
    } finally {
      setIsloading(false);
    }
  };

  function formatListItems(text) {
    if (!text) return null; // Check if text is null or undefined
    const lines = text.split("\n");
    const firstSentence = lines[0];
    const listItems = lines.slice(1);

    return (
      <div id="responseID">
        <p>{firstSentence}</p>
        {listItems.length > 0 && (
          <ul>
            {listItems
              .filter((line) => line.trim() !== "")
              .map((line, index) => (
                <li key={index}>
                  {line.startsWith("* ") ? line.slice(2) : line}
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div>
      {!isLoading && !analysisResults && (
        <button onClick={analyzePhoto}>Analyze Photo</button>
      )}

      {isLoading && <div className="loader">Analyzing</div>}

      {analysisResults && <ul>{formatListItems(analysisResults)}</ul>}
    </div>
  );
}

export default AnalyzePhoto;

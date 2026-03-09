import React, { useEffect, useRef, useState } from "react";
import { createFaceLandmarker, detectExpression } from "../utils/utils";
import "../styles/faceExpressionTracker.scss";

const FaceExpressionTracker = () => {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");
  const faceLandmarkerRef = useRef(null);

  let runningMode = "VIDEO";

  useEffect(() => {
    const init = async () => {
      faceLandmarkerRef.current = await createFaceLandmarker({runningMode, videoRef});
    };

    init();
  }, []);

  const handleClick = async () => {
    await detectExpression(faceLandmarkerRef.current, videoRef, setExpression);
  };

  return (
    <>
      <main>
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline className="video-feed" />
          <h2 className="expression-box">{expression}</h2>
        </div>
        <button onClick={handleClick} className="button">
          Detect Expression
        </button>
      </main>
    </>
  );
};

export default FaceExpressionTracker;

import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceExpressionTracker() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("");

  useEffect(() => {
    let faceLandmarker;
    let animationFrameId;

    const initialize = async () => {
      const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm");

      faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-assets/face_landmarker_with_blendshapes.task",
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
      });

      startWebcam();
    };

    const startWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      const video = videoRef.current;

      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
        detect();
      };
    };

    const detect = async () => {
      const now = Date.now();
      const results = faceLandmarker.detectForVideo(videoRef.current, now);

      if (results.faceBlendshapes.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        const smile = blendshapes.find((b) => b.categoryName === "mouthSmileLeft");

        if (smile.score > 0.5) {
          setExpression("😊 Smiling");
        } else {
          setExpression("😐 Neutral");
        }
      }

      animationFrameId = requestAnimationFrame(detect);
    };

    initialize();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: 400 }} />
      <h2>{expression}</h2>
    </div>
  );
}

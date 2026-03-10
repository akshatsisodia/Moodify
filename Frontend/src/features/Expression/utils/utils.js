import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const createFaceLandmarker = async ({ runningMode, videoRef }) => {
  const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");

  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode,
    numFaces: 1,
  });

  startCamera({ videoRef });

  return faceLandmarker;
};

export const startCamera = async ({ videoRef }) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: "user",
    },
  });

  videoRef.current.srcObject = stream;
  videoRef.current.play();
};

export const detectExpression = async (faceLandmarker, videoRef, setExpression ) => {

    if (!faceLandmarker || !videoRef.current) return;

    const results = await faceLandmarker.detectForVideo(videoRef.current, performance.now());
    
  if (results.faceBlendshapes.length > 0) {
    const blendShapes = results.faceBlendshapes[0].categories;

    const smile = blendShapes.find((b) => b.categoryName === "mouthSmileLeft");

    const surprised = blendShapes.find((b) => b.categoryName === "jawOpen");

    const angry = blendShapes.find((b) => b.categoryName === "browDownLeft");

    const sad = blendShapes.find((b) => b.categoryName === "mouthFrownLeft");

    if (smile.score > 0.5) {
      setExpression("😊 Happy");
    } else if (surprised.score > 0.5) {
      setExpression("😲 Surprised");
    } else if (angry.score > 0.4) {
      setExpression("😡 Angry");
    } else if (sad.score > 0.02) {
      setExpression("🙁 Sad");
    } else {
      setExpression("😐 Neutral");
    }
  }
};

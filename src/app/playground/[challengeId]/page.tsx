/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useRef } from "react";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import Webcam from "react-webcam";
import getRandomWord from "../../../../utils/getRandomWord";
import Start from "@/components/start";
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation'
import { UserAuth } from "@/app/context/firebaseContext";

const Gesture: React.FC = (challengesData) => {
  const router = useRouter();

  console.log(challengesData);
  type RunningMode = "IMAGE" | "VIDEO";
  const searchParams = useSearchParams()

  const search = searchParams.get('challengeText')

  const webcamRef = useRef<Webcam | null>(null);
  const videoHeight = "360px";
  const videoWidth = "480px";

  const videoConstraints = {
    facingMode: "user",
  };

  const [gestureRecognizer, setGestureRecognizer] =
    useState<GestureRecognizer | null>(null);
  const [runningMode, setRunningMode] = useState<RunningMode>("VIDEO");
  const [webcamRunning, setWebcamRunning] = useState<boolean>(false);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recognizedLetter, setRecognizedLetter] = useState<string>("");
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [textChallenge, setTextChallenge] = useState<string>("placeholder");
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentLetter, setCurrentLetter] = useState<string>("");

  let animationFrameId: number;
  let lastVideoTime = -1;
  let webcamResults: any = undefined;

  async function createGestureRecognizer() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );

    const recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/visionx_gesture_recognizer/gesture_recognizer_better.task",
        delegate: "GPU",
      },
      runningMode: runningMode,
      numHands: 1,
    });
    setGestureRecognizer(recognizer);
  }

  useEffect(() => {
    setPageLoaded(true);
    // dont remove enableWebcam here, it is needed to only click the button once if removed you need to click it twice, which is bad
    enableWebcam();
  }, []);

  useEffect(() => {
    recognize();
    console.log("-".repeat(10));
  }, [recognizedLetter, textChallenge]);

  const PredictWebcam = async () => {
    if (webcamRef.current) {
      const videoElement = webcamRef.current.video;
      if (gestureRecognizer) {
        if (videoElement) {
          if (runningMode === "IMAGE") {
            setRunningMode("VIDEO");
            await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
          }
          const animate = async () => {
            const nowInMs = Date.now();

            if (videoElement.currentTime !== lastVideoTime) {
              lastVideoTime = videoElement.currentTime;
              webcamResults = gestureRecognizer.recognizeForVideo(
                videoElement,
                nowInMs
              );
            }

            videoElement.style.width = videoWidth;
            videoElement.style.height = videoHeight;
            if (webcamResults && webcamResults.gestures) {
              if (
                webcamResults.gestures.length > 0 &&
                webcamResults.handedness.length > 0
              ) {
                const categoryName =
                  webcamResults.gestures[0][0].categoryName || "none";
                const categoryScore: number = parseFloat(
                  Number(webcamResults.gestures[0][0].score * 100).toFixed(2)
                );
                if (categoryScore > 60) {
                  setRecognizedLetter(categoryName);
                }
              }
            }

            if (webcamRunning) {
              animationFrameId = requestAnimationFrame(animate);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
        }
      }
    }
  };

  // for future purpose, this code is to stop the webcam
  const stopAnimation = () => {
    cancelAnimationFrame(animationFrameId);
  };

  PredictWebcam();

  const enableWebcam = async () => {
    await createGestureRecognizer();
    if (!gestureRecognizer) {
      return;
    }

    setWebcamRunning((prev) => !prev);
    setIsPlaying((prev) => !prev);

    const enableWebcamButton = document.getElementById("webcamButton");

    if (enableWebcamButton) {
      enableWebcamButton.innerText = "Camera enabled";
    }

    const constraints = {
      video: true,
    };
    console.log("try open webcam");
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (webcamRef.current) {
        const videoElement = webcamRef.current.video;
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }

    setGestureRecognizer(null);
  };

  function recognize() {
    setTextChallenge(search!);

    if (textChallenge.length > 0) {
      const firstChallengeChar = textChallenge[0];
      setCurrentLetter(firstChallengeChar);
      console.log(currentLetter, "ja");
      if (
        recognizedLetter.toLowerCase() === firstChallengeChar.toLowerCase() ||
        ((recognizedLetter.toLowerCase() === "m" ||
          recognizedLetter.toLowerCase() === "n") &&
          (firstChallengeChar === "m" || firstChallengeChar === "n")) ||
        firstChallengeChar === "." ||
        firstChallengeChar === " " ||
        firstChallengeChar === "," ||
        firstChallengeChar === "!" ||
        firstChallengeChar === "?" ||
        firstChallengeChar === "-"
      ) {
        const recognizedTextInitial =
          recognizedText +
          (firstChallengeChar === firstChallengeChar.toUpperCase()
            ? firstChallengeChar
            : firstChallengeChar.toLowerCase());
        setRecognizedText(recognizedTextInitial);
        const textChallengeInitial = textChallenge.slice(1);
        setTextChallenge(textChallengeInitial);

        console.log("recognizedTextInitial", recognizedTextInitial);
        console.log("textChallengeInitial", textChallengeInitial);
      }
    } else {
      console.log('done');
      router.back()
    }
  }

  return (
    <div className="w-full h-full bg-white bg-dot-black/[0.1] flex flex-col items-center">
      {!hasStarted ? (
        <Start
          textChallenge={textChallenge}
          setHasStarted={setHasStarted}
          enableWebcam={enableWebcam}
        />
      ) : (
        <div className="flex w-full h-full">
          <div className="w-72 hidden">
            <Webcam
              videoConstraints={videoConstraints}
              audio={false}
              ref={webcamRef}
              className="absolute z-10 aspect-video opacity-0"
              id="webcam"
              width={videoWidth}
              height={videoHeight}
              autoPlay={isPlaying}
            />
          </div>
          <div className="w-3/5 h-3/5 m-auto">
            <h3 className="w-full text-8xl font-bold text-center mt-0">
              {recognizedLetter}
            </h3>
            <h3 className="w-full text-6xl font-bold text-center mt-6">
              <span id="recognized-text">{recognizedText}</span>
              <span id="text-challenge" className="text-gray-400">
                {textChallenge}
              </span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gesture;
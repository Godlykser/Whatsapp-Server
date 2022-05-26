import React, { useState } from "react";
import "./SendVoiceButton.css";

export default function SendvoiceMessageButton(props) {
  const [voiceURL, setVoiceURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const recordingStarted = mediaRecorder !== null;

  return (
    <>
      {!recordingStarted ? (
        <button
          className="voiceButton"
          onClick={() => {
            startRecordingVoiceNote().then((mediaRecorder) => {
              mediaRecorder.start();
              setMediaRecorder(mediaRecorder);
            });
          }}
        >
          <i className="bi bi-mic-fill"></i>
        </button>
      ) : (
        <button
          className="voiceButton"
          onClick={(e) => {
            mediaRecorder.stop().then((blob) => {
              props.sendMessage(e, "audio", URL.createObjectURL(blob));
              setMediaRecorder(null);
            });
          }}
        >
          <i className="bi bi-send" />
        </button>
      )}
    </>
  );
}

async function startRecordingVoiceNote() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);

  let audioChunks = [];

  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunks.push(event.data);
  });

  const start = () => {
    mediaRecorder.start();
  };

  // Stops recording, and asynchronously returns
  // a blob containing our audio.
  const stop = () => {
    return new Promise((resolve) => {
      // Set up a new event listener
      mediaRecorder.addEventListener("stop", () => {
        // Close the stream tracks
        stream
          .getTracks() // get all tracks from the MediaStream
          .forEach((track) => track.stop()); // stop each of them
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        resolve(audioBlob);
      });

      // After that's done, stop
      mediaRecorder.stop();
    });
  };

  // returns a function that enables mediarecorder to stop and save the audio
  // into a blob file and return it.
  return { start, stop };
}

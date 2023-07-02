import React, { useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    let stream = null;

    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Draw the current frame from the video onto the canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a base64 data URL
    const imageSrc = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageSrc);
  };

  return (
    <Box>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
      <Button variant="contained" color="primary" onClick={capturePhoto}>Capture Photo</Button>
      {capturedImage && (
        <Box mt={2}>
          <h3>Captured Photo:</h3>
          <img src={capturedImage} alt="Captured" />
        </Box>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Box>
  );
}

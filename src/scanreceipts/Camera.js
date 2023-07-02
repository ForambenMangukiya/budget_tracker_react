import { useEffect, useRef, useState, useContext } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import mindee from "./Mindee";
import { AuthContext } from "../context/AuthContext";

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    let stream = null;

    const enableCamera = async () => {
      console.log("camera is starting")
      try {
        // stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
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

  const capturePhoto = async () => {
    console.log("capture photo")
    const video = videoRef.current;
    const canvas = canvasRef.current;

     // Set the canvas dimensions to match the video dimensions
     canvas.width = video.videoWidth;
     canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a base64 data URL
    const imageSrc = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageSrc);

    // Create a new FormData object
    const formData = new FormData();
    formData.append('picture', dataURLtoFile(imageSrc, 'captured_image.jpg'));

    try {
      // Send the FormData to the API endpoint using axios
      console.log("posting the photo to DB", formData )
      const res = await axios.post('http://localhost:8080/api/upload', formData);
      console.log('Image uploaded:', res.data);

      const mindeeResponse = await mindee.parseReceipt(res.data.url)
      const transaction = mindee.convertMindeeResponseToTransaction(mindeeResponse)
      mindee.saveTransaction(token, transaction)

    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  // Helper function to convert data URL to a File object
  const dataURLtoFile = (dataURL, filename) => {
    console.log("converting data to file object" )
    
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    console.log("returning new file" )
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Box>
      <video ref={videoRef} style={{ width: '100%', height: 'auto', transform: 'scaleX(-1)' }} />
      <Button variant="contained" color="primary" onClick={capturePhoto}>
        Capture Photo
      </Button>
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

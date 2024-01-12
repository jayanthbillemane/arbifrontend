import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const CameraApp = () => {
  const webcamRef = useRef(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      sendImageToApi(imageSrc);
    }
  };

  const sendImageToApi = async (imageData) => {
    try {
      const formData = new FormData();
      formData.append('file', dataURItoBlob(imageData), 'image.jpg');

      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      const response = await axios.post('http://127.0.0.1:8000/uploadfile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { status, path } = response.data;

      if (status === true) {
        setApiResponse({ status, path });
        fetchImages(path);  // Fetch and update images
      } else {
        // If API status is false, retry sending the image
        setApiResponse(null);
        setTimeout(() => sendImageToApi(imageData), 2000); // Retry after 2 seconds
      }
    } catch (error) {
      console.error('Error sending image to API:', error);
      setApiResponse('Error');
    }
  };

  const fetchImages = async (imagePaths) => {
    try {
      const fetchedImages = await Promise.all(
        imagePaths.map(async (imagePath) => {
          const response = await fetch(`http://127.0.0.1:8000/${imagePath}`);
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        })
      );

      setUploadedImages(fetchedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Helper function to convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  useEffect(() => {
    if (apiResponse && apiResponse.status && apiResponse.path) {
      fetchImages(apiResponse.path);
    }
  }, [apiResponse]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Object Detection App</h1>
      <div style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={true}
          style={{ width: '100%' }}
        />
        <button onClick={captureImage} style={{ marginTop: '10px' }}>
          Capture Image
        </button>
      </div>
      {apiResponse && apiResponse.status && (
        <div>
          <h2>API Response:</h2>
          <p>Image uploaded successfully</p>
          {uploadedImages.length > 0 && (
  <div>
    <h2>Model Output:</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {uploadedImages.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          style={{ maxWidth: '100%', height: '150px', margin: '5px' }}
        />
      ))}
    </div>
  </div>
)}
        </div>
      )}
    </div>
  );
};

export default CameraApp;

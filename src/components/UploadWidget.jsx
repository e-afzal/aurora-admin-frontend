import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      // Cloudname found in cloudinary dashboard
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET
    }, (error, result) => {
      if (error) {
        console.log(result);
      }
    });
  }, []);

  return (
    <button onClick={() => widgetRef.current.open()}>UPLOAD</button>
  );
};

export default UploadWidget;
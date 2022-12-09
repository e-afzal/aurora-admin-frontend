import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      // Cloudname found in cloudinary dashboard
      cloudName: "ddeima5fc",
      uploadPreset: "xf4uvx7a"
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
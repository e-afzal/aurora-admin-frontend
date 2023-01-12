const Cloudinary = ({ handleOpenWidget, images, handleDeleteImage }) => {
  return (
    <section className="cloudinary">

      {/* UPLOAD BUTTON */}
      <button style={{ width: "45%" }} className="upload-button" onClick={handleOpenWidget}>
        upload
      </button>

      {/* PREVIEW IMAGE(S) */}
      <div className="images-preview-container" style={{ display: "flex", marginTop: "3rem" }}>
        {images.values && images.values.length >= 1 ? images.values.map((image, index) => (
          <div key={index} style={{ width: "50%", display: "flex", flexDirection: "column" }}>
            <img key={index} style={{ width: "100%", objectFit: "cover", marginRight: "2rem" }} src={image.url} alt="random image" />
            <img style={{ height: "20px", marginTop: "1rem", cursor: "pointer", display: "inline-block" }} src="/images/icons/trash-icon-red.svg" alt="Trash Icons" onClick={() => handleDeleteImage(image.public_id)} />
          </div>
        )) : null}
      </div>
    </section>
  );
};

export default Cloudinary;
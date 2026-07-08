function UploadBox({ image, setImage }) {

  function handleChange(e) {

    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }

  }

  return (
    <div>

      <h3>Upload Headshot</h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {image && (
        <p>
          Selected:
          {" "}
          {image.name}
        </p>
      )}

    </div>
  );
}

export default UploadBox;
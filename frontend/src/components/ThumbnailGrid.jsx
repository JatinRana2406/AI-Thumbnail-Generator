function ThumbnailGrid({ thumbnails }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Generated Thumbnails</h3>

      {thumbnails.length === 0 ? (
        <p>No thumbnails yet.</p>
      ) : (
        thumbnails.map((thumb) => (
          <img
            key={thumb.id}
            src={thumb.imagekit_url}
            alt=""
            width="250"
          />
        ))
      )}
    </div>
  );
}

export default ThumbnailGrid;
function ProgressBar({ loading }) {
  if (!loading) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <p>Generating thumbnails...</p>
    </div>
  );
}

export default ProgressBar;
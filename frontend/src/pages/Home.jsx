import { useState } from "react";

import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import PromptInput from "../components/PromptInput";
import ProgressBar from "../components/ProgressBar";
import ThumbnailGrid from "../components/ThumbnailGrid";
import Footer from "../components/Footer";

function Home() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [count, setCount] = useState(1);

  const [loading, setLoading] = useState(false);

  const [thumbnails, setThumbnails] = useState([]);

  const generateThumbnail = () => {
    alert("Backend integration coming next!");
  };

  return (
    <div className="container">

      <Navbar />

      <h1>AI Thumbnail Generator</h1>

      <UploadBox
        image={image}
        setImage={setImage}
      />

      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        count={count}
        setCount={setCount}
      />

      <button
        onClick={generateThumbnail}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <ProgressBar loading={loading} />

      <ThumbnailGrid thumbnails={thumbnails} />

      <Footer />

    </div>
  );
}

export default Home;
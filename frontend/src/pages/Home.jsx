import {
  uploadHeadshot,
  createJob,
  subscribeToJob,
} from "../api";

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

  const generateThumbnail = async () => {
  if (!image) {
    alert("Please upload a headshot.");
    return;
  }

  if (!prompt.trim()) {
    alert("Please enter a prompt.");
    return;
  }

  try {
    setLoading(true);
    setThumbnails([]);

    // Upload headshot
    const uploadResponse = await uploadHeadshot(image);

    // Create generation job
    const jobResponse = await createJob({
      prompt,
      numThumbnails: count,
      headshotUrl: uploadResponse.url,
    });

    // Listen for progress
    subscribeToJob(jobResponse.job_id, {
      onThumbnailReady: (thumbnail) => {
        setThumbnails((prev) => [...prev, thumbnail]);
      },

      onThumbnailFailed: (thumbnail) => {
        console.error("Thumbnail failed:", thumbnail);
      },

      onJobComplete: () => {
        console.log("Job completed");
        setLoading(false);
      },

      onError: (err) => {
        console.error(err);
        setLoading(false);
      },
    });

  } catch (err) {
    console.error(err);
    alert(err.message);
    setLoading(false);
  }
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
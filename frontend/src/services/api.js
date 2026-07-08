import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const uploadHeadshot = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload-headshot", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url;
};

export const createJob = async (data) => {
  const res = await api.post("/jobs", data);
  return res.data;
};

export const getJob = async (jobId) => {
  const res = await api.get(`/jobs/${jobId}`);
  return res.data;
};

export default api;
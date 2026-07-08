const API_BASE = "/api";

export async function uploadHeadshot(file){
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_BASE}/upload-headshot`, {
        method: "POST",
        body: form, 
    });
    if(!res.ok){
        throw new Error("Failed to upload headshot");
    }
    return res.json();
}

export async function createjob({prompt, numThumbnails, headshotUrl}){
    const res = await fetch(`${API_BASE}/job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt, numThumbnails: numThumbnails, headshot_url:headshotUrl}),
    });
    if(!res.ok){
        throw new Error("Failed to create job");
    }
    return res.json();
}

export async function subscribeToJob(jobId, {onThumbnailReady, onThumbnailFailed, onJobComplete, OnError}){
    const es = new EventSource(`${API_BASE}/job/${jobId}/events`);

    es.addEventListener("thumbnail_ready", (event) => {
        const data = JSON.parse(event.data);
        onThumbnailReady(data);
    });

    es.addEventListener("thumbnail_failed", (event) => {
        const data = JSON.parse(event.data);
        onThumbnailFailed(data);
    });

    es.addEventListener("job_completed", (event) => {
        const data = JSON.parse(event.data);
        onJobComplete(data);
        es.close();
    });

    es.addEventListener("error", (event) => {
        OnError(event);
        es.close();
    });

    return es;
} 
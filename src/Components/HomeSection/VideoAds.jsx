import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../API/Api";

export const VideoAds = () => {
  const [video, setVideo] = useState([]);

  const getAllVideo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllVideo`);
      const data = await response.data;
      setVideo(data);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    getAllVideo();
  }, []);

  return (
    <>
      <div className="title d-block">
        {video.length > 0 ? (
          <div>
            <h2>{video[0]?.video_heading}</h2>
            <span className="title-leaf"></span>
            <p>{video[0]?.video_text}</p>
            <video
              controls
              autoPlay
              loop
              muted
              className="w-100 mt-2 rounded-4"
              src={video[0]?.video_url || "No Video Found"} // Corrected logical OR
              type="video/mp4"
              loading="lazy" // Lazy load the video when it's near the viewport
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <p>No video found.</p>
        )}
      </div>
    </>
  );
};

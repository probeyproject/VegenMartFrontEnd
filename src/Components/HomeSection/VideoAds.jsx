import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import "./VideoAds.css"; // Import a CSS file for styling
import AOS from "aos";
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
     AOS.init({
      duration: 500, // Duration of the animation in milliseconds
      easing: "ease-in-out", // Type of easing for the animation
      once: true, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <>
      <div className="title d-block">
        {video.length > 0 ? (
          <div className="video-container" data-aos="zoom-in-right">
            <h2>{video[0]?.video_heading}</h2>
            <span className="title-leaf"></span>
            <p className="p-2" style={{textAlign:"justify"}}>{video[0]?.video_text}</p>
            <div className="video-wrapper"> 
              <video
                controls={true}
                autoPlay
                loop
                muted
                className="responsive-video"
                src={video[0]?.video_url || "No Video Found"}
                type="video/mp4"
                loading="lazy"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ) : (
          <p>No video found.</p>
        )}
      </div>
    </>
  );
};
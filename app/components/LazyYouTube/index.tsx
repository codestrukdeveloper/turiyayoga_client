"use client";

import React, { useRef, useState, useEffect } from "react";

interface LazyYouTubeProps {
  videoId: string;
  feedbackContent?: string;
  feedbackType?: string;
  status?: string;
}

const LazyYouTube: React.FC<LazyYouTubeProps> = ({ videoId, feedbackContent, feedbackType, status }) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const [isVideoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [cleanVideoId, setCleanVideoId] = useState<string>("");
  const iframeRef = useRef<HTMLDivElement>(null);

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:embed|v)\/|youtu\.be\/)([^?&\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const videoIde = extractVideoId(videoId);
    setCleanVideoId(videoIde || "");
  }, [videoId]);

  useEffect(() => {
    if (!iframeRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(iframeRef.current);
    return () => observer.disconnect();
  }, []);

  const [videoModal, setVideoModal] = useState<boolean>(false);

  const openModal = () => {
    setVideoModal(true);
  };

  return (
    <>
      {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
      {/* {videoModal && (
        <div className="card">
          <div className="card-body">
            <h3>card title</h3>
          </div>
        </div>
      )} */}

      <div ref={iframeRef} onClick={openModal} className="video_wrapper">
        {isIntersecting ? (
          <>
            {!isVideoLoaded && (
              <img
                src={`https://img.youtube.com/vi/${cleanVideoId}/hqdefault.jpg`}
                alt="Video thumbnail"
                width="560"
                height="315"
                onClick={() => setIntersecting(true)}
              />
            )}
            <iframe
              width="560"
              height="315"
              loading="lazy"
              src={videoId}
              allow=" clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
              style={{ visibility: isVideoLoaded ? "visible" : "hidden" }}
            ></iframe>
          </>
        ) : (
          <p>hello</p>
        )}
      </div>
    </>
  );
};

export default LazyYouTube;

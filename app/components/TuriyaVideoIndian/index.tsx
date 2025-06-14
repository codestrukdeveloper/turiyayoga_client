import React, { useEffect, useState } from "react";
import LazyYouTube from "@/app/components/LazyYouTube";
import axios from "axios";
import { fetchVideoTestimonials } from '@/app/services/testimonialService';

interface VideoData {
  youtubeLink: string;
  feedbackType: string;
  feedbackContent: string;
}

const TuriyaVideoIndian: React.FC = () => {
  const [videoId, setVideoId] = useState<string | null>("");
  const [data, setData] = useState<VideoData[]>([]);
  const [visibleVideos, setVisibleVideos] = useState<VideoData[]>([]);
  const [batchIndex, setBatchIndex] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
     const data = await fetchVideoTestimonials();
  
      const filteredData = data.filter((item: VideoData) => {
        return item.feedbackType === "Manu & Suzana als Ausbilder | Indien";
      });
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching video data", error);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      showMoreVideos();
    }
  }, [data]);

  useEffect(() => {
    if (batchIndex > 0) {
      const timer = setTimeout(() => {
        showMoreVideos();
      }, batchIndex === 1 ? 10000 : 20000);

      return () => clearTimeout(timer);
    }
  }, [batchIndex]);

  const showMoreVideos = () => {
    const videosToShow = 9 * (batchIndex + 1);
    setVisibleVideos(data.slice(0, videosToShow));
    setBatchIndex((prevIndex) => prevIndex + 1);
  };

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:embed|v)\/|youtu\.be\/)([^?&\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const modal = document.getElementById("exampleModalTestimonialsIndian");
    if (modal) {
      const handleModalClose = () => setVideoId("");
      modal.addEventListener("hidden.bs.modal", handleModalClose);
      return () => modal.removeEventListener("hidden.bs.modal", handleModalClose);
    }
  }, []);

  return (
    <>
      <section className="global_wrapper turiya_video2">
        <div className="container">
          <div className="global_wrapper__content" data-aos="zoom-in-up">
            <div className="leaf">
              <i className="bx bxs-leaf" />
            </div>
            <div className="main_heading">
              <h1>Manu &amp; Suzana als Ausbilder | Indien</h1>
              <p>
                Mach dir wegen der doppelt aufgeführten Gesichter keine Sorge.
                Da manche Videos Informationen über Manu und Suzana enthalten
                sind die doppelt aufgeführt :
              </p>
            </div>
          </div>
        </div>
        <div className="global_content">
          <div className="container">
            <div className="turiya_video__grid">
              {visibleVideos.map((response, index) => {
                const videoIde = extractVideoId(response.youtubeLink);
                return (
                  <div
                    className="turiya_video__box"
                    key={index}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalTestimonialsIndian"
                    onClick={() => {
                      setVideoId(response.youtubeLink);
                    }}>
                    <div className="turiya_img__box youtube_feedback">
                      <img
                        src={`https://img.youtube.com/vi/${videoIde}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        width="560"
                        height="315"
                      />
                      <i className="bx bx-play" style={{ cursor: "pointer" }} />
                    </div>
                    <h6>{response.feedbackContent}</h6>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="youtube_video">
          <div
            className="modal fade"
            id="exampleModalTestimonialsIndian"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <iframe
                    id="youtube-video"
                    width={560}
                    height={315}
                    src={videoId || undefined}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TuriyaVideoIndian;
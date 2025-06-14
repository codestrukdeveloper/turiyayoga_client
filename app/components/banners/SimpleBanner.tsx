"use client";

import React, { useEffect, useState } from "react";
import { BASE_URL_IMAGE } from "@/app/utils/config";

interface SimpleBannerProps {
  banner: string;
  heading: string;
  para: string;
  buttonTxt: string;
  videoLink: string;
}

const SimpleBanner: React.FC<SimpleBannerProps> = ({ banner, heading, para, buttonTxt, videoLink }) => {
  const [videoId, setVideoId] = useState<string | null>(videoLink);

  useEffect(() => {
    const modal = document.getElementById("exampleModal");

    if (modal) {
      const handleModalClose = () => setVideoId(null);

      modal.addEventListener("hidden.bs.modal", handleModalClose);

      return () => modal.removeEventListener("hidden.bs.modal", handleModalClose);
    }
  }, []);

  useEffect(() => {
    if (!videoId) {
      setVideoId(videoLink);
    }
  }, [videoId, videoLink]);

  return (
    <>
      <section className="banner_wrapper">
        <div
          className="banner_bg"
          style={{ backgroundImage: `url(${BASE_URL_IMAGE + `/images/custumer_testimonial/` + banner})` }}>
          <div className="banner-content container">
            <div className="row">
              <div className="col-lg-6">
                <div className="banner_bg__content" data-aos="fade-up">
                  <h1
                    className="animate__animated"
                    data-animation-in="animate__fadeInUp"
                    data-duration-in={1}>
                    {heading}
                  </h1>
                  {para !== "null" && (
                    <p>
                      <span
                        style={{
                          color: "rgb(33, 37, 41)",
                          fontFamily: "Roboto, sans-serif",
                          fontSize: 16,
                        }}>
                        {para}
                      </span>
                      <br />
                    </p>
                  )} {" "}
                  {buttonTxt !== "null" && (
                    <div
                      className="banner_bg__content-btn animate__animated"
                      data-animation-in="animate__fadeInUp"
                      data-duration-in={3}>
                      <div
                        className="video-btn mehr-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        <button>
                          <i className="bx bx-play" />
                          {buttonTxt}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="youtube_video">
        <div
          className="modal fade"
          id="exampleModal"
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
                  allowFullScreen></iframe> {" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleBanner;

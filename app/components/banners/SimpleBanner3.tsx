"use client";
import React, { useEffect, useState } from "react";

interface SimpleBannerProps {
  banner: string;
  heading: string;
  para: string;
  buttonTxt: string;
  videoLink: string;
}

const SimpleBanner3: React.FC<SimpleBannerProps> = ({
  banner,
  heading,
  para,
  buttonTxt,
  videoLink,
}) => {
  const [videoId, setVideoId] = useState<string | null>(videoLink);

  useEffect(() => {
    if (!videoId && videoLink) {
      setVideoId(videoLink);
    }
  }, [videoId, videoLink]);

  return (
    <>
      <section className="banner_wrapper" id="termine">
        <div
          className="banner_bg"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="banner-content container">
            <div className="row">
              <div className="col-lg-6">
                <div className="banner_bg__content" data-aos="fade-up">
                  <h1
                    className="animate__animated"
                    data-animation-in="animate__fadeInUp"
                    data-duration-in={1}
                  >
                    {heading}
                  </h1>

                  {para && para !== "null" && (
                    <p className="p-0 m-0">
                      <span
                        style={{
                          color: "rgb(33, 37, 41)",
                          fontFamily: "Roboto, sans-serif",
                          fontSize: 16,
                        }}
                      >
                        <p
                          className="p-0 m-0"
                          dangerouslySetInnerHTML={{ __html: para }}
                        />
                      </span>
                    </p>
                  )}

                  {buttonTxt && buttonTxt !== "null" && (
                    <div
                      className="banner_bg__content-btn animate__animated"
                      data-animation-in="animate__fadeInUp"
                      data-duration-in={3}
                    >
                      <div
                        className="video-btn mehr-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
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

      {/* Modal Section */}
      <div className="youtube_video">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setVideoId(null)}
                />
              </div>
              <div className="modal-body">
                {videoId && (
                  <iframe
                    id="youtube-video"
                    width={560}
                    height={315}
                    src={videoId}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleBanner3;

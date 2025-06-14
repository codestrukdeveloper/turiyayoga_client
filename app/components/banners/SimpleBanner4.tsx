'use client';
import React from 'react';

interface SimpleBannerProps {
  banner: string;
  heading: string;
  para: string;
  videoLink: string;
  buttonTxt:string;
}

const SimpleBanner4: React.FC<SimpleBannerProps> = ({ banner, heading, para, videoLink }) => {
  console.log('video link of all courses', videoLink);

  return (
    <>
      <section className="banner_wrapper">
        <div
          className="banner_bg img-fluid"
          style={{ backgroundImage: `url(${banner})` }}>
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
                  {para !== 'null' && (
                    <p className="p-0 m-0">
                      <span
                        style={{
                          color: 'rgb(33, 37, 41)',
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 16,
                        }}>
                        <p
                          className="p-0 m-0"
                          dangerouslySetInnerHTML={{ __html: para }}></p>
                      </span>
                    </p>
                  )}
                  <div
                    className="banner_bg__content-btn animate__animated"
                    data-animation-in="animate__fadeInUp"
                    data-duration-in={3}>
                    <div
                      className="video-btn mehr-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal">
                      MEHR
                    </div>
                  </div>
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
                  src={videoLink || ''}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen></iframe>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleBanner4;

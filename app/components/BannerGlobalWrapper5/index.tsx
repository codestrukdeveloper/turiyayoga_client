'use client';

import React, { useEffect, useState } from 'react';
import { fetchVideoTestimonials } from '@/app/services/testimonialService';

interface VideoData {
  youtubeLink: string;
  feedbackType: string;
  feedbackContent: string;
  name: string;
}

const BannerGlobalWrapper5: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [videoId, setVideoId] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  loadVideos();
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

 const loadVideos = async () => {
  try {
    const data = await fetchVideoTestimonials();
    const filteredData = data.filter(
      (item: VideoData) => item.feedbackType === 'Turiya Yogalehrer Ausbildung'
    );
    setVideos(filteredData.slice(0, 6));
  } catch (error) {
    console.error('Error fetching video testimonials:', error);
  } finally {
    setLoading(false);
  }
};


  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:embed|v)\/|youtu\.be\/)([^?&\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const modal = document.getElementById('exampleModalTestimonials');
    if (modal) {
      const handleModalClose = () => {
        setVideoId('');
        const iframe = document.getElementById('youtube-video') as HTMLIFrameElement | null;
        if (iframe) {
          iframe.src = 'about:blank'; // Changed from empty string to 'about:blank'
        }
      };

      modal.addEventListener('hidden.bs.modal', handleModalClose);
      modal.addEventListener('hide.bs.modal', handleModalClose);

      return () => {
        modal.removeEventListener('hidden.bs.modal', handleModalClose);
        modal.removeEventListener('hide.bs.modal', handleModalClose);
      };
    }
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      const interval = setInterval(() => {
        const maxSlides = isMobile ? videos.length : Math.ceil(videos.length / 2);
        setCurrentSlide((prev) => (prev + 1) % maxSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [videos, isMobile]);

  const nextSlide = () => {
    const maxSlides = isMobile ? videos.length : Math.ceil(videos.length / 2);
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    const maxSlides = isMobile ? videos.length : Math.ceil(videos.length / 2);
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getSlideWidth = () => (isMobile ? 100 : 50);
  const getMaxSlides = () => (isMobile ? videos.length : Math.ceil(videos.length / 2));

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  return (
    <section className="global_wrapper fifth_section">
      <div className="container">
        <div className="row">
          {/* LEFT TEXT BLOCK */}
          <div className="col-lg-4">
            <div
              className="fifth_section__left aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={100}
              style={{ marginBottom: typeof window !== 'undefined' && window.innerWidth < 992 ? '30px' : '0' }}
            >
              <h3>AUSBILDUNG AUF HÖCHSTEM NIVEAU</h3>
              <h1>Das sagen unsere Teilnehmer</h1>
              <p>
                Die Gründer von Turiya Yoga sind die Kursleiter unserer Yogalehrer Ausbildungen und werden in jedem
                Schritt zusammen mit anderen Experten für dich da sein. Bei uns verlierest du dich nicht in der Menge.
                Hier weißt du genau, wer während dieses transformativen Wegs wirklich für dich da sein wird.
              </p>
            </div>
          </div>

          {/* VIDEO SLIDER */}
          <div className="col-lg-8">
            <div
              style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                borderRadius: '8px',
                minHeight: isMobile ? 'auto' : '450px',
                padding: isMobile ? '0 15px' : '0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease',
                  transform: `translateX(-${currentSlide * getSlideWidth()}%)`,
                  height: '100%',
                }}
              >
                {videos.map((video, index) => {
                  const videoIde = extractVideoId(video.youtubeLink);
                  return (
                    <div
                      key={index}
                      style={{
                        minWidth: isMobile ? '100%' : '50%',
                        padding: '0 8px',
                        flexShrink: 0,
                        height: '100%',
                      }}
                      data-aos="fade-up"
                      data-aos-delay={200 + index * 100}
                    >
                      <div
                        style={{
                          height: isMobile ? 'auto' : '400px',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          backgroundColor: '#fff',
                        }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            paddingBottom: isMobile ? '56.25%' : '0',
                            height: isMobile ? '0' : '320px',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={`https://img.youtube.com/vi/${videoIde}/hqdefault.jpg`}
                            className="img-fluid"
                            alt={`Video testimonial ${index}`}
                            style={{
                              position: isMobile ? 'absolute' : 'static',
                              top: '0',
                              left: '0',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              cursor: 'pointer',
                            }}
                            onClick={() => setVideoId(video.youtubeLink)}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalTestimonials"
                          >
                            <i
                              className="bx bx-play"
                              style={{
                                fontSize: isMobile ? '40px' : '50px',
                                color: '#fff',
                                background: 'rgba(0,0,0,0.7)',
                                borderRadius: '50%',
                                padding: isMobile ? '8px' : '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: isMobile ? '56px' : '74px',
                                height: isMobile ? '56px' : '74px',
                              }}
                              onMouseOver={(e) => {
                                (e.target as HTMLElement).style.background = 'rgba(0,0,0,0.9)';
                                (e.target as HTMLElement).style.opacity = '0.9';
                              }}
                              onMouseOut={(e) => {
                                (e.target as HTMLElement).style.background = 'rgba(0,0,0,0.7)';
                                (e.target as HTMLElement).style.opacity = '1';
                              }}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            flexGrow: 1,
                            background: '#fff',
                            padding: isMobile ? '15px' : '20px',
                            color: '#000',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <p
                            style={{
                              fontSize: isMobile ? '14px' : '16px',
                              lineHeight: '1.5',
                              marginBottom: '10px',
                              display: '-webkit-box',
                              WebkitLineClamp: isMobile ? '3' : '4',
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {video.feedbackContent}
                          </p>
                          <h6
                            style={{
                              fontSize: isMobile ? '14px' : '16px',
                              fontWeight: 600,
                              margin: 0,
                              color: '#333',
                            }}
                          >
                            {video.name}
                          </h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Arrows */}
              <button
                onClick={prevSlide}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: isMobile ? '5px' : '10px',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  width: isMobile ? '35px' : '40px',
                  height: isMobile ? '35px' : '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <i className="bx bx-chevron-left" style={{ fontSize: isMobile ? '20px' : '24px' }}></i>
              </button>
              <button
                onClick={nextSlide}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: isMobile ? '5px' : '10px',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  width: isMobile ? '35px' : '40px',
                  height: isMobile ? '35px' : '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <i className="bx bx-chevron-right" style={{ fontSize: isMobile ? '20px' : '24px' }}></i>
              </button>

              {/* Dots */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                  gap: '8px',
                }}
              >
                {Array.from({ length: getMaxSlides() }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      width: isMobile ? '10px' : '12px',
                      height: isMobile ? '10px' : '12px',
                      borderRadius: '50%',
                      background: index === currentSlide ? '#333' : '#ccc',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <div className="youtube_video">
          <div
            className="modal fade"
            id="exampleModalTestimonials"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
          >
            <div
              className="modal-dialog modal-lg"
              style={{
                maxWidth: isMobile ? '95%' : '800px',
                margin: isMobile ? '1.75rem 15px' : '1.75rem auto',
              }}
            >
              <div
                className="modal-content"
                style={{
                  border: 'none',
                  height: isMobile ? '300px' : '560px',
                  borderRadius: '8px',
                }}
              >
                <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: '0' }}>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setVideoId('');
                      const iframe = document.getElementById('youtube-video') as HTMLIFrameElement | null;
                      if (iframe) iframe.src = 'about:blank'; // Changed from empty string to 'about:blank'
                    }}
                  />
                </div>
                <div className="modal-body">
                  <div
                    style={{
                      position: 'relative',
                      paddingBottom: '56.25%',
                      height: '0',
                      overflow: 'hidden',
                    }}
                  >
                    <iframe
                      id="youtube-video"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      src={videoId || 'about:blank'} // Changed from empty string to 'about:blank'
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
        </div>
      </div>
    </section>
  );
};

export default BannerGlobalWrapper5;
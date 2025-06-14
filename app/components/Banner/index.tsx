'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import Link from 'next/link';

const Banner: React.FC = () => {
    const [animationKey, setAnimationKey] = useState<number>(0);

    const originalVideos = [
        'https://www.youtube.com/embed/izCAn3uvYLo?si=G3ONv3CWqpgPietY',
        'https://www.youtube.com/embed/z6z4-bnDhws?si=Ta2BO26WIj6YIa-a',
        'https://www.youtube.com/embed/m09ZGlZXq54?si=Q6TsbqQ-qeKboBoo',
        'https://www.youtube.com/embed/Fixnb004sWk?si=o3XtHn4ZJ6nly4EN',
        'https://www.youtube.com/embed/MtwssrenPzM',
    ];

    const [videoIds, setVideoIds] = useState<(string | null)[]>(originalVideos);

    const handleSlideChange = () => setAnimationKey((prev) => prev + 1);

    useEffect(() => {
        const attachModalEvent = (
            modalId: string,
            index: number,
            originalUrl: string
        ) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                const resetVideo = () => {
                    const updated = [...videoIds];
                    updated[index] = null;
                    setVideoIds(updated);
                };
                modal.addEventListener('hidden.bs.modal', resetVideo);

                return () => modal.removeEventListener('hidden.bs.modal', resetVideo);
            }
        };

        const cleanups = originalVideos.map((_, idx) =>
            attachModalEvent(`exampleModal${idx === 0 ? '' : idx + 2}`, idx, originalVideos[idx])
        );

        return () => {
            cleanups.forEach((cleanup) => cleanup?.());
        };
    }, [videoIds]);

    // Reset null video IDs
    useEffect(() => {
        const restored = videoIds.map((id, idx) => id ?? originalVideos[idx]);
        setVideoIds(restored);
    }, [videoIds[0], videoIds[1], videoIds[2], videoIds[3], videoIds[4]]);

    return (
        <>
            <Swiper
                navigation
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={1500}
                modules={[Autoplay, Navigation]}
                onSlideChange={handleSlideChange}
                className="mySwiper"
            >

                {/* Repeat for each slide */}
                <SwiperSlide key={`${animationKey}-1`}>
                    <div className="banner_bg banner_bg1">
                        <div className="banner-content container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="banner_bg__content" data-aos="fade-up">
                                        <h1 className="animate__animated animate__fadeInUp">
                                            Yogalehrer Ausbildungen- Frankfurt am Main
                                        </h1>
                                        <p className="animate__animated animate__fadeInUp">
                                            16 Tage Hatha - Vinyasa Yogalehrer Intensivausbildung{' '}
                                            <strong>200H - AYA zertifiziert</strong> ab 2.999€ zzgl.
                                            Unterkunft & Verpflegung in Frankfurt am Main.
                                        </p>
                                        <div className="banner_bg__content-btn animate__animated animate__fadeInUp">
                                            <div className="mehr-btn">
                                                <Link href="/">MEHR</Link>
                                            </div>
                                            <div className="video-btn mehr-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <button><i className="bx bx-play" /> video</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Add SwiperSlides 2-6 exactly as you had them here — only update Link to <Link href="..." /> */}

                {/* Add your SwiperSlide components 2-6 below as-is, replacing Link `to` with `href` */}

            </Swiper>

            {/* Video Modals */}
            {videoIds.map((id, index) => {
                const modalId = `exampleModal${index === 0 ? '' : index + 2}`;
                return (
                    <div className="youtube_video" key={modalId}>
                        <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        <iframe
                                            width={560}
                                            height={315}
                                            src={id || ''}
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
                );
            })}
        </>
    );
};

export default Banner;

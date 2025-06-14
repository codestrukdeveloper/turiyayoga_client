"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { fetchTestimonials, Testimonial as TestimonialType } from "@/app/services/testimonialService";
import { BASE_URL_IMAGE } from "@/app/utils/config";
import "./testimonial.scss";

const Testimonial: React.FC = () => {
    const [data, setData] = useState<TestimonialType[]>([]);

    useEffect(() => {
        fetchTestimonials()
            .then((data) => {
                if (data?.length > 0) {
                    setData(data);
                }
            })
            .catch((error) => {
                console.error("Testimonial fetch error:", error);
            });
    }, []);

    return (
        <>
            <section className="testimonial_wrapper global_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <Swiper
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper">
                                {data &&
                                    data.map((testimonial) => {
                                        return (
                                            <SwiperSlide>

                                                <div className="d-flex justify-content-center">
                                                    <div className="text-center">
                                                        <div className="client_img" style={{ display: 'flex', justifyContent: 'center' }}>

                                                            <Image
                                                                src={BASE_URL_IMAGE + `/images/testimonial/${testimonial?.profileImage}`}
                                                                alt={testimonial.name}
                                                                width={150}
                                                                height={150}
                                                                className="img-fluid"
                                                                priority={true} // Optional: preload important images
                                                            />
                                                        </div>
                                                        <div className="testimonial_parra mt-4">
                                                            <p>{testimonial.feedbackContent}</p>

                                                            <h6>{testimonial.name}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonial;

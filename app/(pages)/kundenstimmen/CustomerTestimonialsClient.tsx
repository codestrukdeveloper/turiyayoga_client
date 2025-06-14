"use client";
import React, { useEffect } from "react";
import SimpleBanner from "@/app/components/banners/SimpleBanner";
import CheckWrapper from "@/app/components/CheckWrapper";
import ParralaxWrapper from "@/app/components/ParralaxWrapper";
import NewsShelter from "@/app/components/NewsShelter";
import Testimonial from "@/app/components/Testimonial";
import Gallery from "@/app/components/Gallery";
import TuriyaVideo from "@/app/components/TuriyaVideo";
import TuriyaVideoIndian from "@/app/components/TuriyaVideoIndian";

interface CourseData {
  Ausbildung: string;
  Offerprice: number;
  OfferEndDate: string;
  price: number;
  Location: string;
  StartDate: string;
  EndDate: string;
}

interface CustomerTestimonial {
  Slide_Image?: string;
  Slider_Heading?: string;
  Slider_Paragraph?: string;
  Slider_videolink?: string;
  about_First_Section_Peragraph_Content?: string;
  about_First_Section_Sub_Peragraph?: string;
  about_First_Section_heading?: string;
  about_Second_Section_Heading?: string;
  about_Second_Section_Peragraph_Content?: string;
  about_Second_Section_Sub_Peragraph?: string;
  meta_Description?: string;
  meta_Keywords?: string;
  meta_Title?: string;
  status?: string;
}

interface CustomerTestimonialsClientProps {
  courses: CourseData[];
  testimonials: CustomerTestimonial;
}

const CustomerTestimonialsClient: React.FC<CustomerTestimonialsClientProps> = ({
  courses,
  testimonials,
}) => {
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const isOfferValid = (offerEndDate: string | null): boolean => {
    if (!offerEndDate) return false;
    return new Date() <= new Date(offerEndDate);
  };

  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const closestUpcomingCourse = courses[0] || null;

  return (
    <section>
      <SimpleBanner
        videoLink={testimonials.Slider_videolink ?? ''}
        banner={testimonials.Slide_Image ?? ''}
        heading={testimonials.Slider_Heading ?? ''}
        para={testimonials.Slider_Paragraph ?? ''}
        buttonTxt="KUNDENSTIMMEN VIDEO"
      />

      <section className="global_wrapper about_wrapper" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="about_wrapper__left" data-aos="fade-up">
                <h3>{testimonials.about_First_Section_heading}</h3>
                <h1>{testimonials.about_First_Section_Sub_Peragraph}</h1>
                <p
                  className="p-0"
                  dangerouslySetInnerHTML={{
                    __html: testimonials.about_First_Section_Peragraph_Content || "",
                  }}
                ></p>
                <div className="about_wrapper__left-img">
                  <img
                    src="/assets/images/turiya_yoga_yogalehrer_ausbildung_geschichte_manu_suzana.webp"
                    alt="turiya_yoga_yogalehrer_ausbildung_geschichte_manu_suzana"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="about_wrapper__right mb-3">
                {closestUpcomingCourse ? (
                  <div>
                    <h3>{closestUpcomingCourse.Ausbildung}</h3>
                    <div className="price-tag">
                      <h6>
                        <i className="bx bxs-purchase-tag" />
                        {isOfferValid(closestUpcomingCourse.OfferEndDate) && closestUpcomingCourse.Offerprice > 0 ? (
                          <>
                            {closestUpcomingCourse.Offerprice}€
                            <sub>
                              <del style={{ color: "#E07542", fontSize: "17px", marginLeft: "10px" }}>
                                {closestUpcomingCourse.price}
                              </del>
                            </sub>
                          </>
                        ) : (
                          <>{closestUpcomingCourse.price}€</>
                        )}
                      </h6>
                    </div>
                    <div className="about-date">
                      {isOfferValid(closestUpcomingCourse.OfferEndDate) && closestUpcomingCourse.Offerprice > 0 && (
                        <p>
                          Das Angebot endet am <i className="bx bxs-calendar" />
                          {formatDate(closestUpcomingCourse.OfferEndDate)}
                        </p>
                      )}
                      <p>
                        <i className="bx bxs-map" /> {closestUpcomingCourse.Location}
                      </p>
                      <p>
                        <i className="bx bxs-calendar" />
                        {formatDate(closestUpcomingCourse.StartDate)} - {formatDate(closestUpcomingCourse.EndDate)}
                      </p>
                    </div>
                    <div className="about-contact">
                      <a href="tel:+4906920134987">
                        <i className="bx bxs-phone-call" /> +49 (0)69 - 20134987
                      </a>
                      <a href="mailto:info@turiyayoga.de">
                        <i className="bx bxs-envelope" /> info@turiyayoga.de
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="about-text">
                      <p>
                        Reise und Unterkunft sind nicht immer im Schulungspreis enthalten. Wenn Sie weitere Fragen haben, rufen Sie uns einfach an. Wir helfen Ihnen gerne weiter.
                      </p>
                    </div>
                    <div className="about-contact">
                      <a href="tel:+4906920134987">
                        <i className="bx bxs-phone-call" /> +49 (0)69 - 20134987
                      </a>
                      <a href="mailto:info@turiyayoga.de">
                        <i className="bx bxs-envelope" /> info@turiyayoga.de
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TuriyaVideo />
      <TuriyaVideoIndian />
      <CheckWrapper />
      <ParralaxWrapper />
      <Testimonial />
      <Gallery />
      <NewsShelter />
    </section>
  );
};

export default CustomerTestimonialsClient;
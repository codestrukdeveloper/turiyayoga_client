'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import SimpleBanner3 from '@/app/components/banners/SimpleBanner3';
import Contact from '@/app/components/Contact';
import NewsShelter from '@/app/components/NewsShelter';
import Gallery from '@/app/components/Gallery';
import Testimonial from '@/app/components/Testimonial';
import BannerGlobalWrapper from '@/app/components/BannerGlobalWrapper';
import CheckWrapper from '@/app/components/CheckWrapper';
import ParralaxWrapper from '@/app/components/ParralaxWrapper';
import BannerGlobalTableWrapper from '@/app/components/BannerGlobalTableWrapper';
import { BASE_URL_IMAGE } from '@/app/utils/config';
import '@/app/components/yoga_teacher_training_Mallorca/YogaTraningMallorca.scss';
import '@/app/components/bali/yogateacherTrining.scss';

interface CategoryContentProps {
  slug: string;
  closestUpcomingCourse: any[];
  mainData: any;
}

const CategoryContent: React.FC<CategoryContentProps> = ({
  slug,
  closestUpcomingCourse,
  mainData
}) => {
  console.log("mainData",mainData)
  const he = require('he');
  const [bannerImg, setBannerImg] = useState('');
  const [decodedContent, setDecodedContent] = useState('');
  const [videoId, setVideoId] = useState('https://www.youtube.com/embed/z6z4-bnDhws?si=Ta2BO26WIj6YIa-a');
  const [activeIndex1, setActiveIndex1] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (mainData) {
      const imageUrl = mainData.yogaTeamSlideImage
        ? `${BASE_URL_IMAGE}/images/coursewebpage/${mainData.yogaTeamSlideImage}`
        : '';
      setBannerImg(imageUrl);
      setDecodedContent(he.decode(mainData.about_first_section_Paragraph_Content || ''));
    }
  }, [mainData]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  const isOfferValid = (offerEndDate: string) => {
    if (!offerEndDate) return false;
    return new Date() <= new Date(offerEndDate);
  };

  const handleToggle = (index: number) => {
    setActiveIndex1(activeIndex1 === index ? null : index);
  };

  if (!mainData) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5 gap-5">
        <div className="spinner-border text-success" role="status"></div>
        <p className="mb-0">Loading module details. Please wait....</p>
      </div>
    );
  }

  const selectedSections = mainData.selectedSections || [];
  const faqItems1 = mainData.faqs || {};

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{mainData.metaTitle || 'Zertifizierte Yogalehrer Ausbildung bei Turiya Yoga | Starte Deine Karriere im Yoga'}</title>
        <meta
          name="description"
          content={
            mainData.metaDescription ||
            'Entdecke die zertifizierte Yogalehrer Ausbildung bei Turiya Yoga – international anerkannt und umfassend. Starte deine Reise zu einem erfüllten Yoga-Leben!'
          }
        />
        <link rel="canonical" href={mainData.canonicalLink || ''} />
      </Head>

      {selectedSections.includes('banner-section') && (
        <SimpleBanner3
          banner={bannerImg}
          heading={mainData.yogaTeamSliderHeading}
          para={mainData.yogaTeamSliderParagraph}
          videoLink={mainData.yogaTeamSliderVideoLink}
          buttonTxt={mainData.bannerButton}
        />
      )}

      {/* About Section */}
      <section className="global_wrapper about_wrapper">
        <div className="container">
          {selectedSections.includes('module-earlybid-card') ? (
            <div className="row">
              <div className="col-lg-9">
                <div className="about_wrapper__left">
                  {mainData.about_first_section_sub_Paragraph && <h3>{mainData.about_first_section_sub_Paragraph}</h3>}
                  {mainData.about_first_section_Heading && <h1>{mainData.about_first_section_Heading}</h1>}
                  <div dangerouslySetInnerHTML={{ __html: decodedContent }} />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="about_wrapper__right mb-3">
                  {closestUpcomingCourse[0] ? (
                    <div>
                      <h3>{closestUpcomingCourse[0]?.Ausbildung}</h3>
                      <div className="price-tag">
                        <h6>
                          <i className="bx bxs-purchase-tag" />
                          {isOfferValid(closestUpcomingCourse[0].OfferEndDate) &&
                            closestUpcomingCourse[0].Offerprice > 0 ? (
                            <>
                              {closestUpcomingCourse[0].Offerprice}€
                              <sub>
                                <del className="text-danger ms-2">{closestUpcomingCourse[0].price}€</del>
                              </sub>
                            </>
                          ) : (
                            <>{closestUpcomingCourse[0]?.price}€</>
                          )}
                        </h6>
                      </div>
                      <div className="about-date">
                        {isOfferValid(closestUpcomingCourse[0].OfferEndDate) &&
                          closestUpcomingCourse[0].Offerprice > 0 && (
                            <p>
                              Das Angebot endet am <i className="bx bxs-calendar" />{' '}
                              {formatDate(closestUpcomingCourse[0].OfferEndDate)}
                            </p>
                          )}
                        <p>
                          <i className="bx bxs-map" /> {closestUpcomingCourse[0]?.Location}
                        </p>
                        <p>
                          <i className="bx bxs-calendar" />
                          {formatDate(closestUpcomingCourse[0]?.StartDate)} -{' '}
                          {formatDate(closestUpcomingCourse[0]?.EndDate)}
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
                      <p>{closestUpcomingCourse[0]?.Ausbildung}</p>
                      <p>
                        Reise und Unterkunft sind nicht immer im Schulungspreis enthalten. Rufen Sie uns gerne an.
                      </p>
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
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="about_wrapper__left">
                  {mainData.about_first_section_sub_Paragraph && <h3>{mainData.about_first_section_sub_Paragraph}</h3>}
                  {mainData.about_first_section_Heading && <h1>{mainData.about_first_section_Heading}</h1>}
                  <div dangerouslySetInnerHTML={{ __html: decodedContent }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {selectedSections.includes("4-location-card-section") && <section className="global_wrapper third_section">
        <div className="container">
          <div className="global_wrapper__content" data-aos="zoom-in-up">
            <div className="leaf">
              <i className="bx bxs-leaf" />
            </div>
            <div className="main_heading">
              <h1>Turiya Yoga bietet Yogalehrer-Ausbildungen in</h1>
            </div>
          </div>
        </div>
        <div className="global_content">
          <div className="container">
            <div className="yogalehrer-grid">
              <div
                className="third_section__box"

                data-aos-delay={100}>
                <div className="box_img">
                  <img src="/assets/images/mallorca_thumb.webp" className="img-fluid" alt="yoga" />
                </div>
                <div className="box_content">
                  <h3>Deutschland</h3>
                  <p>
                    Für diejenigen, die ihre Yogalehrerausbildung in einem
                    behaglichen Rückzugsort im eigenen Land absolvieren
                    möchten – umgeben von Quellen, frischer Luft und den
                    Wäldern des Taunus, ist das Sampurna Seminarhaus nur 30
                    Minuten von Wiesbaden und Mainz entfernt und somit ideal
                    erreichbar.
                  </p>
                  <div className="mehr--btn">
                    <Link href='/module/200h-aya-yogalehrer-ausbildung-sampurna-seminarhaus'  >
                      MEHR
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="third_section__box"

                data-aos-delay={200}>
                <div className="box_img">
                  <img
                    src="/assets/images/sampurna_thumb.webp"
                    className="img-fluid"
                    alt="sampurna_thumb"
                  />
                </div>
                <div className="box_content">
                  <h3>Mallorca</h3>
                  <p>
                    Für all jene, die die berühmten Sandstrände Mallorcas
                    genießen möchten – bieten wir die Yogalehrer-Ausbildung
                    auf Mallorca an. Besuche uns und erlebe eine wundervolle
                    Zeit in der Turiya Yoga Finca. Unser Paket beinhaltet
                    erstklassige Verpflegung und Unterkunft.
                  </p>
                  <div className="mehr--btn">
                    <Link href='/module/200h-aya-yogalehrer-ausbildung-i-mallorca' >
                      MEHR
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="third_section__box"

                data-aos-delay={300}>
                <div className="box_img">
                  <img
                    src="/assets/images/goa_thumb.webp"
                    className="img-fluid"
                    alt="goa_thumb"
                  />
                </div>
                <div className="box_content">
                  <h3>Goa, Indien</h3>
                  <p>
                    Wenn du deine Yogaausbildung am Strand absolvieren
                    möchtest, jedoch auch einen Einblick in die Wurzeln des
                    Yoga erhalten willst, bieten wir dir die Möglichkeit, in
                    Goa, Indien, deine Ausbildung zu machen. Dort, vor der
                    Kulisse von Kokosnussplantagen und grünen Hügeln,
                    findest du zweifellos einige der schönsten Strände.
                  </p>
                  <div className="mehr--btn">
                    <Link href='/module/200h-aya-yogalehrer-ausbildung-goa-indien' >
                      MEHR
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="third_section__box"

                data-aos-delay={400}>
                <div className="box_img">
                  <img
                    src="/assets/images/himachal_thumb.webp"
                    className="img-fluid"
                    alt="himachal_thumb"
                  />
                </div>
                <div className="box_content">
                  <h3>Himachal, Indien</h3>
                  <p>
                    Himachal in Indien ist bekannt für seine fröhlichen
                    Menschen, die immergrüne Natur und die außerordentlich
                    frische Luft. Es ist ein herausragender Ort für die
                    Yoga-Praxis in Indien. Das Dorf Bhagsu, das etwa 2100
                    Meter über dem Meeresspiegel liegt und in der Nähe des
                    Haupttempels des Dalai Lama zu finden ist...
                  </p>
                  <div className="mehr--btn">
                    <Link href='/module/yogalehrerausbildung-himalaya-indien' >
                      MEHR
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {selectedSections.includes('5-module-card-section') && <BannerGlobalWrapper />}
      {slug === 'alle-kommenden-kurse' && <BannerGlobalTableWrapper />}
      {selectedSections.includes("faq-section") && <section className="yin_yoga_faq" id="myFaq">
        <div className="container">
          {faqItems1 && Object.entries(faqItems1).map(([categoryName, faqCategory], categoryIndex) => (
            <div className="faq_wrapper__content" key={categoryIndex}>
              <div className="faq_heading">
                <h3>{categoryName}</h3>
              </div>
              <div className="faq_box">
                {(faqCategory as any[]).map((faq:any) => (
                  <div
                    key={faq._id}
                    className={`faq_box__content ${activeIndex1 === faq._id ? "active" : ""}`}
                    onClick={() => handleToggle(faq._id)}
                  >
                    <div className="question">
                      <div className="plus">
                        <i
                          className={`bx ${activeIndex1 === faq._id ? "bx-minus" : "bx-plus"}`}
                        />
                      </div>
                      <h6>{faq.question}</h6>
                    </div>
                    {activeIndex1 === faq._id && (
                      <div className="answer">
                        {faq.answer.split('\n').map((paragraph:any, idx:number) => (
                          <p key={idx} className="mb-3">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>}

      {selectedSections.includes('gallery') && <Gallery />}
      {selectedSections.includes('text-testimonials') && <Testimonial />}
      {selectedSections.includes('benefits') && <CheckWrapper />}
      {selectedSections.includes('bottom-banner') && <ParralaxWrapper />}
      {selectedSections.includes('contact-us-section') && <Contact />}
      {selectedSections.includes('newsletter') && <NewsShelter />}
    </>
  );
};

export default CategoryContent;

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { addCourseToCart } from '@/app/services/categoryService';
import { BASE_URL_IMAGE } from '@/app/utils/config';
import SimpleBanner3 from '@/app/components/banners/SimpleBanner3';
import Contact from '@/app/components/Contact';
import NewsShelter from '@/app/components/NewsShelter';
import Gallery from '@/app/components/Gallery';
import Testimonial from '@/app/components/Testimonial';
import CheckWrapper from '@/app/components/CheckWrapper';
import ParralaxWrapper from '@/app/components/ParralaxWrapper';
import BannerGlobalWrapper from '@/app/components/BannerGlobalWrapper';

interface CourseData {
    _id: string;
    Ausbildung: string;
    StartDate: string;
    EndDate: string;
    Location: string;
    price: number;
    Offerprice: number;
    OfferEndDate: string;
    Place: number;
}

interface MainData {
    metaTitle?: string;
    metaDescription?: string;
    canonicalLink?: string;
    yogaTeamSlideImage?: string;
    yogaTeamSliderHeading?: string;
    yogaTeamSliderParagraph?: string;
    yogaTeamSliderVideoLink?: string;
    bannerButton?: string;
    about_first_section_sub_Paragraph?: string;
    about_first_section_Heading?: string;
    about_first_section_Paragraph_Content?: string;
    selectedSections: string[];
    faqs?: Record<string, Array<{
        _id: string;
        question: string;
        answer: string;
    }>>;
}

interface SubCategoryClientProps {
    initialData: MainData;
    initialClosestUpcomingCourse: CourseData[];
    slug: string;
}

const SubCategoryClient: React.FC<SubCategoryClientProps> = ({
    initialData,
    initialClosestUpcomingCourse,
    slug
}) => {
    console.log("etetete", initialData, initialClosestUpcomingCourse)
    const he = require('he');
    const router = useRouter();
    const [mainData] = useState<MainData>(initialData);
    const [closestUpcomingCourse] = useState<CourseData[]>(initialClosestUpcomingCourse);
    const [upcomingCourse, setUpcomingCourse] = useState<CourseData[]>([]);
    const [bannerImg, setBannerImg] = useState<string>('');
    const [decodedContent, setDecodedContent] = useState<string>('');
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
    const [activeIndex1, setActiveIndex1] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Set banner image
        const imageUrl = mainData?.yogaTeamSlideImage
            ? `${BASE_URL_IMAGE}/images/modulewebpage/${mainData.yogaTeamSlideImage}`
            : '';
        setBannerImg(imageUrl);

        // Decode content
        if (mainData?.about_first_section_Paragraph_Content) {
            setDecodedContent(he.decode(mainData.about_first_section_Paragraph_Content));
        }
    }, [mainData]);

    const formatDate = (dateString: string): string => {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;
    };

    const isOfferValid = (offerEndDate: string): boolean => {
        if (!offerEndDate) return false;
        const today = new Date();
        const offerEnd = new Date(offerEndDate);
        return today <= offerEnd;
    };

    const handletriggerDialogBox = (courseid: string) => {
        const auth_token = localStorage.getItem('turiya_auth_token');

        if (auth_token) {
            handleAddToCart(courseid);
        } else {
            setIsDialogVisible(true);
        }
    };

    const handleAddToCart = async (courseid: string) => {
        const userId = localStorage.getItem('turiya_auth_id');

        if (!userId) {
            setIsDialogVisible(true);
            return;
        }

        try {
            const response = await addCourseToCart(courseid, userId);

            if (response) {
                Swal.fire({
                    title: 'Danke!',
                    text: 'Kurs im Warenkorb hinzugefügt!',
                    icon: 'success'
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            Swal.fire({
                icon: 'error',
                title: 'Benachrichtigung',
                text: 'Etwas ist schiefgelaufen!',
                footer: '<a href="#">Warum habe ich dieses Problem?</a>'
            });
        }
    };

    const closeDialogBox = () => {
        setIsDialogVisible(false);
    };

    const handleToggle = (section: number, index: string) => {
        setActiveIndex1(activeIndex1 === index ? null : index);
    };

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    return (
        <div>
            {/* Banner Section */}
            {mainData?.selectedSections?.includes('banner-section') && (
                <SimpleBanner3
                    banner={bannerImg}
                    heading={mainData.yogaTeamSliderHeading ?? ""}
                    para={mainData.yogaTeamSliderParagraph ?? ""}
                    videoLink={mainData.yogaTeamSliderVideoLink ?? ""}
                    buttonTxt={mainData.bannerButton ?? ""}
                />
            )}

            {/* About Section */}
            <section className="global_wrapper about_wrapper">
                <div className="container">
                    {mainData?.selectedSections?.includes('module-earlybid-card') ? (
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="about_wrapper__left">
                                    {mainData.about_first_section_sub_Paragraph !== 'null' &&
                                        mainData.about_first_section_sub_Paragraph !== '' && (
                                            <h3>{mainData.about_first_section_sub_Paragraph}</h3>
                                        )}
                                    {mainData.about_first_section_Heading !== 'null' &&
                                        mainData.about_first_section_Heading !== '' && (
                                            <h1>{mainData.about_first_section_Heading}</h1>
                                        )}
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
                                                                <del style={{
                                                                    color: '#E07542',
                                                                    fontSize: '17px',
                                                                    marginLeft: '10px',
                                                                }}>
                                                                    {closestUpcomingCourse[0].price}
                                                                </del>
                                                            </sub>
                                                        </>
                                                    ) : (
                                                        <>{closestUpcomingCourse[0].price}€</>
                                                    )}
                                                </h6>
                                            </div>
                                            <div className="about-date">
                                                {isOfferValid(closestUpcomingCourse[0].OfferEndDate) &&
                                                    closestUpcomingCourse[0].Offerprice > 0 && (
                                                        <p>
                                                            Das Angebot endet am
                                                            <i className="bx bxs-calendar" />
                                                            {formatDate(closestUpcomingCourse[0].OfferEndDate)}
                                                        </p>
                                                    )}
                                                <p>
                                                    <i className="bx bxs-map" />
                                                    {closestUpcomingCourse[0].Location}
                                                </p>
                                                <p>
                                                    <i className="bx bxs-calendar" />
                                                    {formatDate(closestUpcomingCourse[0].StartDate)}
                                                    <span className="my-2">-</span>
                                                    {formatDate(closestUpcomingCourse[0].EndDate)}
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
                                        <div className="div">
                                            <div className="about-text">
                                                <p>
                                                    Reise und Unterkunft sind nicht immer im Schulungspreis
                                                    enthalten. Wenn Sie weitere Fragen haben, rufen Sie uns
                                                    einfach an. Wir helfen Ihnen gerne weiter.
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
                    ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="about_wrapper__left">
                                    {mainData.about_first_section_sub_Paragraph !== 'null' &&
                                        mainData.about_first_section_sub_Paragraph !== '' && (
                                            <h3>{mainData.about_first_section_sub_Paragraph}</h3>
                                        )}
                                    {mainData.about_first_section_Heading !== 'null' &&
                                        mainData.about_first_section_Heading !== '' && (
                                            <h1>{mainData.about_first_section_Heading}</h1>
                                        )}
                                    <div dangerouslySetInnerHTML={{ __html: decodedContent }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 4 Location Cards Section */}
            {mainData?.selectedSections?.includes('4-location-card-section') && (
                <section className="global_wrapper third_section">
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
                                <div className="third_section__box" data-aos-delay={100}>
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
                                            <Link href='/module/200h-aya-yogalehrer-ausbildung-sampurna-seminarhaus'>
                                                MEHR
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="third_section__box" data-aos-delay={200}>
                                    <div className="box_img">
                                        <img src="/assets/images/sampurna_thumb.webp" className="img-fluid" alt="sampurna_thumb" />
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
                                            <Link href='/module/200h-aya-yogalehrer-ausbildung-i-mallorca'>
                                                MEHR
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="third_section__box" data-aos-delay={300}>
                                    <div className="box_img">
                                        <img src="/assets/images/goa_thumb.webp" className="img-fluid" alt="goa_thumb" />
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
                                            <Link href='/module/200h-aya-yogalehrer-ausbildung-goa-indien'>
                                                MEHR
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="third_section__box" data-aos-delay={400}>
                                    <div className="box_img">
                                        <img src="/assets/images/himachal_thumb.webp" className="img-fluid" alt="himachal_thumb" />
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
                                            <Link href='/module/yogalehrerausbildung-himalaya-indien'>
                                                MEHR
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Other sections */}
            {mainData?.selectedSections?.includes('5-module-card-section') && <BannerGlobalWrapper />}

            {/* FAQ Section */}
            {mainData?.selectedSections?.includes('faq-section') && (
                <section className="yin_yoga_faq" id="myFaq">
                    <div className="container">
                        {mainData.faqs && Object.entries(mainData.faqs).map(([categoryName, faqCategory], categoryIndex) => (
                            <div className="faq_wrapper__content" key={categoryIndex}>
                                <div className="faq_heading">
                                    <h3>{categoryName}</h3>
                                </div>
                                <div className="faq_box">
                                    {faqCategory.map((faq) => (
                                        <div
                                            key={faq._id}
                                            className={`faq_box__content ${activeIndex1 === faq._id ? 'active' : ''}`}
                                            onClick={() => handleToggle(1, faq._id)}
                                        >
                                            <div className="question">
                                                <div className="plus">
                                                    <i className={`bx ${activeIndex1 === faq._id ? 'bx-minus' : 'bx-plus'}`} />
                                                </div>
                                                <h6>{faq.question}</h6>
                                            </div>
                                            {activeIndex1 === faq._id && (
                                                <div className="answer">
                                                    {faq.answer.split('\n').map((paragraph, idx) => (
                                                        <div key={idx} className="mb-3">
                                                            {paragraph}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Course Table Section */}
            {mainData?.selectedSections?.includes('module-section') && upcomingCourse.length > 0 && (
                <div style={{
                    backgroundColor: '#F9F9F9',
                    paddingTop: '30px',
                    paddingBottom: '30px',
                }}>
                    <div className="container">
                        <div className="table-responsive index-table" style={{ backgroundColor: '#F9F9F9' }}>
                            <table className="table custom-table aos-init" data-aos="zoom-in-up">
                                <thead style={{ backgroundColor: '#F9F9F9' }}>
                                    <tr className="table-heading" style={{ backgroundColor: '#F9F9F9' }}>
                                        <th scope="col" style={{ backgroundColor: '#F9F9F9' }}>
                                            Ausbildungsorte
                                        </th>
                                        <th scope="col" style={{ backgroundColor: '#F9F9F9' }}>
                                            Datum
                                        </th>
                                        <th scope="col" style={{ backgroundColor: '#F9F9F9' }}>
                                            Ort
                                        </th>
                                        <th scope="col" className="germany-price" style={{ backgroundColor: '#F9F9F9' }}>
                                            Preis/Frühbucher
                                        </th>
                                        <th scope="col" style={{ backgroundColor: '#F9F9F9' }}>
                                            Freie Plätze
                                        </th>
                                        <th scope="col" style={{ backgroundColor: '#F9F9F9' }}>

                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="table-body desktop" style={{ backgroundColor: '#F9F9F9' }}>
                                    {upcomingCourse.map((item, index) => (
                                        item.Place && item.Place !== 0 ? (
                                            <tr style={{ backgroundColor: '#F9F9F9' }} key={index}>
                                                <th style={{ backgroundColor: '#F9F9F9' }}>
                                                    {item?.Ausbildung}
                                                </th>
                                                <td style={{ backgroundColor: '#F9F9F9' }}>
                                                    <i className="bx bxs-calendar me-1" />
                                                    {formatDate(item.StartDate)} &nbsp;-&nbsp;
                                                    <i className="bx bxs-calendar me-1" />
                                                    {formatDate(item.EndDate)}
                                                </td>
                                                <td style={{ backgroundColor: '#F9F9F9' }}>
                                                    <a href="#" className="location">
                                                        <i className="bx bxs-map me-1" />
                                                        {item.Location}
                                                    </a>
                                                </td>
                                                <td style={{ backgroundColor: '#F9F9F9' }}>
                                                    {isOfferValid(item.OfferEndDate) && item.Offerprice > 0 ? (
                                                        <>
                                                            <span style={{ color: '#E07542' }}>
                                                                € {item.Offerprice}
                                                            </span>
                                                            <span className="ms-2">
                                                                <del>€{item.price}</del>
                                                            </span>
                                                            <br />
                                                            <small>
                                                                Das Angebot endet am <br />
                                                                <i className="bx bxs-calendar"></i> {formatDate(item.OfferEndDate)}
                                                            </small>
                                                        </>
                                                    ) : (
                                                        <span>€{item.price}</span>
                                                    )}
                                                </td>
                                                <td style={{
                                                    backgroundColor: '#F9F9F9',
                                                    color: item.Place <= 3 ? '#E07542' : 'black',
                                                }}>
                                                    {item.Place <= 3
                                                        ? `Noch ${item.Place} Plätze frei`
                                                        : `Noch ${item.Place} Plätze frei`}
                                                </td>
                                                <td style={{ backgroundColor: '#F9F9F9' }}>
                                                    <button
                                                        onClick={() => handletriggerDialogBox(item._id)}
                                                        style={{
                                                            backgroundColor: item.Place <= 3 ? '#FF5722' : '#9BBB59',
                                                            border: '0px solid',
                                                        }}
                                                        className="table-btn triggerDialogBox"
                                                    >
                                                        ANMELDEN
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : null
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Dialog */}
            {isDialogVisible && (
                <div
                    id="modalOverlay"
                    className="hiddenOverlayContainer"
                    style={{ display: 'block' }}
                >
                    <div className="customDialogBox">
                        <span className="exitButtonTrigger" onClick={closeDialogBox}>
                            ×
                        </span>
                        <div className="dialogIcon">
                            <Image src="/assets/images/high-important.png" style={{ width: 80 }} alt="" />
                        </div>
                        <p className="mt-3">
                            Um den Kauf abzuschließen, musst du dich zuerst einloggen!
                        </p>
                        <button
                            className="dialogActionButton"
                            style={{ cursor: 'pointer' }}
                            onClick={handleLoginRedirect}
                        >
                            Go to Login/Registrierung.
                        </button>
                    </div>
                </div>
            )}

            {/* Additional sections */}
            {mainData?.selectedSections?.includes('gallery') && <Gallery />}
            {mainData?.selectedSections?.includes('text-testimonials') && <Testimonial />}
            {mainData?.selectedSections?.includes('benefits') && <CheckWrapper />}
            {mainData?.selectedSections?.includes('bottom-banner') && <ParralaxWrapper />}
            {mainData?.selectedSections?.includes('contact-us-section') && <Contact />}
            {mainData?.selectedSections?.includes('newsletter') && <NewsShelter />}
        </div>
    );
};

export default SubCategoryClient;
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { BASE_URL, BASE_URL_IMAGE } from "@/app/utils/config";
import NewsShelter from "@/app/components/NewsShelter";
import Contact from "@/app/components/Contact";
import Gallery from "@/app/components/Gallery";

interface Course {
  _id: string;
  Ausbildung: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  price: number;
  Offerprice: number;
  OfferEndDate: string;
  Place: string;
}

interface OurStoryData {
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

interface OurStoryClientProps {
  initialOurStoryData: OurStoryData;
  initialClosestUpcomingCourses: Course[];
  initialGoaCourses: Course[];
}

const OurStoryClient: React.FC<OurStoryClientProps> = ({
  initialOurStoryData,
  initialClosestUpcomingCourses,
  initialGoaCourses,
}) => {
     const [closestUpcomingCourse, setClosestUpcomingCourse] = useState<Course[]>(initialClosestUpcomingCourses);
  const [upcomingCourse, setUpcomingCourse] = useState<Course[]>(initialGoaCourses);
  const [ourStory, setOurStory] = useState<OurStoryData>(initialOurStoryData);
  const [videoId, setVideoId] = useState<string>(initialOurStoryData.Slider_videolink || "");
  const [earlyData, setEarlyData] = useState<Course | null>(null);
  const [bannerImg, setBannerImg] = useState<string>("");
  const [galleries, setGalleries] = useState<string>("");
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const images = [
"/assets/images/gallery-images/img_1.webp",
"/assets/images/gallery-images/img_2.webp",
"/assets/images/gallery-images/img_3.webp",
"/assets/images/gallery-images/img_4.webp",
"/assets/images/gallery-images/img_5.webp",
"/assets/images/gallery-images/img_6.webp",
"/assets/images/gallery-images/img_7.webp",
"/assets/images/gallery-images/img_3.webp",
"/assets/images/gallery-images/img_4.webp",
"/assets/images/gallery-images/img_2.webp",
"/assets/images/gallery-images/img_1.webp",
"/assets/images/gallery-images/img_6.webp",
  ];

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const fetchNextUpcomingCourse = async () => {
    try {
      const response = await axios.get<{ data: Course[] }>(`${BASE_URL}/getClosestUpcomingCourseswithNull`);
      setClosestUpcomingCourse(response.data.data);
    } catch (error) {
      console.error("Error fetching upcoming courses:", error);
    }
  };

  const getUpcomingCourse = async () => {
    try {
      const response = await axios.get<{ data: Course[] }>(`${BASE_URL}/getModuleByLocation/Goa`);
      setUpcomingCourse(response.data.data);
    } catch (error) {
      console.error("Error fetching Goa courses:", error);
    }
  };

  const fetchEarlyBirdData = async () => {
    try {
      const response = await axios.get<{ data: Course[] }>(`${BASE_URL}/getClosestUpcomingCourseswithNull`);
      setEarlyData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching early bird data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<{ data: OurStoryData[] }>(`${BASE_URL}/our_stories`);
      const data = response.data.data[0];
      
      setOurStory({
        Slide_Image: data.Slide_Image,
        Slider_Heading: data.Slider_Heading,
        Slider_Paragraph: data.Slider_Paragraph,
        Slider_videolink: data.Slider_videolink,
        about_First_Section_Peragraph_Content: data.about_First_Section_Peragraph_Content,
        about_First_Section_Sub_Peragraph: data.about_First_Section_Sub_Peragraph,
        about_First_Section_heading: data.about_First_Section_heading,
        about_Second_Section_Heading: data.about_Second_Section_Heading,
        about_Second_Section_Peragraph_Content: data.about_Second_Section_Peragraph_Content,
        about_Second_Section_Sub_Peragraph: data.about_Second_Section_Sub_Peragraph,
        meta_Description: data.meta_Description,
        meta_Keywords: data.meta_Keywords,
        meta_Title: data.meta_Title,
        status: data.status,
      });

      setVideoId(data.Slider_videolink || "");
      setBannerImg(data.Slide_Image ? `${BASE_URL_IMAGE}/images/our_story/${data.Slide_Image}` : "");
    } catch (error) {
      console.error("Error fetching our story data:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
    fetchData();
    fetchEarlyBirdData();
    getUpcomingCourse();
    fetchNextUpcomingCourse();
  }, []);

  useEffect(() => {
    if (!videoId && ourStory.Slider_videolink) {
      setVideoId(ourStory.Slider_videolink);
    }
  }, [videoId, ourStory.Slider_videolink]);

  const handleImgDialog = (index: number) => {
    setCurrentIndex(index);
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const isOfferValid = (offerEndDate?: string): boolean => {
    if (!offerEndDate) return false;
    const today = new Date();
    const offerEnd = new Date(offerEndDate);
    return today <= offerEnd;
  };

  return (
    <section id="OurStory">
      <div>
        <div className="form-body">
          <div
            className="modal fade"
            id="exampleModal-form"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel-form"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-body-top">
                    <form method="POST" id="user_login_form">
                      <div className="modal_input">
                        <label>E-Mail<span>*</span></label>
                        <input
                          type="email"
                          name="email"
                          id="user_email"
                          placeholder="Email"
                        />
                      </div>
                      <div className="modal_input">
                        <label>Passwort <span>*</span></label>
                        <input
                          type="password"
                          name="password"
                          id="user_password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="submit-form">
                        <button
                          name="login_info"
                          type="submit"
                          className="global_btn"
                        >
                          Einloggen
                        </button>
                      </div>
                      <div className="mt-3 text-danger" id="login_alert" />
                    </form>
                  </div>
                  <div className="form-body-bottom card-footer">
                    <div className="password-forgot">
                      <Link href="forgot-login.php" className="btn btn-primary">
                        Passwort vergessen?
                      </Link>
                    </div>
                    <h3>Hast du noch keinen Account?</h3>
                    <div className="annmelden">
                      <Link href="registration.php">Anmelden</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-overlay">
          <div className="cart-overlay-content">
            <button id="update-cart">
              <i className="bx bx-trash" />
            </button>
            <div className="cart-overlay-heading" id="cart_content"></div>
          </div>
        </div>

        <div className="cart-overlay"></div>

        <section className="banner_wrapper">
          <div
            className="banner_bg"
            style={{
              backgroundImage: bannerImg ? `url(${bannerImg})` : "none",
            }}
          >
            <div className="banner-content container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="banner_bg__content" data-aos="fade-up">
                    <h1 className="animate__animated" data-animation-in="animate__fadeInUp" data-duration-in={1}>
                      {ourStory.Slider_Heading}
                    </h1>
                    <p
                      className="p-0"
                      dangerouslySetInnerHTML={{
                        __html: ourStory.Slider_Paragraph || "",
                      }}
                    />
                    <div className="banner_bg__content-btn animate__animated" data-animation-in="animate__fadeInUp" data-duration-in={3}>
                      <div className="video-btn mehr-btn" data-bs-toggle="modal" data-bs-target="#exampleModal-yt">
                        <button>
                          <i className="bx bx-play" /> KUNDENSTIMMEN VIDEO
                        </button>
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
            id="exampleModal-yt"
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
                    onClick={() => setVideoId("")}
                  />
                </div>
                <div className="modal-body">
                  <iframe
                    id="youtube-video"
                    width="560"
                    height="315"
                    src={videoId}
                    title="YouTube video player"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="global_wrapper about_wrapper" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="about_wrapper__left" data-aos="fade-up">
                  <h3>{ourStory.about_First_Section_heading}</h3>
                  <h1>{ourStory.about_First_Section_Sub_Peragraph}</h1>
                  <p
                    style={{
                      marginTop: 20,
                      marginRight: 0,
                      marginLeft: 0,
                      padding: 0,
                      fontFamily: "Roboto, sans-serif",
                      fontSize: 15,
                      lineHeight: "1.8",
                      color: "rgb(33, 37, 41)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: ourStory.about_First_Section_Peragraph_Content || "",
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="about_wrapper__right mb-3">
                  {closestUpcomingCourse[0] ? (
                    <div>
                      <h3>{closestUpcomingCourse[0].Ausbildung}</h3>
                      <div className="price-tag">
                        <h6>
                          <i className="bx bxs-purchase-tag" />
                          {isOfferValid(closestUpcomingCourse[0].OfferEndDate) && closestUpcomingCourse[0].Offerprice > 0 ? (
                            <>
                              {closestUpcomingCourse[0].Offerprice}€
                              <sub>
                                <del
                                  style={{
                                    color: "#E07542",
                                    fontSize: "17px",
                                    marginLeft: "10px",
                                  }}
                                >
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
                        {isOfferValid(closestUpcomingCourse[0].OfferEndDate) && closestUpcomingCourse[0].Offerprice > 0 && (
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
          </div>
        </section>

        <div className="form-body">
          <div
            className="modal fade"
            id="exampleModal-form"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel-form"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-body-top">
                    <div className="modal_input">
                      <label>Benutzername <span>*</span></label>
                      <input type="text" />
                    </div>
                    <div className="modal_input">
                      <label>Passwort <span>*</span></label>
                      <input type="text" />
                    </div>
                    <div className="submit-form">
                      <button className="global_btn">Einloggen</button>
                    </div>
                  </div>
                  <div className="form-body-bottom card-footer">
                    <div className="password-forgot">
                      <Link href="forgot-login.php" className="btn btn-primary">
                        Passwort vergessen?
                      </Link>
                    </div>
                    <h3>Hast du noch keinen Account?</h3>
                    <div className="annmelden">
                      <Link href="registration.php">Anmelden</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="about_turiya">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="about_turiya__left" data-aos="fade-up">
                  <div className="about_turiya__box">
                    <Link href="/category/200h-aya-yogalehrer-ausbildung-intensiv">
                      <div className="about_turiya__box-img">
                        <Image
                          src="/assets/images/turiya_yoga_yogalehrer_ausbildung.webp"
                          className="img-fluid"
                          alt="200H Yogalehrer Ausbildung"
                          width={300}
                          height={200}
                        />
                      </div>
                      <div className="about_turiya__box-content">
                        <p>200H Yogalehrer</p>
                        <p>Ausbildung </p>
                      </div>
                    </Link>
                  </div>
                  <div className="about_turiya__box">
                    <Link href="/module/blockausbildung-berblick">
                      <div className="about_turiya__box-img">
                        <Image
                          src="/assets/images/turiya_yoga_yogalehrer_ausbildung_block.webp"
                          className="img-fluid"
                          alt="Blockausbildungen"
                          width={300}
                          height={200}
                        />
                      </div>
                      <div className="about_turiya__box-content">
                        <p>Blockausbildungen</p>
                      </div>
                    </Link>
                  </div>
                  <div className="about_turiya__box">
                    <Link href="/kundenstimmen">
                      <div className="about_turiya__box-img">
                        <Image
                          src="/assets/images/turiya_yoga_home_manu_akash.webp"
                          className="img-fluid"
                          alt="Kundenstimmen"
                          width={300}
                          height={200}
                        />
                      </div>
                      <div className="about_turiya__box-content">
                        <p>Kundenstimmen</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="about_turiya__right">
                  <h1>{ourStory.about_Second_Section_Heading}</h1>
                  <div
                    style={{
                      color: "rgb(33, 37, 41)",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "14.4px",
                      backgroundColor: "rgb(249, 249, 249)",
                    }}
                  >
                    <p style={{ margin: "1rem 0px 6px", padding: 0, fontSize: 15, lineHeight: "1.8" }}>
                      Bald darauf traf ich Suzana, eine brasilianische
                      Rucksackreisende, die eine einjährige
                      Yogalehrer-Ausbildung am renommierten
                      Kaivalyadhama-Institut absolviert hatte. Gemeinsam
                      reisten wir nach Indien, Deutschland, Thailand und
                      Brasilien, boten erschwingliche Yoga-Kurse an und
                      vertieften unsere Praxis durch Iyengar- und Vinyasa
                      Flow-Trainings. Währenddessen entstand unsere Vision,
                      eine Yoga-Akademie zu gründen. Wir wollten bessere
                      Yogalehrer ausbilden und verbesserte Programme anbieten.
                    </p>
                    <p style={{ margin: "1rem 0px 6px", padding: 0, fontSize: 15, lineHeight: "1.8" }}>
                      Suzana hatte vor ihrer Indienreise bereits umfassende
                      Yoga-Praxiserfahrung. Sie erkannte die Bedeutung eines
                      klaren Verständnisses der Yoga-Geschichte und
                      philosophischen Traditionen, die oft in
                      Yogalehrerausbildungen vernachlässigt wurden. Wir fanden
                      viele schlecht ausgebildete Yogalehrer in verschiedenen
                      Ländern, was uns dazu motivierte, hochwertige
                      Ausbildungen anzubieten.
                    </p>
                    <p style={{ margin: "1rem 0px 6px", padding: 0, fontSize: 15, lineHeight: "1.8" }}>
                      Suzanas familiärer Hintergrund umfasste eine Vielzahl
                      spiritueller Praktiken und tiefgründiger Perspektiven
                      zur menschlichen Psyche, darunter japanisches Zen,
                      christliche Mystik, jungianische Psychologie und
                      Hypnotherapie. Diese Vielfalt inspirierte sie früh, das
                      Potenzial des Glücks durch Yoga zu erkennen. Sie
                      absolvierte ihre Hatha Yoga-Lehrerausbildung und wagte
                      dann den Neuanfang in Indien, eine prägende Entscheidung
                      für ihr Leben.
                    </p>
                    <p style={{ margin: "1rem 0px 6px", padding: 0, fontSize: 15, lineHeight: "1.8" }}>
                      Unsere Zusammenkunft mit der indischen Kultur und unsere
                      persönliche Begegnung veränderten uns nachhaltig. Turiya
                      Yoga entstand aus diesem Austausch heraus, eine Mischung
                      aus vielen Elementen, geschaffen von leidenschaftlichen
                      Yogalehrern. Nach erfolgreichen internationalen
                      Ausbildungen in Indien sind wir nun bereit, unsere
                      Programme auch in Deutschland anzubieten.
                    </p>
                    <p style={{ margin: "1rem 0px 6px", padding: 0, fontSize: 15, lineHeight: "1.8" }}>
                      Wir gründeten diese Akademie als Antwort auf eine Welt,
                      in der Yogalehrerausbildungen oft vernachlässigt werden.
                      Trotz des florierenden Yoga-Geschäfts verdient dieser
                      Beruf Respekt und Anerkennung. Unsere Akademie bietet
                      eine sichere Lernumgebung, qualitativ hochwertigen
                      Unterricht und hat zahlreichen Schülern geholfen,
                      selbstbewusste internationale Yogalehrer zu werden.
                    </p>
                    <p style={{ margin: "1rem 0px 6px", padding: 0, fontSize: 15, lineHeight: "1.8" }}>
                      Unsere Mission ist es, einen integrativen
                      Gesundheitsstil zugänglich zu machen und Menschen zu
                      vereinen, die die uralte Schule der Selbsterkenntnis
                      lernen, lehren und erleben möchten. Die Akademie fördert
                      den ehrlichen Austausch zwischen Lehrern,
                      Praktizierenden, Studenten und unterstützenden
                      Unternehmen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />
        <Gallery />
        <NewsShelter />

        <div className="form-body">
          <div
            className="modal fade"
            id="exampleModal-form"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel-form"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-body-top">
                    <div className="modal_input">
                      <label>Benutzername <span>*</span></label>
                      <input type="text" />
                    </div>
                    <div className="modal_input">
                      <label>Passwort <span>*</span></label>
                      <input type="text" />
                    </div>
                    <div className="submit-form">
                      <button className="global_btn">Einloggen</button>
                    </div>
                  </div>
                  <div className="form-body-bottom card-footer">
                    <div className="password-forgot">
                      <Link href="forgot-login.php" className="btn btn-primary">
                        Passwort vergessen?
                      </Link>
                    </div>
                    <h3>Hast du noch keinen Account?</h3>
                    <div className="annmelden">
                      <Link href="registration.php">Anmelden</Link>
                    </div>
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

export default OurStoryClient;
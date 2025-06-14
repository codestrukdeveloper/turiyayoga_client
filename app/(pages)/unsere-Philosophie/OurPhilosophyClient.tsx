"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

interface OurPhilosophyData {
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

interface Props {
  initialUpcomingCourses: Course[];
  initialPhilosophyData: OurPhilosophyData;
}

const OurPhilosophyClient: React.FC<Props> = ({
  initialUpcomingCourses,
  initialPhilosophyData
}) => {
  const [closestUpcomingCourse, setClosestUpcomingCourse] = useState<Course[]>(initialUpcomingCourses);
  const [earlyData, setEarlyData] = useState<Course | null>(initialUpcomingCourses[0] || null);
  const [ourPhilosophy, setOurPhilosophy] = useState<OurPhilosophyData>(initialPhilosophyData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Use the video URL from philosophy data or fallback to default
  const videoUrl = ourPhilosophy?.Slider_videolink || "https://www.youtube.com/embed/z6z4-bnDhws?si=Ta2BO26WIj6YIa-a";

  const removeDuplicateParagraphs = (content: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const paragraphs = Array.from(doc.querySelectorAll("p"));

    const seen = new Set();
    const uniqueParagraphs = paragraphs.filter((p) => {
      const text = p.textContent?.trim() || "";
      if (seen.has(text)) {
        return false;
      }
      seen.add(text);
      return true;
    });

    return uniqueParagraphs.map((p) => `<p>${p.innerHTML}</p>`).join("");
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, []);

  useEffect(() => {
    const modal = document.getElementById("exampleModal-yt");
    if (modal) {
      const handleModalClose = () => setIsModalOpen(false);
      modal.addEventListener("hidden.bs.modal", handleModalClose);
      return () => modal.removeEventListener("hidden.bs.modal", handleModalClose);
    }
  }, []);

  // Process initial philosophy data for duplicate removal
  useEffect(() => {
    if (initialPhilosophyData.about_First_Section_Peragraph_Content) {
      const uniqueContent = removeDuplicateParagraphs(
        initialPhilosophyData.about_First_Section_Peragraph_Content
      );

      setOurPhilosophy(prev => ({
        ...prev,
        about_First_Section_Peragraph_Content: uniqueContent,
      }));
    }
  }, [initialPhilosophyData]);

  const handleVideoButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="our-philosophy">
      {/* cart-overlay */}
      <div className="cart-overlay"></div>

      {/* banner section unsere-Philosophie */}
      <section className="banner_wrapper">
        <div
          className="banner_bg"
          style={{
            backgroundImage: `url(/assets/images/unsere_philosophie.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
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
                    {ourPhilosophy.Slider_Heading || "Unsere Philosophie als Yoga Akademie"}
                  </h1>
                  <p className="p-3">
                    {ourPhilosophy.Slider_Paragraph || "Hoher Standard, weil wir deine Zeit respektieren. Leidenschaft, weil wir uns nicht von Gier leiten lassen. Authentisch, weil wir eigenartig moderne und traditionelle Perspektiven kombinieren."}
                  </p>
                  <div
                    className="banner_bg__content-btn animate__animated"
                    data-animation-in="animate__fadeInUp"
                    data-duration-in={3}
                  >
                    <div
                      className="video-btn mehr-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-yt"
                      onClick={handleVideoButtonClick}
                    >
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

      {/* modal youtube video */}
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
                  onClick={handleModalClose}
                />
              </div>
              <div className="modal-body">
                {/* Only render iframe when modal is open and videoUrl exists */}
                {isModalOpen && videoUrl && (
                  <iframe
                    id="youtube-video"
                    width="560"
                    height="315"
                    src={videoUrl}
                    title="YouTube video player"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* about turiya */}
      <section className="about_turiya">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="about_turiya__right">
                <h6 style={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>DIE TURIYA PHILOSOPHIE</h6>
                <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#222", marginTop: "10px" }}>
                  {ourPhilosophy.about_First_Section_heading || "Unsere Philosophie als Yoga Ausbildungs Akademie"}
                </h1>
                <p style={{ margin: "15px 0 10px", fontFamily: "Roboto, sans-serif", fontSize: "15px", lineHeight: "1.8", color: "#212529" }}>
                  Selbstredend konnten wir unsere Philosophie als Yoga-Ausbildungsakademie nicht von unserer Lebensphilosophie trennen.
                  In einer der größten Schriften des Yoga, den Patanjali Yoga Sutras, ist unsere Haltung gegenüber anderen und der Welt um
                  uns herum durch das zu bestärken, was man Yamas nennt:
                </p>
                {ourPhilosophy.about_First_Section_Peragraph_Content && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: ourPhilosophy.about_First_Section_Peragraph_Content
                    }}
                  />
                )}
                <ul style={{ marginTop: "20px", padding: "0", fontFamily: "Roboto, sans-serif", color: "#212529", fontSize: "16px", backgroundColor: "#f9f9f9" }}>
                  <li style={{ marginBottom: "10px", fontSize: "15px", listStyle: "none", lineHeight: "1.8" }}>
                    <span style={{ fontWeight: "bold" }}>Gewaltlosigkeit und Wahrhaftigkeit. </span>
                    Für uns als Team geht es darum, ehrlich und sicher darin zu sein, was wir euch mitteilen und anbieten, sowie, was wir wissen und lehren.
                    Wir bieten auch <span style={{ fontWeight: "bold" }}>Transparenz</span> darüber, wo sonst (oder mit wem sonst) ihr nach dem Kurs selbstständig
                    lernen und wachsen könnt. Wir ermutigen euch darin, eure eigenen Flügel auszubreiten und die Reise fortzusetzen.
                  </li>
                  <li style={{ marginBottom: "10px", fontSize: "15px", listStyle: "none", lineHeight: "1.8" }}>
                    <span style={{ fontWeight: "bold" }}>Nicht stehlen. </span>
                    Wir schätzen deine Zeit sehr und versprechen, sie niemals als selbstverständlich zu betrachten. In unseren Yogalehrerausbildungen, Kursen und
                    in der Gemeinschaft bemühen wir uns, eure Erfahrungen zu optimieren. Eure Investition in persönliches Wachstum ist uns wichtig, deshalb planen
                    wir jede Session sorgfältig, um das Beste daraus zu machen.
                  </li>
                  <li style={{ marginBottom: "10px", fontSize: "15px", listStyle: "none", lineHeight: "1.8" }}>
                    Brahmacharya wird oft nur mit Zölibat in Verbindung gebracht. Doch ein weiser Lehrer hat uns einmal gelehrt, dass es eigentlich bedeutet,
                    alles mit vollem Herzen zu tun. Auf diese Weise wird jede Handlung zu einer Hingabe an das wahre Selbst oder wie auch immer du es nennen magst.
                    Das bildet den Kern unserer Arbeit und ist stets unser Ziel.
                  </li>
                  <li style={{ marginBottom: "10px", fontSize: "15px", listStyle: "none", lineHeight: "1.8" }}>
                    Unsere Handlungen werden nicht von Gier geleitet. Obwohl wir Geld, Wohlstand und Komfort begrüßen, sind sie nicht der Hauptantrieb unserer Akademie.
                    Wir streben jedoch nach herausragenden Standards, und Qualität erfordert natürlich auch Investitionen.
                  </li>
                </ul>
                <div className="slower_wrapper__center-icon" data-aos="fade-up">
                  <Image
                    src="/assets/images/turiya_yoga_yogalehrer_ausbildungen_aya_rys200-150x150.webp"
                    className="img-fluid"
                    alt="Turiya Yoga Yogalehrer Ausbildungen AYA RYS 200"
                    width={150}
                    height={150}
                  />
                  <Image
                    src="/assets/images/turiya_yoga_yogalehrer_ausbildungen_aya_rys300-150x150.webp"
                    className="img-fluid"
                    alt="Turiya Yoga Yogalehrer Ausbildungen AYA RYS 300"
                    width={150}
                    height={150}
                  />
                  <Image
                    src="/assets/images/turiya_yoga_yogalehrer_ausbildungen_aya_rys500-150x150.webp"
                    className="img-fluid"
                    alt="Turiya Yoga Yogalehrer Ausbildungen AYA RYS 500"
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            </div>
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
          </div>
        </div>
      </section>

      <section className="parralax_wrapper2">
        <div className="container">
          <div className="parralax_wrapper__content" data-aos="fade-right">
            <div className="line" />
            <h6>YOGALEHRER WERDEN</h6>
            <h1>
              Yogalehrer Ausbildung <br />
              auf höchstem Niveau
            </h1>
          </div>
        </div>
      </section>

      <Contact />
      <Gallery />
      <NewsShelter />
    </section>
  );
};

export default OurPhilosophyClient;
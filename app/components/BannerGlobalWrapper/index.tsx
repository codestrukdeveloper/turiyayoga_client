import React from "react";
import Link from "next/link";

const BannerGlobalWrapper: React.FC = () => {
  return (
    <section className="global_wrapper third_section">
      <div className="container">
        <div
          className="global_wrapper__content aos-init aos-animate"
          data-aos="zoom-in-up"
        >
          <div className="leaf">
            <i className="bx bxs-leaf" />
          </div>
          <div className="main_heading">
            <h1>Aufbau unserer Yogalehrer Ausbildung</h1>
            <p>
              Durch den flexiblen und modularen Aufbau unserer Yogalehrer
              Ausbildung, kannst du einfach entscheiden welches Tempo für dich
              am besten ist. Jedes Modul besteht aus 100 Stunden! Unsere 200h
              und 500h Yoga Ausbildungen sind <strong>Yoga Alliance zertifiziert!</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="global_content">
        <div className="container">
          <div className="third_section__grid">
            {[
              {
                title: "MODUL 1",
                description:
                  "Tauche ein in die Welt des Yogalehrer-Basiskurses in nur 8 Tagen (100 Stunden)...",
                link: "/module/100h-yoga-ausbildung-modul-1",
                image: "https://api.turiyayoga.de/uploads/assets/new/yoga1.webp",
              },
              {
                title: "MODUL 2",
                description:
                  "200h AYA zertifizierte Yogalehrer Ausbildung. Erreiche eine solide Grundlage...",
                link: "/module/200h-yoga-ausbildung-modul-2",
                image: "https://api.turiyayoga.de/uploads/assets/new/yoga2.webp",
              },
              {
                title: "MODUL 3",
                description:
                  "Erfahre mehr über die Unterstützung der inneren Organe und Körpersysteme...",
                link: "/module/300h-yoga-ausbildung-modul-3",
                image: "https://api.turiyayoga.de/uploads/assets/new/yoga3.webp",
              },
              {
                title: "MODUL 4",
                description:
                  "Erfahre mehr über die Unterstützung des gesunden Geistes und neurophysiologische Aspekte...",
                link: "/module/400h-yoga-ausbildung-modul-4",
                image: "https://api.turiyayoga.de/uploads/assets/new/yoga4.webp",
              },
              {
                title: "MODUL 5",
                description:
                  "Beende deine 500h AYA zertifizierte Yogalehrer Ausbildung mit Yin Yoga und Senior Yoga...",
                link: "/module/500h-yoga-ausbildung-modul-5",
                image: "https://api.turiyayoga.de/uploads/assets/new/yoga5.webp",
              },
            ].map((modul, idx) => (
              <div
                key={modul.title}
                className="third_section__box aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 100}
              >
                <div className="box_img">
                  <img src={modul.image} className="img-fluid" alt="yoga" />
                </div>
                <div className="box_content">
                  <h3>{modul.title}</h3>
                  <p>{modul.description}</p>
                  <div className="mehr--btn">
                    <Link href={modul.link}>MEHR</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerGlobalWrapper;

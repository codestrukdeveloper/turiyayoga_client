'use client';

import React from 'react';
import Image from 'next/image';

const CheckWrapper: React.FC = () => {
  return (
    <section className="global_wrapper check_wrapper">
      <div className="container">
        <div className="main_heading">
          <h1>Deine Vorteile Bei Turiya</h1>
        </div>
      </div>
      <div className="global_content">
        <div className="container">
          <div className="row">
            {/* Column 1 */}
            <div className="col-lg-4">
              {[
                ['Zertifiziert', 'International anerkannt | AYA'],
                ['Erfahrung', 'Hohe Kundenzufriedenheit'],
                ['Hohe Standard', 'Gesicherte Ausbildungsqualität'],
                ['Flexibel', 'Modulweise buchbar'],
              ].map(([title, text], index) => (
                <div
                  key={index}
                  className="check_box animate__animated"
                  data-aos="fade-up"
                >
                  <div className="check_box__icon">
                    <Image
                      src="/assets/icons/check-2.webp"
                      alt="check"
                      width={40}
                      height={40}
                      className="img-fluid"
                    />

                  </div>
                  <div className="check_box__content">
                    <h6>{title}</h6>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="col-lg-4 mob_hide">
              {[
                ['Selbstentfaltung', 'Förderung persönlicher Entwicklung'],
                ['Engagierte Trainer', 'Passionierte Lehrkräfte mit fundiertem Fachwissen'],
                ['Bezahlbar', 'Gutes Preis-Leistungsverhältnis'],
                ['Marktorientiert', 'Multi-Stile Yoga Ausbildung'],
              ].map(([title, text], index) => (
                <div
                  key={index}
                  className="check_box animate__animated"
                  data-aos="fade-up"
                >
                  <div className="check_box__icon">
                    <Image
                      src="/assets/icons/check-2.webp"
                      alt="check"
                      width={40}
                      height={40}
                      className="img-fluid"
                    />

                  </div>
                  <div className="check_box__content">
                    <h6>{title}</h6>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="col-lg-4 mob_hide">
              {[
                ['Modern', 'Wissenschaftliche & Akademische Perspektive'],
                ['Aber auch Traditionell', 'Traditionelle Praxis und Perspektiv vorgestellt'],
                ['Praxisorientiert', 'Hands-On & Verwendung der Hilfsmittel Fokus'],
                ['Allgemein zugänglich', 'Für alle Konditionslevel'],
              ].map(([title, text], index) => (
                <div
                  key={index}
                  className="check_box animate__animated"
                  data-aos="fade-up"
                >
                  <div className="check_box__icon">
                    <Image
                      src="/assets/icons/check-2.webp"
                      alt="check"
                      width={40}
                      height={40}
                      className="img-fluid"
                    />

                  </div>
                  <div className="check_box__content">
                    <h6>{title}</h6>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckWrapper;

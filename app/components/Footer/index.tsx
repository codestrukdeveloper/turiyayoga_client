'use client';
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer_wrapper aos-init aos-animate" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="footer_box">
                  <div className="footer_logo">
                    <Link href="/">
                      <Image
                        src="/assets/images/logo.webp"
                        className="img-fluid"
                        alt="logo"
                        height={300}
                        width={300}
                        style={{
                          objectFit: 'cover', // or 'contain' based on your needs
                          width: '100%',
                          height: 'auto',
                        }}
                      />
                    </Link>
                  </div>
                  <div className="connect">
                    <Link href="tel:+919005505033" className="connect-anchor">
                      <i className="bx bxs-mobile" /> +91 90055 05033
                    </Link>
                    <Link href="mailto:INFO@TURIYAYOGA.DE" className="connect-anchor">
                      <i className="bx bxs-envelope" />
                      INFO@TURIYAYOGA.DE
                    </Link>
                    <p>
                      <i className="bx bxs-map" />
                      Emanuel Wintermeyer Herbartstraße 12, 60316 Frankfurt am
                      Main, Germany
                    </p>
                  </div>
                  <div className="link">
                    <Link href="/impressum"  className="link-anchor">Impressum</Link>
                    <span>/</span>
                    <Link href="/datenschutz"  className="link-anchor">Datenschutz</Link>
                  </div>
                  <div className="social-media">
                    <Link href="https://www.facebook.com/turiyayogainternational" target="_blank" rel="noopener noreferrer">
                      <i className="bx bxl-facebook" />
                    </Link>
                    <Link href="https://twitter.com/turiya_yoga" target="_blank" rel="noopener noreferrer">
                      <i className="bx bxl-twitter" />
                    </Link>
                    <Link href="https://www.youtube.com/channel/UCgqWvWLeL9Wbum9vHjD8NAA" target="_blank" rel="noopener noreferrer">
                      <i className="bx bxl-youtube" />
                    </Link>
                    <Link href="https://www.instagram.com/turiyayogainternational" target="_blank" rel="noopener noreferrer">
                      <i className="bx bxl-instagram" />
                    </Link>
                    <Link href="/blog">
                      <i className="bx bxl-blogger" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="footer_links">
                  <ul>
                    <li>
                      <span />
                      <Link href="/unsere-Geschichte"> ÜBER UNS </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/unsere-Philosophie"> UNSERE PHILOSOPHIE </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/kundenstimmen"> KUNDENSTIMMEN </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/category/alle-kommenden-kurse"> YOGALEHRER AUSBILDUNGEN</Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/200h-aya-yogalehrer-ausbildung">
                        200H AYA YOGALEHRER AUSBILDUNG - INTENSIV
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/200h-yoga-ausbildung-modul-2">
                        +200H YOGA AUSBILDUNG / MODUL 2
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/blockausbildung-berblick">
                        BLOCKAUSBILDUNG / ÜBERBLICK
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/blockausbildung-berblick">
                        500H AYA YOGALEHRER BLOCKAUSBILDUNG | 100H EINZELMODULE
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/200h-aya-yogalehrer-ausbildung-goa-indien">
                        200H AYA YOGALEHRER AUSBILDUNG GOA INDIEN
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/yogalehrerausbildung-himalaya-indien">
                        YOGALEHRERAUSBILDUNG HIMALAYA INDIEN
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/200h-aya-yogalehrer-ausbildung-i-mallorca">
                        200H/AYA YOGALEHRER AUSBILDUNG I MALLORCA
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/yoga-teacher-training-rishikesh">
                        YOGA TEACHER TRAINING COURSE RISHIKESH
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/200-hour-yoga-teacher-training">
                        200 HOUR YOGA TEACHER TRAINING
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/yoga-teacher-training-course-india">
                        YOGA TEACHER TRAINING COURSE INDIA
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/blog"> TURIYA YOGA BLOG</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer_links">
                  <ul>
                    <li>
                      <span />
                      <Link href="/module/200h-aya-yogalehrer-ausbildung">
                        200H AYA YOGALEHRER AUSBILDUNG
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/blockausbildung-berblick">
                        BLOCKAUSBILDUNG / ÜBERBLICK
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/100h-yoga-ausbildung-modul-1">
                        100H YOGA AUSBILDUNG / MODUL 1
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/300h-yoga-ausbildung-modul-3">
                        +300H YOGA AUSBILDUNG / MODUL 3
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/400h-yoga-ausbildung-modul-4">
                        +400H YOGA AUSBILDUNG / MODUL 4
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/500h-yoga-ausbildung-modul-5">
                        500H YOGA AUSBILDUNG / MODUL 5
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/category/60h-senioren-yoga">60H SENIOREN YOGA</Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/category/60h-yin-yoga">60H YIN YOGA</Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/impressum"> IMPRESSUM</Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/term">
                        ALLGEMEINE GESCHÄFTSBEDINGUNGEN
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/contact">KONTAKT</Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/yoga-teacher-training-bali">
                        YOGA TEACHER TRAINING BALI
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/yogateachertraining">
                        YOGA TEACHER TRAINING
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/berlin-yoga-ausbildung">
                        YOGALEHRERAUSBILDUNG BERLIN
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/hamburg-yoga-ausbildung">
                        YOGALEHRERAUSBILDUNG HAMBURG
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/Koln-yoga-ausbildung">
                        YOGALEHRERAUSBILDUNG Köln
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/munchen-yoga-ausbildung">
                        YOGALEHRERAUSBILDUNG MUNCHEN
                      </Link>
                    </li>
                    <li>
                      <span />
                      <Link href="/module/stuttgart-yoga-ausbildung">
                        YOGA AUSBILDUNG STUTTGART
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="container copyright">
        <p>© Copyright 2023 - 2024 | Turiya Yoga | Yogalehrer Ausbildungen</p>
      </div>
    </>
  );
};

export default Footer;
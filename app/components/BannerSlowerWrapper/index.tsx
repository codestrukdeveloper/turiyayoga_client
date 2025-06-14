"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchClosestUpcomingCourses } from "@/app/services/categoryService";
import Link from "next/link";

interface UpcomingCourse {
  Homepage_cardcontent: string;
  Location: string;
  StartDate: string;
  EndDate: string;
  OfferEndDate: string;
  Offerprice: number;
  price: number;
}

const BannerSlowerWrapper: React.FC = () => {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("turiya_auth_token") : null;
  const [closestUpcomingCourse, setClosestUpcomingCourse] = useState<UpcomingCourse[]>([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await fetchClosestUpcomingCourses();
        setClosestUpcomingCourse(data);
      } catch (error) {
        console.error("Error fetching closest upcoming courses", error);
      }
    };
    fetchCourse();
  }, []);

  const handletriggerDialogBox = () => setIsDialogVisible(true);
  const closeDialogBox = () => setIsDialogVisible(false);
  const handleredirect = () => {
    closeDialogBox();
    if (token) {
      router.push("/register");
    }
  };

  const convertDateFormat = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const isOfferValid = (offerEndDate: string) => {
    if (!offerEndDate) return false;
    const today = new Date();
    const offerEnd = new Date(offerEndDate);
    return today <= offerEnd;
  };

  const course = closestUpcomingCourse?.[0];

  return (
    <section className="slower_wrapper">
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-xl-4">
            <div className="slower_wrapper__center same-box" data-aos="zoom-in-up" data-aos-duration="2000">
              <h3> Yogalehrer Ausbildungen</h3>
              <h6>WIR <i className="bx bx-heart" /> YOGA</h6>
              <p><strong>Namaste und Willkommen ...</strong></p>
              <p>Direkt aus Indien ...</p>
              <p><i>Einer der fundiertesten Yogalehrer ...</i></p>
              <ul className="slower_wrapper__center-ul" data-aos="fade-up">
                <li><i className="bx bx-check" />4 Professoren</li>
                <li><i className="bx bx-check" />2 Physiotherapeuten</li>
                <li><i className="bx bx-check" />2 Ärzte</li>
                <li><i className="bx bx-check" />+ erfahrene Yogalehrer</li>
              </ul>
              <div className="slower_wrapper__center-icon" data-aos="fade-up">
                <img src="https://api.turiyayoga.de/uploads/assets/new/turiya_yoga_yogalehrer_ausbildungen_aya_rys200-150x150.webp" className="img-fluid" alt="..." />
                <img src="https://api.turiyayoga.de/uploads/assets/new/turiya_yoga_yogalehrer_ausbildungen_aya_rys300-150x150.webp" className="img-fluid" alt="..." />
                <img src="https://api.turiyayoga.de/uploads/assets/new/turiya_yoga_yogalehrer_ausbildungen_aya_rys500-150x150.webp" className="img-fluid" alt="..." />
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="col-xl-4">
            <div className="slower_wrapper__right same-box" data-aos="zoom-in-up" data-aos-duration="2000">
              <img src="https://api.turiyayoga.de/uploads/assets/new/yogalehrer.webp" className="img-fluid" alt="..." />
              <div className="slower_wrapper__right-content">
                <h3>YOGALEHRER AUSBILDUNGEN</h3>
                <p dangerouslySetInnerHTML={{ __html: course?.Homepage_cardcontent || "" }} />
                <div className="slower_wrapper__right-date" data-aos="fade-up">
                  <ul>
                    <li><i className="bx bxs-map" /> {course?.Location}</li>
                    <li>
                      <i className="bx bxs-calendar me-1" />
                      {course && convertDateFormat(course.StartDate)} &nbsp;-&nbsp;{course && convertDateFormat(course.EndDate)}
                    </li>
                  </ul>
                </div>
                <div className="price custom-margin">
                  {course && isOfferValid(course.OfferEndDate) && course.Offerprice > 0 && (
                    <button
                      className="table-btn triggerDialogBox me-2"
                      style={{ border: "0px solid", color: "white", backgroundColor: "#E07542" }}
                      onClick={handletriggerDialogBox}
                    >
                      €{course.Offerprice}
                    </button>
                  )}
                  <button
                    className="table-btn triggerDialogBox"
                    style={{ border: "0px solid" }}
                    onClick={handletriggerDialogBox}
                  >
                    €{course && isOfferValid(course.OfferEndDate) && course.Offerprice > 0 ? <del>{course.price}</del> : course?.price}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-xl-4">
            <div className="slower_wrapper__left same-box" data-aos="zoom-in-up" data-aos-duration="2000">
              <img src="https://api.turiyayoga.de/uploads/assets/new/img1.webp" className="img-fluid" alt="..." />
              <div className="slower_wrapper__content" data-aos="fade-up">
                <h1> ÜBER UNS</h1>
                <p>Ehrliches Engagement ...</p>
                <p>Die Mitbegründer sind ...</p>
                <div className="blank-space" />
                <div className="price" data-aos="fade-up">
                  <Link href="/unsere-Geschichte">MEHR</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isDialogVisible && (
          <div id="modalOverlay" className="hiddenOverlayContainer" style={{ display: "block" }}>
            <div className="customDialogBox">
              <span className="exitButtonTrigger" onClick={closeDialogBox}>×</span>
              <div className="dialogIcon">
                <img src="/assets/images/high-important.png" style={{ width: 80 }} alt="dialog-icon" />
              </div>
              <p className="mt-3">
                Um den Kauf abzuschließen, musst du dich zuerst einloggen!
              </p>
              <button className="dialogActionButton" onClick={handleredirect}>
                Go to Login/Registrierung.
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerSlowerWrapper;

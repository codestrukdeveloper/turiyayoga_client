"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getContactDetails } from "@/app/services/contactService";

const ContactClient = () => {
  const [contactDetails, setContactDetails] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, []);

  useEffect(() => {
    getContactDetails()
      .then((data) => {
        if (data?.data?.length > 0) {
          setContactDetails(data.data[0]);
        }
      })
      .catch((error) => {
        console.error("Contact fetch error:", error);
      });
  }, []);

  return (
    <section className="global_wrapper contact--wrapper">
      <div className="container">
        <div className="contact--wrapper-heading">
          <h3>Kontakt</h3>
        </div>
        <div className="global_content">
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-left">
                <div className="social_contact">
                  <Link href="https://www.facebook.com/turiyayogainternational">
                    <i className="bx bxl-facebook" />
                  </Link>
                  <Link href="https://twitter.com/turiya_yoga">
                    <i className="bx bxl-twitter" />
                  </Link>
                  <Link href="https://www.youtube.com/channel/UCgqWvWLeL9Wbum9vHjD8NAA">
                    <i className="bx bxl-youtube" />
                  </Link>
                  <Link href="https://www.instagram.com/turiyayogainternational">
                    <i className="bx bxl-instagram" />
                  </Link>
                  <Link href="/blog">
                    <i className="bx bxl-blogger" />
                  </Link>
                </div>

                <div className="contact-left-content">
                  <h6 style={{ fontSize: 15, marginTop: "1rem" }}>Turiya Yoga</h6>
                  <p style={{ fontSize: 14, marginTop: "1rem" }}>Emanuel Wintermeyer</p>
                  <p style={{ fontSize: 14, marginTop: "1rem" }}>
                    Herbartstrasse, 12
                    <br />
                    60316 Frankfurt am Main
                  </p>
                  <p style={{ fontSize: 14, marginTop: "1rem" }}>
                    +49(0)69 2013 4987
                    <br />
                    info@turiyayoga.de
                  </p>
                  <p style={{ fontSize: 14, marginTop: "1rem" }}>
                    <i>
                      Wir bieten Yogalehrer Ausbildungen auf höchstem Niveau!
                      Werde Yogalehrer mit Turiya Yoga!
                    </i>
                  </p>
                  <p style={{ fontSize: 14, marginTop: "1rem" }}>
                    Wenn Ihr Fragen habt oder euch für eine Ausbildung anmelden wollt,
                    schickt uns bitte einfach eine kurze Nachricht über unser
                    Kontaktformular. Schaut euch in unserem Video an, was euch bei
                    einer Yogalehrer Ausbildung bei Turiya Yoga erwartet.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="contact-img">
                <img
                  src="/assets/images/contact_img.webp"
                  className="img-fluid"
                  alt="contact"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactClient;

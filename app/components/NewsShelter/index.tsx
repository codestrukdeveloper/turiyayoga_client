"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import { subscribeToNewsletter } from '@/app/services/newsletterService';

const NewsShelter = () => {
  const [email, setEmail] = useState<string>('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedEmail(email);
    setLoading(true);

    try {
      await subscribeToNewsletter(email);
      setLoading(false);
      Swal.fire({
        title: "Danke!",
        text: "Erfolgreich übermittelt!",
        icon: "success"
      });
      setEmail('');
    } catch (error) {
      setLoading(false);
      console.error("Newsletter subscription failed:", error);
      alert("Etwas ist schief gelaufen."); // Optional: Replace with better toast
    }
  };

  return (
    <section className="newsletter_wrapper" data-aos="zoom-in-up">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row newsletter_wrapper__box">
            <div className="col-lg-8">
              <div className="newsletter_wrapper__left">
                <h3>Hol dir das neueste Update aus unserem Newsletter.</h3>
                <input
                  type="email"
                  required
                  name="news"
                  placeholder="Gib deine E-Mail-Adresse ein"
                  value={email}
                  onChange={handleChange}
                   style={{ backgroundColor: 'white' }}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="newsletter-btn">
                <button className='d-flex justify-content-center align-items-center gap-3' type="submit" name="submit">
                  Abonnieren
                  {loading && <div className="spinner-border text-light" role="status"></div>}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsShelter;

'use client';

import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Swal from "sweetalert2";
import { sendContactForm } from '@/app/services/contactService';
import './ContactPopup.css';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  captcha_input: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasShownOnce, setHasShownOnce] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
    captcha_input: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [captchaCode, setCaptchaCode] = useState<string>("");

  useEffect(() => {
    if (!hasShownOnce) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShownOnce(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [hasShownOnce]);

  const generateCaptcha = (): string =>
    Math.floor(10000 + Math.random() * 90000).toString();

  useEffect(() => {
    if (isOpen) {
      setCaptchaCode(generateCaptcha());
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.captcha_input.trim()) newErrors.captcha_input = "Verification code is required";
    else if (formData.captcha_input !== captchaCode) newErrors.captcha_input = "Incorrect verification code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const payload = {
      name: `${formData.first_name} ${formData.last_name}`,
      number: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    try {
      await sendContactForm(payload);
      setLoading(false);
      Swal.fire({ title: "Danke!", text: "Erfolgreich übermittelt!", icon: "success" });

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
        captcha_input: "",
      });
      setCaptchaCode(generateCaptcha());
      setIsOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button onClick={handleClose} className="close-button">&times;</button>

        <div style={{ marginBottom: '1rem' }}>
          <h3 className="heading">Wir Helfen Immer</h3>
          <div className="heading-underline"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label className="label">Vorname</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input"
                style={{ borderColor: errors.first_name ? '#e74c3c' : '#ddd' }}
              />
              {errors.first_name && <p className="error-text">{errors.first_name}</p>}
            </div>

            <div>
              <label className="label">Nachname</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input"
                style={{ borderColor: errors.last_name ? '#e74c3c' : '#ddd' }}
              />
              {errors.last_name && <p className="error-text">{errors.last_name}</p>}
            </div>
          </div>

          <div className="form-grid">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                style={{ borderColor: errors.email ? '#e74c3c' : '#ddd' }}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div>
              <label className="label">Telefon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                style={{ borderColor: errors.phone ? '#e74c3c' : '#ddd' }}
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label className="label">Your Message</label>
            <textarea
              name="message"
              rows={2}
              value={formData.message}
              onChange={handleChange}
              className="textarea"
              style={{ borderColor: errors.message ? '#e74c3c' : '#ddd' }}
            />
            {errors.message && <p className="error-text">{errors.message}</p>}
          </div>

          <div className="captcha-box">
            <label className="label">Verification Code</label>
            <div className="captcha-code">{captchaCode}</div>
            <input
              type="text"
              name="captcha_input"
              value={formData.captcha_input}
              onChange={handleChange}
              placeholder="Enter the code above"
              className="input"
              style={{ borderColor: errors.captcha_input ? '#e74c3c' : '#ddd' }}
            />
            {errors.captcha_input && <p className="error-text">{errors.captcha_input}</p>}
            {!formData.captcha_input && <p className="info-text">Please enter the displayed numeric code</p>}
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? (
              <>
                <div className="spinner"></div> Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { forgotPassword } from  "@/app/services/categoryService";
import "./forgotpass.scss";

const ForgotPasswordClient: React.FC = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = "E-Mail-Adresse ist erforderlich";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Ungültige E-Mail-Adresse";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      await forgotPassword(formData.email);
      Swal.fire({
        text: "Bitte überprüfen Sie Ihre E-Mails und bestätigen Sie Ihre E-Mail-Adresse!",
        icon: "success",
        customClass: { popup: "custom-swal" },
      });
      router.push("/");
    } catch (err: any) {
      alert(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="global_wrapper forgot-login">
      <div className="container">
        <div className="forgot-login-box">
          <form className="form_border p-4 border" method="POST" onSubmit={handleSubmit}>
            <h3 className="my-3">Kennwort vergessen?</h3>
            <p>
              Bitte gib deine E-Mail-Adresse ein, um Dein Kennwort
              zurückzusetzen. Eventuell musst Du dein Spamordner prüfen oder
              die Adresse info@turiyayoga.de als Absender zulassen.
            </p>
            <div className="forgot-email">
              <label>E-Mail-Adresse *:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="send">
              <button className="global_btn d-flex align-items-center gap-2" type="submit" name="forget">
                Submit
                {loading && <div className="spinner-border text-light spinner-border-sm" role="status"></div>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordClient;

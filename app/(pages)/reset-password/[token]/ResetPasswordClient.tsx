"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/app/services/categoryService";

interface Props {
  token: string;
}

const ResetPasswordClient: React.FC<Props> = ({ token }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ password?: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

    try {
      await resetPassword(token, formData.password);
      alert("Password reset successfully");
      router.push("/login");
    } catch (err: any) {
      alert(err?.message || "An error occurred");
    }
  };

  return (
    <div className="my-5" style={{ height: "70vh" }}>
      <section className="global_wrapper forgot-login">
        <div className="container">
          <div className="forgot-login-box">
            <form
              className="form_border p-4 border d-flex flex-column gap-3"
              method="POST"
              onSubmit={handleSubmit}
            >
              <h3 className="my-3">Kennwort vergessen?</h3>
              <p>
                Bitte gib deine E-Mail-Adresse ein, um Dein Kennwort zurückzusetzen. Eventuell musst Du dein Spamordner prüfen oder
                die Adresse info@turiyayoga.de als Absender zulassen.
              </p>
              <div className="forgot-email">
                <label>Neues Kennwort erstellen *:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Neues Kennwort"
                />
              </div>
              <div className="forgot-email">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                />
              </div>
              {errors.password && <span className="error text-danger">{errors.password}</span>}
              <div className="send">
                <button className="global_btn" type="submit" name="forget">
                  Kennwort aktualisieren
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordClient;

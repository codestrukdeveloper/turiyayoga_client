import React from "react";
import RegisterForm from "./RegisterForm";
import "./register.scss";

const RegisterPage = () => {
  return (
    <section className="registration_wrapper global_wrapper">
      <div className="container">
        <div className="registration_wrapper__content">
          <div className="registration--heading">
            <h1 className="register_heading">Bist du schon registriert?</h1>
            <p>Bitte erstelle ein Benutzerkonto.</p>
          </div>
          <div className="registration_box card">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

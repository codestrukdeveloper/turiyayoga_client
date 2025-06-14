"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./register.scss";
import { registerUser } from "@/app/services/categoryService";

interface FormData {
    persone: string;
    c_name: string;
    f_name: string;
    l_name: string;
    email: string;
    email_confirm: string;
    gender: string;
    phone: string;
    user_name: string;
    password: string;
    address: string;
    country: string;
    federal_state: string;
    city: string;
    postal_code: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const RegisterForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        persone: "Private-Persone",
        c_name: "",
        f_name: "",
        l_name: "",
        email: "",
        email_confirm: "",
        gender: "male",
        phone: "",
        user_name: "",
        password: "",
        address: "",
        country: "Deutschland",
        federal_state: "",
        city: "",
        postal_code: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.f_name) newErrors.f_name = "Vorname ist erforderlich";
        if (!formData.l_name) newErrors.l_name = "Nachname ist erforderlich";
        if (!formData.email) newErrors.email = "E-Mail ist erforderlich";
        if (formData.email !== formData.email_confirm)
            newErrors.email_confirm = "Die E-Mails stimmen nicht überein";
        if (!formData.phone) newErrors.phone = "Telefon ist erforderlich";
        if (!formData.password) newErrors.password = "Passwort ist erforderlich";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            alert("something went wrong");
            return;
        }

        const payload = {
            userType: formData.persone,
            company: formData.c_name,
            First_name: formData.f_name,
            Last_name: formData.l_name,
            email: formData.email,
            Confirm_email_address: formData.email_confirm,
            gender: formData.gender,
            phone: formData.phone,
            username: formData.user_name,
            create_password: formData.password,
            address: formData.address,
            country: formData.country,
            federal_state: formData.federal_state,
            city: formData.city,
            postal_code: formData.postal_code,
        };

        try {
            const response = await registerUser(payload);
            if (response.status === 201) {
                Swal.fire({
                    title: "Vielen Dank für die Anmeldung bei uns",
                    text: "Bitte überprüfen Sie Ihre E-Mails und bestätigen Sie Ihre E-Mail-Adresse!",
                    icon: "success",
                    customClass: { popup: "custom-swal" },
                });
                router.push("/");
            } else {
                Swal.fire({
                    title: "E-Mail bereits registriert",
                    showClass: { popup: "animate__animated animate__fadeInUp animate__faster" },
                    hideClass: { popup: "animate__animated animate__fadeOutDown animate__faster" },
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Benachrichtigung",
                text: "Etwas ist schief gelaufen!",
                footer: "versuchen Sie es erneut",
                customClass: { popup: "custom-swal" },
            });
        }
    };

    return (
        <form onSubmit={submit}>
            <div className="col-12 mb-3 form-group">
                <label className="nott ls0 fw-medium mb-1" htmlFor="taxi">
                    Bist du? <small>*</small>
                </label>

                <input
                    name="persone"
                    id="persone_yes"
                    className="my-1 me-1 ms-3 taxi-option"
                    type="radio"
                    value="Corporate-Persone"
                    checked={formData.persone === "Corporate-Persone"}
                    onChange={handlechange}
                />
                <label htmlFor="persone_yes" className="nott ls0 fw-medium mb-1">
                    Unternehmen
                </label>

                <input
                    name="persone"
                    id="persone_no"
                    className="my-1 ms-3 me-1 taxi-option"
                    type="radio"
                    value="Private-Persone"
                    checked={formData.persone === "Private-Persone"}
                    onChange={handlechange}
                />
                <label htmlFor="persone_no" className="nott ls0 fw-medium mb-1">
                    Privatperson
                </label>

                {formData.persone === "Corporate-Persone" && (
                    <div className="col-12 mb-2 taxi-time-container">
                        <label htmlFor="c_name">
                            Enter your company name: <small className="text-danger">*</small>
                        </label>
                        <input
                            type="text"
                            id="c_name"
                            name="c_name"
                            className="form-control shadow-none"
                            onChange={handlechange}
                            value={formData.c_name}
                            required
                        />
                    </div>
                )}
            </div>

            <div className="registration_box__flex">
                <div className="modal_input">
                    <label>
                        Vorname <span>*</span>
                    </label>
                    <input
                        type="text"
                        name="f_name"
                        value={formData.f_name}
                        onChange={handlechange}
                        required
                    />
                </div>
                <div className="modal_input">
                    <label>
                        Nachname <span>*</span>
                    </label>
                    <input
                        type="text"
                        name="l_name"
                        value={formData.l_name}
                        onChange={handlechange}
                        required
                    />
                </div>
            </div>
            <div className="registration_box__flex">
                <div className="modal_input">
                    <label>
                        E-Mail <span>*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handlechange}
                        value={formData.email}
                        required
                    />
                </div>
                <div className="modal_input">
                    <label>
                        E-Mail-BESTÄTIGEN <span>*</span>
                    </label>
                    <input
                        type="email"
                        name="email_confirm"
                        value={formData.email_confirm}
                        onChange={handlechange}
                        required
                    />
                </div>
            </div>
            <div className="registration_box__flex">
                <div className="modal_input">
                    <label>
                        Geschlecht <span>*</span>
                    </label>
                    <select
                        name="gender"
                        className="form-select"
                        aria-label="Default select example"
                        value={formData.gender}
                        onChange={handlechange}>
                        <option value="female" selected>
                            Frau
                        </option>
                        <option value="male">Mann</option>
                        <option value="other">Diverse</option>
                    </select>
                </div>
                <div className="modal_input">
                    <label>
                        TELEFON <span>*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        required
                        onChange={handlechange}
                    />
                </div>
            </div>
            <div className="registration_box__flex">
                <div className="modal_input">
                    <label>BENUTZERNAME</label>
                    <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        required
                        onChange={handlechange}
                    />
                </div>
                <div className="modal_input">
                    <label>
                        Erstelle ein Passwort <span>*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        required
                        onChange={handlechange}
                    />
                </div>
            </div>
            <div className="registration_box__flex">
                <div className="modal_input">
                    <label>Adresse</label>
                    <input
                        type="text"
                        name="address"
                        required
                        placeholder="Straße / Haus Nr."
                        onChange={handlechange}
                    />
                </div>
            </div>
            <div className="registration_box__flex">
                <div className="modal_input">
                    <label>Land</label>
                    <input
                        type="text"
                        name="country"
                        required
                        defaultValue="Deutschland"
                        onChange={handlechange}
                        value={formData.country}
                    />
                </div>
                <div className="modal_input">
                    <label>Bundesstaat</label>
                    <input
                        type="text"
                        name="federal_state"
                        value={formData.federal_state}
                        required
                        onChange={handlechange}
                    />
                </div>
                <div className="modal_input">
                    <label>STADT</label>
                    <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handlechange}
                    />
                </div>
                <div className="modal_input">
                    <label>Postleitzahl</label>
                    <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handlechange}
                        required
                    />
                </div>
            </div>

            <div className="registration-btn">
                <button type="submit" className="global_btn">
                    REGISTRIEREN
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;

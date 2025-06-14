"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import Link from "next/link";
import { loginUser } from "@/app/services/categoryService";
import { useAuth } from "@/app/context/auth-context";
import './CustomModal.scss';

const LoginClient: React.FC = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showModal, setShowModal] = useState(true);
    const router = useRouter();
    const { login } = useAuth();

    const handleRedirect = () => {
        router.push("/register");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const tempErrors: Record<string, string> = {};
        let isValid = true;

        if (!formData.username) {
            tempErrors.username = "Benutzername ist erforderlich";
            isValid = false;
        }
        if (!formData.password) {
            tempErrors.password = "Passwort ist erforderlich";
            isValid = false;
        } else if (formData.password.length < 6) {
            tempErrors.password = "Passwort muss mindestens 6 Zeichen lang sein";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await loginUser(formData.username, formData.password);

            if (response?.isVerified === false) {
                alert(response?.msg || "Konto ist nicht verifiziert");
                return;
            }

            if (!response?.user || !response?.token) {
                alert("Ungültige Anmeldedaten");
                return;
            }



            login({
                name: `${response.user.First_name} ${response.user.Last_name}`,
                id: response.user._id
            });
            localStorage.setItem("turiya_auth_token", response.token); // Only token remains here

            handleClose();
            Swal.fire({
                title: "Danke!",
                text: "Erfolgreich Angemeldet!",
                icon: "success",
                customClass: {
                    popup: "custom-swal",
                },
            });
            router.push("/");

        } catch (error: any) {
            console.log("fd", error)
            alert(error?.response?.data?.msg || "Something went wrong");
        }
    };

    const handleClose = () => {
        setShowModal(false);
        router.push("/");
    };

    return (
        <div className="login-container">
            {showModal && (
                <div className="custom-modal-overlay" onClick={handleClose}>
                    <div
                        className="custom-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="d-flex justify-end">
                            <IoCloseSharp
                                style={{ fontSize: "20px", cursor: "pointer" }}
                                onClick={handleClose}
                            />
                        </div>
                        <form method="POST" id="user_login_form" onSubmit={handleSubmit}>
                            <div className="modal_input">
                                <label>
                                    E-Mail <span>*</span>
                                </label>
                                <input
                                    type="email"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                {errors.username && (
                                    <div className="text-danger">{errors.username}</div>
                                )}
                            </div>
                            <div className="modal_input">
                                <label>
                                    Passwort <span>*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <div className="text-danger">{errors.password}</div>
                                )}
                            </div>
                            <div className="submit-form flex justify-center">
                                <button type="submit" className="global_btn">
                                    Einloggen
                                </button>
                            </div>
                            <div className="form-body-bottom">
                                <div className="password-forgot">
                                    <Link href="/forgot_password" className="btn btn-primary">
                                        Passwort vergessen?
                                    </Link>
                                </div>
                                <h3 className="account_text">Hast du noch keinen Account?</h3>
                                <div className="annmelden">
                                    <p
                                        onClick={handleRedirect}
                                        className="text-green-600 underline font-semibold text-xl cursor-pointer"
                                    >
                                        Anmelden
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Inline styles for custom modal */}
            <style jsx>{`
        .custom-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent backdrop */
          display: flex;
          justify-content: center;
          align-items: top;
          z-index: 1000;
        }

        .custom-modal-content {
          background-color: white;
          padding: 44px 74px;
          border-radius: 8px;
          width: 100%;
          max-width: 1000px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
          height: fit-content;
          top: 30px;
        }

        .custom-modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 30px;
          color: #333;
          cursor: pointer;
        }

        .custom-modal-close:hover {
          color: #e74c3c;
        }

        .custom-modal-input {
          margin-bottom: 15px;
        }

        .custom-modal-input input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .custom-modal-btn {
          width: 100%;
          padding: 10px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .custom-modal-btn:hover {
          background-color: #2980b9;
        }

        .text-danger {
          color: red;
          font-size: 12px;
        }
      `}</style>
        </div>

    );
};

export default LoginClient;

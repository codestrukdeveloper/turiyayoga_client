"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { verifyEmailToken } from "@/app/services/categoryService";

interface Props {
  token: string;
}

const VerifyEmailClient: React.FC<Props> = ({ token }) => {
  const [message, setMessage] = useState("Please wait, while we verify your email.");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmailToken(token);
        setMessage("E-Mail erfolgreich verifiziert");
        setVerified(true);
      } catch (err: any) {
        const msg = typeof err === "string" ? err : "Invalid or expired token";
        setMessage(msg);
        if (msg === "Email is already verified") setVerified(true);
      }
    };

    if (token) {
      verify();
    }
  }, [token]);

  return (
    <div className="text-center my-5" style={{ height: "70vh" }}>
      <h5>{message}</h5>
      <Link className="back-to-home-button" href="/login">
        Enlogin
      </Link>
    </div>
  );
};

export default VerifyEmailClient;

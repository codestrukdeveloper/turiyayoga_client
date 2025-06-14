import React from "react";
import Contact from "@/app/components/Contact";
import NewsShelter from "@/app/components/NewsShelter";
import ContactClient from "./ContactClient";


const ContactPage = () => {
  return (
    <>
      <ContactClient />
        <Contact />
      <NewsShelter />
    </>
  );
};

export default ContactPage;


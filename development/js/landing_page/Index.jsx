import React, { Component } from "react";
import LogoAndTitle from "./LogoAndTitle";
import Care from "./Care";
import NavButtons from "./nav/NavButtons";
import ContactForm from "./ContactForm";
import Articles from "./Articles";
import Footer from "./Footer";

export default function Index() {
  return (
    <>
      <div className="backgrounds">
        <NavButtons />
        <LogoAndTitle />
        <Care />
        <ContactForm />
        <Articles />
        <Footer />
      </div>
    </>
  );
}

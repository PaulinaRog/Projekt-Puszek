import React from "react";
import NavButtons from "../landing_page/nav/NavButtons";
import { MailTo } from "../landing_page/ContactForm";
import SectionHeader from "../landing_page/SectionHeader";

export default function Contact() {
  return (
    <>
      <div className="contact-bg">
        <NavButtons />
        <MailTo />
        <SectionHeader title="PARTNERZY" />
        <div className="contact-partners">
          <a
            href="https://fundacjakastor.org/"
            style={{ textDecoration: "none" }}
          >
            <div className="contact-partners-single">
              <h3 className="contact-partners-name">FUNDACJA KASTOR</h3>
              <img
                src="/development/assets/kastor.png"
                style={{ width: 100, height: "auto" }}
              />
            </div>
          </a>
          <a href="https://dogtorant.pl/" style={{ textDecoration: "none" }}>
            <div className="contact-partners-single">
              <h3 className="contact-partners-name">DOGTORANT</h3>
              <img
                src="/development/assets/dogtorant.png"
                style={{ width: 100, height: "auto" }}
              />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

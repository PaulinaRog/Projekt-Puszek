import React from "react";
import { NavLink } from "react-router-dom";

const footerLinksList = ["Strona główna", "Opieka", "Artykuły", "Kontakt"];

export default function Footer() {
  return (
    <>
      <div className="footer">
        <section>
          <div className="footer-decorative-elem1">
            <img
              src="https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/logos/puszek_logo.png"
              className="footer-logo"
            />
          </div>
          <NavLink
            className="footer-link"
            to="/documents/privacypolicy"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="footer-links" style={{ paddingTop: 50 }}>
              Polityka Prywatności
            </span>
          </NavLink>
          <NavLink
            className="footer-link"
            to="/documents/regulations"
            style={{ textDecoration: "none", color: "white", visited: "grey" }}
          >
            <span className="footer-links">Regulamin</span>
          </NavLink>
          <NavLink
            className="footer-link"
            to="/thankyou"
            style={{ textDecoration: "none", color: "white", visited: "grey" }}
          >
            <span className="footer-links">Podziękowania</span>
          </NavLink>
          <h5 className="footer-madeby">MADE BY</h5>
          <span className="footer-madeby-name">Paulina Róg</span>
          <div className="footer-decorative-elem2"></div>
        </section>
      </div>
    </>
  );
}

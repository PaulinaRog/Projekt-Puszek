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
              src={require("../../assets/puszek_logo.png")}
              className="footer-logo"
            />
          </div>
          <NavLink
            to="/documents/privacypolicy"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="footer-links" style={{ paddingTop: 50 }}>
              Polityka Prywatności
            </span>
          </NavLink>
          <NavLink
            to="/documents/regulations"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="footer-links">Regulamin</span>
          </NavLink>
          <h5 className="footer-menu">MENU</h5>
          {footerLinksList.map((link, idx) => (
            <span className="footer-menu-link" key={idx}>
              {link}
            </span>
          ))}
          <div className="footer-decorative-elem2"></div>
        </section>
      </div>
    </>
  );
}

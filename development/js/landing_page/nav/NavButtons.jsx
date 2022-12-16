import React from "react";
import { NavLink } from "react-router-dom";
import HomeRoutLogo from "./HomeRoutLogo";

const cardList = ["opieka", "artykuły", "kontakt", "logowanie"];

export default function NavButtons() {
  const activeStyle = { color: "#ffff00" };

  return (
    <>
      <div className="header">
        <HomeRoutLogo />
        <NavLink
          to="/care/sitters"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <button data-cy="button-care-app" className="header_nav_button">
            <i className="fa-solid fa-hand-holding-heart"></i>
            {cardList[0].toUpperCase()}
          </button>
        </NavLink>
        <NavLink
          to="/articles"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <button data-cy="button-articles" className="header_nav_button">
            <i className="fa-solid fa-paragraph"></i>
            {cardList[1].toUpperCase()}
          </button>
        </NavLink>
        <NavLink
          to="/contact"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <button data-cy="button-contact-form" className="header_nav_button">
            <i className="fa-regular fa-address-book"></i>
            {cardList[2].toUpperCase()}
          </button>
        </NavLink>
        <NavLink
          to="/signup"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <button data-cy="button-signin" className="header_nav_button">
            <i className="fa-solid fa-user-secret"></i>
            {cardList[3].toUpperCase()}
          </button>
        </NavLink>
      </div>
    </>
  );
}

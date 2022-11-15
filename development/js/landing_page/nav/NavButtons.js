import React from "react";
import { NavLink } from "react-router-dom";
import HomeRoutLogo from "./homeRoutLogo";

const cardList = ["opieka", "artykuły", "kontakt", "logowanie"];

export default function NavButtons() {
  const activeStyle = { color: "#ffff00" };
  return (
    <>
      <div className="header">
        <NavLink to="/">
          <HomeRoutLogo />
        </NavLink>
        <NavLink
          to="/puszek/care"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <button className="header_nav_button">
            <i className="fa-solid fa-hand-holding-heart"></i>
            {cardList[0].toUpperCase()}
          </button>
        </NavLink>
        <NavLink
          to="/puszek/articles"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <button className="header_nav_button">
            <i className="fa-solid fa-paragraph"></i>
            {cardList[1].toUpperCase()}
          </button>
        </NavLink>
        <NavLink
          to="/puszek/contact"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <button className="header_nav_button">
            <i className="fa-regular fa-address-book"></i>
            {cardList[2].toUpperCase()}
          </button>
        </NavLink>
        <NavLink
          to="/puszek/login"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <button className="header_nav_button">
            <i className="fa-solid fa-user-secret"></i>
            {cardList[3].toUpperCase()}
          </button>
        </NavLink>
      </div>
    </>
  );
}

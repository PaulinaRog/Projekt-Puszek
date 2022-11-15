import React from "react";
import SectionHeader from "./sectionHeader";

const buttonsList = [
  "szukaj opiekuna",
  "przeglądaj ogłoszenia",
  "zobacz nasze adopciaki",
];

function CareButton({ icon, idx }) {
  return (
    <button className="care-button">
      {icon}
      {buttonsList[idx].toUpperCase()}
    </button>
  );
}

export default function Care() {
  return (
    <div className="care-background">
      <SectionHeader title="OPIEKA" />
      <div className="care-button-container">
        <CareButton
          idx={0}
          icon={<i className="fa-solid fa-hand-holding-heart"></i>}
        />
        <CareButton idx={1} icon={<i className="fa-solid fa-glasses"></i>} />
        <CareButton idx={2} icon={<i className="fa-solid fa-shield-dog"></i>} />
      </div>
      <div className="care-background-element1"></div>
      <div className="care-background-element2">
        <section className="care-owner">
          <p className="care-owner-text">
            Wyjeżdżasz na wakacje i nie masz z kim zostawić pupila?
          </p>
          <p className="care-owner-text">
            Jesteś w trakcie remontu lub przeprowadzki?
          </p>
          <p className="care-owner-text">
            Obawiasz się, że ciężko przejdzie pobyt w hotelu lub Cię na niego
            nie stać?
          </p>
          <p className="care-owner-text">
            Wyjeżdzasz do pracy za granicę i nie ma kto się nim zająć?
          </p>
        </section>
        <section className="care-pet">
          <p className="care-pet-text">
            Chcesz adoptować zwierzaka i nie wiesz czy sobie poradzisz?
          </p>
          <p className="care-pet-text">
            Twoje dziecko Cię o to prosi, a Ty nie wiesz jak sobie poradzi z
            obowiązkiem?
          </p>
          <p className="care-pet-text">
            Nie chcesz się zobowiązywać na dłużej, a kochasz zwierzęta?
          </p>
          <p className="care-pet-text">
            Twój przyjaciel odszedł i brakuje Ci towarzystwa?
          </p>
        </section>
      </div>
    </div>
  );
}

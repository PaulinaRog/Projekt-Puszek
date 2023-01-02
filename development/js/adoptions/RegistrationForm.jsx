import React from "react";
import { NavLink } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { cities } from "../cities/cities";
import SetOrganisationPhoto from "./SetOrganisationPhoto";
import TextEditor from "./TextEditor";
import supabase from "../contexts/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const [err, setErr] = useState(null);
  const [city, setCity] = useState(null);
  const [type, setType] = useState(null);
  const [cat, setCat] = useState(false);
  const [dog, setDog] = useState(false);
  const [birds, setBirds] = useState(false);
  const [rodents, setRodents] = useState(false);
  const [all, setAll] = useState(false);
  const [desc, setDesc] = useState(null);
  const [opp, setOpp] = useState(null);
  const [voivodeship, setVoivodeship] = useState(null);
  const [text, setText] = useState(null);
  const navigate = useNavigate();

  const formRef = useRef();
  console.log(formRef);

  useEffect(() => {
    const isUserLogged = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
      }
      if (!user) {
        navigate("/signup");
      }

      setIsLogged(true);
      setUserId(user.id);
    };

    isUserLogged();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      uuid: userId,
      name: formRef.current[1].value,
      identification: formRef.current[2].value,
      opp: formRef.current[3].value,
      phone: formRef.current[9].value,
      email: formRef.current[10].value,
      address: formRef.current[12].value,
      zipCode: formRef.current[13].value,
      facebook: formRef.current[15].value,
      instagram: formRef.current[16].value,
      www: formRef.current[17].value,
      shortDesc: formRef.current[18].value,
    };

    const {
      uuid,
      name,
      identification,
      opp,
      phone,
      email,
      address,
      zipCode,
      facebook,
      instagram,
      www,
      shortDesc,
    } = formData;

    if (
      type === null ||
      name === null ||
      city === null ||
      voivodeship === null ||
      shortDesc === null ||
      opp === null
    ) {
      setErr(
        "Nie można przesłać formularza! Sprawdź czy wszystkie pola oznaczone łapką są wypełnione. Zalecane jest wypełnienie wszystkich pól formularza, żeby organizacja była widoczna w wynikach filtrowania."
      );
    } else {
      const uploadProfile = async () => {
        const { error } = await supabase.from("organisation").insert([
          {
            uuid: uuid,
            type: type,
            name: name,
            identification: identification,
            opp: opp,
            cats: cat,
            dogs: dog,
            birds: birds,
            rodents: rodents,
            all: all,
            phone: phone,
            email: email,
            city: city,
            address: address,
            zipCode: zipCode,
            voivodeship: voivodeship,
            facebook: facebook,
            instagram: instagram,
            www: www,
            shortDesc: shortDesc,
            desc: desc,
          },
        ]);
        if (error) {
          setErr(
            "Wystąpił błąd. Sprawdź czy pola są poprawnie wypełnione lub skontaktuj się z nami."
          );
        }
        if (!error) {
          setErr(null);
          setText(
            "Zmiany zostały zapisane! Za chwilę zostaniesz przekierowany do pulpitu użytkownika."
          );
          const timeout = setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
          timeout();
        }
      };
      uploadProfile();
    }
  };

  const clickedStyle = {
    backgroundColor: "#a4a42ab2",
    boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.627)",
  };

  return (
    <>
      {isLogged && (
        <>
          <div className="profile-form">
            <aside className="profile-form-sidebar">
              <NavLink to="/setprofile">
                <button className="profile-form-button">COFNIJ</button>
              </NavLink>
            </aside>
            <form className="profile-form-bg" ref={formRef}>
              <h1 className="pf-title">PROFIL ORGANIZACJI</h1>
              <p className="pf-sections">Dane podstawowe</p>
              <div
                style={{
                  width: "63vw",
                  height: "0.5px",
                  backgroundColor: "#87878756",
                  marginBottom: "2em",
                }}
              ></div>
              <div style={{ display: "flex", gap: "8em" }}>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">
                    <i
                      style={{ fontSize: 15, paddingBottom: 0 }}
                      className="fa-solid fa-paw"
                    ></i>
                    Rodzaj organizacji:
                  </label>
                  <select
                    className="pf-select"
                    onChange={(e) => {
                      e.preventDefault();
                      setType(e.target.value);
                    }}
                  >
                    <option>Wybierz...</option>
                    <option>Schronisko</option>
                    <option>Fundacja</option>
                    <option>Stowarzyszenie</option>
                    <option>Dom tymczasowy</option>
                  </select>
                </div>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">
                    {" "}
                    <i
                      style={{ fontSize: 15, paddingBottom: 0 }}
                      className="fa-solid fa-paw"
                    ></i>
                    Nazwa:
                  </label>
                  <input type="text" className="pf-text" />
                </div>
              </div>
              <div style={{ display: "flex", gap: "8em" }}>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">KRS:</label>
                  <input
                    type="text"
                    className="pf-text"
                    placeholder="np. 0000999999"
                  />
                </div>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">
                    <i
                      style={{ fontSize: 15, paddingBottom: 0 }}
                      className="fa-solid fa-paw"
                    ></i>
                    OPP:
                  </label>
                  <select
                    className="pf-select"
                    onChange={(e) => {
                      e.preventDefault();
                      setOpp(e.target.value);
                    }}
                  >
                    <option value={null}>Wybierz...</option>
                    <option value="true">tak</option>
                    <option value="false">nie</option>
                  </select>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>
                  Zakres działalności:
                </h3>
                <button
                  value={cat}
                  name="cat"
                  className="pf-button"
                  style={cat ? clickedStyle : null}
                  onClick={(e) => {
                    e.preventDefault();
                    setCat(!cat);
                  }}
                >
                  KOTY
                </button>
                <button
                  value={dog}
                  name="dog"
                  className="pf-button"
                  style={dog ? clickedStyle : null}
                  onClick={(e) => {
                    e.preventDefault();
                    setDog(!dog);
                  }}
                >
                  PSY
                </button>
                <button
                  value={birds}
                  name="birds"
                  className="pf-button"
                  style={birds ? clickedStyle : null}
                  onClick={(e) => {
                    e.preventDefault();
                    setBirds(!birds);
                  }}
                >
                  PTAKI
                </button>
                <button
                  value={rodents}
                  name="rodents"
                  className="pf-button"
                  style={rodents ? clickedStyle : null}
                  onClick={(e) => {
                    e.preventDefault();
                    setRodents(!rodents);
                  }}
                >
                  GRYZONIE
                </button>
                <button
                  value={all}
                  name="all"
                  className="pf-button"
                  style={all ? clickedStyle : null}
                  onClick={(e) => {
                    e.preventDefault();
                    setAll(!all);
                  }}
                >
                  WSZYSTKIE
                </button>
              </div>
              <p className="pf-sections">Dane kontaktowe</p>
              <div
                style={{
                  width: "63vw",
                  height: "0.5px",
                  backgroundColor: "#87878756",
                  marginBottom: "2em",
                }}
              ></div>
              <div style={{ display: "flex", gap: "8em" }}>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">Nr telefonu:</label>
                  <input
                    type="text"
                    className="pf-text"
                    placeholder="np. 123 452 563"
                  />
                </div>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">E-mail:</label>
                  <input type="text" className="pf-text" />
                </div>
              </div>
              <p className="pf-sections">Dane adresowe</p>
              <div
                style={{
                  width: "63vw",
                  height: "0.5px",
                  backgroundColor: "#87878756",
                  marginBottom: "2em",
                }}
              ></div>
              <div style={{ display: "flex", gap: "8em" }}>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">
                    <i
                      style={{ fontSize: 15, paddingBottom: 0 }}
                      className="fa-solid fa-paw"
                    ></i>
                    Miasto:
                  </label>
                  <select
                    className="pf-select"
                    onChange={(e) => {
                      e.preventDefault();
                      setCity(e.target.value);
                    }}
                  >
                    <option className="pf-option">Wybierz...</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">Ulica i nr budynku:</label>
                  <input
                    type="text"
                    className="pf-text"
                    placeholder="np. Sezamkowa 5/11"
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "8em" }}>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">Kod pocztowy:</label>
                  <input
                    type="text"
                    className="pf-text"
                    placeholder="np. 00-001"
                  />
                </div>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">
                    <i
                      style={{ fontSize: 15, paddingBottom: 0 }}
                      className="fa-solid fa-paw"
                    ></i>
                    Województwo:
                  </label>
                  <select
                    className="pf-select"
                    onChange={(e) => {
                      e.preventDefault();
                      setVoivodeship(e.target.value);
                    }}
                  >
                    <option>Wybierz...</option>
                    <option>dolnośląskie</option>
                    <option>kujawsko-pomorskie</option>
                    <option>lubelskie</option>
                    <option>lubuskie</option>
                    <option>łódzkie</option>
                    <option>małopolskie</option>
                    <option>mazowieckie</option>
                    <option>opolskie</option>
                    <option>podkarpackie</option>
                    <option>podlaskie</option>
                    <option>pomorskie</option>
                    <option>śląskie</option>
                    <option>świętokrzyskie</option>
                    <option>warmińsko-mazurskie</option>
                    <option>wielkopolskie</option>
                    <option>zachodniopomorskie</option>
                  </select>
                </div>
              </div>
              <p className="pf-sections">Social Media</p>
              <div
                style={{
                  width: "63vw",
                  height: "0.5px",
                  backgroundColor: "#87878756",
                  marginBottom: "2em",
                }}
              ></div>
              <div style={{ display: "flex", gap: "8em" }}>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">Facebook:</label>
                  <input
                    type="text"
                    className="pf-text"
                    placeholder="https://"
                  />
                </div>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">Instagram:</label>
                  <input
                    type="text"
                    className="pf-text"
                    placeholder="https://"
                  />
                </div>
              </div>
              <div style={{ display: "grid" }}>
                <label className="pf-label">www:</label>
                <input type="text" className="pf-text" placeholder="https://" />
              </div>
              <p className="pf-sections">Pozostałe</p>
              <div
                style={{
                  width: "63vw",
                  height: "0.5px",
                  backgroundColor: "#87878756",
                  marginBottom: "2em",
                }}
              ></div>
              <div style={{ display: "grid" }}>
                <label className="pf-label">
                  <i
                    style={{
                      fontSize: 15,
                      paddingBottom: 0,
                    }}
                    className="fa-solid fa-paw"
                  ></i>
                  Krótki opis:
                </label>
                <textarea className="pf-textarea" type="text" />
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 10,
                }}
              >
                Rozbudowany opis profilu:
              </h3>
              <TextEditor setDesc={setDesc} />
              <SetOrganisationPhoto userId={userId} />
              <button
                className="pf-submit-btn"
                type="submit"
                onClick={handleSubmit}
              >
                ZAPISZ
              </button>
              {text ? <p className="text-ok">{text}</p> : null}
              {err ? <p className="text-err">{err}</p> : null}
            </form>
          </div>
        </>
      )}
    </>
  );
}

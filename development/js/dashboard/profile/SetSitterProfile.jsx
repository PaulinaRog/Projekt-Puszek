import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../../contexts/supabaseClient";
import { cities } from "../../cities/cities";
import SetSitterPhoto from "./SetSitterPhoto";

export default function SetSitterProfile({}) {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef();
  const [preferenceClicked, setPreferenceClicked] = useState("");
  const [petsClicked, setPetsClicked] = useState("");
  const [vaccineClicked, setVaccineClicked] = useState("");
  const [text, setText] = useState("");
  const [city, setCity] = useState(null);

  const clickedStyle = {
    backgroundColor: "#a4a42ab2",
    boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.627)",
  };

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
      name: formRef.current[0].value,
      surname: formRef.current[1].value,
      birth: formRef.current[2].value,
      city: city,
      description: formRef.current[4].value,
      motives: formRef.current[5].value,
      preference: preferenceClicked ? preferenceClicked : null,
      pets: petsClicked ? petsClicked : null,
      petsDesc: formRef.current[11].value,
      vaccine: vaccineClicked ? vaccineClicked : null,
      experience: formRef.current[14].value,
    };

    const {
      name,
      surname,
      birth,
      town,
      description,
      motives,
      preference,
      pets,
      petsDesc,
      vaccine,
      experience,
    } = formData;

    if (
      name.length <= 2 ||
      surname.length <= 2 ||
      birth === null ||
      town === null ||
      description === null ||
      motives === null ||
      preference === null ||
      pets === null ||
      petsDesc === null ||
      vaccine === null ||
      experience === null
    ) {
      setText(
        "Uzupe??nij wszystkie pola formularza! Pami??taj, ??e imi?? oraz nazwisko musz?? by?? d??u??sze ni?? 2 litery!"
      );
    } else {
      const uploadData = async () => {
        const { error } = await supabase.from("sitter_form").insert([
          {
            uuid: formData.uuid,
            name: formData.name,
            surname: formData.surname,
            birth: formData.birth,
            city: formData.city,
            description: formData.description,
            motives: formData.motives,
            preference: formData.preference,
            pets: formData.pets,
            petsDesc: formData.petsDesc,
            vaccine: formData.vaccine,
            experience: formData.experience,
          },
        ]);

        if (error) {
          console.log(error);
          setErr("Uzupe??nij wszystkie pola!");
        }

        setText(
          "Zmiany zosta??y zapisane! Za chwil?? zostaniesz przekierowany do pulpitu u??ytkownika."
        );
        const timeout = setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
        timeout();
      };

      uploadData();
    }
  };

  return (
    <>
      {isLogged && (
        <div className="profile-form">
          <aside className="profile-form-sidebar">
            <NavLink to="/setprofile">
              <button className="profile-form-button">COFNIJ</button>
            </NavLink>
          </aside>
          <form className="profile-form-bg" ref={formRef}>
            <h1 className="pf-title">PROFIL OPIEKUNA</h1>
            <div style={{ display: "flex", gap: "8em" }}>
              <div style={{ display: "grid" }}>
                <label className="pf-label">Imi?? *</label>
                <input type="text" className="pf-text" />

                <label className="pf-label">Nazwisko *</label>
                <input type="text" className="pf-text" />
              </div>
              <div style={{ display: "grid" }}>
                <label className="pf-label">Rok urodzenia *</label>
                <input type="number" className="pf-text" />

                <label className="pf-label">Miasto *</label>
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
            </div>

            <label className="pf-label">Opis</label>
            <textarea className="pf-textarea" type="text" />

            <label className="pf-label">Dlaczego podejmujesz si?? opieki?</label>
            <textarea className="pf-textarea" type="text" />

            <h3 className="pf-label">Wolisz opiek?? nad:</h3>
            <div className="buttons-container">
              <button
                className="pf-button"
                value="PSEM"
                style={preferenceClicked === "PSEM" ? clickedStyle : null}
                onClick={(e) => {
                  e.preventDefault();
                  setPreferenceClicked(e.target.value);
                }}
              >
                PSEM
              </button>
              <button
                className="pf-button"
                style={preferenceClicked === "KOTEM" ? clickedStyle : null}
                value="KOTEM"
                onClick={(e) => {
                  e.preventDefault();
                  setPreferenceClicked(e.target.value);
                }}
              >
                KOTEM
              </button>
              <button
                className="pf-button"
                style={preferenceClicked === "OBOJ??TNE" ? clickedStyle : null}
                value="OBOJ??TNE"
                onClick={(e) => {
                  e.preventDefault();
                  setPreferenceClicked(e.target.value);
                }}
              >
                OBOJ??TNE
              </button>
            </div>

            <h3 className="pf-label">Czy masz zwierz??ta?</h3>
            <div className="buttons-container">
              <button
                className="pf-button"
                style={petsClicked === "TAK" ? clickedStyle : null}
                value="TAK"
                onClick={(e) => {
                  e.preventDefault();
                  setPetsClicked(e.target.value);
                }}
              >
                TAK
              </button>
              <button
                className="pf-button"
                style={petsClicked === "NIE" ? clickedStyle : null}
                value="NIE"
                onClick={(e) => {
                  e.preventDefault();
                  setPetsClicked(e.target.value);
                }}
              >
                NIE
              </button>
            </div>
            <h3 className="pf-label">Napisz jakie i ile:</h3>
            <input type="text" className="pf-text" />

            <h3 className="pf-label">
              Czy s?? szczepione i przebadane pod k??tem najcz??stszych chor??b?
            </h3>
            <div className="buttons-container">
              <button
                className="pf-button"
                style={vaccineClicked === "TAK" ? clickedStyle : null}
                value="TAK"
                onClick={(e) => {
                  e.preventDefault();
                  setVaccineClicked(e.target.value);
                }}
              >
                TAK
              </button>
              <button
                className="pf-button"
                style={vaccineClicked === "NIE" ? clickedStyle : null}
                value="NIE"
                onClick={(e) => {
                  e.preventDefault();
                  setVaccineClicked(e.target.value);
                }}
              >
                NIE
              </button>
            </div>
            <label className="pf-label">
              Twoje dotychczasowe do??wiadczenia z opiek??:
            </label>
            <textarea className="pf-textarea" type="text" />

            <SetSitterPhoto userId={userId} />
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
      )}
    </>
  );
}

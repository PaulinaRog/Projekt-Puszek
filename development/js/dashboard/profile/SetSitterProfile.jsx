import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import supabase from "../../contexts/supabaseClient";
import { cities } from "../../cities/cities";

export default function SetSitterProfile() {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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
      console.log(user.id);
    };

    isUserLogged();
  }, []);

  const formRef = useRef();
  console.log(formRef);
  const [preferenceClicked, setPreferenceClicked] = useState("");
  const [petsClicked, setPetsClicked] = useState("");
  const [vaccineClicked, setVaccineClicked] = useState("");
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [city, setCity] = useState(null);

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
    console.log(formData);

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
        "Uzupełnij wszystkie pola formularza! Pamiętaj, że imię oraz nazwisko muszą być dłuższe niż 2 litery!"
      );
    } else {
      const uploadData = async () => {
        const { data, error } = await supabase.from("sitter_form").insert([
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
          setText("Uzupełnij wszystkie pola oznaczone gwiazdką!");
        }

        setText(
          "Zmiany zostały zapisane! Za chwilę zostaniesz przekierowany do pulpitu użytkownika."
        );
        const timeout = setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
        timeout();
      };

      uploadData();
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const sendPhoto = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`sitterpf/${userId}`, selectedFile);
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log("wysłano");
      }
    };
    sendPhoto();
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
                <label className="pf-label">Imię *</label>
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

            <label className="pf-label">Dlaczego podejmujesz się opieki?</label>
            <textarea className="pf-textarea" type="text" />

            <h3 className="pf-label">Wolisz opiekę nad:</h3>
            <div className="buttons-container">
              <button
                className="pf-button"
                value="PSEM"
                onClick={(e) => {
                  e.preventDefault();
                  setPreferenceClicked(e.target.value);
                }}
              >
                PSEM
              </button>
              <button
                className="pf-button"
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
                value="OBOJĘTNE"
                onClick={(e) => {
                  e.preventDefault();
                  setPreferenceClicked(e.target.value);
                }}
              >
                OBOJĘTNE
              </button>
            </div>

            <h3 className="pf-label">Czy masz zwierzęta?</h3>
            <div className="buttons-container">
              <button
                className="pf-button"
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
              Czy są szczepione i przebadane pod kątem najczęstszych chorób?
            </h3>
            <div className="buttons-container">
              <button
                className="pf-button"
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
              Twoje dotychczasowe doświadczenia z opieką:
            </label>
            <textarea className="pf-textarea" type="text" />

            <label className="pf-label">Prześlij zdjęcie profilowe:</label>
            <input
              type="file"
              id="avatar"
              name={selectedFile}
              style={{ width: 400, height: 30 }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button onClick={handleClick}>PRZEŚLIJ PLIK</button>

            <input type="checkbox" />
            <label>Akceptuję politykę prywatności i regulamin</label>

            <input type="checkbox" />
            <label>Wyrażam zgodę na przetwarzanie danych</label>

            <button type="submit" onClick={handleSubmit}>
              ZAPISZ
            </button>
            <p>{text}</p>
          </form>
        </div>
      )}
    </>
  );
}

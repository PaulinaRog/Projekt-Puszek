import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "../../contexts/supabaseClient";
import { cities } from "../../cities/cities";

export default function SetPetProfile() {
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

  const [typeClicked, setTypeClicked] = useState("");
  const [size, setSize] = useState("");
  const [vaccineClicked, setVaccineClicked] = useState("");
  const [specCareClicked, setSpecCareClicked] = useState("");
  const [otherPetsClicked, setOtherPetsClicked] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [city, setCity] = useState(null);
  const formRef = useRef();
  console.log(formRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      uuid: userId,
      name: formRef.current[0].value,
      surname: formRef.current[1].value,
      birth: formRef.current[2].value,
      city: city,
      petName: formRef.current[4].value,
      type: typeClicked ? typeClicked : null,
      size: size,
      character: formRef.current[8].value,
      perfectSitter: formRef.current[9].value,
      specialCare: specCareClicked ? specCareClicked : null,
      specialCareDesc: formRef.current[14].value,
      vaccine: vaccineClicked ? vaccineClicked : null,
      otherPets: otherPetsClicked ? otherPetsClicked : null,
      otherPetsDesc: formRef.current[17].value,
    };
    console.log(formData);

    const {
      name,
      surname,
      birth,
      town,
      petName,
      type,
      size,
      character,
      perfectSitter,
      specialCare,
      specialCareDesc,
      vaccine,
      otherPets,
      otherPetsDesc,
    } = formData;

    if (
      name.length <= 2 ||
      surname.length <= 2 ||
      birth === null ||
      town === null ||
      petName === null ||
      type === null ||
      character === null ||
      perfectSitter === null ||
      specialCare === null ||
      specialCareDesc === null ||
      otherPets === null ||
      vaccine === null ||
      otherPetsDesc === null
    ) {
      setText(
        "Uzupełnij wszystkie pola formularza! Pamiętaj, że imię oraz nazwisko muszą być dłuższe niż 2 litery!"
      );
    } else {
      const uploadData = async () => {
        const { error } = await supabase.from("owner_form").insert([
          {
            uuid: userId,
            name: formData.name,
            surname: formData.surname,
            birth: formData.birth,
            city: formData.city,
            petName: formData.petName,
            type: formData.type,
            size: formData.size,
            character: formData.character,
            perfectSitter: formData.perfectSitter,
            specialCare: formData.specialCare,
            specialCareDesc: formData.specialCareDesc,
            vaccine: formData.vaccine,
            otherPets: formData.otherPets,
            otherPetsDesc: formData.otherPetsDesc,
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
        .upload(`petpf/${userId}`, selectedFile);
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
        <>
          <div className="profile-form">
            <aside className="profile-form-sidebar">
              <NavLink to="/setprofile">
                <button className="profile-form-button">COFNIJ</button>
              </NavLink>
            </aside>
            <form className="profile-form-bg" ref={formRef}>
              <h1 className="pf-title">UZUPEŁNIJ PROFIL</h1>
              <div style={{ display: "flex", gap: "8em" }}>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">Imię *</label>
                  <input type="text" className="pf-text" id="name" />

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
              <div style={{ display: "flex", gap: "8em" }}>
                <div style={{ display: "grid" }}>
                  <label className="pf-label">Imię pupila</label>
                  <input type="text" className="pf-text" />
                </div>
                <div>
                  <h3 className="pf-label">Typ:</h3>
                  <div className="buttons-container">
                    <button
                      className="pf-button"
                      value="PIES"
                      onClick={(e) => {
                        e.preventDefault();
                        setTypeClicked(e.target.value);
                      }}
                    >
                      PIES
                    </button>
                    <button
                      className="pf-button"
                      value="KOT"
                      onClick={(e) => {
                        e.preventDefault();
                        setTypeClicked(e.target.value);
                      }}
                    >
                      KOT
                    </button>
                  </div>
                  <label className="pf-label">Rozmiar:</label>
                  <select
                    className="pf-select"
                    value={size}
                    onChange={(e) => {
                      e.preventDefault();
                      setSize(e.target.value);
                    }}
                  >
                    <option className="pf-option">Wybierz...</option>
                    <option className="pf-option" value="Mały">
                      Mały
                    </option>
                    <option className="pf-option" value="Średni">
                      Średni
                    </option>
                    <option className="pf-option" value="Duży">
                      Duży
                    </option>
                    <option className="pf-option" value="Bardzo duży">
                      Bardzo duży
                    </option>
                  </select>
                </div>
              </div>
              <label className="pf-label">Charakter pupila:</label>
              <textarea className="pf-textarea" type="text" />

              <label className="pf-label">Jakiego opiekuna szukasz?</label>
              <textarea className="pf-textarea" type="text" />

              <h3 className="pf-label">
                Czy Twój pupil jest szczepiony i przebadany pod kątem
                najczęstszych chorób?:
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
              <h3 className="pf-label">Czy wymaga szczególnej opieki?</h3>
              <div className="buttons-container">
                <button
                  className="pf-button"
                  value="TAK"
                  onClick={(e) => {
                    e.preventDefault();
                    setSpecCareClicked(e.target.value);
                  }}
                >
                  TAK
                </button>
                <button
                  className="pf-button"
                  value="NIE"
                  onClick={(e) => {
                    e.preventDefault();
                    setSpecCareClicked(e.target.value);
                  }}
                >
                  NIE
                </button>
              </div>
              <h3 className="pf-label">Podaj więcej informacji:</h3>
              <textarea className="pf-textarea" type="text" />

              <h3 className="pf-label">Czy lubi inne zwierzęta?</h3>
              <div className="buttons-container">
                <button
                  className="pf-button"
                  value="TAK"
                  onClick={(e) => {
                    e.preventDefault();
                    setOtherPetsClicked(e.target.value);
                  }}
                >
                  TAK
                </button>
                <button
                  className="pf-button"
                  value="NIE"
                  onClick={(e) => {
                    e.preventDefault();
                    setOtherPetsClicked(e.target.value);
                  }}
                >
                  NIE
                </button>
              </div>
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
        </>
      )}
    </>
  );
}

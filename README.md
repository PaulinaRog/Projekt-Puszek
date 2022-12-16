# PROJEKT PUSZEK

Puszek jest alternatywą dla hoteli dla zwierząt. W przeciwieństwie do reszty konkurencji na rynku, założeniem portalu jest pomoc, nie zarobek.

Projekt kierowany jest do miłośników zwierząt. Celem projektu jest rozwiązanie problemu opieki nad zwierzętami kiedy właściciel wyjeżdża bądź jest chory i nie ma jak się zaopiekować pupilem, oraz ułatwienie poszukiwania domów tymczasowych i stałych dla zwierząt bezdomnych.

**Projekt końcowy kursu JavaScript Developer od CodersLab**

Aplikacja stale rozwijana o nowe funkcjonalności. W najbliższym czasie pojawią się profile fundacji oraz schronisk i ich podopiecznych.

## Instalki

#### _Projekt zbudowany w oparciu o vite._

creating vite project

```bash
npm create vite@latest projekt_koncowy --template react
```

installation

```bash
npm install
```

SASS

```bash
npm install -D sass
```

emailJS

```bash
npm i emailjs-com
```

supabase

```bash
npm i @supabase/supabase-js
```

React router

```bash
npm install --save react-router-dom
```

# OPIS PROJEKTU

## _Articles_

#### Treść artykułów oraz zdjęcia pobierane z supabase, wyświetlone za pomocą funkcji _map_.

![App Screenshot](https://live.staticflickr.com/65535/52566929404_75decf7cbb_z.jpg)

## SUPABASE API Reference

```http
  https://app.supabase.com/projects
```

| Parameter      | Type     | Description   |
| :------------- | :------- | :------------ |
| `Supabase url` | `string` | **Required**. |

| Parameter          | Type     | Description   |
| :----------------- | :------- | :------------ |
| `Supabase api key` | `string` | **Required**. |

#### CreateClient(param1, param2)

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "import.meta.env.VITE_SUPABASE_URL";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
```

#### Fragment kodu - **articles**

```javascript
<div className="articles-background">
  <div className="articles-nav-buttons-bg">
    <NavButtons />
  </div>
  <section className="articles-container">
    {articlesData &&
      articlesData.map((article) => {
        return (
          <ArticleCard
            key={article.id}
            article={article}
            src={`https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/articles/photos/${article.id}`}
            onDataChange={getData}
          />
        );
      })}
  </section>
  {dataFromArticle && <ReadArticle sendData={dataFromArticle} />}
</div>
```

---

## _Contact form_

#### Możliwość wysyłania wiadomości bezpośrednio na skrzynkę pocztową za pomocą emailJS, dostępne dla wszystkich użytkowników.

![App Screenshot](https://live.staticflickr.com/65535/52567098360_0d511d9669_z.jpg)

## EmailJS Reference:

#### EmailJS API keys:

```http
  https://dashboard.emailjs.com/admin/account
```

| Parameter    | Type     | Description   |
| :----------- | :------- | :------------ |
| `Public key` | `string` | **Required**. |

| Parameter     | Type     | Description   |
| :------------ | :------- | :------------ |
| `Private key` | `string` | **Required**. |

#### EmailJS Service ID:

```http
https://dashboard.emailjs.com/admin
```

| Parameter    | Type     | Description   |
| :----------- | :------- | :------------ |
| `Service ID` | `string` | **Required**. |

---

#### Fragment kodu - **contact form**

```javascript
 emailjs
        .sendForm(
         <<<>>>SERVICE ID<<<>>>
         <<<>>>PRIVATE KEY<<<>>>
         form.current,
         <<<>>>PUBLIC KEY<<<>>>
        )
        .then(
          (result) => {
            console.log(result.text);
            setFormData((prev) => ({
              ...prev,
              name: "",
              mail: "",
              message: "",
            }));
```

---

## _User Cards_

#### Dostępne dla wszystkich - karty użytkowników z fragmentem opisu "na odwrocie"

![App Screenshot](https://live.staticflickr.com/65535/52566189217_d85889ae89_z.jpg)

#### fragmenty kodu - **user cards**

Pobieranie danych oraz zdjęć z supabase

```javascript
useEffect(() => {
  const getProfiles = async () => {
    const { data, error } = await supabase
      .from("owner_form")
      .select("uuid, petName, character, city");

    if (error) {
      console.log(error);
    }
    if (data) {
      setProfiles(data);
    }
  };
  getProfiles();
}, []);
```

```javascript
useEffect(() => {
  const urls = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .createSignedUrls([`petpf/${uuid}`], 60);

    if (error) {
      console.log(error);
    }
    if (data) {
      setSrc(data[0].signedUrl);
    }
  };
  urls();
}, []);
```

---

## _Sign in - sign up form_

#### Animowany formularz do logowania oraz rejestracji - po zarejestrowaniu dostępne na stronie tworzenie profilu, dodawanie zdjęcia profilowego przez formularz w aplikacji, usuwanie profilu, wysyłanie i odbieranie wiadomości.

![App Screenshot](https://live.staticflickr.com/65535/52566189282_a50be1c76f_z.jpg)

#### fragment kodu - **signup**

```javascript
<section
  className="signup"
  style={{
    width: loginFormVisible ? "100px" : "300px",
    animation: !loginFormVisible
      ? "switch linear 0.4s"
      : "switch-left linear 0.4s",
  }}
>
  <div
    onClick={handleClick}
    style={{
      display: loginFormVisible ? "block" : "none",
    }}
  >
    <div className="sign-box">
      <i className="fa-solid fa-user-plus"></i>
      <span className="sign-form-choice" style={{ marginLeft: "-17px" }}>
        REJESTRACJA
      </span>
    </div>
  </div>
  {loginFormVisible ? null : <Signup />}
</section>
```

---

## _Messages_

#### Po zalogowaniu możliwość wysyłania i odbierania wiadomości w aplikacji.

![App Screenshot](https://live.staticflickr.com/65535/52567177618_e48e0c4622_z.jpg)

#### fragment kodu - **messages**

```javascript
export default function SingleMessage({ messages }) {
  const { message, sentat, senderName } = messages;

  return (
    <>
      <div className="messages-card">
        <h2 className="messages-header">Wiadomość od {senderName}</h2>
        <p className="messages-timestamp">
          Wysłana: {sentat.substring(0, 10)} o godzinie{" "}
          {sentat.substring(11, 16)}
        </p>
        <p>{message}</p>
      </div>
    </>
  );
}
```

---

## _Dashboard_

#### W dashboardzie dostępne też powiadomienia dzięki _supabase subscribe_.

![App Screenshot](https://live.staticflickr.com/65535/52566929369_b917051a3a_z.jpg)

#### fragment kodu - **dashboard**

_supabase subscribe_

```javascript
const listenToMessages = () => {
  supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "*",
        table: "messages",
        filter: `receiverid=eq.${userInfo.id}`,
      },
      (payload) => {
        setVisible({ display: "block" });
        setNotify(payload);
      }
    )
    .subscribe();
};
listenToMessages();
```

---

## _Edit profile_

#### Po kliknięciu na _profil_ w nawigacji po lewej stronie dostajemy panel zarządzania profilem użytkownika - jedną z ważniejszych funkcji panelu jest edycja profilu.

![App Screenshot](https://live.staticflickr.com/65535/52566656951_54419a1f25_z.jpg)

#### fragment kodu - **view profile**

_getting, saving and returning data_

```javascript
const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    const getData = async () => {
      const { data, error } = await supabase
        .from("sitter_form")
        .select("description")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        inputRef.current.value = data.description;
      }
    };
    getData();
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") {
      setText("Pole nie może być puste!");
    } else {
      const saveChanges = async () => {
        const { data, error } = await supabase
          .from("sitter_form")
          .update({ description: inputRef.current.value })
          .eq("uuid", id)
          .select("description");

        if (error) {
          console.log(error);
          setText("Nie udało się zapisać zmian");
        }
        if (data) {
          setNewData(data[0].description);
          setClicked(false);
          setText(null);
        }
      };
      saveChanges();
    }
  };

  return (
    <>
      {description && (
        <>
          {!clicked ? (
            <p>{!newData ? description : newData}</p>
          ) : (
            <>
              <textarea ref={inputRef} onChange={(e) => e.targetValue} />{" "}
              <i className="fa-solid fa-download" onClick={handleSave}></i>
            </>
          )}
          <i className="fa-solid fa-pen-to-square" onClick={handleClick}></i>
        </>
      )}
      {text ? <p className="text-err">{text}</p> : null}
    </>
  );
}

```

---

## _Profile Photo_

#### Możliwość zmiany zdjęcia profilowego dzięki _supabase storage_

![App Screenshot](https://live.staticflickr.com/65535/52566189262_ccd1c00268_z.jpg)

#### fragment kodu - **set pet photo**

```javascript
export default function SavePhoto({
  image,
  id,
  profile,
  forUpdate,
  setChange,
}) {
  const [deleted, setDeleted] = useState(false);
  const [sent, setSent] = useState(false);

  const deletePhoto = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .remove(`${profile}pf/${id}`);
    if (error) {
      console.log(error);
    }
    if (data) {
      setDeleted(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    deletePhoto();

    const sendPhoto = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${profile}pf/${id}`, forUpdate);
      if (error) {
        console.log(error);
      }
      if (data) {
        setSent(true);
        setChange(true);
      }
    };
    sendPhoto();
  };

  return (
    <>
      {!sent ? (
        <>
          <img src={image} className="pfp-image" />
          <button className="pfp-button" onClick={handleClick}>
            ZAPISZ
          </button>
        </>
      ) : null}
    </>
  );
}
```

---

## _Delete profile_

#### Możliwość usunięcia aktualnego profilu użytkownika.

![App Screenshot](https://live.staticflickr.com/65535/52566656976_75cc3b421d_z.jpg)

#### fragment kodu - **delete profile**

```javascript
useEffect(() => {
  const checkProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("ownerOrSitter")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      data.ownerOrSitter === "owner" ? setOwner("pet") : null;
      data.ownerOrSitter === "sitter" ? setSitter("sitter") : null;
    }
  };
  checkProfile();
}, []);

// USUNIĘCIE ZDJĘCIA

const deletePhoto = async () => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .remove(`${owner ? owner : sitter}pf/${id}`);
  if (error) {
    console.log(error);
    setUserPhoto("Wystąpił błąd");
  }
  if (data) {
    setUserPhoto("Skasowano zdjęcie");
  }
};
```

---

## Color Reference

| Color                | Hex     |
| -------------------- | ------- |
| Details, decor elems | #ffff00 |
| Navigation, fonts    | #5f5f5f |

---

## Icons and photos

- [Pixabay](https://pixabay.com/pl/)
- [Fontawesome](https://fontawesome.com/icons)

## THANK YOU

#### _Ogromne podziękowania dla mentora kursu za nieustające wsparcie i wiarę w moje możliwości._

:checkered_flag: :fire: :raised_hands:

---

## Deployment

#### Project is now live at _Netlify_

```https
projektpuszek.netlify.app
```

## License

[Apache License](https://www.apache.org/licenses/LICENSE-2.0)

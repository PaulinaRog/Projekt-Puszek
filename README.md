
# PUSZEK
Puszek jest alternatywą dla hoteli dla zwierząt. 
W przeciwieństwie do reszty konkurencji na rynku, 
założeniem portalu jest pomoc, nie zarobek.

Projekt kierowany jest do miłośników zwierząt.
Celem projektu jest rozwiązanie problemu opieki nad zwierzętami
kiedy właściciel wyjeżdża bądź jest chory i nie ma jak się zaopiekować pupilem.
Oraz ułatwienie poszukiwania domów tymczasowych i stałych dla zwierząt bezdomnych.

Projekt końcowy kursu JavaScript Developer od CodersLab.

Aplikacja stale rozwijana o nowe funkcjonalności.
W najbliższym czasie pojawią się profile fundacji oraz schronisk i ich podopiecznych.



## Instalki

#### *Projekt zbudowany w oparciu o vite.*

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

## *Articles*
#### Treść artykułów oraz zdjęcia pobierane z supabase, wyświetlone za pomocą funkcji *map*.

![App Screenshot](https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/screenshots/articles.png)


## SUPABASE API Reference


```http
  https://app.supabase.com/projects
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Supabase url` | `string` | **Required**.|


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Supabase api key`      | `string` | **Required**.  |

#### CreateClient(param1, param2)

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'import.meta.env.VITE_SUPABASE_URL'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
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
## *Contact form*

#### Możliwość wysyłania wiadomości bezpośrednio na skrzynkę pocztową za pomocą emailJS, dostępne dla wszystkich użytkowników.
![App Screenshot](https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/screenshots/contact-form.png)


## EmailJS Reference:

#### EmailJS API keys:
```http
  https://dashboard.emailjs.com/admin/account
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Public key` | `string` | **Required**.|


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Private key`      | `string` | **Required**.  |

#### EmailJS Service ID:

```http
https://dashboard.emailjs.com/admin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Service ID` | `string` | **Required**.|

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

## *User Cards*

#### Dostępne dla wszystkich - karty użytkowników z fragmentem opisu "na odwrocie"

![App Screenshot](https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/screenshots/user-preview.png)

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
## *Sign in - sign up form*

#### Animowany formularz do logowania oraz rejestracji - po zarejestrowaniu dostępne na stronie tworzenie profilu, dodawanie zdjęcia profilowego przez formularz w aplikacji, usuwanie profilu, wysyłanie i odbieranie wiadomości.
![App Screenshot](https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/screenshots/ligin-register.png)

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

## *Messages*

#### Po zalogowaniu możliwość wysyłania i odbierania wiadomości w aplikacji. 

![App Screenshot](https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/screenshots/messages.png)

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

## *Dashboard*

#### W dashboardzie dostępne też powiadomienia dzięki *supabase subscribe*.

![App Screenshot](https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/screenshots/dashboard-notifications.png)

#### fragment kodu - **dashboard**
*supabase subscribe*
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
## *Edit profile*

#### Po kliknięciu na *profil* w nawigacji po lewej stronie dostajemy panel zarządzania profilem użytkownika - jedną z ważniejszych funkcji panelu jest edycja profilu.
![App Screenshot](https://vgrtdhqwzgkegugwynsl.supabase.co/storage/v1/object/public/screenshots/edit-profile.png)

#### fragment kodu - **view profile**
*getting, saving and returning data*

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
------
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Details, decor elems | ![#ffff00](https://via.placeholder.com/10/ffff00?text=+) #ffff00 |
| Navigation, fonts | ![#5f5f5f](https://via.placeholder.com/10/5f5f5f?text=+) #5f5f5f |

---
# Deployment

### Project is now live at *Netlify*

```https
projektpuszek.netlify.app
```

## License

[Apache License](https://www.apache.org/licenses/LICENSE-2.0)


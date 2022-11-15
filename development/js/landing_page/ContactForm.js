import React, { useRef, useState } from "react";
import SectionHeader from "./sectionHeader";
import emailjs from "emailjs-com";

function MailTo() {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    message: "",
  });

  const [check, setCheck] = useState(false);

  const [nameErr, setNameErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [messageErr, setMessageErr] = useState(false);

  const [checkboxErr, setCheckboxErr] = useState(false);
  const [text, setText] = useState("");

  const form = useRef();

  const handleChange = (e) => {
    e.preventDefault;
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setCheck((prev) => !prev);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (
      formData.name.length <= 2 ||
      !formData.mail.includes("@") ||
      formData.message.length <= 10 ||
      check === false
    ) {
      console.log("błąd");
      setNameErr(formData.name.length <= 2);
      setMailErr(!formData.mail.includes("@"));
      setMessageErr(formData.message.length <= 10);
      setCheckboxErr(check === false);
      setText("Błędnie wypełniony formularz!");
    } else {
      emailjs
        .sendForm(
          "service_h8zlfga",
          "template_8i6bzje",
          form.current,
          "napJ2b_t5_GuPFTBu"
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
            setCheck(false);
            setText("Wiadomość wysłana!");
            setNameErr("");
            setMailErr("");
            setMessageErr("");
            setCheckboxErr("");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <div className="contact-form">
      <form ref={form} onSubmit={sendEmail}>
        <label className="contact-form-label">Imię</label>
        <input
          onChange={handleChange}
          className="contact-form-input"
          type="text"
          name="from_name"
          placeholder="Imię"
          value={formData.name}
          id="name"
        />
        <p>{nameErr && "Imię musi być dłuższe niż 2 znaki!"}</p>
        <br />
        <label className="contact-form-label">E-mail</label>
        <input
          onChange={handleChange}
          className="contact-form-input"
          type="text"
          name="reply_to"
          placeholder="E-mail"
          value={formData.mail}
          id="mail"
        />
        <p>{mailErr && "Błędny format maila!"}</p>
        <br />
        <label className="contact-form-label">Wiadomość</label>
        <textarea
          onChange={handleChange}
          className="contact-form-textarea"
          type="text"
          name="message"
          placeholder="Napisz wiadomość..."
          value={formData.message}
          id="message"
        />
        <p>{messageErr && "Wiadomość za krótka!"}</p>
        <br />
        <div className="checkbox">
          <input
            id="input-1"
            type="checkbox"
            value={check}
            onChange={handleChange}
          />
          <label htmlFor="input-1">
            <span>Akceptuję politykę prywatności</span>
          </label>
        </div>
        <p>{checkboxErr && "Zaakceptuj politykę prywatności!"}</p>
        <br />
        <button className="contact-form-button" type="submit">
          WYŚLIJ
        </button>
      </form>
      <p className="contact-form-message">{text}</p>
    </div>
  );
}

export default function ContactForm() {
  return (
    <>
      <div className="contact">
        <SectionHeader title="KONTAKT" />
        <MailTo />
      </div>
    </>
  );
}

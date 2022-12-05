import React, { useRef, useState } from "react";
import supabase from "../contexts/supabaseClient";

export default function SendMessage({ loggedInfo, userData }) {
  const textRef = useRef();
  const [text, setText] = useState("");
  const [err, setErr] = useState("");

  const sendMessage = async () => {
    const { error } = await supabase.from("messages").insert([
      {
        senderid: loggedInfo.id,
        receiverid: userData.uuid,
        message: textRef.current[0].value,
        sendat: today,
      },
    ]);
    if (error) {
      console.log(error);
    }

    setText("Wiadomość wysłana!");
  };

  const today = new Date();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(textRef.current[0].value);
    if (textRef.current[0].value === "") {
      setErr("Nie można wysłać pustej wiadomości!");
    } else if (
      loggedInfo.id === null ||
      userData.uuid === null ||
      today === null
    ) {
      setErr(
        "Wystąpił błąd po stronie serwera. Wiadomość nie została wysłana. Prosimy spróbować później."
      );
    } else if (loggedInfo.id === userData.uuid) {
      setErr("Próbujesz wysłać wiadomość do siebie?");
    } else {
      sendMessage();
      setErr(null);
    }
  };

  return (
    <form ref={textRef} className="profile-message-container">
      <h3 className="profile-headline"> NAPISZ WIADOMOŚĆ PRYWATNĄ</h3>
      <textarea
        className="profile-textarea"
        placeholder="Treść wiadomości"
      ></textarea>
      <button className="profile-send-message" onClick={handleClick}>
        WYŚLIJ
      </button>
      {text ? (
        <p style={{ color: "green", fontWeight: 500, marginTop: 10 }}>
          {text}
          <i className="fa-solid fa-paw" style={{ marginLeft: 10 }}></i>
        </p>
      ) : null}
      {err ? (
        <p style={{ color: "rgb(170, 0, 0)", fontWeight: 500, marginTop: 10 }}>
          {err}
          <i
            style={{ marginLeft: 10 }}
            className="fa-regular fa-face-frown"
          ></i>
        </p>
      ) : null}
    </form>
  );
}

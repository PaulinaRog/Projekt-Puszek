import React, { useRef } from "react";
import { useState } from "react";
import supabase from "../contexts/supabaseClient";

export default function ReplyToMessage({
  message: { senderid, receiverid, senderName, receiverName, id },
}) {
  const textRef = useRef();
  const [msg, setMsg] = useState();
  const [text, setText] = useState();
  const [err, setErr] = useState();

  const reply = async () => {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          senderid: receiverid,
          receiverid: senderid,
          message: textRef.current.value,
          sentat: today,
          senderName: receiverName,
          receiverName: senderName,
          replyTo: id,
        },
      ])
      .select("message");

    if (error) {
      console.log(error);
      setErr("Nie udało się wysłać wiadomości");
    }
    if (data) {
      setMsg(data);
      setText("Odpowiedź wysłana!");
    }
  };

  const today = new Date();

  const handleClick = (e) => {
    e.preventDefault();
    if (
      textRef.current.value === null ||
      textRef.current.value < 0 ||
      textRef.current.value === ""
    ) {
      setErr("Nie możesz wysłać pustej wiadomości!");
    } else {
      setErr(null);
      reply();
    }
  };

  return (
    <>
      {msg && (
        <div className="messages-reply">
          <p>{msg[0].message}</p>
        </div>
      )}

      <div className="messages-reply-box">
        <h1 style={{ fontWeight: 500, marginBottom: 10 }}>Napisz odpowiedź:</h1>
        <textarea
          className="messages-reply-input"
          ref={textRef}
          placeholder="Twoja wiadomość"
        />
        <button className="messages-reply-button" onClick={handleClick}>
          WYŚLIJ
        </button>
        {text ? (
          <p className="text-ok">
            {text} <i className="fa-solid fa-paw"></i>
          </p>
        ) : null}
        {err ? (
          <p className="text-err">
            {err} <i className="fa-solid fa-xmark"></i>
          </p>
        ) : null}
      </div>
    </>
  );
}

import React, { useRef } from "react";
import { useState } from "react";
import supabase from "../contexts/supabaseClient";

export default function ReplyToMessage({
  message: { senderid, receiverid, senderName, receiverName, id },
}) {
  const textRef = useRef();
  const [msg, setMsg] = useState();
  const [text, setText] = useState();

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
    }
    if (data) {
      setMsg(data);
      console.log(data);
      setText("Odpowiedź wysłana!");
    }
  };

  const today = new Date();

  const handleClick = (e) => {
    e.preventDefault();
    reply();
  };

  return (
    <>
      {msg && (
        <div>
          <p>{msg[0].message}</p>
        </div>
      )}

      <div>
        <h1>Odpowiedz {senderName}</h1>
        <textarea ref={textRef} />
        <button onClick={handleClick}>WYŚLIJ</button>
        {text ? <p>{text}</p> : null}
      </div>
    </>
  );
}

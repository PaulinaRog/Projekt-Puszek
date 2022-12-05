import React, { useRef, useState } from "react";
import supabase from "../contexts/supabaseClient";

export default function SendMessage({ loggedInfo, userData }) {
  console.log(loggedInfo);
  console.log(userData);

  const textRef = useRef();
  const [text, setText] = useState("");

  const sendMessage = async () => {
    const { data, error } = await supabase.from("messages").insert([
      {
        senderid: loggedInfo.id,
        receiverid: userData.uuid,
        message: textRef.current.value,
      },
    ]);
    if (error) {
      console.log(error);
    }
    if (data) {
      setText("Wiadomość wysłana!");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(textRef.current.value);
    sendMessage();
  };

  return (
    <>
      <h3> NAPISZ WIADOMOŚĆ PRYWATNĄ</h3>
      <textarea ref={textRef}></textarea>
      <button onClick={handleClick}>WYŚLIJ</button>
      <p>{text}</p>
    </>
  );
}

import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../contexts/supabaseClient";
import { useState } from "react";

export default function ReadMessage() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState();

  useEffect(() => {
    const getMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error_message);
        console.log(error_description);
        setErr("Nie udało się załadować wiadomości");
      }
      if (data) {
        setMessage(data);
      }
    };
    getMessages();
  }, []);

  return (
    <>
      {message && (
        <>
          <h1 className="messages-header">
            Wiadomość do {message.receiverName}
          </h1>
          <p className="messages-timestamp">
            Wysłana: {message.sentat.substring(0, 10)} o godzinie{" "}
            {message.sentat.substring(11, 16)}
          </p>

          <p className="messages-message">{message.message}</p>
        </>
      )}
      {err ? (
        <p className="text-err">
          {err} <i className="fa-solid fa-xmark"></i>
        </p>
      ) : null}
    </>
  );
}

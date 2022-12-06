import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../contexts/supabaseClient";
import { useState } from "react";
import ReplyToMessage from "./ReplyToMessage";

export default function ReadMessage() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  //   const [replies, setReplies] = useState(null);

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
      }
      if (data) {
        console.log(data);
        setMessage(data);
      }
    };
    getMessages();

    // const getReplies = async () => {
    //   const { data, error } = await supabase
    //     .from("messages")
    //     .select("*")
    //     .eq("replyTo", id);

    //   if (error) {
    //     console.log(error);
    //   }
    //   if (data) {
    //     console.log(data);
    //     setReplies(data);
    //   }
    // };
    // getReplies();
  }, []);

  return (
    <>
      {message && (
        <>
          <h1>Wiadomość od {message.senderName}</h1>
          <p>
            Wysłana: {message.sentat.substring(0, 10)} o godzinie{" "}
            {message.sentat.substring(11, 16)}
          </p>
          <div className="messages-card">
            <p>{message.message}</p>
          </div>
          <ReplyToMessage message={message} />
        </>
      )}
    </>
  );
}

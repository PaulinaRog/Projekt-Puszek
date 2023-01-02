import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../contexts/supabaseClient";
import { useState } from "react";
import ReplyToMessage from "./ReplyToMessage";

function Profile({ senderid }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const checkProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("ownerOrSitter")
        .eq("id", senderid)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        if (data.ownerOrSitter === "owner") {
          setProfile("petpf");
        } else if (data.ownerOrSitter === "sitter") {
          setProfile("sitterpf");
        } else if (data.ownerOrSitter === "organisation") {
          setProfile("orgpf");
        }
      }
    };
    checkProfile();
  }, []);

  return (
    <NavLink to={`/care/${profile}/${senderid}`} className="read-msg-userpf">
      <i className="fa-solid fa-eye"></i> PROFIL
    </NavLink>
  );
}

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
          <div style={{ position: "relative" }}>
            <h1 className="messages-header">
              Wiadomość od {message.senderName}
            </h1>
            <p className="messages-timestamp">
              Wysłana: {message.sentat.substring(0, 10)} o godzinie{" "}
              {message.sentat.substring(11, 16)}
            </p>
            <Profile senderid={message.senderid} />
          </div>

          <p className="messages-message">{message.message}</p>

          <ReplyToMessage message={message} />
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

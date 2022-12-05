import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../contexts/supabaseClient";

export default function SingleMessage({ messages }) {
  const { id } = useParams();
  const [ownerName, setOwnerName] = useState(null);
  const [sitterName, setSitterName] = useState(null);

  const { senderid, message, sendat } = messages;

  const viewOwner = async () => {
    const { data, error } = await supabase
      .from("owner_form")
      .select("name")
      .eq("uuid", senderid)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      setOwnerName(data.name);
    }
  };
  viewOwner();

  const viewSitter = async () => {
    const { data, error } = await supabase
      .from("sitter_form")
      .select("name")
      .eq("uuid", senderid)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      setSitterName(data.name);
      console.log(sitterName);
    }
  };
  viewSitter();

  return (
    <div className="messages-card">
      <h2 className="messages-from">
        Wiadomość od {sitterName ? sitterName : ownerName}
      </h2>
      <p>
        Wysłana: {sendat.substring(0, 10)} o godzinie {sendat.substring(11, 16)}
      </p>
      <p>{message}</p>
    </div>
  );
}

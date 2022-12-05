import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import supabase from "../contexts/supabaseClient";
import SingleMessage from "./SingleMessage";

export default function Messages({ id }) {
  const [msgDetails, setMsgDetails] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, senderid, receiverid, sendat, message")
        .eq("receiverid", id);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setMsgDetails(data);
      }
    };
    getMessages();
  }, []);

  return (
    <>
      <div className="messages-bg">
        <main className="messages">
          <h1>Lorem ipsum</h1>
          {/* map */}
          <NavLink style={{ textDecoration: "none" }} to={`messages/msg/${id}`}>
            {msgDetails &&
              msgDetails.map((messages) => {
                return <SingleMessage key={messages.id} messages={messages} />;
              })}
          </NavLink>
        </main>
      </div>
    </>
  );
}

// enable realtime
// w jednym oknie ściąganie wszystkich wiadomości od danego uuid i do danego uuid, sortowanie po timestampie

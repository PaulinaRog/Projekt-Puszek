import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import supabase from "../contexts/supabaseClient";
import SingleMessage from "./SingleMessage";
import ReadMessage from "./ReadMessage";

export default function Messages({ id }) {
  const [msgDetails, setMsgDetails] = useState(null);
  const { pathname } = useLocation();
  const [sentDetails, setSentDetails] = useState(null);
  const [sent, setSent] = useState({
    display: "none",
  });
  const [received, setReceived] = useState({
    display: "block",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getMyMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, sentat, senderName")
        .eq("receiverid", id);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setMsgDetails(data);
      }
    };
    getMyMessages();
    const getMessagesSent = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, sentat, senderName")
        .eq("senderid", id);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setSentDetails(data);
      }
    };
    getMessagesSent();
  }, []);

  const handleClick = () => {
    setSent({
      display: "none",
    });
    setReceived({
      display: "block",
    });
    if (pathname.includes("msg")) {
      navigate("messages");
    }
  };
  const handleClickSec = () => {
    setReceived({
      display: "none",
    });
    setSent({
      display: "block",
    });
    if (pathname.includes("msg")) {
      navigate("messages");
    }
  };

  return (
    <>
      <div className="messages-bg">
        <main className="messages">
          <button onClick={handleClick}>ODEBRANE</button>
          <button onClick={handleClickSec}>WYSŁANE</button>
          <div style={received}>
            {!pathname.includes("msg") ? (
              msgDetails &&
              msgDetails.map((messages) => {
                return (
                  <NavLink
                    key={messages.id}
                    style={{ textDecoration: "none" }}
                    to={`messages/msg/${messages.id}`}
                  >
                    <SingleMessage messages={messages} />
                  </NavLink>
                );
              })
            ) : (
              <ReadMessage />
            )}
          </div>
          <div style={sent}>
            {!pathname.includes("msg") ? (
              sentDetails &&
              sentDetails.map((messages) => {
                return (
                  <NavLink
                    key={messages.id}
                    style={{ textDecoration: "none" }}
                    to={`messages/msg/${messages.id}`}
                  >
                    <SingleMessage messages={messages} />
                  </NavLink>
                );
              })
            ) : (
              <ReadMessage />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

// enable realtime
// w jednym oknie ściąganie wszystkich wiadomości od danego uuid i do danego uuid, sortowanie po timestampie

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import supabase from "../contexts/supabaseClient";
import SingleMessage from "./SingleMessage";
import ReadMessage from "./ReadMessage";
import SingleSendMessage from "./SingleSendMessage";
import ReadSentMessage from "./ReadSentMessage";

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
  const [err, setErr] = useState();

  useEffect(() => {
    const getMyMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, sentat, senderName")
        .eq("receiverid", id)
        .order("id", { ascending: false });

      if (error) {
        console.log(error);
        setErr("Nie udało się załadować wiadomości");
      }
      if (data) {
        setMsgDetails(data);
      }
    };
    getMyMessages();

    const getMessagesSent = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, sentat, receiverName")
        .eq("senderid", id)
        .order("id", { ascending: false });

      if (error) {
        console.log(error);
        setErr("Nie udało się załadować wiadomości");
      }
      if (data) {
        setSentDetails(data);
      }
    };
    getMessagesSent();

    const listenToMessages = () => {
      supabase
        .channel("messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "*",
            table: "messages",
            filter: `receiverid=eq.${id}`,
          },
          (payload) => {
            console.log("Change received!", payload);
          }
        )
        .subscribe();
    };
    listenToMessages();
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
          <button className="messages-button" onClick={handleClick}>
            ODEBRANE
          </button>
          <button className="messages-button" onClick={handleClickSec}>
            WYSŁANE
          </button>
          <div style={received}>
            {err ? (
              <p className="text-err">
                {err} <i className="fa-solid fa-xmark"></i>
              </p>
            ) : null}
            {!pathname.includes("msg") ? (
              msgDetails &&
              msgDetails.map((messages) => {
                return (
                  <NavLink
                    className="messages-link"
                    key={messages.id}
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
            {err ? (
              <p className="text-err">
                {err} <i className="fa-solid fa-xmark"></i>
              </p>
            ) : null}
            {!pathname.includes("msg") ? (
              sentDetails &&
              sentDetails.map((messages) => {
                return (
                  <NavLink
                    key={messages.id}
                    className="messages-link"
                    to={`messages/msg/${messages.id}`}
                  >
                    <SingleSendMessage messages={messages} />
                  </NavLink>
                );
              })
            ) : (
              <ReadSentMessage />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

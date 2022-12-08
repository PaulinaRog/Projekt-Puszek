import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Notify({ notify, onRead }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`messages/msg/${notify.new.id}`);
    onRead(null);
  };

  return (
    <>
      {notify ? (
        <>
          <h1>MASZ NOWĄ WIADOMOŚĆ!</h1>
          <div className="notification-card" onClick={handleClick}>
            <p>Od: {notify.new.senderName}</p>
            <p>
              Wysłana {notify.new.sentat.substring(0, 10)} o godzinie{" "}
              {notify.new.sentat.substring(11, 16)}
            </p>
          </div>
        </>
      ) : null}
    </>
  );
}

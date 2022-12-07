import React from "react";

export default function SingleMessage({ messages }) {
  const { senderid, message, sentat, senderName, receiverName, id } = messages;

  return (
    <>
      <div className="messages-card">
        <h2 className="messages-from">Wiadomość od {senderName}</h2>
        <p>
          Wysłana: {sentat.substring(0, 10)} o godzinie{" "}
          {sentat.substring(11, 16)}
        </p>
        <p>{message}</p>
      </div>
    </>
  );
}

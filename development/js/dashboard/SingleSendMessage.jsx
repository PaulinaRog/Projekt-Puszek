import React from "react";

export default function SingleSendMessage({ messages }) {
  const { message, sentat, receiverName } = messages;

  return (
    <>
      <div className="messages-card">
        <h2 className="messages-header">Wiadomość do {receiverName}</h2>
        <p className="messages-timestamp">
          Wysłana: {sentat.substring(0, 10)} o godzinie{" "}
          {sentat.substring(11, 16)}
        </p>
        <p>{message}</p>
      </div>
    </>
  );
}

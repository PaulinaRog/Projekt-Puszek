import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import supabase from "../contexts/supabaseClient";

export default function Messages() {
  useEffect(() => {}, []);

  return (
    <>
      <div className="messages-bg">
        <main className="messages">
          <h1>Lorem ipsum</h1>
          {/* map */}
          <div className="messages-card">
            <h2>test test</h2>
            {/* name, message title, userPhoto */}
            {/* onclick, hover - semi yellow bg */}
          </div>
        </main>
      </div>
    </>
  );
}

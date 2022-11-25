import React from "react";
import { useState } from "react";
import supabase from "./supabaseClient";

export default function UserAuth() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return <h1>hello, mf</h1>;
}

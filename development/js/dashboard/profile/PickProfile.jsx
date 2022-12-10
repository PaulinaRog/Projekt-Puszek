import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../contexts/supabaseClient";

export default function PickProfile() {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isUserLogged = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
      }
      if (!user) {
        navigate("/signup");
      }

      setIsLogged(true);
      setUser(user.id);
    };

    isUserLogged();
  }, []);

  const handleClickSitter = (e) => {
    e.preventDefault();
    const pickProfile = async () => {
      const { error } = await supabase
        .from("profiles")
        .update({ ownerOrSitter: "sitter" })
        .eq("id", user);

      if (error) {
        console.log(error);
      }
      navigate("/sitterpf");
    };
    pickProfile();
  };

  const handleClickOwner = (e) => {
    e.preventDefault();
    const pickProfile = async () => {
      const { error } = await supabase
        .from("profiles")
        .update({ ownerOrSitter: "owner" })
        .eq("id", user);

      if (error) {
        console.log(error);
      }
      navigate("/petpf");
    };
    pickProfile();
  };

  return (
    <>
      {isLogged && (
        <>
          <div className="profile-form">
            <main className="profile-form-buttons-container">
              <button
                className="profile-form-button-pickone"
                value="sitter"
                onClick={handleClickSitter}
              >
                <i className="fa-solid fa-hand-holding-heart"></i>CHCĘ ZOSTAĆ
                OPIEKUNEM
              </button>
              <button
                className="profile-form-button-pickone"
                value="owner"
                onClick={handleClickOwner}
              >
                <i className="fa-solid fa-paw"></i>JESTEM WŁAŚCICIELEM
              </button>
            </main>
          </div>
        </>
      )}
    </>
  );
}

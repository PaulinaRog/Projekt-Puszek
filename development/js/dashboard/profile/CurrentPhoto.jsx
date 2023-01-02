import React from "react";
import { useEffect, useState } from "react";
import supabase from "../../contexts/supabaseClient";

export default function CurrentPhoto({ userInfo: { id }, photoChange }) {
  const [src, setSrc] = useState(null);
  const [src2, setSrc2] = useState(null);
  const [src3, setSrc3] = useState(null);

  useEffect(() => {
    const urls = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`petpf/${id}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        setSrc(data[0].signedUrl);
      }
    };
    urls();

    const url = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`sitterpf/${id}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        setSrc2(data[0].signedUrl);
      }
    };
    url();

    const urrl = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`organisationpf/${id}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        setSrc3(data[0].signedUrl);
      }
    };
    urrl();
  }, [photoChange]);

  return (
    <>
      {" "}
      {src ? <img className="pfp-img" src={src} /> : null}
      {src2 ? <img className="pfp-img" src={src2} /> : null}
      {src3 ? <img className="pfp-img" src={src3} /> : null}
    </>
  );
}

import React from "react";
import { useState } from "react";
import supabase from "../../contexts/supabaseClient";
import { useRef, forwardRef } from "react";
import TextEditor from "../TextEditor";
import ReactQuill from "react-quill";

export default function OrgDesc({ desc, id }) {
  const [clicked, setClicked] = useState(false);
  const inputRef = useRef();
  const [style, setStyle] = useState({ float: "right" });
  const [newData, setNewData] = useState(false);
  const [newDesc, setDesc] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    setStyle(null);
    const getData = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("desc")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        setDesc(data.desc);
      }
    };
    getData();
  };

  const handleSave = (e) => {
    e.preventDefault();
    const saveChanges = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .update({
          desc: editor ? editor : desc,
        })
        .eq("uuid", id)
        .select("desc");

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setClicked(false);
        setStyle({ float: "right" });
        setDesc(data[0].desc);
        setNewData(true);
      }
    };
    saveChanges();
  };

  const [editor, setEditor] = useState("");

  const handleChange = (html) => {
    setEditor(html);
  };

  function createMarkup() {
    return { __html: newData ? newDesc : desc };
  }

  return (
    <div>
      <div>
        {!clicked ? (
          <>
            <h3 style={{ marginTop: 50 }}>Rozbudowany opis profilu:</h3>
            <div dangerouslySetInnerHTML={createMarkup()}></div>
          </>
        ) : (
          <>
            <h3 style={{ marginTop: 50 }}>Rozbudowany opis profilu:</h3>
            <div>
              <ReactQuill
                theme="snow"
                onChange={handleChange}
                value={editor ? editor : desc}
                modules={TextEditor.modules}
                formats={TextEditor.formats}
                bounds={".app"}
                placeholder="Miejsce na Twój opis"
                style={{
                  outline: "1px solid #87878756",
                  width: "53vw",
                  boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.373)",
                  border: "none",
                }}
              />
            </div>
            <i className="fa-solid fa-download" onClick={handleSave}></i>
          </>
        )}
        <i
          className="fa-solid fa-pen-to-square"
          onClick={handleClick}
          style={style}
        ></i>
      </div>
    </div>
  );
}

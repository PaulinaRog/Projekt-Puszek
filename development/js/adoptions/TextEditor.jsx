import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.scss";
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function TextEditor() {
  const [editor, setEditor] = useState("");

  const handleChange = (html) => {
    setEditor(html);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        value={editor}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        bounds={".app"}
        placeholder="Miejsce na Twój opis"
        style={{
          backgroundColor: "white",
          outline: "1px solid #87878756",
          width: "53vw",
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.373)",
          marginBottom: "3em",
          border: "none",
        }}
      />
    </div>
  );
}

TextEditor.modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

TextEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

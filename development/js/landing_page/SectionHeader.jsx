import React from "react";

export default function SectionHeader({ title }) {
  return (
    <div className="section_header">
      <h1 className="section_header-title">{title}</h1>
    </div>
  );
}

import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Index";
import CareApp from "./nav/careApp";

export default function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/puszek/care" element={<CareApp />} />
            <Route path="puszek/articles" element={<CareApp />} />
            <Route path="puszek/contact" element={<CareApp />} />
            <Route path="puszek/login" element={<CareApp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
